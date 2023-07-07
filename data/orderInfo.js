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
}

const orderInfo = new OrderInfo({
  prop: 'orderInfo'
})

export default orderInfo
