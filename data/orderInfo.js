import BaseData from "../class/BaseData";
import require from "../utils/require";
import { statusSelect } from "./orderList";
import productList from "./productList";
import user from "./user";

// back: {name: "测试", mobile: "18303335898", address: null}
// commodity_id: "5"
// commodity_marketing: "拒用“四氯" 健康洗"
// commodity_marketing_id: "1"
// commodity_name: "测试套餐"
// commodity_resourceniche_id: "1"
// commodity_zone_id: "0"
// create_time: "0000-00-00 00:00:00"
// detail_pic: []
// effective_day: "365"
// evaluate: "99"
// expires_time: "2023-07-11 15:47:04"
// freight: "0"
// main_pic: ["https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01zEp6s42GMyEooO4qb_!!2215920109002-0-wsb.jpg"]
// model_id: "3000000535"
// order_by: "1"
// order_id: "13"
// order_no: "tb10000013230711182350"
// order_time: "2023-07-11 18:23:50"
// original_price: "1"
// pay_amount: "1"
// pay_id: "119"
// pay_no: "23071115464810011966926"
// pay_number: "1"
// pay_order_id: "3430581480199828446"
// pay_time: "2023-07-11 15:47:04"
// reservation_time: "2023-10-11 17:00:00"
// sale_status: "1"
// selling_price: "1"
// send: {name: "测试", mobile: "18303335898", address: "无盐"}
// sku_id: "92001008"
// sold_quantity: "1234"
// status: 201
// status_info: {process: null, process_desc: null}
// uc_id: "12"
// waybill_back: ""
// waybill_send: "SF8880628048"

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
      require.post({
        url: '/tb_api/api/Order.php',
        data: {
          status: 'tradeOrderInfo',
          pay_id: this.id
        },
        timeout: 0,
        token: true
      }).then(res => {
        this.data = this.$formatItem(res.data)
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
        list: []
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
}

const orderInfo = new OrderInfo({
  prop: 'orderInfo',
  getData() {
    return this.getInfo()
  }
})

export default orderInfo
