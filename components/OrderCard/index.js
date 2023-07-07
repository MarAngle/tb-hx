import orderInfo from "../../data/orderInfo";

Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    // console.log('item', this.props)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    use() {
      my.navigateTo({
        url: '/pages/order/reservation/reservation'
      });
    },
    toDetail() {
      my.navigateTo({
        url: '/pages/order/detail/detail'
      })
    }
  },
});