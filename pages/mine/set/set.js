Page({
  data: {},
  onLoad(query) {
    console.log('page onLoad', query)
  },
  onShow() {},
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})