/* 注册自定义边 */

export default G6 => {
  G6.registerEdge('k-edge', {
    running: false,
    runAnimate (group) {
      if (this.running) return;
      this.running = true;
      group.toFront();

      let index = 0;
      // 获得当前边的第1个图形，这里是边本身的 path
      const path = group.get('children')[0];
      const dashLine = group.addShape('path', {
        attrs: {
          offset:     path.attrs.offset,
          path:       path.attrs.path,
          stroke:     '#1890ff',
          startArrow: path.attrs.startArrow,
          endArrow:   path.attrs.endArrow,
        },
        name: 'edge-dash',
      });

      dashLine.animate(
        radio => {
          index++;

          return {
            lineDash:       [2, 1, 2, 4],
            lineDashOffset: -index,
          };
        },
        {
          repeat:   true,
          duration: 3000,
        },
      );
    },
    stopAnimate (group) {
      const path = group.get('children').find(item => item.cfg.name === 'edge-dash');

      if (path) {
        path.remove();
        this.running = false;
      }
    },
    setState (name, value, item) {
      const group = item.getContainer();

      if (name === 'edgeState:active' && value) {
        this.runAnimate(group);
      } else if (name === 'edgeState:active' && !value) {
        this.stopAnimate(group);
      }
    },
  }, 'polyline');
};
