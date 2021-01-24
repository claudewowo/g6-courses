<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 绘制流程图 (1) iconfont 图标</span>
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
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'rect',
          style: {
            width:  100,
            height: 30,
            radius: 4,
            fill:   '#fff',
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
      });

      graph.read({
        nodes: [{
          id:    '0',
          x:     350,
          y:     350,
          label: 'node',
        }],
      });
      this.graph = graph;

      const item = this.graph.findById('0');
      const group = item.getContainer();

      const icon1 = group.addShape('text', {
        attrs: {
          fontFamily: 'graphicon',
          text:       '\ue600',
          fill:       '#1890ff',
          fontSize:   30,
          x:          -54,
          y:          15,
        },
      });

      const icon2 = group.addShape('text', {
        attrs: {
          fontFamily: 'graphicon',
          text:       '\ue6a5',
          fill:       '#ce4c4c',
          fontSize:   16,
          x:          60,
          y:          7,
        },
      });

      setTimeout(() => {
        icon1.attr({ });
        icon2.attr({ });
      },0);
    },
  },
};
</script>

<style>
  @import './iconfonts/iconfont.css';
</style>
