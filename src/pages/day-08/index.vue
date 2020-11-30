<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 自定义节点</span>
      <i class="gb-toggle-btn" />
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import registerBehavior from './register-behavior';
import registerNode from './register-node';
import registerEdge from './register-edge';

const data = {
  nodes: [
    {
      id:    '1',
      label: 'node 1',
    },
    {
      id:    '2',
      label: 'node 2',
    },
    {
      id:    '3',
      label: 'node 3',
    },
    {
      id:    '4',
      label: 'node 4',
    },
  ],
  edges: [
    {
      // type:   'line',
      source: '1',
      target: '2',
    },
    {
      // type:   'polyline',
      source: '1',
      target: '3',
    },
    {
      // type:   'arc',
      source: '2',
      target: '4',
    },
    {
      // type:   'cubic',
      source: '3',
      target: '4',
    },
  ],
};

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
      registerBehavior(G6);
      registerNode(G6);
      registerEdge(G6);

      const graph = new G6.Graph({
        container: document.getElementById('graph'),
        width:     window.innerWidth - 40,
        height:    window.innerHeight - 40,
        layout:    {
          type: 'dagre',
        },
        defaultNode: {
          type:  'k-rect',
          style: {
            width:  180,
            height: 60,
            radius: 10,
          },
          labelCfg: {
            style: {
              fontSize: 20,
            },
          },
          anchorPoints: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ],
        },
        nodeStateStyles: {
          'nodeState:default': {
            opacity: 1,
          },
          'nodeState:hover': {
            opacity: 0.8,
          },
          'nodeState:selected': {
            fill:     '#e7f4fa',
            labelCfg: {
              style: {
                fill: '#333',
              },
            },
          },
        },
        defaultEdge: {
          type:  'k-edge',
          style: {
            lineAppendWidth: 20, // 响应鼠标事件的检测宽度, 当 lineWidth 太小而不易选中时, 可以通过此参数提升击中的范围
          },
        },
        modes: {
          default: ['drag-node', 'node-hover', 'node-select', 'edge-active'],
        },
        fitCenter: true,
      });

      graph.read(data);
      this.graph = graph;

    },
  },
};
</script>
