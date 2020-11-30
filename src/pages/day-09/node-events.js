export default {
  'nodeState:hover' (name, value, group) {
    const _item = group.getChildByIndex(0);
    const { style } = _item.cfg.attrs;

    if (value) {
      // 设置的状态生效
      _item.attr(style[name]);
    } else {
      // 清除当前状态
      _item.attr(style['nodeState:default']);
    }
  },
  'nodeState:selected' (name, value, group) {
    const _item = group.getChildByIndex(0);
    const { style } = _item.cfg.attrs;
    const text = group.get('children').find(child => child.cfg.type === 'text');

    if (value) {
      // 设置的状态生效
      _item.attr(style[name]);

      if (style[name].labelCfg) {
        text.attr(style[name].labelCfg.style);
      }
    } else {
      // 清除当前状态
      _item.attr(style['nodeState:default']);
    }
  },
};
