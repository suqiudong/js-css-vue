webpackJsonp([45,51],{620:function(e,a,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var l=t(5),m=s(l),d=t(17),r=s(d),n=t(16),o=s(n),i=t(6),u=s(i),p=t(3),f=s(p),c=t(4),v=s(c),h=t(8),g=s(h),x=t(7),N=s(x),b=t(2),w=s(b),y=t(303),I=s(y),X=t(149),E=(0,m.default)("span",{className:"star"},void 0,"*"),P=(0,m.default)("label",{htmlFor:"exampleInputOperator"},void 0,"用户名："),k=(0,m.default)("span",{className:"messages"}),H=(0,m.default)("span",{className:"star"},void 0,"*"),L=(0,m.default)("label",{htmlFor:"exampleInputPasswd"},void 0,"密码："),F=(0,m.default)("span",{className:"messages"}),_=(0,m.default)("span",{className:"star"},void 0,"*"),C=(0,m.default)("label",{htmlFor:"exampleInputConfirmPasswd"},void 0,"确认密码："),U=(0,m.default)("span",{className:"messages"}),D=(0,m.default)("label",{htmlFor:"exampleInputName"},void 0,"姓名："),M=(0,m.default)("label",{htmlFor:"exampleInputEmail1"},void 0,"邮箱："),O=(0,m.default)("span",{className:"messages"}),T=(0,m.default)("label",{htmlFor:"exampleInputTel"},void 0,"电话："),z=(0,m.default)("span",{className:"messages"}),j=(0,m.default)("label",{htmlFor:"exampleInputDepartment"},void 0,"部门："),q=(0,m.default)("span",{className:"messages"}),A=(0,m.default)("label",{htmlFor:"exampleInputPosition"},void 0,"职位："),J=(0,m.default)("span",{className:"messages"}),S=function(e){function a(e){(0,f.default)(this,a);var t=(0,g.default)(this,(a.__proto__||(0,u.default)(a)).call(this,e));return t.returnHandler=t.returnHandler.bind(t),t.addHandler=t.addHandler.bind(t),t}return(0,N.default)(a,e),(0,v.default)(a,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keydown",function(a){a&&13==a.keyCode&&e.addHandler()})}},{key:"returnHandler",value:function(){this.props.history.replace("/usermanage")}},{key:"addHandler",value:function(){var e=this,a={password:{presence:{message:"密码不能为空"},length:{minimum:6,maximum:20,message:"密码6-20位有效字符"},format:{pattern:"[a-z0-9]+",message:"只能包含字母和数字"}},userName:{presence:{message:"用户名不能为空"},length:{minimum:3,maximum:20,message:"长度3-20位字符"},format:{pattern:"[a-z0-9]+",message:"只能包含字母和数字"}},confirmPasswd:{presence:{message:"确认密码不能为空"},equality:{attribute:"password",message:"两次输入密码不一致"}},email:{email:{message:"请输入正确的邮箱格式"}},tel:{format:{pattern:/^[0][0-9]{2,3}-\d{7,8}|^1[34578]\d{9}$/,message:'请输入正确号码格式,例如"010-XXXXXXXX或者131XXXXXXXX"'},length:{minimum:11,maximum:13,message:"请输入正确号码长度"}},name:{length:{maximum:20,message:"长度20位字符以内"}},department:{length:{maximum:20,message:"长度20位字符以内"}},position:{length:{maximum:20,message:"长度20位字符以内"}}};this.refs.save.disabled=!0;var t={};t.userName=this.refs.operator.value,t.passwd=(0,I.default)(this.refs.passwd.value).toUpperCase(),t.confirmPasswd=this.refs.confirmPasswd.value,t.name=this.refs.name.value,t.email=this.refs.email.value,t.phoneNo=this.refs.tel.value,t.department=this.refs.department.value,t.position=this.refs.position.value;var s=(0,X.baseValidate)($("#addUser"),a);return s?void(this.refs.save.disabled=!1):void(0,o.default)(r.default.mark(function a(){return r.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.props.addUser(t);case 2:0==e.props.usermanage.isAddSuccess.code?(e.refs.save.disabled=!1,setTimeout(function(){e.props.history.replace("/usermanage")},1e3)):e.refs.save.disabled=!1;case 4:case"end":return a.stop()}},a,e)}))()}},{key:"render",value:function(){return(0,m.default)("div",{id:"addUser",className:"box box-primary"},void 0,(0,m.default)("div",{className:"row"},void 0,(0,m.default)("div",{className:"col-md-12 box-body"},void 0,(0,m.default)("div",{className:"col-md-5"},void 0,(0,m.default)("div",{className:"form-group col-md-12"},void 0,E,P,k,w.default.createElement("input",{type:"text",maxLength:20,ref:"operator",name:"userName",className:"form-control",id:"exampleInputOperator",placeholder:"请输入账号"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,H,L,F,w.default.createElement("input",{type:"password",maxLength:20,ref:"passwd",name:"password",className:"form-control",id:"exampleInputPasswd",placeholder:"请输入密码"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,_,C,U,w.default.createElement("input",{type:"password",maxLength:20,ref:"confirmPasswd",name:"confirmPasswd",className:"form-control",id:"exampleInputConfirmPasswd",placeholder:"请再次输入密码"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,D,w.default.createElement("input",{type:"text",maxLength:20,ref:"name",name:"name",className:"form-control",id:"exampleInputName",placeholder:"请输入姓名"}))),(0,m.default)("div",{className:"col-md-5"},void 0,(0,m.default)("div",{className:"form-group col-md-12"},void 0,M,O,w.default.createElement("input",{type:"email",maxLength:30,ref:"email",name:"email",className:"form-control",id:"exampleInputEmail1",placeholder:"请输入邮箱"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,T,z,w.default.createElement("input",{type:"text",maxLength:13,ref:"tel",name:"tel",className:"form-control",id:"exampleInputTel",placeholder:"请输入电话"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,j,q,w.default.createElement("input",{type:"text",maxLength:20,ref:"department",name:"department",className:"form-control",id:"exampleInputDepartment",placeholder:"请输入部门"})),(0,m.default)("div",{className:"form-group col-md-12"},void 0,A,J,w.default.createElement("input",{type:"text",maxLength:20,ref:"position",name:"position",className:"form-control",id:"exampleInputPosition",placeholder:"请输入职位"}))),(0,m.default)("div",{className:"box-button col-md-12"},void 0,(0,m.default)("button",{className:"btn btn-primary",onClick:this.returnHandler},void 0,"返回"),w.default.createElement("button",{className:"btn btn-primary",ref:"save",onClick:this.addHandler},"保存")))))}}]),a}(b.Component);a.default=S}});