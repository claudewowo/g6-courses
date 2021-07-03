<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 五十问 - 基础配置</span>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
  import { Graph, Grid } from '@antv/g6';

  export default {
    data () {
      return {
        graph: null,
      };
    },
    mounted () {
      // 创建画布
      this.createGraphic();
    },
    methods: {
      createGraphic () {
        const grid = new Grid();
        const graph = new Graph({
          container:   document.getElementById('graph'),
          width:       window.innerWidth,
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
          modes: {
            default: ['drag-node', 'drag-canvas'],
          },
          plugins: [grid],
        });

        const nodes = [];

        for (let i = 0; i < 100; i++) {
          nodes.push({
            id:    `${i}`,
            label: 'node',
          });
        }

        graph.read({
          nodes,
        });
      },
    },
  };
</script>

<style lang="scss">
  #graph{margin: 0;}
</style>
