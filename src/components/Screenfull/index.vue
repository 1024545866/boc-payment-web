<template>
  <el-tooltip class="item" content="全屏" placement="top-start">
     <i class="fa fa-arrows-alt select-icon"  @click='click'></i>
  </el-tooltip>
</template>

<script>
  import screenfull from 'screenfull';
  export default {
    name: 'hamburger',
    props: {
      width: {
        type: Number,
        default: 22
      },
      height: {
        type: Number,
        default: 22
      },
      fill: {
        type: String,
        default: '#48576a'
      }
    },
    data() {
      return {
        isFullscreen: false
      }
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false;
        }
        screenfull.toggle();
      }
    }
  }
</script>

<style scoped>
  .screenfull {
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    font-size: 20px;
    color: #fff;
    padding: 0px 10px;
    margin-right: 10px;
  }
</style>
