
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
  onChange(e) {
    console.log(e)
  },
  onDelete(e) {
    console.log(e)
  },
  onBuild() {
    my.navigateTo({
      url: '/pages/address/build'
    });
  }
})