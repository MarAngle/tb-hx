import BaseData from "../class/BaseData";
import { showAlert, showMsg } from "../utils";
import require from "../utils/require";
import local from "./local";
import orderList from "./orderList";
import user from "./user";

class ProductInfo extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = {}
    this.payNo = null
    this.payId = null
  }
  setData(data) {
    this.data = data
    this.payNo = null
    this.payId = null
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
  beforeCreateOrder() {
    return new Promise((resolve, reject) => {
      const appInitData = local.getData('appInitData') || {}
      // showAlert(appInitData)
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderCreate",
          commodity_id: this.data.id,
          commodity_name: this.data.name,
          number: 1,
          price: this.data.price.data,
          serviceCode: appInitData.serviceCode,
          serviceName: appInitData.serviceName,
          bizOrderId: appInitData.bizOrderId,
        }
      }).then((res) => {
        this.payNo = res.data.pay_no
        this.payId = res.data.pay_id
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
          outOrderId: this.payNo,
          itemList: [
            {
              outItemId: this.data.skuId,
              itemId: this.data.aliId,
              amount: 1,
              salePrice: this.data.price.origin,
              realPrice: this.data.price.data,
            },
          ],
          payAmount: this.data.price.data,
          discountedPrice: this.data.price.discounted,
          fail: (err) => {
            showMsg('支付失败！', 'error')
            reject(err)
          },
          success: (res) => {
            orderList.syncOrder(this.payNo, res.bizOrderIdStr).then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
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
