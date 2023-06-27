Page({
  data: {
    hour: 23,
    minute: 59,
    second: 59,
    refundDone: false
  },
  onLoad() {
    // setInterval(() => {
    //   q
    // }, 1000)


  },
  onShow() {},
  cancelRefund() {
    this.setData({
      refundDone: true
    })
  }
})