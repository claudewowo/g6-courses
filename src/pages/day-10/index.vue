<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 脑图</span>
      <i class="gb-toggle-btn" />
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import registerEdge from './register-edge';

const data = {
  id:       '1',
  label:    'js 基本语法',
  children: [
    {
      id:       '2',
      label:    '变量',
      children: [
        {
          id:    '5',
          label: '变量声明',
        },
        {
          id:    '6',
          label: '变量作用域',
        },
        {
          id:    '7',
          label: '全局变量',
        },
      ],
    },
    {
      id:       '3',
      label:    '类型',
      children: [
        {
          id:    '8',
          label: '基本类型',
        },
        {
          id:    '9',
          label: '引用类型',
        },
        {
          id:    '10',
          label: '类型转换',
        },
      ],
    },
    {
      id:       '4',
      label:    '运算符',
      children: [
        {
          id:    '11',
          label: '分类',
        },
        {
          id:    '12',
          label: '优先级',
        },
      ],
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
      registerEdge(G6);

      const graph = new G6.TreeGraph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'rect',
          style: {
            width:  100,
            height: 30,
            radius: 4,
            fill:   '#ecf6fc',
            stroke: '#1890ff',
          },
          labelCfg: {
            style: {
              fontSize: 14,
            },
          },
        },
        defaultEdge: {
          type: 'right-tree',
        },
        layout: {
          type:    'mindmap',
          getHGap: () => 50,
          getVGap: () => 20,
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            {
              type: 'collapse-expand',
              onChange(item, collapsed) {
                const data = item.get('model');

                data.collapsed = collapsed;
                return true;
              },
            },
          ],
        },
        fitView: true,
        maxZoom: 1,
      });

      graph.read(data);
      this.graph = graph;
    },
  },
};
</script>
