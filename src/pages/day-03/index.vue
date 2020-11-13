<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 拖拽节点</span>
      <i class="gb-toggle-btn" />
    </div>
    <!-- 左侧功能栏 -->
    <item-panel @canvas-add-node="canvasAddNode" />
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import ItemPanel from './ItemPanel';

export default {
  components: {
    ItemPanel,
  },
  data () {
    return {
      graph:        null,
      canvasOffset: {
        x:  0,
        y:  0,
        dx: 0,
        dy: 0,
      },
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
      const graph = new G6.Graph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type: 'rect',
        },
        defaultEdge: {
          type: 'polyline',
        },
        fitCenter: true,
        fitView:   true,
        modes:     {
          default: ['drag-canvas', 'zoom-canvas'],
        },
      });

      this.graph = graph;
      this.bindEvents();
    },
    bindEvents() {
      const canvas = document.getElementById('graph').children[0];

      // 拖拽开始事件
      this.graph.on('dragstart', e => {
        this.canvasOffset.x = e.clientX;
        this.canvasOffset.y = e.clientY;
      });

      // 拖拽结束事件
      this.graph.on('dragend', e => {
        this.canvasOffset.dx = this.canvasOffset.dx + e.clientX - this.canvasOffset.x;
        this.canvasOffset.dy = this.canvasOffset.dy + e.clientY - this.canvasOffset.y;

        canvas.setAttribute('dx', this.canvasOffset.dx);
        canvas.setAttribute('dy', this.canvasOffset.dy);
      });
    },
    canvasAddNode(e) {
      const shape = e.target.getAttribute('data-shape');

      this.graph.addItem('node', {
        label: shape,
        type:  shape,
        x:     e.clientX - this.canvasOffset.dx - 40,
        y:     e.clientY - this.canvasOffset.dy - 40,
        size:  [120, 40],
      });
    },
  },
};
</script>
