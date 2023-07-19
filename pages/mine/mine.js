import user from "../../data/user";

Page({
  data: {
    [user.$prop]: user
  },
  onLoad() {
    user.$appendPage(this)
  },
  onShow() {},
  onSyncInfo() {
    if (user.status.load !== 'success') {
      user.$loadData()
    } else if (!user.info.name) {
      user.$triggerMethod('$authInfo', [], true)
    }
  },
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
})