// 自定义行为

export default (G6) => {
  /* 注册 node hover 行为 */
  G6.registerBehavior('node-hover', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      };
    },
    onNodeEnter (e) {
      // 显示当前节点的锚点
      e.item.setState('nodeState:hover', true); // 二值状态
    },
    onNodeLeave (e) {
      // 将锚点再次隐藏
      e.item.setState('nodeState:hover', false); // 二值状态
    },
  });

  /* 注册 node select 行为 */
  G6.registerBehavior('node-select', {
    getEvents () {
      return {
        'node:click': 'onNodeClick',
      };
    },
    onNodeClick (e) {
      this._clearSelected();
      e.item.toFront();
      // 获取被点击的节点元素对象, 设置当前节点的 click 状态为 selected
      // e.item.setState('nodeState', 'selected');
      e.item.setState('nodeState:selected', true);
      // 将点击事件发送给 graph 实例
      this.graph.emit('after-node-selected', e);
    },
    // 清空已选
    _clearSelected () {
      const selectedNodes = this.graph.findAllByState('node', 'nodeState:selected');

      selectedNodes.forEach(node => {
        node.clearStates(['nodeState:selected', 'nodeState:hover']);
      });
    },
  });
};
