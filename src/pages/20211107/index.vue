<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 节点连线</span>
    </div>

    <div class="workspace">
      <Materials />
      <!-- canvas 挂载节点 -->
      <div id="graph" />
    </div>
  </div>
</template>

<script>
  import G6 from '@antv/g6';
  import Materials from './components/materials';

  const data = {
    nodes: [{
      id:    '0',
      x:     300,
      y:     200,
      label: '1',
    }, {
      id:    '1',
      x:     300,
      y:     400,
      label: '2',
    }],
  };
  const anchorPointMap = [
    [0, 0.5],
    [0.5, 0],
    [1, 0.5],
    [0.5, 1],
  ];

  export default {
    components: {
      Materials,
    },
    data () {
      return {
        graph: null,
      };
    },
    mounted () {
      // 创建画布
      this.$nextTick(() => {
        this.createGraphic();
      });
    },
    beforeDestroy () {
      this.graph.destroy();
    },
    methods: {
      createGraphic () {
        const grid = new G6.Grid();
        const graph = new G6.Graph({
          container:   document.getElementById('graph'),
          width:       window.innerWidth - 40,
          height:      window.innerHeight - 40,
          defaultNode: {
            type:         'rect',
            anchorPoints: anchorPointMap,
            style:        {
              width:  170,
              height: 50,
              radius: 4,
              fill:   '#5cbc5a',
              stroke: '#5cbc5a',
            },
            labelCfg: {
              style: {
                fontSize: 14,
                fill:     '#fff',
              },
            },
          },
          defaultEdge: {
            type:  'cubic',
            style: {
              stroke: '#ed6fb1',
            },
          },
          modes: {
            default: ['drag-node', 'drag-canvas'],
          },
          plugins: [grid],
        });

        this.graph = graph;
        this.graph.read(data);
        // 绘制锚点
        this.drawAnchors();
        this.bindEvents();
      },
      // 绘制可视锚点
      drawAnchors() {
        this.graph.getNodes().forEach(item => {
          this.drawAnchor(item);
        });
      },
      drawAnchor(item) {
        const { id, style: { width, height } } = item.get('model');
        const group = item.get('group');

        for(let i = 0; i < 4; i++) {
          const x = width * (anchorPointMap[i][0] - 0.5);
          const y = height * (anchorPointMap[i][1] - 0.5);

          // 锚点
          group.addShape('circle', {
            attrs: {
              r:      5,
              cursor: 'move',
              stroke: '#333',
              fill:   '#fff',
              x,
              y,
            },
            anchorIndex: i,
            draggable:   true,
            name:        'anchor',
            nodeId:      id,
          });
        }
      },
      // 绑定画布事件
      bindEvents() {
        const edgeCfg = {
          sourceId:     '',
          sourceAnchor: '',
          startPoint:   {
            x: 0,
            y: 0,
          },
        };

        // 画布监听释放事件
        this.graph.on('drop', e => {
          if(e.originalEvent.dataTransfer) {
            const { shape } = JSON.parse(e.originalEvent.dataTransfer.getData('dragSource'));

            this.graph.addItem('node', {
              type:  shape,
              label: Math.random() * 100,
              x:     e.canvasX,
              y:     e.canvasY,
            });
          }
        });

        // 开始拖拽
        this.graph.on('anchor:dragstart', e => {
          e.stopPropagation();

          const node = e.item;
          const bBox = node.getBBox();
          const group = node.getContainer();
          const { id } = node.getModel();
          const { anchorIndex } = e.target.cfg;
          const p = anchorPointMap[anchorIndex];

          edgeCfg.startPoint.x = e.canvasX;
          edgeCfg.startPoint.y = e.canvasY;
          edgeCfg.sourceId = id;
          edgeCfg.sourceAnchor = anchorIndex;
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
          // console.log('dragstart', edgeCfg);
        });

        // 拖拽中
        this.graph.on('anchor:drag', e => {
          e.stopPropagation();

          const node = e.item;
          const group = node.getContainer();
          const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');
          const canvasBox = group.get('children')[0].get('canvasBBox');

          if(dashedPath) {
            // 实时更新虚线结束位置
            const { path } = dashedPath.attrs;

            /* 计算方法:
            * 鼠标在画布上的位置 - box左上角 - width/2 => 当前鼠标的坐标
            */
            path[1] = ['L', e.x - canvasBox.x - canvasBox.width / 2 - 1, e.y - canvasBox.y - canvasBox.height / 2 - 1];
            dashedPath.attr({
              path: [[...path[0]], path[1]],
            });
            dashedPath.toFront();
          }
        });

        // 拖拽结束
        this.graph.on('anchor:dragend', e => {
          e.stopPropagation();

          if(e.target.cfg.name === 'anchor' && e.target.cfg.nodeId !== e.item.getModel().id) {
            // 移动到了其他节点上
          } else {
            // 此时应删除连线, 并清空 edge 对象
            edgeCfg.sourceId = '';
            edgeCfg.anchorIndex = '';
          }

          // 移除虚线
          const node = e.item;
          const group = node.getContainer();
          const dashedPath = group.get('children').find(c => c.cfg.name === 'dashed-path');

          if(dashedPath) {
            dashedPath.remove();
          }
        });

        // 在锚点上释放鼠标
        this.graph.on('anchor:drop', e => {
          e.stopPropagation();

          const { id } = e.item.getModel();
          const { anchorIndex } = e.target.cfg;

          // 发生连线
          if(edgeCfg.sourceId) {
            // 添加连线
            this.graph.addItem('edge', {
              fill:         '#333',
              label:        'edge',
              source:       edgeCfg.sourceId,
              sourceAnchor: edgeCfg.sourceAnchor,
              target:       id,
              targetAnchor: anchorIndex,
            });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .workspace{display: flex;}
  #graph{margin-left: 0;}
</style>
