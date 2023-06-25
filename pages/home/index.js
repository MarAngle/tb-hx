import banner from "../../data/banner";
import hotProductList from "../../data/hotProductList";
import category from "./../../data/category";

Page({
  data: {
    [category.$prop]: category,
    [banner.$prop]: banner,
    [hotProductList.$prop]: hotProductList
  },
  onLoad() {
    category.$appendPage(this)
    category.$reloadData(true)
    banner.$appendPage(this)
    banner.$reloadData(true)
    hotProductList.$appendPage(this)
    hotProductList.$reloadData(true)
  },
  toProductList({ target }) {
    my.navigateTo({
      url: '/pages/product/index?id=' + target.dataset.id
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
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
