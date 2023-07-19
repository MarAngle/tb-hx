
Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onTap() {
      if (this.$page.$onAddressCardTap) {
        this.$page.$onAddressCardTap(this.props)
      }
    },
    onChange(e) {
      if (this.$page.$onAddressCardChange) {
        this.$page.$onAddressCardChange(e)
      }
    },
    onDelete(e) {
      if (this.$page.$onAddressCardDelete) {
        this.$page.$onAddressCardDelete(e)
      }
    },
  },
});