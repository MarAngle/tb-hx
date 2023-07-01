import BaseData from "../class/BaseData";
import { showMsg } from "../utils";
import require from "../utils/require";
import user from "./user";

class ProductInfo extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = {}
    this.orderId = null
  }
  setData(data) {
    this.data = data
    this.orderId = null
    this.$syncPage()
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
  // createOrder() {
  //   return new Promise((resolve, reject) => {
  //     // user.auth().then(() => {
  //       this.createOrderNext().then((res) => {
  //         resolve(res)
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     // }).catch(err => {
  //     //   showMsg('请授权信息以进行下一步操作！', 'error')
  //     //   reject(err)
  //     // })
  //   })
  // }
  beforeCreateOrder() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderCreate",
          commodity_id: this.data.id,
          commodity_name: this.data.name,
          number: 1,
          price: this.data.price.data
        }
      }).then((res) => {
        this.orderId = res.data.pay_no
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  createOrderNext() {
    return new Promise((resolve, reject) => {
      this.beforeCreateOrder().then(res => {
        my.tb.createOrderAndPay({
          additionalRemarks: '',
          additionalPrice: 0,
          path: '/pages/pay/success',
          outOrderId: this.orderId,
          itemList: [
            {
              outItemId: this.data.skuId,
              itemId: this.data.tbId,
              amount: 1,
              salePrice: this.data.price.origin,
              realPrice: this.data.price.data,
            },
          ],
          payAmount: this.data.price.data,
          discountedPrice: this.data.price.discounted,
          fail: (err) => {
            my.alert({
              content: 'fail == ' + JSON.stringify(err),
            })
            reject(err)
          },
          success: (res) => {
            my.alert({
              content: 'success == ' + JSON.stringify(res) + ':' + this.orderId,
            });
            resolve(res)
          },
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const productInfo = new ProductInfo({
  prop: 'productInfo'
})

export default productInfo
