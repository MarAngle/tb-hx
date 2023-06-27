Page({
  data: {},
  onLoad() {},
  onShow() {},
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})