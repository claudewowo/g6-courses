<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 自定义Combo</span>
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
import registerCombo from './register-combo';

const data = {
  nodes: [
    {
      id:      '1',
      label:   '点击提交按钮',
      comboId: 'combo1',
      x:       -400,
      y:       50,
    },
    {
      id:      '2',
      label:   'axios 请求拦截器',
      comboId: 'combo1',
      x:       -200,
      y:       50,
    },
    {
      id:      '3',
      label:   '发起 HTTP 请求',
      comboId: 'combo1',
      x:       0,
      y:       50,
    },
    {
      id:      '4',
      label:   'HTTP 4 次握手',
      comboId: 'combo2',
      x:       250,
      y:       50,
    },
    {
      id:           '5',
      label:        '到达服务端',
      comboId:      'combo3',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
        [0.5, 0],
        [0.5, 1],
      ],
      x: 510,
      y: -50,
    },
    {
      id:           '6',
      label:        '将结果存入数据库',
      comboId:      'combo3',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
        [0.5, 0],
        [0.5, 1],
      ],
      x: 510,
      y: 150,
    },
  ],
  edges: [
    {
      id:     'edge1',
      source: '1',
      target: '2',
    },
    {
      id:     'edge2',
      source: '2',
      target: '3',
    },
    {
      id:     'edge3',
      source: '3',
      target: '4',
    },
    {
      id:     'edge4',
      source: '4',
      target: '5',
    },
    {
      id:     'edge5',
      source: '5',
      target: '6',
    },
  ],
  combos: [
    {
      id:    'combo1',
      label: '客户端',
      size:  [600, 400],
      style: {
        stroke: '#1890ff',
      },
    },
    {
      id:    'combo2',
      label: 'HTTP',
      style: {
        stroke: '#1890ff',
      },
    },
    {
      id:    'combo3',
      label: '服务端',
      style: {
        stroke: '#1890ff',
      },
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
      registerCombo(G6);

      const graph = new G6.Graph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'k-rect',
          style: {
            width:  160,
            height: 40,
            radius: 10,
          },
          labelCfg: {
            style: {
              fontSize: 14,
            },
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
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
          type:  'line',
          style: {
            stroke:          '#666',
            lineAppendWidth: 20, // 响应鼠标事件的检测宽度, 当 lineWidth 太小而不易选中时, 可以通过此参数提升击中的范围
          },
        },
        defaultCombo: {
          type: 'k-combo-rect',
          size: [220, 400],
        },
        modes: {
          default: ['drag-node', 'drag-canvas', 'node-hover', 'edge-active'],
        },
        fitCenter: true,
      });

      graph.read(data);
      this.graph = graph;

    },
  },
};
</script>
