<template>
  <div id="app">
     <!-- <transition name="fade"> -->
        <router-view v-if="isRouterAlive"></router-view>
     <!-- </transition> -->
  </div>
</template>
  
<script>
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
        console.log("刷新了页面！");
      });
    }
  },
  mounted() {}
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
