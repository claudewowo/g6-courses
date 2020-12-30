<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 脑图</span>
      <i class="gb-toggle-btn" />
    </div>
    <div class="crumb-nav">
      <template v-for="(nav, index) in crumbNavs">
        {{ index > 0 ? '>' : '' }}
        <span
          :key="nav.id"
          class="nav-text"
          @click="changeNode(nav)"
        >{{ nav.label }}</span>
      </template>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />
    <!-- 输入框 -->
    <input
      v-show="showInput"
      id="input-controller"
      ref="inputController"
      v-model="inputValue"
      :style="{
        top: `${input.y}px`,
        left: `${input.x}px`,
      }"
      type="text"
      @blur="inputBlur"
    >
  </div>
</template>

<script>
import G6 from '@antv/g6';
import registerEdge from './register-edge';
import registerNode from './register-node';

const data = {
  id:       '1',
  label:    '运营思维导图',
  nodeType: 'node',
  children: [
    {
      id:       '1-1',
      label:    '运营方案',
      note:     '第 1 阶段',
      nodeType: 'node',
      children: [
        {
          id:       '1-1-1',
          label:    '服务内容确定',
          note:     '①',
          children: [
            {
              id:    '1-1-1-1',
              label: '视频拍摄',
            },
            {
              id:    '1-1-1-2',
              label: '直播间',
            },
            {
              id:    '1-1-1-3',
              label: '网红代言',
            },
            {
              id:       '1-1-1-4',
              label:    '开屏广告',
              children: [
                {
                  id:    '1-1-1-4-1',
                  label: '轮播',
                },
              ],
            },
          ],
        },
        {
          id:       '1-1-2',
          label:    '设计方案',
          note:     '②',
          children: [
            {
              id:    '1-1-2-1',
              label: '产品定位',
            },
            {
              id:    '1-1-2-2',
              label: '抖音属性',
            },
            {
              id:    '1-1-2-3',
              label: '经营理念',
            },
          ],
        },
        {
          id:       '1-1-3',
          label:    '视频周期更新',
          note:     '③',
          children: [
            {
              id:    '1-1-3-1',
              label: '上传视频数量',
            },
            {
              id:    '1-1-3-2',
              label: '上传时间',
            },
          ],
        },
      ],
    },
    {
      id:       '1-2',
      label:    '养号期',
      note:     '第 2 阶段',
      nodeType: 'node',
      children: [
        {
          id:       '1-2-1',
          label:    '开通蓝 V 服务',
          note:     '④',
          children: [
            {
              id:    '1-2-1-1',
              label: '收集资料',
            },
            {
              id:    '1-2-1-2',
              label: '蓝V认证',
            },
          ],
        },
        {
          id:       '1-2-2',
          label:    '剧本',
          note:     '⑤',
          children: [
            {
              id:    '1-2-2-1',
              label: '热点话题',
            },
            {
              id:    '1-2-2-2',
              label: '创意脚本',
            },
            {
              id:    '1-2-2-3',
              label: '确认脚本',
            },
            {
              id:    '1-2-2-4',
              label: '镜头分表',
            },
          ],
        },
        {
          id:    '1-2-3',
          label: '拍摄',
          note:  '⑥',
        },
      ],
    },
    {
      id:       '1-3',
      label:    '产品营销',
      nodeType: 'node',
      children: [
        {
          id:    '1-3-1',
          label: '商品输入',
        },
        {
          id:    '1-3-2',
          label: '活动策划',
        },
      ],
    },
  ],
};

export default {
  data () {
    return {
      graph:      null,
      showInput:  false,
      inputValue: '',
      input:      {
        x: 0,
        y: 0,
      },
      currentNode: {
        id: null,
      },
      crumbNavs: [],
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

      registerEdge(G6);
      registerNode(G6);

      const menu = new G6.Menu({
        offsetY:   -20,
        itemTypes: ['node'],
        getContent(e) {
          return `
            <p class="menu-item" command="edit-node">编辑文本</p>
            <p class="menu-item" command="delete-node">删除节点</p>
          `;
        },
        handleMenuClick(target, item) {
          const command = target.getAttribute('command');

          switch (command) {
            case 'edit-node':
              vm.editNode(item);
              break;
            case 'delete-node':
              vm.deleteNode(item);
              break;
          }
        },
      });
      const graph = new G6.TreeGraph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'tree-node',
          style: {
            width:  100,
            height: 30,
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
        defaultEdge: {
          type: 'right-tree',
        },
        layout: {
          type:    'mindmap',
          // direction: 'H',
          getHGap: () => 50,
          getVGap: () => 20,
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            /* {
              type: 'collapse-expand',
              onChange(item, collapsed) {
                const data = item.get('model');

                data.collapsed = collapsed;
                return true;
              },
            }, */
          ],
        },
        plugins: [menu],
        fitView: true,
        minZoom: 0.7,
        maxZoom: 1,
      });

      graph.read({ ...data });
      this.graph = graph;
      this.bindEvents();
    },
    /*
    * 1:        1
    * 1-1:      1     1-1
    * 1-1-1:    1     1-1     1-1-1
    * 1-1-1-1:  1     1-1     1-1-1      1-1-1-1
    */
    getParentNodes(node, id, deep = 1) {
      if(id.substring(0, 1) === '1' && deep === 1) {
        this.crumbNavs.push(node);
      }
      if(id.length > 1) {
        const $id = id.substring(0, deep * 2 + 1);
        const $node = node.children.find(item => item.id === $id);

        if($node) {
          this.crumbNavs.push($node);

          if($node.children) {
            this.getParentNodes($node, id, deep + 1);
          }
        }
      }
    },
    bindEvents() {
      this.graph.on('node:click', e => {
        const model = e.item.getModel();

        if(e.target.cfg.name === 'node-icon-text') {
          /* 展开按钮的事件 */
          model.collapsed = !model.collapsed;
          this.graph.updateItem(e.item, model);
          this.graph.layout();
        } else {
          /* 节点点击事件 */
          // 记录当前节点 id
          this.currentNode.id = model.id;
          this.crumbNavs = [];
          // 查找所有的节点路径
          this.getParentNodes(data, model.id);
          this.graph.changeData(JSON.parse(JSON.stringify(model)));
        }
        e.item.toFront();
      });
    },
    inputBlur() {
      this.showInput = false;

      const item = this.graph.findById(this.currentNode.id);
      const model = item.getModel();

      model.label = this.inputValue;
      this.graph.updateItem(item, model);
    },
    // 编辑节点
    editNode(item) {
      const model = item.getModel();
      const { cacheCanvasBBox } = item.get('group').cfg;

      this.showInput = true;
      this.inputValue = model.label;
      this.currentNode.id = model.id;
      this.input.x = cacheCanvasBBox.x + 40;
      this.input.y = cacheCanvasBBox.y + 40;
      this.$nextTick(() => {
        this.$refs.inputController.focus();
      });
    },
    deleteNode(item) {
      const id = item.get('id');

      if(id.length > 1) {
        const parentId = id.substring(0, id.length - 2);
        const parent = this.graph.findById(parentId);

        parent.toFront();
      }
      this.graph.removeChild(id);

      if(id.length > 1) {
        const parentId = id.substring(0, id.length - 2);
        const parent = this.graph.findById(parentId);
        const model = parent.get('model');

        if(model.children.length === 0) {
          const group = parent.get('group');
          const { children } = group.cfg;

          const icon = children.find(child => child.name === 'node-icon');
          const iconText = children.find(child => child.name === 'node-icon-text');

          if(icon) {
            icon.remove();
            iconText.remove();
          }
        }
      }
    },
    changeNode(node) {
      this.graph.changeData(JSON.parse(JSON.stringify(node)));
    },
  },
};
</script>

<style lang="scss">
  .crumb-nav{
    position: absolute;
    top: 50px;
    left: 40px;
    background:#73bf8f;
    border-radius: 4px;
    color:#fff;
  }
  .nav-text{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    margin:0 10px;
    cursor: pointer;
  }
  .g6-component-contextmenu{
    width: 100px;
    padding: 6px 0;
    cursor: pointer;
    .menu-item{
      padding:0 10px;
      line-height: 26px;
      &:hover{background: #f0f0f0;}
    }
  }
  #input-controller{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    width: 100px;
    height: 30px;
    border:1px solid #ccc;
    border-radius: 4px;
    padding-left: 6px;
    font-size: 14px;
  }
</style>
