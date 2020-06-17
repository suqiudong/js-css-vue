每天进行一点案例收藏，形成自我案例库，
同时进行文档维护，每添加一份案例，标明编号（如下）：

普通案例：
	1.身份证校验正则案例。

react框架：
	1.aus_react项目案例，只能用于内部，不能用于其他商用活动。


JavaScript高级程序设计：
	1.CDN与http缓存
	2.JavaScript内存机制
	3.JavaScript内存泄露
	4.异步编程4种方法
	

/*
	*vue相关
	*1. 路由
	*2. 生命周期
	*3. 组件化
	*4. 数据绑定
*/

####vue路由
1：教程地址：https://router.vuejs.org/zh/installation.html
2：路由跳转的几种方式：
	*<router-link to="a"></router-link>
	*this.$router.push({
		path: "a"
	})
	*this.$router.go(-1);(用于返回上一页或者n页)
	*this.$router.replace();
	*loaction.href();
3: 跳转传参的方式：
	*this.$router.push({
		path: "",
		query: {
			//参数
		}
	})；
	query传参的方式，是以？号结尾拼接在URL上的一种方式，这种方式的跳转，即使不传任何参数也可跳转到任何想去的页面；
	this.$router.push({
		name: "",
		params: {
			//参数
		}
	});
	params传参的方式，是把参数成为URL的一部分，不带？号的方式，这种传参方式，必须要带上参数才可跳转到对应的页面，否则要跳转的那个页面将会找不到。


####生命周期
