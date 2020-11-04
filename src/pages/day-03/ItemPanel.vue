<template>
  <div
    id="itemPanel"
    ref="itemPanel"
  >
    <i class="iconfont icon-h-drag" />
    <div class="icon-tool">
      <i
        draggable="true"
        data-shape="circle"
        class="iconfont icon-circle"
      />
      <i
        draggable="true"
        data-shape="rect"
        class="iconfont icon-rect"
      />
      <i
        draggable="true"
        data-shape="ellipse"
        class="iconfont icon-ellipse"
      />
      <i
        draggable="true"
        data-shape="diamond"
        class="iconfont icon-diamond"
      />
      <i
        draggable="true"
        data-shape="modelRect"
        class="iconfont icon-model-rect"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemPanel',
    mounted () {
      // 拖拽结束
      this.$refs.itemPanel.querySelector('.icon-tool').addEventListener('dragend', e => {
        if(e.target.classList.contains('iconfont')) {
          this.$emit('canvas-add-node', e);
        }
      });

      // 阻止默认动作
      document.addEventListener('drop', e => {
        e.preventDefault();
      }, false);
    },
  };
</script>
