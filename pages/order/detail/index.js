import orderInfo from "../../../data/orderInfo";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    refundPopup: false
  },
  onLoad() {
    orderInfo.$appendPage(this)
  },
  onShow() {
    if (!orderInfo.id) {
      my.navigateBack(1)
      return
    }
    orderInfo.$loadData(true).then(() => {}).catch(err => {
      console.error(err)
    })
  },
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