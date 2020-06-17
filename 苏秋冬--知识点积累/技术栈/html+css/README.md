1.html（超文本标记语言）：是一种标记语言；
2.javascript是一种脚本语言；
3.java是一种开发语言，编译语言；
4.地址栏图标<link rel="short icon" href="favicon.ico" type="image/x-icon"> 在根目录下放置favicon.ico图标；
HTML元素
DOCTYPE 标签 -- 定义了标准文档的类型
DOCTYPE标签是单独出现的
说明：
文档类型，会使浏览器使用相应标准加载网页并显示
文档类型定义在HTML文档的第一行，在html标签之前
文档不定义DOCTYPE，浏览器将无法获知HTML或XHTML文档的类型，因此会进入混乱模式，详见：浏览器模式
引用网址：http://www.dreamdu.com/xhtml/tag_doctype/
DOCTYPE，简称为DTDs，是英文Document type的缩写，中文“文档类型”
HTML DOCTYPE文档类型举例说明：
HTML4.01文档过渡定义类型，此类型定义的文档可以使用HTML中的标签与元素包括一些不被W3C推荐的标签（例如：font、b等），不可以使用框架：
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
HTML4.01文档严格定义类型，此类型定义的文档可以使用HTML中的标签与元素，不能包含不被W3C推荐的标签（例如：font、b等），不可以使用框架：
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
HTML4.01文档框架定义类型，此类型等同于HTML4.01文档过渡定义类型，但可以使用框架：
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
XHTML1.0文档过渡定义类型，此类型定义的文档可以使用HTML中的标签与元素包括一些不被W3C推荐的标签（例如：font、b等），不可以使用框架：
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
XHTML1.0文档严格定义类型，此类型定义的文档只可以使用HTML中定义的标签与元素，不能包含不被W3C推荐的标签（例如：font、b）(梦之都就使用了此类型)，不可以使用框架：
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
XHTML1.0文档框架定义类型，等同于XHTML1.0文档过渡定义类型，但可以使用框架：
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
XHTML1.1文档严格定义类型，等同于XHTML1.0文档过渡定义类型：
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
HTML5文档类型：<!DOCTYPE html>
header——头部标签标签定义文档的页眉（介绍信息）
meta标签——定义了与文档相关联的名称/值对
title标签——标题标签
base标签——标签为页面上的所有链接规定默认地址或默认目标
link标签——引用css外部样式
style标签——内部样式
script：定义脚本内容
body——页面主体（包含文档的所有内容）
块级元素——
独占一行
高度，行高以及外边距内编剧都可以控制
宽度缺省时为容器的100%；
可以容纳内联元素和其他块级元素
常见的块级元素——
div:块级容器一般用它来布局
p：段落
h1-h6：标题
ul li：无语列表
ol li：有序列表
form：标点
/br：换行
dl dt dd：自定义列表
table：表格
hr：水平分割线
pre：格式化文本
行内元素——
横向排列
宽高由内容撑开——不可设置宽高
不能设置竖直上下的margin和padding
内联元素只能容纳文本或其他内联元素
常见的内联元素——
span：常用内联容器
a：超链接标签
href*属性：设置跳转的网页地址
target属性：设置跳转的目标
结论：凡事页面可以点击跳转或者表单提交的文字，都用a标签        
img：图片
属性：src*属性用来设置图片的url数据
alt提供给搜索引擎搜索的
宽高： width-height
结论 ：显示图片
em：强调-
font：字体设置-不推荐使用
i：斜体
input：输入框
strong：粗体强调
sub：下表
sup：上标
textarea：多行文本框
替换行元素：
 input,img,textarea,button selet本身具有内容，可以设置宽度和高度；将行转化成可以横向排列的块元素；
注释：行元素转化为块元素可以使用dispplay：block；或者浮动元素；
常见的标签分为：
可视化标签：可以通过css改变样式；——div，a，img等
非可视化标签：不可以通过css改变样式——header，meta，style，script

盒子模型：
标准模式 :width = border+conten+padding+margin
怪异模式：width =内容+padding
关于盒子位置移动的方法：
浮动（float）：left|right|top|bottom；
浮动子元素不占据父元素的高度；脱离层面不脱离文档流；
浮动对块级元素和行内元素都生效
清除浮动
1.overflow：hidden；给父元素添加
2.给父元素添加高度；
3.在最后面添加一个div添加class{clear：both；}；要在浮动完成布局后添加；必须与浮动标签属于同级关系
4.给父元素添加flaot属性，但是给父元素添加后父元素也具有了浮动属性，虽然具有高度，但是下面在body中不占据高度，在面在给一个div时会占据其之前的空间
5.after{conten:"clear",clear:both;height:0px;display:block;overflow:hidden;} 伪类清除浮动不兼容ie6-7；在属性中要设置claer，同时高度为零；然后把超出的文字要隐藏； 注释：由于ie不兼容afer；所以想要兼容就需要在父元素中添加一个zoom的属性；值为1；表示既不方法也不缩小
浮动对元素的影响
1.关于margin的叠加：
在IE6下使用margin-left时浮动会使值变成双倍；
解决方法：display：inline-block；
position定位：
relative：相对定位-相对于之间的位置进行移动，原位置占据空间
absolute：相对父级元素设置了定位的元素进行移动，不占据空间；
fiexd：固定定位；相对于游览器窗口；
stacit；默认值
关于层级关系：设置定位后后面的会覆盖之前的；设置z-index可以改变层级优先关系；数值越大越在上，层级越小越在下；
使用margin：0px auto；可以使元素水平居中；
使用paddin：absolute；4个值都为0；加margin：0 auto；可以实现垂直居中；
使用vertivce-align：middle可以用来进行图片对文字的对齐排列;
文字的居中和水平：line-height:高度；text-align:center;
关于游览器全部变成灰色：
css filter：
filter:gray;使元素变成灰色；兼容ie6，7，8；
兼容所有游览器：//不兼容苹果的safair；
-webkit-filter: grayscale(1);/* Webkit */
filter: grayscale(1);/* W3C */
其他游览器变灰效果代码如下：
 -webkit-filter: grayscale(100%);
 -moz-filter: grayscale(100%);
 -ms-filter: grayscale(100%);
 -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;此方法可以兼容游览器；


CSS

css概念
层叠样式表
作用：它的作用是让页面中的可视化标签变得漂亮
css的三种书写方法以及优先级
内联式：通过标签的style属性设置样式（不用）——结论：这种方式我们只用来调试标签；
嵌入式：写在head标签里的style标签里面来改变选择器选择中标签样式（不用）结论：一般情况下，开始可以写在style标签里面，最终一定要写到CSS文件里
c.引用式：携程一个XXX.css文件通过link标签的href属性去引入（只准用这种方式）结论：推荐使用引用式 用内联式的时候通常是调试盒子的时候
.css的选择器——优先级是就近原则
id选择器  标签设置id属性    css  #id值 （不常用）
标签选择器 div  span  em  a  p  （不用，例外：html,body）
类选择器    标签设置class属性  css  .class值  （不常用）
混合选择器  （推荐使用）  优先级第二（越详细优先级越高）
>子元素选择器
~选择紧随其后的所有兄弟选择器
通用选择器 *
伪类选择器：（在里面）
 :before {conter:""}在元素内的前面添加内容，相当于添加一个行内元素
:after :{conter:""}在元素的后面
.css属性选择器:
div[attr="value"];
.div[attr^="w"]:选择以w为的属性；
id选择器>类选择器（class）>html选择器>通配符选择器
结论：能把选择器描述越详细越好，子类选择器最好选取三代以内；
常用的css属性
width：元素的宽度；
height：元素的高度；
color：设置元素里文字的颜色；该属性会继承给子元素；除A标签外；
border:top|bottom|left|right：元素的边框;
像素
线样式：实线（soild）|虚线（dashen）；
颜色
border-radius：设置圆角；IE678不支持；——CSS3
box-shadown：设置边框阴影——CSS3
h-shadown：水平阴影位置；
v-shadown：垂直阴影位置
blur：模糊距离
spread：阴影尺寸
color：阴影颜色
inset：外部阴影二选一
outset：内部阴影二选一
background：背景
background-color:#00FF00;/*背景的颜色*/
background-image:url("../images/chrome.gif");/*背景的图片*/
background-repeat:no-repeat;/*背景图片平铺设置*/
background-position:center|left|right|bottom|top;/*设置图片的位置*/
background-sizi:100%；/*设置图片的大小*/——CSS3
值 描述 测试
length 设置背景图像的高度和宽度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。 测试
percentage 以父元素的百分比来设置背景图像的宽度和高度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。 测试
cover 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中。 测试
contain 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。 测试
background-origin：设置背景图片的定位区域——CSS3
background-clip：设置背景的绘制的区域——CSS3
background-attachment:默认值scroll—随滚动条滚动|；定义图片是否跟随滚动而发生滚动
display：设置元素的显示方式
block：设置为块元素；
inline：为行元素；
inline-block：设置为行内块元素；
none：隐藏该元素；不占据空间
line-height：设置文字垂直距离；
font：设置字体
font-size：设置字体大小；
font-family：设置字体样式；
通用字体：Monospace，serif，sans-Serif；
<link href="https://fonts.gdgdocs.org/css?family=Lobster" rel="stylesheet" type="text/css">：引入谷歌字体，在css中直接调用Lobster；
字体自动降级：font-family: Helvetica, Sans-Serif;
font-weight：设置字体粗细；
font-color：设置字体颜色;
font-style：设置字体风格
normal：文本正常显示
italic：文本斜体显示
oblique：文本倾斜显示
font-variant：设置小型大写字母
list:列表属性:
list-style-type:设置列表标志类型
list-style-position：设置列表标志的位置；
list-style-imgage：将图片设置为列表标志；
Table表格属性：
border-collapse：设置表格边框的间距
border-spacing：设置单元格与边框的距离
caption-side：设置表格标题的位置
empty-cells：设置是否显示表格中的空单元格；
rowspan：合并行元素
collspan：合并列
outline：轮廓
outline：none；可以取消input点击的默认样式；
outline-color：颜色
outline-style：样式
outline-width：设置轮廓的宽度
zoom：等比例进行放大或者缩小
大于1进行放大
0-1：进行缩小
等于1不变；可以解决IE的兼容性问题；
overflow：规定当亲文本溢出文本的样式，有四个属性值；
visible：不剪切也不添加滚动条；超出内容显示；
auto：默认值，在需要时添加滚动条；
hidden：内容超出隐藏；
sroll ：总是显示滚动条；
visibilitty:规定元素是否可见
visible：默认值；元素可见
hidden元素不可见
inherit：从父元素继承visibility的属性的值；
注释：任何的版本的 Internet Explorer （包括 IE8）都不支持 "inherit" 和 "collapse" 属性值。
注释：关于visibilitty和display的区别：
visbility:规定元素是否可见；隐藏的的时候也是会占据页面上的空间，
display：隐藏元素，隐藏时不占据页面上的空间；
text：文本属性
text-align：对齐文本中的字体；
center：居中对齐
justify：两端对齐
left：左对齐
right：右对齐
vertical-align: middle 字符与图标进行排列
direction：设置文本放向；
ltr：从左到右
rtl从右到左
text-decoration：设置文本的修饰；
none：默认，
underline：定义文本下的一条线；
overline：定义文本上的一条线；
line-through：定义一条删除线
blink：闪烁的文本
text-index：设置文本的首行缩进
text-transform：控制元素中的字母
white-space：设置元素中空白的处理方式
word-spacing：设置字间距；
letter-spacing：设置中英文字（标点符号）符的间距；
word-break :用来标明怎么样进行单词内的断句；
break-all：设置文字自动换行：
word-wrap：用来标明是否允许游览器在单词内进行断句；
opacity透明度：
opacity：0-1；——CSS3
filter：Alpha（opacity=100）；/*IE678*/
rgba(0,0,0,0)：最后一位透明度；IE不兼容
定位属性：
position：规定元素定位类型；
overflow：内容溢出的事情；
vertical-align：设置元素的垂直对齐方式；
visibility：元素是否可见；
float：浮动
clear：清除浮动
cursor：设置鼠标的类型
pointer：手指型
url：自定义
default：默认箭头
auto：游览器默认
clip：裁剪绝对定位元素
z-index：设置元素层级关系
input中加入required属性：用户不填写输入无法提交表单；同时会弹出提示框；注意：required属性在Safari浏览器中不起作用；
Animation：动画属性——CSS3
@keyframes：规定动画
@keyframes name { form {} to {}  }
@keyframes name { 0% {}  25%{} 50%{}  75%{} 100%{}    }
animation:动画简写；设置一下6个属性：
name  duration time  delay iteration-count direction
animation-name：设置@keyframes动画名
animation-duration：规定动画完成所花费的时间（秒s）
animation-timing-function：规定动画的速度曲线
animation-delay：规定动画何时开始
animation-itration-count：定义动画的播放次数
animation-direction：规定动画是否正在下一周期逆方向播放
animation-play-state：规定动画是否正在运行或暂停
animation-fill-mode：规定对象动画时间之外的状态
Transform——2D/3D转换属性——CSS3
transform: 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜
none:不定义转换
translate：定义2D转换；transalate-X：作用于X轴|transalate-Y：作用于Y轴|transalate-Z：作用于Z轴——单位：deg-角度；
translate3d：定义3D转换；
scale：定义元素是否缩放；——X | Y | Z轴
scale：定义2d缩放
scale-3d：定义3d缩放
rotate：定义元素旋转——X | Y | Z轴
rotate：定义2d旋转
rotate-3d：定义3d旋转
skew：（x-angle，y-angle）；定义沿着X和Y的2D倾斜转换
perspevtive（景深）：定义3D转换元素定义透视图；
.transform：rotate(45deg)旋转的兼容性:
-webkit-transform: rotate(45deg);  
-moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);  
-o-transform: rotate(45deg);    
transform: rotate(45deg); 
transition：过渡属性——CSS3
transition：简写一下4个属性；
transition-property：规定设置过渡效果的属性名称
transition-duration：设置过渡效果需要多少秒
transition-timing-function：设置效果的速度曲线
transition-delay：定义过渡效果何时开始；延迟
flexible Box——弹性布局——CSS3：各游览器下写兼容模式-IE不兼容
box-align：定义元素的竖直对齐方式；
start：沿着项目框的顶边放置
end：沿着项目的底边框放置
center：均等分割多余空间，中间
baseline：与基线对齐
stretch：拉伸子元素填充包含块
box-direction：规定子元素的显示方向
normal：默认方向显示子元素
reverse：反方向
inherit：继承子元素
box-flex：规定子元素是否可以伸缩-定义元素怎么分配父元素的空间
1：等比分配父元素空间
2：两倍；在分配父元素空间时以数字分配，数字越大分配越多
box-flex-group：目前没有浏览器支持 box-flex-group 属性。
box-lines：规定当超出父元素框的空间时是否换行显示
box-ordinal-group：项目的子元素的显示顺序，数值越低越靠前显示
box-orient：定义项目的子元素是否水平或垂直排列
horizontal：水平方向从左往右
vertical：从上向下垂直排列
inline-axis：沿着行内轴排列子元素
block-axis：沿着块轴排列子元素
box-pack：设置元素的水平对齐方式
flex属性用于设置弹性盒子模型对象的子元素如何分配空间
flex-grow：一个数字，定义项目的比例，剩余空间
flex-shrink：设置项目的收缩比例；
flex-basis：定义了在分配多余空间之前，项目占据的空间
felx-wrap：默认情况下，项目都排列在一条线，定义如果一条轴线排不下如果换行；
nowrap：默认不换行；
wrap：换行，第一行在上方；
wrap-reverse：换行，第一行在下方；
flex-direction：属性决定主轴的方向（即项目|子元素的排列方向）；
row：默认值—主轴为水平方向，起点在左端，从左往右；
row-reverse：主轴为水平方向，起点在右端，从右往左
column：主轴为垂直方向，起点在上沿，从上往下；
column-reverse：主轴为垂直方向，起点在下沿，从下往上；
flex-flow：合写：是flex-wrap和flex-direction的合写；
justiy-content：定义了项目在主轴上的对齐方式；
flex-start：默认值：根据主轴的起点对齐；
flex-end：根据主轴的终点对齐
center：居中 
space-between：两端对齐，项目之间的间隔都相等
space-around：等间距对齐，每个项目两侧的间隔相等，所以项目之间的间隔比项目与边框的间隔大一倍；意为：第一个间隔个最后一个间隔都是其他间隔的一半；
.伪类：
元素.link：默认效果，初始效果；
元素.hover：鼠标移动到元素上面改变其样式；
元素.visited:点击完过后改变其元素样式；
兼容性问题：ie6.7.8不兼容；
input:focus  定义标点元素获取焦点时的状态；
p:first-line:定义首行状态
p:first-letter:定义每个段落的首字母；
注释：
    1.兄弟之间用margin父子之间用padding；
2.在ie6下百分比计算后默认四舍五入；
3.p不能嵌套div，a不能嵌套a；
4.文字和块的水平居中和垂直居中；
em是单位1em代表1em=16px;
在framset中如果设置a标签的点击事件，在同页面的框架中进行切换，需要在fram中添加name，然后在要点击的标签中添加target属性；属性值为fram的name；
10.counter-reset:；//设置计数器的名称（自定义名字）；
      p:before{
     content:counter(conut，n(数字类型))“.”（这里可以进行拼接）;//调用计数器
     counter-increment:count 1;//让计数器的数值自加1；
}

css中文字体对应英文：
中文 英文
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312



