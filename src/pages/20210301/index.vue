<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 粉丝答疑 - 图片合成</span>
    </div>
    <div class="node-panel">
      <img
        src="./images/1.png"
        @dragstart="dragstart"
      >
      <img
        src="./images/2.png"
        @dragstart="dragstart"
      >
      <img
        src="./images/3.png"
        @dragstart="dragstart"
      >
      <img
        src="./images/0.jpg"
        @dragstart="dragstart"
      >
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
    <div
      v-if="img.src"
      id="image-edit"
      :style="{
        width: `${img.width}px`,
        height: `${img.height}px`,
        top: `${img.top}px`,
        left: `${img.left}px`,
      }"
    >
      <img :src="img.src">
      <i
        class="img-editor-bar bar-top"
        @mousedown="dragstartbar"
        @mousemove="dragbar"
        @mouseup="dragendbar"
      />
      <i
        class="img-editor-bar bar-left"
        @mousedown="dragstartbar"
        @mousemove="dragbar"
        @mouseup="dragendbar"
      />
      <i
        class="img-editor-bar bar-right"
        @mousedown="dragstartbar"
        @mousemove="dragbar"
        @mouseup="dragendbar"
      />
      <i
        class="img-editor-bar bar-bottom"
        @mousedown="dragstartbar"
        @mousemove="dragbar"
        @mouseup="dragendbar"
      />
      <button
        class="btn confirm"
        @click="confirm"
      >
        确定
      </button>
      <button
        class="btn cancel"
        @click="img.src = ''"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data () {
    return {
      graph: null,
      img:   {
        src:    '',
        width:  0,
        height: 0,
        top:    0,
        left:   0,
        scale:  1,
      },
      dragmode: false,
      offset:   {
        x: 0,
        y: 0,
      },
      currentNodeId: '',
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
      const vm = this;
      const menu = new G6.Menu({
        itemTypes: ['node'],
        getContent(e) {
          return `<p command="editLayer">编辑图层</p>
            <p command="toFront">置于顶层</p>
            <p command="toBack">置于底层</p>
          `;
        },
        handleMenuClick(target, item) {
          const command = target.getAttribute('command');

          vm[command](item);
        },
      });
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
        plugins: [grid, menu],
      });

      this.graph = graph;
      this.bindEvents();
    },
    dragstart(event) {
      const { src, naturalWidth, naturalHeight } = event.target;

      this.img.scale = naturalWidth / naturalHeight;
      event.dataTransfer.setData('img', JSON.stringify({
        src,
        width:  naturalWidth,
        height: naturalHeight,
      }));
    },
    bindEvents() {
      this.graph.on('drop', event => {
        const { clientX, clientY, originalEvent: { dataTransfer } } = event;

        event.stopPropagation();

        if(dataTransfer) {
          const data = dataTransfer.getData('img');

          if(data) {
            const { src, width, height } = JSON.parse(data);

            dataTransfer.clearData();

            const node = this.graph.addItem('node', {
              x:     clientX - 100,
              y:     clientY - 40,
              style: {
                width,
                height,
                strokeOpacity: 0,
              },
            });
            const group = node.getContainer();

            group.addShape('image', {
              attrs: {
                x:   -width / 2,
                y:   -height / 2,
                img: src,
              },
              name:      'img',
              draggable: true,
            });
            this.img.top = clientY - height / 2;
            this.img.left = clientX - width / 2;
          }
        }
      });
    },
    toFront(item) {
      item.toFront();
    },
    toBack(item) {
      item.toBack();
    },
    editLayer(item) {
      const model = item.getModel();
      const group = item.getContainer();
      const img = group.get('children').find(child => child.cfg.name === 'img');

      this.currentNodeId = model.id;
      this.graph.hideItem(item);
      if(img) {
        const { img: image, width, height } = img.attrs;

        this.img.src = image.src;
        this.img.width = width;
        this.img.height = height;
      }
    },
    dragstartbar(event) {
      this.dragmode = true;
      this.offset.x = event.clientX;
      this.offset.y = event.clientY;
    },
    dragbar(event) {
      if(this.dragmode) {
        const distance = {
          x: event.clientX - this.offset.x,
          y: event.clientY - this.offset.y,
        };

        this.offset.x = event.clientX;
        this.offset.y = event.clientY;
        this.img.width += distance.x * 2;
        if(distance.y === 0) {
          // 重新计算图片高度
          this.img.height += distance.x * 2 / this.img.scale;
          this.img.top -= distance.x / this.img.scale;
        } else {
          this.img.height += distance.y * 2;
          this.img.top -= distance.y;
        }
        this.img.left -= distance.x;
      }
    },
    dragendbar() {
      this.dragmode = false;
    },
    confirm() {
      const node = this.graph.findById(this.currentNodeId);
      const group = node.getContainer();
      const item = group.getFirst();
      const img = group.get('children').find(child => child.cfg.name === 'img');
      const { width, height } = this.img;
      const model = {
        width,
        height,
        x: -width/ 2,
        y: -height/ 2,
      };

      item.attr(model);
      img.attr(model);
      this.graph.showItem(node);
      this.img.src = '';
    },
  },
};
</script>

<style lang="scss">
  .node-panel{
    width: 100px;
    position: absolute;
    top: 80px;
    left:0;
    height:100%;
    img{
      margin-bottom: 20px;
      cursor: move;
    }
  }
  #graph{margin-left: 100px;}
  .g6-component-contextmenu{
    p{cursor: pointer;}
  }
  #image-edit{
    position: absolute;
    width: 100px;
    height: 100px;
    top:100px;
    left:100px;
    opacity: 1;
    z-index: 2;
    border: 2px solid #6ccfff;
    background:#f1f1f1;
    user-select: none;
    cursor: move;
    img{
      display: block;
      width: 100%;
      height: auto;
    }
    .img-editor-bar{
      position: absolute;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 0 2px rgba(0,0,0,.3);
      &:before{
        content: '';
        display: block;
        width: 50px;
        height: 50px;
        margin-left: -25px;
        margin-top: -25px;
      }
    }
    .bar-top,
    .bar-bottom{
      height:4px;
      width: 20px;
      left: 50%;
      margin-left: -10px;
      cursor: ns-resize;
    }
    .bar-top{top:-2px;}
    .bar-bottom{bottom:-2px;}
    .bar-left,
    .bar-right{
      width:4px;
      height: 20px;
      top: 50%;
      margin-top: -10px;
      cursor: ew-resize;
    }
    .bar-left{left:-2px;}
    .bar-right{right:-2px;}
    .btn{
      width: 40px;
      height:20px;
      line-height:20px;
      cursor: pointer;
      margin: 10px;
      color:#fff;
      border-radius: 4px;
      float: right;
    }
    .confirm{background: #409eff;}
    .cancel{color: #409eff;}
  }
</style>
