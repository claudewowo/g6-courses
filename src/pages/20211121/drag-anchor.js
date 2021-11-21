/*
 * 注册锚点拖拽行为
 */

const anchorPointMap = [
  [0, 0.5],
  [0.5, 0],
  [1, 0.5],
  [0.5, 1],
];

export default registerBehavior => {
  registerBehavior('drag-anchor', {
    getDefault () {
      return {
        sourceId:     '',
        sourceAnchor: '',
      };
    },
    // 事件与回调绑定
    getEvents() {
      return {
        'node:dragstart': 'onDragStart',
        'node:drag':      'onDrag',
        'node:dragend':   'onDragEnd',
        'node:drop':      'onDrop',
      };
    },
    shouldBegin () {
      return true;
    },
    // 开始拖拽
    onDragStart(e) {
      if (e.target.cfg.name === 'anchor') {
        // e.stopPropagation();
        this.graph.emit('before-anchor-dragstart');

        const node = e.item;
        const bBox = node.getBBox();
        const group = node.getContainer();
        const { id } = node.getModel();
        const { anchorIndex } = e.target.cfg;
        const p = anchorPointMap[anchorIndex];

        this.sourceId = id;
        this.sourceAnchor = anchorIndex;

        // 添加虚线
        const line = group.addShape('path', {
          attrs: {
            stroke:   '#1890FF',
            lineDash: [5, 3],
            path:     [
              ['M', bBox.width * (p[0] - 0.5), bBox.height * (p[1] - 0.5)],
            ],
          },
          name: 'dashed-path',
        });

        node.toFront();
        group.toFront();
        line.toFront();
      }
    },
    // 拖拽中
    onDrag(e) {
      if (e.target.cfg.name === 'anchor') {
        // e.stopPropagation();
        this.graph.emit('before-anchor-drag');

        const node = e.item;
        const group = node.getContainer();
        const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');
        const canvasBox = group.get('children')[0].get('canvasBBox');

        if (dashedPath && canvasBox) {
          // 实时更新虚线结束位置
          const { path } = dashedPath.attrs;

          /* 计算方法:
           * 鼠标在画布上的位置 - box左上角 - width/2 => 当前鼠标的坐标
           */
          path[1] = [
            'L',
            e.x - canvasBox.x - canvasBox.width / 2 - 1,
            e.y - canvasBox.y - canvasBox.height / 2 - 1,
          ];
          dashedPath.attr({
            path: [[...path[0]], path[1]],
          });
          dashedPath.toFront();
        }
      }
    },
    // 拖拽结束
    onDragEnd(e) {
      if (e.target.cfg.name === 'anchor') {
        // e.stopPropagation();
        this.graph.emit('before-anchor-dragend');

        if(e.target.cfg.nodeId !== e.item.getModel().id) {
          // 移动到了其他节点上
        } else {
          // 此时应删除连线, 并清空 edge 对象
          this.sourceId = '';
          this.anchorIndex = '';
        }

        // 移除虚线
        const node = e.item;
        const group = node.getContainer();
        const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');

        if(dashedPath) {
          dashedPath.remove();
        }
        this.graph.emit('after-anchor-dragend');
      }
    },
    // 在锚点上释放鼠标
    onDrop (e) {
      if (e.target.cfg.name === 'anchor') {
        // e.stopPropagation();
        this.graph.emit('before-anchor-drop');

        const { id } = e.item.getModel();
        const { anchorIndex } = e.target.cfg;

        // 发生连线
        if (this.sourceId) {
          this.graph.emit('after-anchor-drop', {
            label:        'edge',
            source:       this.sourceId,
            sourceAnchor: this.sourceAnchor,
            target:       id,
            targetAnchor: anchorIndex,
          });
        }
      }
    },
  });
};
