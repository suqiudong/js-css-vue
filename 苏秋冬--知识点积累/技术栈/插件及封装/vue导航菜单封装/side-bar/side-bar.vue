<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :default-active="defaultActive"
      :background-color="bgcolor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      style="{background-color: rgb(36,36,36)}"
    >
      <div v-for="(item,index) in sideBar_arr" class="side-bar-width" :key="index">
        <div v-if="item.hasChildren == true">
          <el-submenu :index="item.index">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-if="item.hasChildren == true"
              v-for="(i,d) in item.children"
              :key="d"
              :index="i.index"
            >{{i.name}}</el-menu-item>
          </el-submenu>
        </div>
        <div v-else class="side-bar-nochild">
          <el-menu-item :index="item.index">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: [
    "sideBar_arr",
    "bgcolor",
    "textColor",
    "activeTextColor",
    "defaultActive"
  ],
  methods: {},
  mounted() {
    var titleArr = [];
    titleArr = document.getElementsByClassName("el-submenu__title");
  }
};
</script>
<style>
.el-submenu__title:hover{
    background-color: blue !important;
}
.el-menu-item:hover{
    background-color: blue !important;
}

.side-bar-width {
  width: 200px !important;
}
.side-bar-width li ul li.el-menu-item {
  padding-left: 60px !important;
}
.side-bar-nochild li.el-menu-item {
  padding-left: 0 !important;
}
.el-submenu__title {
  padding-left: 0 !important;
}
.el-menu-item.is-active {
  background-color: red !important;
  color: #fff !important;
}
</style>
