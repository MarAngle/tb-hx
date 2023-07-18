import user from "../../data/user";

Page({
  data: {
    [user.$prop]: user
  },
  onLoad() {
    user.$appendPage(this)
  },
  onShow() {},
  // onAvatarLoad({ detail }) {
  //   const width = detail.width
  //   const height = detail.height
  //   if (width > height) {
  //     this.data.avatarType = 'width'
  //   } else {
  //     this.data.avatarType = 'height'
  //   }
  //   this.setData({
  //     avatarType: this.data.avatarType
  //   })
  // },
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