import productInfo from "../../../data/productInfo";

Page({
  data: {
    [productInfo.$prop]: productInfo
  },
  onShow(query) {
    if (!query || !query.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$appendPage(this)
    productInfo.$reloadData(true, query.id)
  },
});
