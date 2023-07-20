import BaseData from "../class/BaseData";
import require from "../utils/require";

class BannerData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.list = []
  }
}

const banner = new BannerData({
  prop: 'banner',
  getData() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/TradeItem.php',
        data: {
          status: 'showSwiper'
        },
        timeout: 0,
        token: false
      }).then(res => {
        let originList = res.data || []
        this.list = originList
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
})

export default banner
