<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 粉丝答疑 - 自定义两侧展开的复杂节点</span>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />

    <!-- selections -->
    <template v-for="(form, index) in forms">
      <ul
        v-if="form.visibility"
        :key="index"
        :style="{
          left: `${form.x}px`,
          top: `${form.y}px`,
          width: `${form.width}px`,
        }"
        class="select-wrap"
      >
        <li
          v-for="select in selections[index]"
          :key="select.value"
          :value="select.value"
        >
          {{ select.label }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import G6 from '@antv/g6';

const data = {
  nodes: [{
    id:    '0',
    x:     200,
    y:     250,
    label: 'user_info',
    text:  'security_setup',
    data:  {
      expand:  false, // 下拉框是否展开
      show:    false,
      childId: '1',
    },
  }, {
    id:    '1',
    x:     500,
    y:     200,
    label: 'personal_info',
    text:  'some_things',
    data:  {
      expand:   false, // 下拉框是否展开
      show:     true,
      parentId: '0',
      childId:  '2',
    },
  }, {
    id:    '2',
    x:     800,
    y:     250,
    label: 'friends_relation',
    text:  'some_friend',
    data:  {
      expand:   false, // 下拉框是否展开
      show:     false,
      parentId: '1',
    },
  }],
  edges: [{
    target: '0',
    source: '1',
  }, {
    target: '1',
    source: '2',
  }],
};

export default {
  data () {
    return {
      graph: null,
      forms: {
        0: {
          x:          0,
          y:          0,
          width:      0,
          visibility: false,
        },
        1: {
          x:          0,
          y:          0,
          visibility: false,
        },
        2: {
          x:          0,
          y:          0,
          visibility: false,
        },
      },
      selections: {
        0: [{
          label: '微信号',
          value: 'weixin',
        }, {
          label: '微博号',
          value: 'weibo',
        }, {
          label: '银行卡号',
          value: 'bank-card',
        }, {
          label: '常用密码',
          value: 'password',
        }],
        1: [{
          label: '身份证',
          value: 'id',
        }, {
          label: '手机号',
          value: 'phone',
        }, {
          label: '住址',
          value: 'address',
        }],
        2: [{
          label: '父亲',
          value: 'father',
        }, {
          label: '母亲',
          value: 'mother',
        }, {
          label: '哥哥',
          value: 'big-brother',
        }, {
          label: '妹妹',
          value: 'sister',
        }, {
          label: '朋友 A',
          value: 'friend-a',
        }, {
          label: '朋友 B',
          value: 'friend-b',
        }],
      },
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
      const grid = new G6.Grid();
      const graph = new G6.Graph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth - 40,
        height:      window.innerHeight - 40,
        defaultNode: {
          type:  'rect',
          style: {
            width:  200,
            height: 50,
            radius: 4,
            fill:   '#5cbc5a',
            stroke: '#5cbc5a',
          },
          labelCfg: {
            style: {
              fontSize: 14,
              fill:     '#fff',
            },
          },
        },
        layout: {
          type: 'xxx',
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        modes: {
          default: ['drag-node', 'drag-canvas'],
        },
        plugins: [grid],
      });

      this.graph = graph;
      this.graph.read(data);
      this.initShapes();
      this.$nextTick(() => {
        this.bindEvents();
      });
    },
    initShapes() {
      this.graph.getNodes().forEach(item => {
        const model = item.getModel();
        const group = item.getContainer();
        const children = group.get('children');
        const { childId, parentId, show } = model.data;

        /* title icon */
        /* group.addShape('rect', {
          attrs: {
            width:  5,
            height: 5,
            fill:   '#fff',
            x:      -90,
            y:      -40,
          },
        }); */
        /* title-text */
        children[1].attr({
          textAlign: 'left',
          x:         -70,
          y:         -12,
        });
        /* body */
        group.addShape('rect', {
          attrs: {
            width:  198,
            height: 24,
            fill:   '#fff',
            x:      -99,
            cursor: 'pointer',
          },
          className: 'select-btn',
        });
        /* body-text */
        group.addShape('text', {
          attrs: {
            text:   model.text,
            fill:   '#666',
            x:      -80,
            y:      16,
            cursor: 'pointer',
          },
          className: 'select-btn',
        });
        /* body-text-arrow */
        group.addShape('text', {
          attrs: {
            x:    80,
            y:    20,
            text: '^',
            fill: '#666',
          },
        });
        if(parentId) {
          /* body-icon-before */
          group.addShape('circle', {
            attrs: {
              r:      5,
              fill:   '#666',
              cursor: 'pointer',
              x:      -100,
              y:      10,
            },
            name:      'icon-before',
            className: 'icon-before',
          });
          /* body-icon-text */
          group.addShape('text', {
            attrs: {
              text:   '+',
              fill:   '#fff',
              cursor: 'pointer',
              x:      -104,
              y:      15,
            },
            name:      'icon-before-text',
            className: 'icon-before',
          });
        }
        if(childId) {
          /* body-icon-after */
          group.addShape('circle', {
            attrs: {
              r:      5,
              fill:   '#666',
              cursor: 'pointer',
              x:      100,
              y:      10,
            },
            name:      'icon-after',
            className: 'icon-after',
          });
          /* body-icon-text */
          group.addShape('text', {
            attrs: {
              text:   '+',
              fill:   '#fff',
              cursor: 'pointer',
              x:      96,
              y:      15,
            },
            name:      'icon-after-text',
            className: 'icon-after',
          });
        }

        if(!show) {
          this.graph.hideItem(item);
        }
      });
    },
    bindEvents() {
      this.graph.on('node:click', event => {
        const { item, target } = event;
        const model = item.getModel();

        switch(target.cfg.className) {
          case 'select-btn':
            this.selectSwitch(model);
            break;
          case 'icon-before':
            this.expandParent(item, model);
            break;
          case 'icon-after':
            this.expandChild(item, model);
            break;
        }
      });
      this.graph.on('canvas:click', event => {
        for(const key in this.forms) {
          this.forms[key].visibility = false;
          const item = this.graph.findById(key);
          const model = item.getModel();

          model.data.expand = false;
          this.graph.updateItem(item, model);
          const group = item.getContainer();
          const children = group.get('children');

          children[1].attr({
            textAlign: 'left',
            x:         -70,
            y:         -12,
          });
        }
      });

      this.graph.on('node:drag', e => {
        const model = e.item.getModel();
        const { id, x, y, style: { width, height } } = model;

        this.forms[id].x = x - width / 2 + 40;
        this.forms[id].y = y + height / 2 + 40;
      });

    },
    selectSwitch(model) {
      model.data.expand = !model.data.expand;
      this.forms[model.id].x = model.x - model.style.width / 2 + 40;
      this.forms[model.id].y = model.y + model.style.height / 2 + 40;
      this.forms[model.id].visibility = model.data.expand;
      this.forms[model.id].width = model.style.width;
    },
    expandParent(item, model) {
      const { data: { parentId } } = model;

      if(parentId) {
        const group = item.getContainer();
        const children = group.getChildren();
        const iconText = children.find(child => child.cfg.name === 'icon-before-text');
        const parent = this.graph.findById(parentId);

        if(parent.isVisible()) {
          const { id } = parent.getModel();

          this.graph.hideItem(parent);
          iconText && iconText.attr({
            text: '+',
          });
          this.forms[id].visibility = false;
        } else {
          this.graph.showItem(parent);
          iconText && iconText.attr({
            text: '-',
          });
        }
      }
    },
    expandChild(item, model) {
      const { id, data: { childId } } = model;

      if(childId) {
        const group = item.getContainer();
        const children = group.getChildren();
        const iconText = children.find(child => child.cfg.name === 'icon-after-text');
        const child = this.graph.findById(childId);

        if(child.isVisible()) {
          this.graph.hideItem(child);
          iconText.attr({
            text: '+',
          });
          this.forms[id].visibility = false;
        } else {
          this.graph.showItem(child);
          iconText.attr({
            text: '-',
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
  .select-wrap{
    position: absolute;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    max-height: 160px;
    overflow: auto;
    li{
      margin: 5px 0;
      padding:0 10px;
      cursor: pointer;
      &:hover{background:#f7f7f7;}
    }
  }
</style>
