<template>
</template>

<script>
	import wx from "weixin-js-sdk";
	export default {
		name: "",
		data() {
			return {}
		},
		methods: {
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有"original",
				sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
				success: response => {
					var localIds = response.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					}
				});
			}
		}
</script>

<style>

</style>