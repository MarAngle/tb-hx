import productList from "../../data/productList";

Page({
  data: {
    [productList.$prop]: productList,
    cate: undefined
  },
  onLoad(query) {
    this.data.cate = query ? query.category : undefined
    productList.$appendPage(this)
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 考虑套餐加检索项
    // productList.$setExtra('search', {
    //   select_zone: this.data.cate
    // })
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
      title: '浣洗',
      desc: '浣洗洗护',
      path: 'pages/home/index',
    };
  },
});
