/* 注册自定义节点 */

export default G6 => {
  G6.registerNode('rect-node', {
    draw (cfg, group) {
      const style = this.getShapeStyle(cfg, group); // node 样式

      const shape = group.addShape('rect', {
        attrs: style,
        name:  'rect-node',
      });

      group.addShape('text', {
        attrs: {
          fontSize: 14,
          fill:     '#666',
          text:     cfg.label,
          x:        -16,
          y:        6,
        },
        name: 'node-label',
      });

      // TODO
      // 1: 添加虚拟节点
      // 2: 添加控制点
      group.addShape('rect', {
        attrs: {
          ...style,
          radius:      4,
          fill:        '#E7F7FE',
          stroke:      '#1890ff',
          fillOpacity: 0.7,
        },
        visible:   false,
        className: 'rect-node-shadow',
      });
      this.addControlPoint(group, style);

      return shape;
    },
    addControlPoint (group, style) {
      group.addShape('circle', {
        attrs: {
          r:             4,
          fill:          '#1890ff',
          stroke:        '#fff',
          strokeOpacity: 0,
          lineWidth:     20,
          x:             0,
          y:             -style.height / 2,
          cursor:        'ns-resize',
        },
        visible:   false,
        className: 'control-point',
        name:      'top-point',
      });
      group.addShape('circle', {
        attrs: {
          r:             4,
          fill:          '#1890ff',
          stroke:        '#fff',
          strokeOpacity: 0,
          lineWidth:     20,
          x:             style.width / 2,
          y:             0,
          cursor:        'ew-resize',
        },
        visible:   false,
        className: 'control-point',
        name:      'right-point',
      });
      group.addShape('circle', {
        attrs: {
          r:             4,
          fill:          '#1890ff',
          stroke:        '#fff',
          strokeOpacity: 0,
          lineWidth:     20,
          x:             0,
          y:             style.height / 2,
          cursor:        'ns-resize',
        },
        visible:   false,
        className: 'control-point',
        name:      'bottom-point',
      });
      group.addShape('circle', {
        attrs: {
          r:             4,
          fill:          '#1890ff',
          stroke:        '#fff',
          strokeOpacity: 0,
          lineWidth:     20,
          x:             -style.width / 2,
          y:             0,
          cursor:        'ew-resize',
        },
        visible:   false,
        className: 'control-point',
        name:      'left-point',
      });
    },
    update (cfg, item) {
      const model = item.getModel();
      const group = item.getContainer();
      const node = group.getFirst();
      const { width, height } = model.style;

      node.attr({
        width,
        height,
        x: -width / 2,
        y: -height / 2,
      });

      group.getChildren().forEach(child => {
        if (child.cfg.className === 'rect-node-shadow') {
          child.attr({
            width,
            height,
            x: -width / 2,
            y: -height / 2,
          });
        } else if (child.cfg.className === 'control-point') {
          switch (child.cfg.name) {
            case 'top-point':
              child.attr({ y: -height / 2 });
              break;
            case 'right-point':
              child.attr({ x: width / 2 });
              break;
            case 'bottom-point':
              child.attr({ y: height / 2 });
              break;
            case 'left-point':
              child.attr({ x: -width / 2 });
              break;
          }
        }
      });
    },
    setState (name, value, item) {
      if (name === 'graphMode') {
        const visible = value === 'edit';
        const group = item.getContainer();
        const children = group.getChildren();

        children.forEach(child => {
          if (child.cfg.className === 'control-point' || child.cfg.className === 'rect-node-shadow') {
            if (visible) {
              child.show();
            } else {
              child.hide();
            }
          }
        });
      }
    },
  }, 'rect');
};
