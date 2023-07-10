import orderInfo from "../../data/orderInfo"
import orderList from "../../data/orderList"

Page({
  data: {
    info: null,
    load: '',
    payNo: undefined,
    redirect: false
  },
  onLoad(query) {
    this.data.payNo = query.payNo
    this.data.info = null
    this.data.load = ''
    this.data.redirect = false
    this.loadInfo()
  },
  loadInfo() {
    if (!this.data.load) {
      this.data.load = 'ing'
      orderList.getInfo(this.data.payNo).then(res => {
        this.data.info = res.data
        this.data.load = 'ed'
        if (this.data.redirect) {
          this.useProduct()
        }
      }).catch(err => {
        this.data.load = ''
      })
    }
  },
  toList({ target }) {
    my.navigateTo({
      url: '/pages/product/index'
    })
  },
  useProduct({ target }) {
    this.data.redirect = true
    if (this.data.load == 'ed') {
      orderInfo.setData(this.data.info)
      my.navigateTo({
        url: '/pages/product/index'
      })
    } else if (!this.data.load) {
      this.loadInfo()
    }
  }
})
