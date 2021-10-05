/* eslint-disable no-alert */
/* eslint-disable no-undef */

$(function () {
  const isAdmin = true;
  const fullLoading = $('#fullLoading');
  const {
    graphLayout,
    graphMenuCallBack,
    layoutType,
    treeGraph,
    utils,
  } = window.createGraph.init({ isAdmin });

  fullLoading.fadeOut();
  const formParams = $('#form-params');

  let formParamsChildren = [];

  // 数据结构预处理
  function dataPreProcess(data, depth) {
    data.depth = depth;
    if (data.children && data.children.length) {
      depth++;
      data.children.forEach(function(child) {
        child.depth = depth;

        dataPreProcess(child, depth);
      });
    }
  }

  // 技能过滤
  function skillsFilter() {
    const skill_input = $('#skill_input'),
      skillTree = $('#skill-tree');

    // 默认显示第1列
    skill_input.on('focus', function() {
      $('#tree-leaf-0').removeClass('hidden');
    });
    skill_input.on('blur', function() {
      setTimeout(function() {
        $('.tree-leaf-ul').addClass('hidden');
      }, 200);
    });
    // 点击叶子节点
    skillTree.on('click', '.tree-leaf', function() {
      const _this = $(this);

      _this
        .addClass('selected')
        .siblings()
        .removeClass('selected');
      skillTree.find('.tree-leaf-ul').addClass('hidden');

      let html = '';

      const arr = skillTree.find('.tree-leaf.selected');

      if (arr.length === 1) {
        html = $(arr[0])
          .text()
          .trim();
      } else {
        const array = [];

        for (let i = 0; i < arr.length; i++) {
          const item = $(arr[i]);

          array.push(item.text().trim());
        }
        html = array.join(' / ');
      }
      skill_input.val(html);

      if (html) {
        // 重新渲染画布
        const newTreeData = utils.findById(
          _this.attr('data-id'),
          mockData,
        );

        treeGraph.changeData(newTreeData);
        treeGraph.fitCenter();
      }
    });
    // 鼠标移入叶子节点需要重新渲染子列表
    skillTree.on('mouseenter', '.tree-leaf', function() {
      const id = $(this).attr('data-id');

      const leaf = utils.findById(id, mockData);

      const depth = +leaf.depth + 1;

      $(this)
        .addClass('selected')
        .siblings()
        .removeClass('selected');

      if (leaf.children && leaf.children.length) {
        const ulId = 'tree-leaf-' + depth;

        const ul = $('#' + ulId);

        if (ul.length === 0) {
          skillTree.append(
            `<ul id="${ulId}" data-id="${depth}" class="tree-leaf-ul"></ul>`,
          );
        }

        let innerHTML = '';

        leaf.children.forEach(el => {
          innerHTML +=
            '<li class="tree-leaf" data-id="' +
            el.id +
            '">' +
            el.label +
            '<i class="iconfont icon-arrow-right"></i></li>';
        });
        $('#' + ulId).html(innerHTML);
        $('#' + ulId).removeClass('hidden');
      }

      setTimeout(function() {
        // 鼠标回到上级菜单时要隐藏后面的列表
        const treeLeafUl = skillTree.find('.tree-leaf-ul');

        for (let i = 0; i < treeLeafUl.length; i++) {
          if (i > depth) {
            $(treeLeafUl[i]).addClass('hidden');
          }
        }
      }, 200);
    });

    // 初始化开关按钮
    const skillSwitch = $('#skill-switch');
    const skillSwitchChecked = window.localStorage.getItem('tree-skill-switch') === 'true';

    if (skillSwitchChecked) {
      skillSwitch.addClass('switch-checked');
    } else {
      skillSwitch.removeClass('switch-checked');
    }
    // 切换显示获得的技能
    skillSwitch.on('click', function() {
      $(this).toggleClass('switch-checked');
      const checked = $(this).hasClass('switch-checked');

      window.localStorage.setItem('tree-skill-switch', String(checked));
    });

    if (isAdmin) {
      // 管理员显示编辑按钮
      $('.admin-btns').addClass('inline');
    }

    const editSwitch = $('#edit-switch');
    const editSwitchChecked = window.localStorage.getItem('tree-edit-switch') === 'true';

    if (editSwitchChecked) {
      editSwitch.addClass('switch-checked');
    } else {
      editSwitch.removeClass('switch-checked');
    }

    // 切换编辑模式
    editSwitch.on('click', function() {
      $(this).toggleClass('switch-checked');

      const checked = $(this).hasClass('switch-checked');

      window.localStorage.setItem('tree-edit-switch', String(checked));
    });
  }

  // 画布事件集合
  function graphBindEvents() {
    treeGraph.on('node:click', function(e) {
      const model = e.item.getModel();

      const editMode = $('#edit-switch').hasClass('switch-checked');

      if (isAdmin && editMode) {
        const children = e.item.get('children') || [];

        const parentId = utils.findParentId(model.id, mockData);

        formParams.addClass('show').attr({
          'data-id':        model.id,
          'data-parent-id': parentId,
        });
        formParamsChildren = children.map(child => {
          return {
            ...utils.findById(child.get('id'), mockData),
            type: 'tree-node',
          };
        });
        // 填充字段
        formParams.find('input[data-key="label"]').val(model.label);
        formParams
          .find('input[data-key="testURL"]')
          .val(model.data ? model.data.testURL : '');
        formParams
          .find('input[data-key="QRCode"]')
          .val(model.data ? model.data.QRCode : '');
      }
      e.item.toFront();
      treeGraph.getNodes().forEach(item => {
        item.clearStates();
      });
      e.item.setState('selected', true);
    });

    treeGraph.on('node:dblclick', function(e) {
      // 双击新增子节点
      graphMenuCallBack.addChild(e.item);
    });

    treeGraph.on('canvas:click', function(e) {
      // 点击画布时清除所有状态
      utils.resetGraphState();
      formParams.removeClass('show');
    });
  }

  function getGraphData() {
    dataPreProcess(mockData, 0);

    treeGraph.read(mockData);

    if (layoutType === 'indented') {
      treeGraph.translate(treeGraph.getWidth() / 2 - 100, 70);
    } else {
      treeGraph.fitCenter();
    }

    // 初始化dom数据
    $('#skill-tree')
      .html(`<ul id="tree-leaf-0" data-id="0" class="tree-leaf-ul hidden">
        <li class="tree-leaf" data-id="${mockData.id}">${mockData.label}<i class="iconfont icon-arrow-right"></i>
          </li>
      </ul>`);
  }

  skillsFilter();
  getGraphData();
  graphBindEvents();

  // 初始化时先检查本地存储
  const layoutChecks = $('.layout-searcher .form-check-input');

  if (layoutType) {
    layoutChecks.prop('checked', false);
    $('#' + layoutType).prop('checked', true);
  }

  // 切换布局方式
  layoutChecks.change(function() {
    const layoutType = this.id;

    const currentLayout = graphLayout[layoutType];

    // 存到本地, 下次打开还是上次的布局
    window.localStorage.setItem('graph-layout-type', layoutType);

    // 要将节点/边和默认配置里的属性都改变
    treeGraph.getEdges().forEach(item => {
      const model = item.getModel();

      model.type = currentLayout.edgeType;
    });
    treeGraph.updateLayout(currentLayout.config);
  });

  // 保存表单
  $('#form-submit').click(function() {
    const data = {
      id:       formParams.attr('data-id'),
      parentId: formParams.attr('data-parent-id'),
      label:    formParams.find('input[data-key="label"]').val(),
      data:     {
        testURL:  formParams.find('input[data-key="testURL"]').val(),
        QRCode:   formParams.find('input[data-key="QRCode"]').val(),
        progress: 0,
        score:    0,
      },
    };

    const node = treeGraph.findById(data.id);

    if (node) {
      const model = node.getModel();

      model.label = data.label;
      model.data = data.data;
      model.children = formParamsChildren;

      const matrix = treeGraph.get('group').getMatrix();

      treeGraph.set('animate', false);
      treeGraph.updateChild(model, data.parentId);
      treeGraph.render();
      treeGraph.get('group').setMatrix(matrix);
      treeGraph.set('animate', true);
    }
    formParams.removeClass('show');
    window.alert('保存成功!');
  });
  $('#form-cancel').click(function() {
    formParams.removeClass('show');
  });
});
