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
      this.list = [
        {
          name: '衣鞋洗护专区',
          id: 1,
          icon: ''
        },
        {
          name: '家纺专区',
          id: 2,
          icon: ''
        },
        {
          name: '奢护专区',
          id: 3,
          icon: ''
        },
      ]
      console.log(this)
      resolve()
    })
  }
})

export default banner
