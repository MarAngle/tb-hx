import orderInfo from "../../../data/orderInfo";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    refundPopup: false
  },
  onLoad() {
    if (!orderInfo.data.id) {
      my.navigateBack(1)
      return
    }
    // orderInfo.getInfo()
    orderInfo.$appendPage(this)
    orderInfo.getWashData().then(() => {})
  },
  onShow() {},
  copy({target}) {
    my.setClipboard({
      text: target.dataset.orderNum,
      success: () => {
        my.showToast({
          content: '复制成功'
        });
      },
      fail: () => {
        my.showToast({
          content: '复制失败'
        });
      }
    });
  },
  refund() {
    this.setData({
      refundPopup: true
    })
  },
  cancel() {
    this.setData({
      refundPopup: false
    })
  },
  useThali() {
    my.navigateTo({
      url: '/pages/order/use/index'
    });
  },
  refundPage() {
    my.navigateTo({
      url: '/pages/order/refund/refund'
    });
  }
})