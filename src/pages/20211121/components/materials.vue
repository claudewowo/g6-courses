<template>
  <div class="materials">
    <i
      draggable
      data-shape="rect"
      class="iconfont icon-rect"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="circle"
      class="iconfont icon-circle"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="ellipse"
      class="iconfont icon-ellipse"
      @dragstart="dragstart"
    />
    <i
      draggable
      data-shape="diamond"
      class="iconfont icon-diamond"
      @dragstart="dragstart"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      dragstart(event) {
        event.dataTransfer.setData('dragSource', JSON.stringify({
          shape: event.target.getAttribute('data-shape'),
        }));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .materials{width: 80px;}
  .iconfont{
    display: block;
    margin:20px auto;
    width: 80px;
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    text-align: center;
    cursor: move;
    &:hover{
      transform: scale(1.2);
    }
  }
</style>
