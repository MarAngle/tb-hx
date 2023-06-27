import BaseData from "../class/BaseData";
import require from "../utils/require";

class ProductInfo extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.id = 0
    this.info = {
      name: '',
      price: 0,
      detail: ''
    }
  }
}

const productInfo = new ProductInfo({
  prop: 'productInfo',
  getData(id) {
    return new Promise((resolve, reject) => {
      this.id = id
      console.log(this.id)
      // require.get({
      //   url: 'https://ihuanxi.cn',
      //   headers: {},
      //   data: {},
      //   timeout: 0,
      //   dataType: '',
      //   token: false
      // }).then(res => {
      //   console.log(this)
      //   resolve(res)
      // }).catch(err => {
      //   reject(err)
      // })
      this.info.name = '床品四件套（枕套*2；床单*1；被套*1）真丝'
      this.info.icon = ['/image/test/category.jpg']
      this.info.price = 129
      this.info.detail = '/image/product/1.png'
      resolve()
    })
  }
})

export default productInfo
