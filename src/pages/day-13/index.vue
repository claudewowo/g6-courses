<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 拖拽编辑节点大小</span>
      <i class="gb-toggle-btn" />
      <button
        style="float: right"
        @click="changeMode"
      >
        {{ mode === 'default' ? '查看' : '编辑' }}模式
      </button>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import registerNode from './register-node';

export default {
  data () {
    return {
      graph: null,
      mode:  'default',
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
      registerNode(G6);

      const graph = new G6.Graph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'rect-node',
          style: {
            width:  140,
            height: 40,
            radius: 4,
            fill:   '#ecf6fc',
            stroke: '#999',
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
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
          ],
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
      this.bindEvents();
    },
    bindEvents() {
      /* this.graph.on('node:click', e => {
        const model = e.item.getModel();

        model.style.width += 20;
        model.style.height += 10;

        this.graph.updateItem(e.item, model);
      }); */

      let dragging = false;
      const p = {
        x: 0,
        y: 0,
      };

      this.graph.on('node:mousedown', e => {
        if(this.mode === 'edit' && !dragging) {
          dragging = true;
          p.x = e.x;
          p.y = e.y;
        }
      });

      this.graph.on('node:mousemove', e => {
        if(this.mode === 'edit' && dragging) {
          dragging = true;
          this.updateNodeSize(e.item, p.x > e.x ? p.x - e.x : e.x - p.x, p.y > e.y ? p.y - e.y : e.y - p.y);
          p.x = e.x;
          p.y = e.y;
        }
      });

      this.graph.on('node:mouseup', e => {
        if(this.mode === 'edit' && dragging) {
          dragging = false;
        }
      });
      this.graph.on('node:mouseleave', e => {
        if(this.mode === 'edit' && dragging) {
          dragging = false;
        }
      });
    },
    updateNodeSize(item, dx, dy) {
      const model = item.getModel();

      model.style.width += dx*2;
      model.style.height += dy*2;

      this.graph.updateItem(item, model);
    },
    changeMode() {
      if(this.mode === 'default') {
        this.mode = 'edit';
      } else {
        this.mode = 'default';
      }

      const item = this.graph.findById('0');

      this.graph.setItemState(item, 'graphMode', this.mode);
    },
  },
};
</script>
