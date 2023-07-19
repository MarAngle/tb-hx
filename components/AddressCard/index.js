import address from "../../data/address";
import { confirm } from "../../utils";

Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    toInfo() {},
    onChange(e) {
      const index = e.target.dataset.index
      const item = address.data[index]
      let str = ''
      for (const prop in item) {
        str += `${prop}=${item[prop]}&`
      }
      my.navigateTo({
        url: `/pages/address/edit?${str}`
      })
    },
    onDelete(e) {
      confirm('确认进行地址删除操作吗？', (act) => {
        if (act == 'ok') {
          const index = e.target.dataset.index
          address.deleteItem(index)
        }
      })
    },
  },
});