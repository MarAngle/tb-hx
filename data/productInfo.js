import BaseData from "../class/BaseData";
import { showAlert, showMsg } from "../utils";
import require from "../utils/require";
import local from "./local";
import user from "./user";
// serviceCode
// serviceName
// bizOrderId
// 开放服务Code
// 开放服务名称
// 开放服务id
// ["path"."pages/home/index","query[bizOrderld""Dge0x13JGn55kYYt5dmOJGkYWZkJwKbl2ISSiocjVzebuk0cSGFkk2GvmQ5vQMFr""serviceCode"."IND-VA-huanxiWash""serviceName"."洗洗护"},"apiCategory"."default"}

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
            this.syncOrder(this.orderId, res.bizOrderIdStr).then(res => {
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
  syncOrder(orderId, tbOrderId) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderQuery",
          pay_no: orderId,
          order_id: tbOrderId
        }
      }).then((res) => {
        // my.alert({
        //   content: 'success == ' + JSON.stringify(res),
        // })
        resolve({ status: 'success', success: res.data.status == 200 ? true : false })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

const productInfo = new ProductInfo({
  prop: 'productInfo'
})

export default productInfo
