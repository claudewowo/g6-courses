<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程</span>
      <i class="gb-toggle-btn" />
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data () {
    return {
      graph: null,
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
        container: document.getElementById('graph'),
        width:     window.innerWidth,
        height:    window.innerHeight - 40,
        layout:    {
          type: 'dagre',
        },
        defaultNode: {
          type: 'rect',
        },
        defaultEdge: {
          type: 'polyline',
        },
        fitView: true,
      });

      const data = {
        nodes: [
          {
            id:    '1',
            label: 'alps_file1',
          },
          {
            id:    '2',
            label: 'alps_file2',
          },
          {
            id:    '3',
            label: 'alps_file3',
          },
          {
            id:    '4',
            label: 'sql_file1',
          },
        ],
        edges: [
          {
            source: '1',
            target: '2',
          },
          {
            source: '1',
            target: '3',
          },
          {
            source: '2',
            target: '4',
          },
          {
            source: '3',
            target: '4',
          },
        ],
      };

      this.graph = graph;
      this.graph.read(data); // 读取数据
    },
  },
};
</script>

<style lang="scss">
  #graph{
    width: 100%;
    height: calc(100vh - 40px);
  }
  /* 提示框的样式 */
  .g6-tooltip {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #545454;
    border-radius: 4px;
    border: 1px solid #e2e2e2;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgb(174, 174, 174) 0 0 10px;
    padding: 10px 8px;
  }
  .g6-minimap{
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
