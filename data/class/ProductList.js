import BaseData from "../../class/BaseData"
import require from "../../utils/require";

class ProductList extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.service = initOption.service
    if (!this.service.method) {
      this.service.method = 'get'
    }
    if (!this.service.data) {
      this.service.data = 'data'
    }
    this.$appendMethod('getSearch', initOption.getSearch)
    this.$appendMethod('formatData', initOption.formatData)
    this.list = []
  }
  $getSearch() {
    if (this.getSearch) {
      return this.getSearch()
    } else {
      return {}
    }
  }
  formatData(res) {
    console.log('暂时写死数据，等待接口！')
    this.list = [
      {
        name: '衣服任意3件',
        label: '特惠',
        desc: '快递免费上门取送',
        import: '拒用"四氯"健康洗',
        id: 1,
        icon: '/image/test/category.jpg',
        price: 129,
        sale: 100,
        favorable: 100
      },
      {
        name: '衣服任意1件',
        label: '',
        desc: '快递免费上门取送',
        import: '拒用"四氯"健康洗',
        id: 2,
        icon: '/image/test/category.jpg',
        price: 99,
        sale: 100,
        favorable: 100
      },
      {
        name: '衣服任意2件',
        label: '',
        desc: '快递免费上门取送',
        import: '拒用"四氯"健康洗',
        id: 3,
        icon: '/image/test/category.jpg',
        price: 29.9,
        sale: 100,
        favorable: 100
      },
    ]
  }
  $getData() {
    return new Promise((resolve, reject) => {
      const search = this.$getSearch()
      // require[this.service.method]({
      //   url: this.service.url,
      //   [this.service.data]: search,
      //   timeout: 0,
      //   token: false
      // }).then(res => {
      //   this.formatData(res)
      //   resolve(res)
      //   console.log(this)
      // }).catch(err => {
      //   reject(err)
      // })
      setTimeout(() => {
        this.formatData()
        resolve()
      }, 1000)
    })
  }
}

export default ProductList
