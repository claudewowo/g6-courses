/* 自定义 combo */

export default G6 => {
  G6.registerCombo('k-combo-rect', {
    drawShape (cfg, group) {
      const style = this.getShapeStyle(cfg);
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x:      -style.width / 2,
          y:      -style.height / 2,
          width:  style.width,
          height: style.height,
        },
        draggable: true,
        name:      'combo-keyShape',
      });

      return rect;
    },
  }, 'rect');
};
