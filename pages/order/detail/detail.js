Page({
  data: {
    refundPopup: false
  },
  onLoad() {},
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