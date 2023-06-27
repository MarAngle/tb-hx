Page({
  data: {
    inputVal: '',
    page: '0'
  },
  onLoad(query) {
    console.log('page onLoad', query)
  },
  onShow() {},
  search() {
    my.showToast();
  },
  changePage({target}) {
    // console.log(target.dataset)
    this.setData({
      page: target.dataset.page
    })
  },
  useThali() {
    my.navigateTo({
      url: '/pages/order/reservation/reservation'
    });
  },
  orderDetail() {
    my.navigateTo({
      url: '/pages/order/detail/detail'
    })
  }
})