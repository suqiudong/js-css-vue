<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider>
        <SideBar :sideBar_arr="sideBar_arr" :bgcolor="bgcolor" :textColor="textColor" :defaultActive="defaultActive" :activeTextColor="activeTextColor"></SideBar>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>
          Footer
          <router-view/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import SideBar from "../side-bar/side-bar";
export default {
  data() {
    return {
      sideBar_arr: [
        {
          title: "选项1",
          path: "",
          index: "1",
          children: [{ name: "选项1-1", path: "", index: "1-1" }],
          hasChildren: true
        },
        {
          title: "选项2",
          index: "2",
          path: "",
          children: [{ name: "选项2-1", path: "", index: "2-1" }],
          hasChildren: true
        },
        { title: "选项3", index: "3", path: "", hasChildren: false },
        {
          title: "选项4",
          index: "4",
          path: "",
          children: [{ name: "选项3-1", index: "4-1", path: "" }],
          hasChildren: false
        }
      ],
      bgcolor: "black",//背景色
      textColor: "#58bc58",//文字颜色
      activeTextColor: "red",//高亮时文字颜色
      defaultActive: "2-1",//默认高亮
    };
  },
  components: {
    SideBar
  }
};
</script>

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>