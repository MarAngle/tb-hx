import banner from "../../data/banner";
import productInfo from "../../data/productInfo";
import category from "./../../data/category";

Page({
  data: {
    [productInfo.$prop]: productInfo
  },
  onLoad(...args) {
    console.log(...args)
  },
  onReady(...args) {
    console.log(...args)
    // 页面加载完成
  },
  onShow(...args) {
    console.log(...args)
    // 页面显示
    productInfo.$appendPage(this)
    productInfo.$reloadData(true)
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/home/index',
    };
  },
});
