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
    orderInfo.$appendPage(this)
    orderInfo.$syncPage()
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
      url: '/pages/order/reservation/reservation'
    });
  },
  refundPage() {
    my.navigateTo({
      url: '/pages/order/refund/refund'
    });
  }
})