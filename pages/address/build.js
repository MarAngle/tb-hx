
import address from "../../data/address";

Page({
  data: {
    [address.$prop]: address,
  },
  onLoad() {
    address.$appendPage(this)
  },
  onShow() {},
  saveAddress() {
    my.navigateBack();
  }
})