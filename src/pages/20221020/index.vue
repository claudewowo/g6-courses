<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程 - 粉丝答疑 - 知识图谱</span>
    </div>
    <!-- canvas 挂载节点 -->
    <div id="graph" />

    <div class="filters">
      按条件过滤:
      <label>
        <input
          checked="true"
          type="checkbox"
          data-type="company"
          @change="filterNodes"
        >公司
      </label>
      <label>
        <input
          checked="true"
          type="checkbox"
          data-type="investor"
          @change="filterNodes"
        >投资人
      </label>
      <label>
        <input
          checked="true"
          type="checkbox"
          data-type="manager"
          @change="filterNodes"
        >高管
      </label>
      <label>
        <input
          checked="true"
          type="checkbox"
          data-type="investment"
          @change="filterNodes"
        >投资
      </label>
    </div>
    <div
      v-show="tooltip"
      class="details"
    >
      <div style="margin-bottom: 10px; background: #EEF8EF; padding: 10px;">
        投资人:
        <ul>
          <li
            v-for="(item, index) in relations.investors"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div style="margin-bottom: 10px; background: #E9F3FE; padding: 10px;">
        高管:
        <ul style="margin-bottom: 10px;">
          <li
            v-for="(item, index) in relations.managers"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div style="margin-bottom: 10px; background: #FEF7E1; padding: 10px;">
        对外投资:
        <ul style="margin-bottom: 10px;">
          <li
            v-for="(item, index) in relations.investments"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div style="margin-bottom: 10px; background: #ECEEFD; padding: 10px;">
        分公司:
        <ul>
          <li
            v-for="(item, index) in relations.company"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import dataList from './data';
import jd from './jd';

export default {
  data () {
    return {
      graph:    null,
      dragmode: false,
      offset:   {
        x: 0,
        y: 0,
      },
      item:      null, // 当前节点
      tooltip:   false,
      relations: {},
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
        getContent (e) {
          let menus = '';
          const model = e.item.getModel();

          if (model.id === 'node1') {
            menus += '<p command="deepDown">挖掘</p>';
          }

          if (model.data.relations) {
            menus += '<p command="detail">查看详情</p>';
          }

          return menus;
        },
        handleMenuClick(target, item) {
          const command = target.getAttribute('command');

          vm[command](item);
        },
        shouldBegin (e) {
          const model = e.item.getModel();

          if (model.data.relations) {
            return true;
          }
          return false;
        },
      });
      const grid = new G6.Grid();
      const graph = new G6.Graph({
        container:   document.getElementById('graph'),
        width:       window.innerWidth,
        height:      window.innerHeight - 40,
        // 默认节点的样式
        defaultNode: {
          type:  'circle',
          style: {
            r:         20,
            stroke:    '#1890ff',
            lineWidth: 2,
          },
          labelCfg: {
            position: 'bottom',
            style:    {
              fontSize: 12,
            },
          },
        },
        // 设置默认边的样式
        defaultEdge: {
          size:  1,
          color: '#ccc',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#ccc',
            },
          },
        },
        // 默认布局配置
        layout: {
          type:           'force',
          preventOverlap: true, // 防止节点重叠
          // alphaDecay:     0.02, // 迭代阈值的衰减率
          // 边的长度
          linkDistance:   (d) => {
            if (d.source.id === 'node0') {
              return 200;
            }
            return 100;
          },
          nodeSpacing: (d) => {
            if (['node0', 'node1', 'node2', 'node3', 'node4', 'node5'].includes(d.id)) {
              return 50;
            }
            return 20;
          },
          // 节点关系强度
          nodeStrength: (d) => {
            if (d.isLeaf) {
              return -20;
            }
            return 100;
          },
          // 边系数强度
          edgeStrength: (d) => {
            if (['node0', 'node1', 'node2', 'node3', 'node4', 'node5'].includes(d.source.id)) {
              return 2;
            }
            return 0.1;
          },
        },
        // 交互模式
        modes: {
          default: [
            'drag-node',
            {
              type:           'drag-canvas',
              enableOptimize: true, // 拖拽画布时仅显示节点 keyShape
            },
            {
              type:           'zoom-canvas',
              enableOptimize: true,
            },
          ],
        },
        // G6插件
        plugins: [grid, menu],
      });

      graph.read(dataList);
      graph.get('canvas').set('localRefresh', false);
      this.graph = graph;
      this.afterRender();
      this.bindEvents();
    },
    bindEvents() {
      this.graph.on('node:dragstart', (e) => {
        this.refreshDragedNodePosition(e);
      });
      this.graph.on('node:drag', (e) => {
        this.graph.layout();
        this.refreshDragedNodePosition(e);
      });
      this.graph.on('node:dragend', (e) => {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });
      this.graph.on('node:click', (e) => {
        this.item = e.item;
      });
      this.graph.on('node:contextmenu', (e) => {
        this.item = e.item;
      });
    },
    afterRender () {
      // 初始化节点样式, 图标等
      this.graph.getNodes().forEach(item => {
        const model = item.getModel();
        const group = item.getContainer();
        const { type, icon } = model.data;

        let bgColor = '', text = '';

        switch (type) {
          case 'people':
            model.style.stroke = '#6C4DD4';
            bgColor = '#967FE3';
            text = icon || '\ue788';
            break;
          case 'company':
            model.style.stroke = '#BDD2FD';
            bgColor = '#5B8FF9';
            text = icon || '\ue679';
            break;
          case 'investor':
            model.style.stroke = '#E4F2E5';
            bgColor = '#27AE60';
            text = icon;
            break;
          case 'manager':
            model.style.stroke = '#D4E4F8';
            bgColor = '#95A5A6';
            text = icon;
            break;
          case 'branch':
            model.style.stroke = '#E3E5F6';
            bgColor = '#757575';
            text = '\ue62b';
            break;
          case 'investment':
            model.style.stroke = '#F6EFD7';
            bgColor = '#F39C12';
            text = '\ue625';
            break;
        }

        // 添加节点背景色
        group.addShape('circle', {
          attrs: {
            r:      model.style.r - 3,
            cursor: 'pointer',
            fill:   bgColor,
          },
          draggable: true,
        });
        // 添加节点图标
        group.addShape('text', {
          attrs: {
            fontSize:   model.style.r,
            fontFamily: 'iconfont',
            cursor:     'pointer',
            fill:       '#fff',
            x:          -model.style.r / 2,
            y:          model.style.r / 2,
            text,
          },
          draggable: true,
        });

        // 将文本移动到节点下方
        model.labelCfg.offset = model.style.r - 5;
        this.graph.updateItem(item, model);
      });
    },
    refreshDragedNodePosition(e) {
      const model = e.item.get('model');

      model.fx = e.x;
      model.fy = e.y;
    },
    deepDown() {
      const model = this.item.getModel();

      if (model.id === 'node1') {
        this.graph.changeData(jd);
      } else {
        this.graph.changeData(dataList);
      }
      this.afterRender();
      this.tooltip = false;
    },
    detail () {
      const { data: { relations } } = this.item.getModel();

      if (relations) {
        this.relations = relations;
        this.tooltip = true;
      } else {
        this.tooltip = false;
      }
    },
    changeNodeVisilbe (boolean, item) {
      if (boolean) {
        this.graph.showItem(item);
      } else {
        this.graph.hideItem(item);
      }

      // 根据类型查找邻居节点
      item.getNeighbors('target').forEach(x => {
        // 根据边的关系查找子节点并隐藏
        if (boolean) {
          this.graph.showItem(x);
        } else {
          this.graph.hideItem(x);
        }
      });
    },
    filterNodes (e) {
      this.graph.getNodes().forEach(item => {
        const model = item.getModel();
        const type = e.target.getAttribute('data-type');

        if (model.data.type === type) {
          this.changeNodeVisilbe(e.target.checked, item);
        }
      });
      // 重新布局
      this.graph.layout();
    },
  },
};
</script>

<style lang="scss">
  @import './iconfont.scss';

  #graph{margin-left: 0;}
  .g6-component-contextmenu{
    p{cursor: pointer;}
  }
  .details {
    position: fixed;
    right: 0;
    bottom: 0;
    background: #F7F7F7;
    border-radius: 4px;
    padding: 20px;
  }
  .filters {
    position: fixed;
    left: 0;
    top: 40px;
    background: #F7F7F7;
    border-radius: 4px;
    padding: 20px;
    label {
      line-height: 1.4;
      margin-right: 10px;
      cursor: pointer;
    }
    input {
      margin-right: 5px;
      position: relative;
      top: 2px;
    }
  }
</style>
