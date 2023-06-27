import { toLogin } from "../../utils";

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
      my.navigateTo({
        url: '/pages/product/detail/index?id=' + this.props.data.id
      })
      // toLogin()
    },
  },
});