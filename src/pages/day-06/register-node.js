// 注册自定义节点

export default (G6) => {
  /*
  * 注册基础node => 添加锚点/图标/文本 => 绘制node =>  设置node状态 => 设置交互动画
  */
  G6.registerNode(
    'k-rect', // 自定义的节点名称
    {
      // 添加文本节点
      drawText (cfg, group) {
        group.addShape('text', {
          attrs: {
            text:         cfg.label,
            fill:         '#fff',
            fontSize:     14,
            textAlign:    'center',
            textBaseline: 'middle',
            ...cfg.labelCfg.style,
          },
          className: 'node-text',
          draggable: true,
        });
      },
      // 添加锚点
      drawAnchor (cfg, group) {
        const item = group.get('children')[0];
        const bBox = item.getBBox();
        const anchors = this.getAnchorPoints(cfg);

        // 绘制锚点坐标
        anchors && anchors.forEach((p, i) => {
          const x = bBox.width * (p[0] - 0.5);
          const y = bBox.height * (p[1] - 0.5);

          // 视觉锚点
          group.addShape('circle', {
            attrs: {
              x,
              y,
              fill:      '#e7e7e7',
              stroke:    '#1890ff',
              lineWidth: 1,
              r:         5,
            },
            zIndex:    1,
            nodeId:    group.get('id'),
            className: 'node-anchor',
            draggable: true,
            isAnchor:  true,
            index:     i,
          });
        });
      },
      /*
        绘制节点, 包含文本, 锚点等
      */
      draw (cfg, group) {
        /*
        * group: 节点分组, 包含节点配置, 锚点, 图标, 文本等shape.
        * 绘制流程:
        * 1. 获取默认样式配置
        * 2. 添加 shape
        * 3. 添加文本节点/锚点等
        * 4. return shape
        */

        // 1.
        const attrs = cfg;

        // console.log(attrs);
        // 2.
        const shape = group.addShape(
          'rect', // 继承内置节点的 shape, 可选 rect, circle, ellipse, path 等
          {
            // 所有的样式配置
            attrs: {
              ...attrs,
              fill: '#1890ff',
              ...attrs.style,
              x:    -attrs.style.width / 2,
              y:    -attrs.style.height / 2,
            },
            className: 'custom-shape', // 添加自定义属性, 方便以后对节点进行查找更新等
            draggable: true, // 允许自定义图形使用拖拽事件
          },
        );

        // 3.
        // this 是当前节点的实例, 并不是 Vue 实例
        this.drawText(cfg, group);
        this.drawAnchor(cfg, group);

        // 4.
        return shape;
      },
      /* 绘制后附加操作 */
      afterDraw (cfg, group) { },
      /* 用于更新节点的配置 */
      update (cfg, node) { },
      /* 用于更新节点后的附加操作 */
      afterUpdate (cfg, node) { },
      /*
        设置节点状态, 主要是交互状态, 如 hover, active 等.
      */
      setState (name, value, group) {},
      /* 获取当前节点的锚点 */
      getAnchorPoints (cfg) {
        return cfg.anchorPoints || [
          [0.5, 0],
          [1, 0.5],
          [0.5, 1],
          [0, 0.5],
        ];
      },
    },
    // 'extendNodeName',
  );
};
