<template>
  <div id="app">
    <div class="box">
        <router-view left-options.showBack></router-view>
    </div>
    <tabbar class="tabar"  @on-index-change="onIndexChange" v-show="this.$store.state.tabbarShow">
      <tabbar-item selected link="/">
        <img slot="icon" src="./assets/icon-home-nol.png">
        <img slot="icon-active" src="./assets/icon-home-sel.png">
        <span slot="label">tab1</span>
      </tabbar-item>
      <tabbar-item link="/template2" :selected="this.$route.path === '/template2'">
        <img slot="icon" src="./assets/icon-medicine-nol.png">
        <img slot="icon-active" src="./assets/icon-medicine-sel.png">
        <span slot="label">tab2</span>
      </tabbar-item>
      <tabbar-item link="/template3" :selected="this.$route.path === '/template3'">
        <img slot="icon" src="./assets/icon-mine-nol.png">
        <img slot="icon-active" src="./assets/icon-mine-sel.png">
        <span slot="label">tab3</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  
  methods: {
    onIndexChange(newIndex, oldIndex) {
      
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  mounted(){
    if(this.$route.path == '/' || this.$route.path == '/template1' || this.$route.path == '/template2' || this.$route.path == '/template3'){
      this.$store.dispatch('showTabar',true);
    }else {
      this.$store.dispatch('hideTabar',false);
    };

  },
  watch:{
      $route(to,from){
        if(to.path == '/' || to.path == '/template1' || to.path == '/template2' || to.path == '/template3'){
          this.$store.dispatch('showTabar',true);
        }else {
          this.$store.dispatch('hideTabar',false);
        }
      }
    }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.tabar{
  height: 53px;
  z-index: 10;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.box{
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  background: #ffffff;
}
</style>
