import productList from "../../data/productList";

Page({
  data: {
    [productList.$prop]: productList
  },
  onLoad(query) {
    // productList.$setExtra('search', {
    //   select_zone: query.category
    // })
    // 专区考虑单独页面实现
    productList.$appendPage(this)
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    productList.$reloadData(true)
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
