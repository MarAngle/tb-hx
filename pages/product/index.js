import productList from "../../data/productList";

Page({
  data: {
    [productList.$prop]: productList
  },
  onLoad(query) {
    console.log(query)
    productList.$setExtra('search', {
      categoaryId: query.id
    })
    productList.$appendPage(this)
    productList.$reloadData(true)
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
