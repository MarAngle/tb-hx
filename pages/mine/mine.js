import user from "../../data/user";

Page({
  data: {
    [user.$prop]: user,
  },
  onLoad() {
    user.$appendPage(this)
  },
  onShow() {},
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})