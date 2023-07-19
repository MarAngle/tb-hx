
import address from "../../data/address";
import { confirm } from "../../utils";

Page({
  data: {
    [address.$prop]: address,
  },
  onLoad() {
    address.$appendPage(this)
    address.$reloadData(true)
  },
  $onAddressCardChange(e) {
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
  $onAddressCardDelete(e) {
    confirm('确认进行地址删除操作吗？', (act) => {
      if (act == 'ok') {
        const index = e.target.dataset.index
        address.deleteItem(index)
      }
    })
  },
  onShow() {},
  onBuild() {
    my.navigateTo({
      url: '/pages/address/edit'
    });
  }
})