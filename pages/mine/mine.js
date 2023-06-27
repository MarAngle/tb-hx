Page({
  data: {},
  onLoad(query) {
    console.log('page onLoad', query)
  },
  onShow() {},
  changePage({target}) {
    console.log(target)
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})