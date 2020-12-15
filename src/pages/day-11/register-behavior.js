
export default G6 => {
  G6.registerBehavior('node-collaspe', {
    getEvents () {
      return {
        'node:click': 'nodeOnClick',
      };
    },
    nodeOnClick (e) {
      const value = e.target.cfg.collaspe;

      e.item.setState('collapse-expand', value);
    },
  });
};
