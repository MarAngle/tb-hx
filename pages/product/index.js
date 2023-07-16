import productList from "../../data/productList";

Page({
  data: {
    [productList.$prop]: productList,
    cate: undefined
  },
  onLoad(query) {
    this.data.cate = query ? query.category : undefined
    productList.$appendPage(this)
    console.warn('load', productList.$unEnum.page)
  },
  onReady() {
    // 页面加载完成
    console.warn('ready')
  },
  onShow() {
    // 页面显示
    // 考虑套餐加检索项
    // productList.$setExtra('search', {
    //   select_zone: this.data.cate
    // })
    console.warn('show')
    productList.$reloadData(true)
  },
  onHide() {
    // 页面隐藏
    console.warn('hide')
  },
  onUnload() {
    // 页面被关闭
    console.warn('unload')
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
