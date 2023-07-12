import orderInfo from "../../data/orderInfo";
import orderList from "../../data/orderList";

Component({
  mixins: [],
  data: {
    showPay: false
  },
  props: {},
  didMount() {
    const data = this.props.data
    if (!this.props.show) {
      this.setData({
        showPay: !!orderList.checkDataCanPay(data)
      })
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    payOrder() {
      orderList.$triggerMethod('payOrder', [this.props.data], true).then((res) => {
        if (res.success) {
          my.navigateTo({
            url: '/pages/pay/success'
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    useOrder() {
      // orderInfo.setData(this.props.data)
      orderInfo.setId(this.props.data.id)
      my.navigateTo({
        url: '/pages/order/use/index'
      });
    },
    toDetail() {
      // orderInfo.setData(this.props.data)
      orderInfo.setId(this.props.data.id)
      my.navigateTo({
        url: '/pages/order/detail/index'
      })
    }
  },
});