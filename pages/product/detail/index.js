import productInfo from "../../../data/productInfo";

Page({
  data: {
    [productInfo.$prop]: productInfo,
    showModal: false
  },
  onLoad(query) {
    if (!query || !query.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$appendPage(this)
    productInfo.$reloadData(true, query.id)
  },
  close() {
    this.setData({
      showModal: false
    })
  },
  open() {
    this.setData({
      showModal: true
    })
  },
});
