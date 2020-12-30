export default G6 => {
  G6.registerEdge('right-tree', {
    draw (cfg, group) {
      const xOffset = 22;
      const yOffset = 10;
      const { startPoint, endPoint } = cfg;
      const Ydiff = endPoint.y - startPoint.y;
      // 开口方向
      const left = startPoint.x - endPoint.x > 0;
      const QPoint = {
        x: left ? startPoint.x - xOffset : startPoint.x + xOffset,
        y: endPoint.y,
      };
      const path = Ydiff === 0 ? [
        ['M', startPoint.x + xOffset, startPoint.y],
        ['L', endPoint.x, endPoint.y],
      ] : [
          ['M', startPoint.x, startPoint.y],
          ['L', QPoint.x, startPoint.y],
          ['L', QPoint.x, endPoint.y + (Ydiff > 0 ? -yOffset : yOffset)],
          ['Q', QPoint.x, QPoint.y, left ? QPoint.x - yOffset : QPoint.x + yOffset, endPoint.y],
          ['L', endPoint.x, endPoint.y],
      ];

      const shape = group.addShape('path', {
        attrs: {
          path,
          stroke: '#666',
          ...cfg,
        },
        name: 'right-tree-edge',
      });

      const { note } = cfg.targetNode.getModel();

      if (note) {
        const label = group.addShape('text', {
          attrs: {
            x:        QPoint.x + 6,
            y:        endPoint.y - 3,
            text:     note || '',
            fill:     '#999',
            fontSize: 12,
          },
          name:   'right-tree-note',
          zIndex: 10,
        });

        group.sort();
        label.toFront();
      }
      return shape;
    },
  });
};
