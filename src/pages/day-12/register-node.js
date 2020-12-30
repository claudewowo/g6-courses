/* 注册自定义节点 */

export default G6 => {
  G6.registerNode('tree-node', {
    draw (cfg, group) {
      const isNodeStyle = cfg.nodeType === 'node';
      const style = this.getShapeStyle(cfg, group); // node 样式
      const textStyle = { ...style }; // 文本节点样式
      const size = G6.Util.getTextSize(cfg.label, 14);

      if (!isNodeStyle) {
        delete textStyle.fill;
        delete textStyle.stroke;
        textStyle.width = size[0] + 12;
      }
      const attrs = isNodeStyle ? style : textStyle;
      const shape = group.addShape('rect', {
        attrs,
        name: 'rect-node',
      });

      group.addShape('text', {
        attrs: {
          fontSize: 14,
          fill:     '#666',
          text:     cfg.label,
          x:        -style.width / 2 + 6,
          y:        style.height / 2 - 8,
        },
        name: 'node-label',
      });

      if (cfg.children) {
        const circleX = !isNodeStyle && style.width > size[0] ? (-style.width / 2 + size[0] + 22) : (attrs.width / 2 + 11);

        group.addShape('circle', {
          attrs: {
            r:      7,
            fill:   '#fff',
            stroke: '#ccc',
            x:      circleX,
          },
          name: 'node-icon',
        });

        const iconX = !isNodeStyle && style.width > size[0] ? (-style.width / 2 + size[0] + 17) : (style.width / 2 + 6);

        group.addShape('text', {
          attrs: {
            text:     '-',
            fontSize: 16,
            fill:     '#ccc',
            cursor:   'pointer',
            x:        iconX,
            y:        6,
          },
          name: 'node-icon-text',
        });
      }

      return shape;
    },
    update (cfg, node) {
      const group = node.getContainer();
      const children = group.get('children');
      const nodeLabel = children.find(child => child.cfg.name === 'node-label');
      const icon = children.find(child => child.cfg.name === 'node-icon-text');

      if (nodeLabel) {
        nodeLabel.attr({
          text: cfg.label,
        });
      }

      if (icon) {
        icon.attr({
          text: cfg.collapsed ? '+' : '-',
        });
      }
    },
  }, 'rect');
};
