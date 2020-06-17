###Welcome to use MarkDown
###vue使用自定义指令控制管理端菜单栏及操作权限问题
在你需要的页面中或者得到数据时首先（必要）：
Vue.directive("has", {
  inserted: function(el, binding) {
    if (!permissionJudge(binding.value)) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  }
});
function permissionJudge(value) {
  let list = JSON.parse(
    sessionStorage.getItem("list")
  );
  for (let item of list) {
    if (item === value) {
      return true;
    }
  }
  return false;
}
设置vue的自定义指令为has，其中有一个函数，函数的两个参数为el与binging，
el为dom元素，binging为绑定的元素，binging的value即是在元素中绑定指定的值。
通过调用函数进行循环判断值是否与绑定的值相等，相等返回true，否则返回false，true代表此时权限里面包含这个权限，就不隐藏元素，否则隐藏元素。

页面控制的使用方式：

 <button v-has="'15578862262330022299089'">添加</button>
 通过has判断按钮是否显示has绑定的字符串任意，为判断的唯一标识，固定值，也即是判断该值是否在权限列表中。