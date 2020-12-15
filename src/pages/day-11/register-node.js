/* 注册自定义节点 */

export default G6 => {
  G6.registerNode('tree-node', {
    draw (cfg, group) {
      const style = this.getShapeStyle(cfg, group);
      const size = G6.Util.getTextSize(cfg.label, 14);
      const textStyle = { ...style };

      if (cfg.nodeType === 'text') {
        delete textStyle.fill;
        delete textStyle.stroke;
        textStyle.width = size[0] + 10;
      }
      const attrs = cfg.nodeType === 'text' ? textStyle : style;
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
          y:        attrs.height / 2 - 8,
        },
        name: 'node-label',
      });

      if (cfg.children) {
        group.addShape('circle', {
          attrs: {
            r:      7,
            fill:   '#fff',
            stroke: '#ccc',
            x:      cfg.nodeType === 'text' && style.width > size[0] ? (-style.width / 2 + size[0] + 20) : (attrs.width / 2 + 11),
          },
          name: 'node-icon',
        });
        group.addShape('text', {
          attrs: {
            text:     '-',
            fontSize: 16,
            fill:     '#ccc',
            cursor:   'pointer',
            x:        cfg.nodeType === 'text' && style.width > size[0] ? (-style.width / 2 + size[0] + 15) : (attrs.width / 2 + 6),
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
