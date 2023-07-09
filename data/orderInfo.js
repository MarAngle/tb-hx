import BaseData from "../class/BaseData";
import { showAlert, showMsg } from "../utils";
import require from "../utils/require";

class OrderInfo extends BaseData{
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
  useOrder(data) {
    return new Promise((resolve, reject) => {
      console.log(data, this.data)
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeWashOrderCreate",
          send: data.send,
          back: data.back,
          reservation_time: data.time,
          remark: data.remark,
          uc_id: this.data.ucId,
          sku_id: this.data.product.skuId,
          freight: this.data.price.freight
        }
      }).then((res) => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

const orderInfo = new OrderInfo({
  prop: 'orderInfo'
})

export default orderInfo
