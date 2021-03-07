<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 粉丝答疑 - 自动生成对齐线</span>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
    <div
      id="guider-line"
      ref="guider-line"
    >
      <div class="guider-x" />
      <div class="guider-x" />
      <div class="guider-x" />
      <div class="guider-y" />
      <div class="guider-y" />
      <div class="guider-y" />
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data () {
    return {
      graph:    null,
      dragmode: false,
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
          type:  'rect',
          style: {
            width:  100,
            height: 30,
            radius: 4,
            fill:   '#f1f1f1',
            stroke: '#ccc',
          },
          labelCfg: {
            style: {
              fontSize: 14,
            },
          },
        },
        layout: {
          type: 'xxx',
        },
        modes: {
          default: ['drag-node', 'drag-canvas'],
        },
        plugins: [grid],
      });

      this.graph = graph;
      this.graph.read({
        nodes: [{
          id:    '0',
          x:     350,
          y:     200,
          label: 'node',
        }, {
          id:    '1',
          x:     350,
          y:     350,
          label: 'node',
        }],
      });
      this.bindEvents();
    },
    bindEvents() {
      this.graph.on('drop', event => {

      });
    },
  },
};
</script>

<style lang="scss">
  #guider-line{
    .guider-x,
    .guider-y{
      position: absolute;
      top: 100px;
      left: 10px;
    }
    .guider-x{
      width: 100%;
      border-top: 1px solid #ff4aff;
    }
    .guider-y{
      height: 100%;
      border-left: 1px solid #ff4aff;
    }
  }
</style>
