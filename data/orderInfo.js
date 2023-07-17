import BaseData from "../class/BaseData";
import require from "../utils/require";
import { statusSelect } from "./orderList";
import productList from "./productList";
import user from "./user";

class OrderInfo extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.id = null
    this.data = {}
  }
  setId(id) {
    this.id = id
  }
  getInfo() {
    return new Promise((resolve, reject) => {
      user.$loadData().then(() => {
        require.post({
          url: '/tb_api/api/Order.php',
          data: {
            status: 'tradeOrderInfo',
            pay_no: this.id
          },
          timeout: 0,
          token: true
        }).then(res => {
          this.data = this.$formatItem(res.data)
          console.log(this.id, this.data, res.data)
          this.$syncPage()
          if (this.data.wash.id) {
            this.getWashData().finally(() => {
              resolve()
            })
          } else {
            resolve()
          }
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
  $formatItem(resData) {
    const price = {
      data: resData.pay_amount,
      freight: resData.freight || 0
    }
    price.show = {
      data: (price.data / 100).toString(),
      freight: (price.freight / 100).toString()
    }
    if (!resData.refund) {
      resData.refund = {}
    }
    const item = {
      id: resData.pay_id, // 订单id
      ucId: resData.uc_id, // 用户商品id?
      payNo: resData.pay_no, // 订单号
      aliOrderId: resData.pay_order_id, // 手淘订单号
      status: {
        value: resData.status,
        label: statusSelect[resData.status]
      },
      statusInfo: resData.status_info || {}, // process_no <= 1005 可撤单/3001 待评价
      payTime: resData.pay_time, // 支付时间
      expiresTime: resData.expires_time, // 有效时间
      createTime: resData.pay_create_time,
      price: price,
      address: {
        send: {
          ...resData.send,
          no: resData.waybill_send
        },
        back: {
          ...resData.back,
          no: resData.waybill_back
        },
      },
      wash: {
        id: resData.order_id,
        no: resData.order_no, // 洗护
        time: resData.reservation_time, // 预约时间
        createTime: resData.order_time, // 下单时间
        list: [],
      },
      cancel: {
        no: resData.refund.refund_no,
        startTime: resData.refund.refund_start_time,
        successTime: resData.refund.refund_end_time,
        showPrice: (resData.refund.refund_price / 100).toString(),
        price: resData.refund.refund_price,
        reason: resData.refund.refund_reason,
      },
      product: productList.parseData(resData)
    }
    return item
  }
  getWashData() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderStatus",
          order_id: this.data.wash.id
        }
      }).then((res) => {
        this.data.wash.list = (res.data || []).map(item => {
          return {
            title: item.process,
            description: item.create_time + ':' + item.process_desc
          }
        })
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  useOrder(data) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeWashOrderCreate",
          send: data.send,
          back: data.back,
          reservation_time: data.time + ':00:00',
          remark: data.remark || '无',
          uc_id: this.data.ucId,
          sku_id: this.data.product.skuId,
          freight: this.data.price.freight
        }
      }).then((res) => {
        my.navigateTo({
          url: '/pages/order/index?type=isUse'
        });
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  cancelWash() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeWashOrderCancel",
          order_no: this.data.wash.no
        }
      }).then((res) => {
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  evaluateOrder({ rate, content }) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeWashOrderEvaluate",
          order_id: this.data.wash.id,
          service: rate,
          info: content
        }
      }).then((res) => {
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  payBack(reson) {
    return new Promise((resolve, reject) => {
      user.$loadData().then(() => {
        require.post({
          url: '/tb_api/api/Order.php',
          data: {
            status: 'tradeOrderRefund',
            pay_no: this.data.payNo,
            refund_reason: reson || '无',
            refund_price: this.data.price.data
          },
          timeout: 0,
          token: true
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const orderInfo = new OrderInfo({
  prop: 'orderInfo',
  getData() {
    return this.getInfo()
  }
})

export default orderInfo
