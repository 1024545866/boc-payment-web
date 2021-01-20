<template>

  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cacheMenu">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'AppMain',
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // },
      ...mapGetters([
        'cacheMenu'
      ])
    },
    watch:{
      cacheMenu: function(val){
        // console.log("-----------------------");
        // console.log(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-row{
    margin-bottom: 25px;
    span{
      font-size: 16px;
    }
  }
</style>
