import BaseData from "../class/BaseData";
import { showMsg } from "../utils";
import require from "../utils/require";
import user from "./user";

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
  createOrder() {
    return new Promise((resolve, reject) => {
      user.auth().then(() => {
        this.createOrderNext().then((res) => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        showMsg('请授权信息以进行下一步操作！', 'error')
        reject(err)
      })
    })
  }
  createOrderNext() {
    return new Promise((resolve, reject) => {
      my.tb.createOrderAndPay({
        additionalRemarks: '',
        additionalPrice: 0,
        path: '/pages/pay/success',
        outOrderId: 'HX:' + Date.now(),
        itemList: [
          {
            outItemId: '92001008',
            itemId: '3000000535',
            amount: 1,
            salePrice: 1,
            realPrice: 1,
          },
        ],
        payAmount: 1,
        discountedPrice: 0,
        fail(err) {
          my.alert({
            content: 'fail == ' + JSON.stringify(err),
          })
          reject(err)
        },
        success(res) {
          my.alert({
            content: 'success == ' + JSON.stringify(res),
          });
          resolve(res)
        },
      })
    })
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
