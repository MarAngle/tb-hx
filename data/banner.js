import BaseData from "../class/BaseData";
import requireS from "../utils/require";

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
      // require.get({
      //   url: 'https://ihuanxi.cn',
      //   headers: {},
      //   data: {},
      //   timeout: 0,
      //   dataType: '',
      //   token: false
      // }).then(res => {
      //   resolve(res)
      // }).catch(err => {
      //   reject(err)
      // })
      setTimeout(() => {
        this.list = [
          {
            id: 1,
            product: 300000000009,
            icon: require('/image/test/banner1.jpg')
          },
          {
            id: 2,
            product: 300000000007,
            icon: require('/image/test/banner2.jpg')
          },
          {
            id: 3,
            product: 300000000017,
            icon: require('/image/test/banner3.jpg')
          },
        ]
        resolve()
      }, 0)
    })
  }
})

export default banner
