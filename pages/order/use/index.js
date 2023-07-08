import orderInfo from "../../../data/orderInfo";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
  },
  onLoad() {
    if (!orderInfo.data.id) {
      my.navigateBack(1)
      return
    }
    orderInfo.$appendPage(this)
    orderInfo.$syncPage()
  },
  onShow() {}
})