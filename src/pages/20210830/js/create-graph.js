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
  const { TreeGraph, Grid, Menu, Tooltip, ToolBar, Minimap, Util, registerNode } = window.G6;

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

      // 注册自定义节点
      this.registerNode();

      treeGraph = new TreeGraph({
        container,
        width:       container.offsetWidth,
        height:      container.offsetHeight,
        defaultNode: {
          type:         'tree-node',
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
        getContent () {
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
    registerNode () {
      registerNode('tree-node', {
        draw (cfg, group) {
          console.log(cfg);
          const { label, depth, data, children } = cfg;
          const rootNode = depth === 0;

          const height = 28;
          const countWidth = 22;
          const nodePaddingLeft = 10;
          const nodePaddingRight = 10;
          const textWidth = Util.getTextSize(String(label), 12)[0];
          const nodeWidth = nodePaddingLeft + textWidth + nodePaddingRight + (children && children.length ? countWidth : 0) + 10;
          const isRight = cfg.x > 0;

          const keyShapeAttrs = {
            width:  nodeWidth,
            height,
            x:      0,
            y:      0,
            radius: 5,
            cursor: 'pointer',
          };
          const keyShape = group.addShape('rect', {
            attrs: keyShapeAttrs,
            name:  'root-key-shape-rect-shape',
          });

          group.addShape('rect', {
            attrs: {
              x:       0,
              y:       0,
              width:   nodeWidth,
              height,
              fill:    '#e8f7ff',
              cursor:  'pointer',
              radius:  14,
              opacity: rootNode ? 1 : 0,
            },
            name: 'main-shape',
          });

          // 添加文本元素
          if (rootNode) {
            // 根节点
            group.addShape('text', {
              attrs: {
                text:         label,
                x:            (nodeWidth - textWidth) / 2,
                y:            height / 2,
                textAlign:    'left',
                textBaseline: 'middle',
                fill:         '#222',
                fontSize:     12,
                cursor:       'pointer',
              },
              name: 'root-text-shape',
            });
          } else {
            // 非根节点
            group.addShape('text', {
              attrs: {
                text:         label,
                textAlign:    'left',
                textBaseline: 'top',
                fill:         '#222',
                fontSize:     12,
                cursor:       'pointer',
                x:            isRight ? 10 + 10 : nodeWidth - textWidth,
                y:            0,
              },
              name: 'not-root-text-shape',
            });

            // 底部横线
            const lineLongth = nodeWidth - countWidth + (children && children.length ? 0 : 14);

            group.addShape('path', {
              attrs: {
                path: [
                  ['M', isRight ? 0 : nodeWidth, height / 2],
                  ['L', isRight ? lineLongth : 10, height / 2],
                ],
                stroke:    '#AAB7C4',
                lineWidth: 1,
              },
              name: 'node-path-shape',
            });

            // 名称前面加个图标
            group.addShape('text', {
              attrs: {
                fontSize:   12,
                fontFamily: 'iconfont',
                text:       data && data.progress ? '\ue708' : '\ue616',
                fill:       data && data.progress ? '#333' : '#aaa',
                x:          isRight? 0 : nodeWidth - textWidth - 18,
                y:          12,
              },
            });

            if (children && children.length) {
              // 添加子节点数量
              const countHeight = 12;

              group.addShape('rect', {
                attrs: {
                  width:  countWidth,
                  height: countHeight,
                  radius: 6,
                  stroke: '#5CDBD3',
                  fill:   '#E6FFFB',
                  x:      isRight? nodeWidth - countWidth : 0,
                  y:      8,
                },
              });

              group.addShape('text', {
                attrs: {
                  fill:      '#222',
                  fontSize:  10,
                  cursor:    'pointer',
                  textAlign: 'center',
                  width:     countWidth,
                  text:      `${children?.length}`,
                  x:         isRight? nodeWidth - countWidth / 2 : countWidth / 2,
                  y:         20,
                },
              });
            }
          }

          return keyShape;
        },
        setState () {

        },
        update () {

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

  // 隐藏弹窗
  $('.dialog-container .icon-failed').on('click', function () {
    $(this).parents('.dialog').fadeOut(300);
  });
});
