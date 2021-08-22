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
 * 8.
 */

$(function () {
  let treeGraph;

  const { TreeGraph, Util, Menu, Minimap, Grid, Tooltip, ToolBar, registerEdge, registerNode } = window.G6;

  const layoutType = window.localStorage.getItem('graph-layout-type') || 'mindmap';
  // !!! 声明全局公共画布数据

  window.graphData = null;

  const BaseConfig = {
    itemPadding:     10,
    nameFontSize:    12,
    childCountWidth: 22,
    countMarginLeft: 10,
    nameMarginLeft:  10,
    nodeMinWidth:    50,
  };

  const commonConfig = {
    getHeight () {
      return 16;
    },
    getWidth (d) {
      const labelWidth = Util.getTextSize(d.label, BaseConfig.nameFontSize)[0];

      const width = BaseConfig.itemPadding + labelWidth + BaseConfig.childCountWidth;

      return width;
    },
    getVGap () {
      return 15;
    },
    getHGap () {
      return 30;
    },
  };

  const graphLayout = {
    mindmap: {
      config: {
        ...commonConfig,
        type:      'mindmap',
        direction: 'H',
      },
      edgeType: 'smooth-edge',
      nodeType: 'tree-node',
    },
    indented: {
      config: {
        ...commonConfig,
        type:         'indented',
        isHorizontal: true,
        direction:    'LR',
        indent:       30,
      },
      edgeType: 'step-line',
      nodeType: 'file-node',
    },
  };

  window.createGraph = {
    // 初始化树图
    init ({ isAdmin }) {
      treeGraph = this.initGraph();
      this.isAdmin = isAdmin;

      return {
        graphLayout,
        graphMenuCallBack,
        layoutType,
        treeGraph,
        utils,
      };
    },
    // 初始化树图函数
    initGraph () {
      const _this = this;

      const grid = new Grid();

      const minimap = new Minimap({
        size: [200, 150],
      });

      const menu = _this.createContextMenu(Menu);

      const tooltip = _this.createTooltip(Tooltip);

      const toolbar = _this.createToolbar(ToolBar);

      const container = $('#graph-container')[0];

      // 注册自定义边
      _this.registerEdge(registerEdge, Util);
      // 注册自定义节点
      _this.registerNode(registerNode, Util);

      const graph = new TreeGraph({
        container,
        width:  container.offsetWidth,
        height: container.offsetHeight,
        modes:  {
          default: [
            {
              type:    'collapse-expand',
              trigger: 'click',
              shouldBegin (e) {
                const editSwitchChecked = window.localStorage.getItem('tree-edit-switch') === 'true';

                if (_this.isAdmin && editSwitchChecked) return false;

                return true;
              },
              onChange (item, collapsed) {
                const data = item.get('model');

                data.collapsed = collapsed;

                return true;
              },
            },
            // 框选节点
            {
              type:       'brush-select',
              brushStyle: {
                lineWidth:   1,
                fillOpacity: 0.1,
                fill:        '#4088fc',
                stroke:      '#4088fc',
              },
            },
            'scroll-canvas',
            'drag-canvas',
          ],
        },
        defaultNode: {
          type:         graphLayout[layoutType].nodeType,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type:  graphLayout[layoutType].edgeType,
          style: {
            stroke: '#c0cad4',
          },
        },
        layout:  graphLayout[layoutType].config,
        plugins: [grid, menu, minimap, tooltip, toolbar],
      });

      return graph;
    },
    // 初始化右键菜单
    createContextMenu (Menu) {
      const _this = this;

      return new Menu({
        offsetX: 10,
        offsetY: -14,
        // 右击节点时显示右键菜单
        shouldBegin (e) {
          const model = e.item.getModel();

          let shouldBegin = true;

          if (e.item) {
            const type = e.item.get('type');

            if (type === 'edge') {
              shouldBegin = false;
            } else if (type === 'node') {
              /*
              * 根节点和尾节点不显示右键菜单
              */
              if (_this.isAdmin) {
                shouldBegin = true;
              } else if (model.children && model.children.length && model.depth !== 0) {
                shouldBegin = true;
              } else {
                shouldBegin = false;
              }
            }
            return shouldBegin;
          }
        },
        getContent (e) {
          // 节点
          let menus = '';
          // 右键菜单命令 (管理员可以编辑节点等)

          const commands = _this.isAdmin ? [
            {
              command: 'addChild',
              name:    '添加子节点',
            },
            {
              command: 'deleteItem',
              name:    '删除节点',
            },
            {
              command: 'setToRoot',
              name:    '作为根节点查看',
            },
          ] : [
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
    // 初始化自定义tooltip
    createTooltip (Tooltip) {
      const _this = this;
      /*
       * 重写隐藏功能
       * 加了延时隐藏功能
       */

      Tooltip.prototype.hideTooltip = function () {
        const _this = this;

        const tooltip = $('.g6-component-tooltip');

        setTimeout(function () {
          // 鼠标不在当前元素上时才能隐藏
          if (!_this.currentTarget) {
            tooltip.css({
              visibility: 'hidden',
              display:    'none',
            });
          }
        }, 300);
      };
      return new Tooltip({
        offsetX:   30,
        offsetY:   -20,
        itemTypes: ['node'],
        shouldBegin (e) {
          // 为了方便管理员编辑, 不显示tooltip, 点击节点时显示编辑面板
          const editSwitchChecked = window.localStorage.getItem('tree-edit-switch') === 'true';

          if (_this.isAdmin && editSwitchChecked) {
            return false;
          } else {
            const model = e.item.getModel();

            return model.depth > 0 && model.data;
          }
        },
        getContent (e) {
          const model = e.item.getModel();

          let html = '';

          if (model.data) {
            if (model.children && model.children.length) {
              // 非叶子节点显示进度条
              if (model.data.progress) {
                html = `
                                    <h4>你当前该技能学习进度为:</h4>
                                    <div class="progress-circle-inner">
                                        <svg class="progress-circle mb10" viewBox="0 0 100 100">
                                            <path class="progress-circle-trail" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#f9f9f9" stroke-width="6" fill-opacity="0"></path>
                                            <path class="progress-circle-path" d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke-linecap="round" stroke="#2db7f5" stroke-width="6" fill-opacity="0" style="stroke-dasharray: 500px, 275.31px;stroke-dashoffset: 206.717px;transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"></path>
                                        </svg>
                                        <span class="progress-circle-text">${model.data.progress}%</span>
                                    </div>
                                `;

                if (model.data.progress < 80) {
                  html += '<p>继续加油! 😬😬😬</p>';
                } else if (model.data.progress >= 80 && model.data.progress < 100) {
                  html += '<p>恭喜你距离加薪不远了! 🤙🤙🤙</p>';
                }
              } else {
                html = '<h4 class="mb10">这个技能别人都会了, 就你还没学会, 你知道吗? </h4><p style="font-size: 14px;">知道了还不快去参加<a class="go-test" href="##" target="_blank">考试 <i class="iconfont icon-new-tab"></i></a>? 🙄🙄🙄</p>';
              }
            } else {
              // 叶子节点显示分数
              html += `<h4 class="tooltip-title mb10">我的测试成绩: ${model.data.score}分</h4>`;
              if (model.data.score === 100) {
                html += '<h4 class="tooltip-title mb10">恭喜你已经学会这项技能了! 💯</h4> 不过可以随时进行<a class="go-test" href="##" target="_blank">复习 <i class="iconfont icon-new-tab"></i></a>';
              } else {
                html += '<h4 class="mb10">这个技能别人都会了, 就你还没学会, 你知道吗? </h4><p>知道了就快去参加<a class="go-test" href="##" target="_blank">考试 <i class="iconfont icon-new-tab"></i></a> 🙄🙄🙄</p>';
              }
            }

            if (model.data.QRCode) {
              html += `
                                <p class="mt15">有疑问? 找组织:</p>
                                <img class="QR-code" src="./iShot2021-08-15_07.23.56.png" />
                            `;
            }
          }
          return html;
        },
      });
    },
    // 初始化自定义工具栏
    createToolbar (Toolbar) {
      return new Toolbar({
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
    // 自定义边
    registerEdge (registerEdge) {
      // 注册脑图用的顺滑曲线
      registerEdge('smooth-edge', {
        draw (cfg, group) {
          const { startPoint, endPoint } = cfg;

          const hgap = endPoint.x - startPoint.x;

          const path = [
            ['M', startPoint.x, startPoint.y],
            [
              'C',
              startPoint.x + hgap / 4,
              startPoint.y,
              endPoint.x - hgap / 2,
              endPoint.y,
              endPoint.x,
              endPoint.y,
            ],
          ];

          const shape = group.addShape('path', {
            attrs: {
              stroke: '#AAB7C4',
              path,
            },
            name: 'smooth-path-shape',
          });

          return shape;
        },
      });

      // 注册文件树系统的边
      registerEdge('step-line', {
        getControlPoints (cfg) {
          const startPoint = cfg.startPoint;

          const endPoint = cfg.endPoint;

          return [
            startPoint,
            {
              x: startPoint.x,
              y: endPoint.y,
            },
            endPoint,
          ];
        },
      }, 'polyline',
      );
    },
    // 自定义节点
    registerNode (registerNode, Util) {
      // 注册脑图节点
      registerNode('tree-node', {
        draw (cfg, group) {
          const { label, collapsed, data, selected, children, depth } = cfg;

          const rootNode = depth === 0;

          const hasChildren = children && children.length;

          const isRight = cfg.x > 0;

          const {
            childCountWidth,
            countMarginLeft,
            nameMarginLeft,
            itemPadding,
          } = BaseConfig;

          let width = 0;

          const height = 28;

          const x = 0;

          const y = 0;

          const textWidth = Util.getTextSize(String(label), 12)[0];

          const nodeWidth = textWidth + itemPadding + nameMarginLeft;

          width = nodeWidth < BaseConfig.nodeMinWidth ? BaseConfig.nodeMinWidth : nodeWidth;

          if (!rootNode && hasChildren) {
            width += countMarginLeft;
            width += childCountWidth;
          }

          const keyShapeAttrs = {
            x,
            y,
            width,
            height,
            radius: 4,
          };

          const keyShape = group.addShape('rect', {
            attrs: keyShapeAttrs,
            name:  'root-key-shape-rect-shape',
          });

          const mainX = x;

          const nameColor = '#222';

          group.addShape('rect', {
            attrs: {
              x:       mainX,
              y:       0,
              width,
              height,
              radius:  14,
              fill:    '#e8f7ff',
              cursor:  'pointer',
              opacity: rootNode ? 1 : 0,
            },
            name: 'main-shape',
          });

          // 名称
          if (rootNode) {
            // 根节点
            group.addShape('text', {
              attrs: {
                text:         label,
                x:            mainX + 10,
                y:            height / 2,
                textAlign:    'left',
                textBaseline: 'middle',
                fill:         nameColor,
                fontSize:     12,
                fontFamily:   'PingFangSC-Regular',
                cursor:       'pointer',
              },
              name: 'root-text-shape',
            });
          } else {
            // 其他节点
            group.addShape('text', {
              attrs: {
                text:         label,
                textAlign:    'start',
                textBaseline: 'top',
                fill:         nameColor,
                fontSize:     12,
                cursor:       'pointer',
                x:            isRight ? mainX + 16 : width - textWidth,
                y:            0,
              },
              name: 'not-root-text-shape',
            });
            // 名称前面加个图标
            group.addShape('text', {
              attrs: {
                fontSize:   12,
                fontFamily: 'iconfont',
                text:       data && data.progress ? '\ue708' : '\ue616',
                fill:       data && data.progress ? '#333' : '#aaa',
                x:          isRight ? 2 : width - textWidth - 14,
                y:          12,
              },
            });
            // 底部横线
            group.addShape('path', {
              attrs: {
                path: [
                  ['M', isRight ? x : x, height / 2],
                  ['L', width, height / 2],
                ],
                stroke:    '#AAB7C4',
                lineWidth: 1,
              },
              name: 'node-path-shape',
            });

            keyShape.toFront();
          }

          // 子类数量
          if (hasChildren && !rootNode) {
            const childCountX = width - childCountWidth;

            const childCountRectAttrs = {
              width:  childCountWidth,
              height: 12,
              radius: 6,
              stroke: collapsed ? '#1890ff' : '#5CDBD3',
              fill:   collapsed ? '#fff' : '#E6FFFB',
              x:      isRight ? childCountX : 0,
              y:      8,
            };

            group.addShape('rect', {
              attrs: childCountRectAttrs,
            });
            group.addShape('text', {
              attrs: {
                fill:      '#222',
                fontSize:  10,
                cursor:    'pointer',
                textAlign: 'center',
                width:     childCountWidth,
                text:      `${children?.length}`,
                x:         isRight ? childCountX + childCountWidth / 2 : childCountWidth / 2,
                y:         20,
              },
            });
            const childCountRect = group.addShape('rect', {
              attrs: {
                ...childCountRectAttrs,
                cursor:  'pointer',
                opacity: 0,
              },
              name: 'child-count-rect-shape',
            });

            childCountRect.toFront();
          }

          return keyShape;
        },

        setState (name, value, node) {
          const group = node.getContainer();
          const rect = group.getFirst();

          if (name === 'selected') {
            if (value) {
              rect.attr({
                stroke:  '#1890ff',
                opacity: 1,
              });
            } else {
              rect.attr({
                stroke:  '#222',
                opacity: 0,
              });
            }
          }
        },

        update (cfg, node) {
          // TODO
        },
      });

      // 注册文件树节点
      registerNode('file-node', {
        draw (cfg, group) {
          const keyShape = group.addShape('rect', {
            attrs: {
              x:      10,
              y:      -12,
              fill:   '#fff',
              stroke: null,
            },
          });

          let isLeaf = false;

          if (cfg.collapsed) {
            group.addShape('marker', {
              attrs: {
                symbol: 'triangle',
                x:      4,
                y:      -2,
                r:      4,
                fill:   '#666',
              },
              name: 'marker-shape',
            });
          } else if (cfg.children && cfg.children.length > 0) {
            group.addShape('marker', {
              attrs: {
                symbol: 'triangle-down',
                x:      4,
                y:      -2,
                r:      4,
                fill:   '#666',
              },
              name: 'marker-shape',
            });
          } else {
            isLeaf = true;
          }

          const shape = group.addShape('text', {
            attrs: {
              x:         15,
              y:         4,
              fill:      '#666',
              fontSize:  16,
              text:      cfg.label,
              textAlign: 'left',
            },
            name: 'text-shape',
          });

          const bbox = shape.getBBox();

          let backRectW = bbox.width;

          let backRectX = keyShape.attr('x');

          if (!isLeaf) {
            backRectW += 8;
            backRectX -= 15;
          }
          keyShape.attr({
            width:  backRectW,
            height: bbox.height + 4,
            x:      backRectX,
          });
          return keyShape;
        },
      });
    },
  };

  // 工具函数
  const utils = {
    // 随机生成 nodeID
    generateNodeId () {
      return `${+new Date() + (Math.random() * 10e5).toFixed(0)}`;
    },
    // 重置画布状态
    resetGraphState () {
      treeGraph.getNodes().forEach(item => {
        item.clearStates();
      });
      treeGraph.getEdges().forEach(item => {
        item.clearStates();
      });
    },
    // 递归查找指定id
    findById (id, treeData) {
      let newTreeData;

      const children = treeData.children;

      if (treeData.id === id) {
        newTreeData = treeData;
      } else if (children && children.length) {
        for (let i = 0; i < children.length; i++) {
          if (children[i].id === id) {
            newTreeData = children[i];
            break;
          } else {
            newTreeData = utils.findById(id, children[i]);
            if (newTreeData) break;
          }
        }
      }

      return newTreeData;
    },
  };

  // 技能树右键菜单回调映射
  const graphMenuCallBack = {
    addChild (item) {
      const model = item.getModel();
      const id = utils.generateNodeId();
      const cfg = {
        id,
        label: '新节点',
        depth: model.depth + 1,
        data:  {
          testUrl:  '',
          QRCode:   '',
          progress: 0,
          score:    0,
        },
        children: [],
      };

      treeGraph.addChild(cfg, model.id);
      window.alert('添加失败! 请重试');
    },

    // 删除节点和边
    deleteItem (item) {
      const { id } = item.getModel();

      if (window.confirm('确定要删除该节点吗? 此操作不可撤销!')) {
        treeGraph.removeChild(id);
      }
    },

    // 以此为根节点开始查看
    setToRoot (item) {
      const { id } = item.getModel();

      const newTreeData = utils.findById(id, window.graphData);

      treeGraph.changeData(newTreeData);
      treeGraph.fitCenter();
    },
  };

  // 功能栏回调
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
    relocation () {
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
