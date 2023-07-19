
import address from "../../data/address";

Page({
  data: {
    [address.$prop]: address,
  },
  onLoad() {
    address.$appendPage(this)
    address.$reloadData(true)
  },
  onShow() {},
  onBuild() {
    my.navigateTo({
      url: '/pages/address/edit'
    });
  }
})