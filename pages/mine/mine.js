import user from "../../data/user";

Page({
  data: {
    [user.$prop]: user,
  },
  onLoad() {
    user.$appendPage(this)
  },
  onShow() {},
  onLogin() {
    if (!user.status.login) {
      user.$loadData()
    }
  },
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})