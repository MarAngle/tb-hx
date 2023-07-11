import productInfo from "../../data/productInfo";

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
    toInfo() {
      productInfo.setData(this.props.data)
      // my.navigateTo({
      //   url: '/pages/product/detail/index?id=' + this.props.data.id
      // })
      my.navigateTo({
        url: '/pages/product/detail/index'
      })
      // toLogin()
    },
  },
});