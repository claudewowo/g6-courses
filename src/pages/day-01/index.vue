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
        // 布局设置
        layout:    {
          type: 'dagre',
        },
        // 默认节点配置 也是全局配置
        defaultNode: {
          type:  'rect',
          style: {
            radius:        4,
            lineWidth:     2,
            fill:          '#EDF5FF',
            stroke:        '#1890ff',
            shadowColor:   '#1890ff',
            shadowBlur:    20,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            cursor:        'move',
            // opacity: 0.5,
          },
          labelCfg: {
            style: {
              fontSize: 14,
              fill:     '#1890ff',
              cursor:   'move',
            },
          },
        },
        // 默认边的配置 也是全局配置
        defaultEdge: {
          type: 'polyline',
        },
        // 适应视图大小
        fitView:        true,
        // 添加渲染视图 padding
        fitViewPadding: 100,
      });

      // 待渲染数据
      const data = {
        nodes: [
          {
            id:    '1',
            label: 'alps_file1',
            type:  'circle',
            style: {
              r:         40,
              stroke:    '#1890ff',
              lineWidth: 5,
            },
          },
          {
            id:    '2',
            label: 'alps_file2',
            type:  'rect',
            style: {
              width:     100,
              height:    40,
              radius:    6,
              lineWidth: 2,
            },
          },
          {
            id:    '3',
            label: 'alps_file3',
            type:  'ellipse',
            style: {
              rx: 50,
              ry: 20,
            },
          },
          {
            id:    '4',
            label: 'sql_file1',
            type:  'diamond',
            size:  [100, 50],
            style: {
              lineWidth: 2,
            },
          },
        ],
        edges: [
          {
            source: '1',
            target: '2',
            label:  'line',
            type:   'line',
          },
          {
            source: '1',
            target: '3',
            label:  'polyline',
            type:   'polyline',
          },
          {
            source: '2',
            target: '4',
            label:  'arc',
            type:   'arc',
          },
          {
            source: '3',
            target: '4',
            label:  'cubic',
            type:   'cubic',
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
</style>
