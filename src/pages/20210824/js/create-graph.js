/* eslint-disable no-alert */
/**
 * @author 凯子凯
 * @date 2021-08-12
 *
 * 交互设计说明:
 * 1. 管理员可以编辑, 其他角色只能查看
 * 2.
 *  - 管理员编辑时点击节点后面的数字是收起/展开节点, 点击节点是选中, 按下回车可创建子节点
 *  - 非管理员点击节点和后面的数字均可收起/展开节点
 * 3. 脑图节点与文件树系统互相切换时, 需要根据当前布局显示/隐藏某些元素, 如从脑图切换到文件树时需要添加三角形, 反之需要隐藏
 * 4. 鼠标左键按下并拖拽可框选节点, 编辑模式下可批量删除节点
 * 5. 鼠标右键内容在编辑时可用, 查看时暂无菜单
 * 6. 右侧工具栏可对画布进行额外操作
 * 7. 鼠标移入节点可显示tooltip, tooltip 隐藏带有延迟, 用于方便鼠标移入tooltip
 */

$(function () {
  let treeGraph;
  const { TreeGraph, Grid, Menu, Tooltip, ToolBar, Minimap } = window.G6;

  window.createGraph = {
    init () {
      this.initGraph();

      return {
        treeGraph,
      };
    },
    initGraph () {
      const container = $('#graph-container')[0];
      const grid = new Grid();
      const minimap = new Minimap({
        size: [200, 150],
      });
      const menu = this.createMenu();
      const tooltip = this.createTooltip();
      const toolbar = this.createToolbar();

      treeGraph = new TreeGraph({
        container,
        width:       container.offsetWidth,
        height:      container.offsetHeight,
        defaultNode: {
          type:         'minimap',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type:  'polyline',
          style: {
            stroke: '#c0cad4',
          },
        },
        layout: {
          type:      'mindmap',
          direction: 'H',
          getHeight () {
            return 16;
          },
          getWidth (d) {
            return 60;
          },
          getVGap () {
            return 15;
          },
          getHGap () {
            return 30;
          },
        },
        plugins: [grid, menu, minimap, tooltip, toolbar],
      });
    },
    createMenu () {
      return new Menu({
        shouldBegin (e) {
          return true;
        },
        getContent (e) {
          // 节点
          let menus = '';

          // 右键菜单命令
          const commands = [
            {
              command: 'setToRoot',
              name:    '作为根节点查看',
            },
          ];

          commands.forEach(item => {
            menus += `<p class="menu-item" command="${item.command}">${item.name}</p>`;
          });

          return menus;
        },
        handleMenuClick (target, item) {
          const command = target.getAttribute('command');

          graphMenuCallBack[command] && graphMenuCallBack[command](item);
        },
      });
    },
    createTooltip () {
      return new Tooltip({
        offsetX:   30,
        offsetY:   -20,
        itemTypes: ['node'],
        shouldBegin (e) {
          return true;
        },
        getContent (e) {
            const model = e.item.getModel();

            const html = '你的学分为:' + model.data ? model.data.score : 0;

            return html;
        },

      });
    },
    createToolbar () {
      return new ToolBar({
        shouldBegin (e) {
          return true;
        },
        ggetContent () {
          /* 这里必须是 ul li */
          return `
          <ul class="graph-toolbar">
              <li class="iconfont icon-zoom-in" code="zoomIn" title="放大"></li>
              <li class="iconfont icon-zoom-out" code="zoomOut" title="缩小"></li>
              <li class="iconfont icon-1x" code="defaultSize" title="1倍大小"></li>
              <li class="iconfont icon-reset" code="relocation" title="重定位"></li>
              <li class="iconfont icon-why" code="graphHelp" title="帮助"></li>
          </ul>
        `;
        },
        handleClick (code) {
          toolbarCallBack[code] && toolbarCallBack[code]();
        },
      });
    },
  };

  const graphMenuCallBack = {
    setToRoot (item) {
      console.log(item);
    },
  };

  const toolbarCallBack = {
    defaultSize () {
      treeGraph.zoomTo(1);
    },
    // 缩小
    zoomOut () {
      treeGraph.zoom(0.9);
    },
    // 放大
    zoomIn () {
      treeGraph.zoom(1.1);
    },
    relocation() {
      treeGraph.moveTo(100, 90);
    },
    graphHelp () {
      $('#toolbar-help').fadeIn(300);
    },
  };
});
