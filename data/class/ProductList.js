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
        name: '产品1',
        desc: '这是一个小简介',
        label: '',
        id: 1,
        icon: '/image/test/category.jpg',
        price: 100,
        sale: 100,
        favorable: 100
      },
      {
        name: '产品2',
        desc: '这是一个小简介',
        label: '',
        id: 2,
        icon: '/image/test/category.jpg',
        price: 100,
        sale: 100,
        favorable: 100
      },
      {
        name: '产品3',
        desc: '这是一个小简介',
        label: '',
        id: 3,
        icon: '/image/test/category.jpg',
        price: 100,
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
