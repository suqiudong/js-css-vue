###Welcome to use MarkDown

### vue单页面应用刷新网页后vuex的state数据丢失的解决方案
1. 产生原因
其实很简单，因为store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值
2. 解决思路
一种是state里的数据全部是通过请求来触发action或mutation来改变

一种是将state里的数据保存一份到本地存储(localStorage、sessionStorage、cookie）中

很显然，第一种方案基本不可行，除非项目很小或者vuex存储的数据很少。而第二种可以保证刷新页面数据不丢失且易于读取。
3。解决方案
具体的代码如下：

export default {
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
