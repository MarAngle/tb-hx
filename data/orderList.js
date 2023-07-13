import BaseData from "../class/BaseData"
import { showMsg } from "../utils";
import require from "../utils/require";
import productList from "./productList";
import user from "./user";

export const statusSelect = {
  100: '待支付',
  200: '未使用',
  201: '洗护中',
  202: '已完成',
  4000: '已退款'
}

class OrderList extends BaseData {
  constructor(initOption) {
    super(initOption)
    this.type = {
      current: 'total',
      params: {},
      list: [
        {
          value: 'total',
          label: '全部',
          params: {
            status: 'tradeOrderList',
            state: ''
          }
        },
        {
          value: 'isOrder',
          label: '待支付',
          params: {
            status: 'tradeOrderList',
            state: 100
          }
        },
        {
          value: 'isPay',
          label: '未使用',
          params: {
            status: 'tradeOrderList',
            state: 200
          }
        },
        {
          value: 'isUse',
          label: '洗护中',
          params: {
            status: 'tradeOrderList',
            state: 201
          }
        },
        {
          value: 'isFinished',
          label: '已完成',
          params: {
            status: 'tradeOrderList',
            state: 202
          }
        },
        {
          value: 'isRefund',
          label: '已退款',
          hidden: true,
          params: {
            status: 'tradeOrderList',
            state: 4000
          }
        },
      ]
    }
    this.list = []
  }
  changeType(current, unLoadData) {
    this.type.current = current || 'total'
    for (let i = 0; i < this.type.list.length; i++) {
      const typeItem = this.type.list[i];
      if (typeItem.value == this.type.current) {
        this.type.params = typeItem.params
        break
      }
    }
    this.$syncPage()
    if (!unLoadData) {
      return this.$loadData(true)
    }
  }
  $getSearch() {
    if (this.getSearch) {
      return this.getSearch()
    } else {
      return {}
    }
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
    const item = {
      id: resData.pay_id, // 订单id
      ucId: resData.uc_id, // 用户商品id?
      payNo: resData.pay_no, // 订单号
      aliOrderId: resData.pay_order_id, // 手淘订单号
      status: {
        value: resData.status,
        label: statusSelect[resData.status]
      },
      payTime: resData.pay_time, // 支付时间
      expiresTime: resData.expires_time, // 有效时间
      createTime: resData.pay_create_time,
      price: price,
      wash: {
        id: resData.order_id,
        no: resData.order_no, // 洗护
        time: resData.reservation_time, // 预约时间
        createTime: resData.order_time, // 下单时间
      },
      product: productList.parseData(resData)
    }
    if (!item.status.label) {
      console.log(resData.status, item, resData)
    }
    return item
  }
  checkDataCanPay(data) {
    if (data.status.value == 100) {
      const offset = new Date().getTime() - new Date(data.createTime).getTime()
      if (offset < 1000 * 60 * 60) {
        return offset
      } else {
        return false
      }
    } else {
      return false
    }
  }
  formatData(resList = []) {
    let list = []
    for (let i = 0; i < resList.length; i++) {
      list.push(this.$formatItem(resList[i]))
    }
    this.list = list
  }
  payOrder(target) {
    return new Promise((resolve, reject) => {
      if (this.checkDataCanPay(target)) {
        my.tb.orderPay({
          outOrderId: target.payNo,
          orderId: target.aliOrderId,
          fail: (err) => {
            showMsg('支付失败！', 'error')
            console.error(err)
            reject(err)
          },
          success: (res) => {
            this.syncOrder(target.payNo, target.aliOrderId).then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          },
        })
      } else {
        showMsg('订单超时，无法再次支付', 'error')
        this.$syncPage()
        reject()
      }
    })
  }
  $getData() {
    return new Promise((resolve, reject) => {
      // 考虑分页
      this.list = []
      user.auth().then(() => {
        require.post({
          url: '/tb_api/api/Order.php',
          data: {
            ...this.type.params,
            pageNumber: 1,
            pageSize: 50
          },
          timeout: 0,
          token: true
        }).then(res => {
          this.formatData(res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
  // getInfo(payId) {
  //   return new Promise((resolve, reject) => {
  //     user.auth().then(() => {
  //       require.post({
  //         url: '/tb_api/api/Order.php',
  //         data: {
  //           status: 'tradeOrderInfo',
  //           pay_id: payId
  //         },
  //         timeout: 0,
  //         token: true
  //       }).then(res => {
  //         const data = this.$formatItem(res.data)
  //         resolve({ status: 'success', data: data })
  //       }).catch(err => {
  //         reject(err)
  //       })
  //     })
  //   }).catch(err => {
  //     reject(err)
  //   })
  // }
  syncOrder(payNo, aliOrderId) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderQuery",
          pay_no: payNo,
          order_id: aliOrderId
        }
      }).then((res) => {
        resolve({ status: 'success', success: res.data.status == 200 ? true : false, payNo: payNo })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

const orderList = new OrderList({
  prop: 'orderList'
})

export default orderList
