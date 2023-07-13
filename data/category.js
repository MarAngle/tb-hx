import BaseData from "../class/BaseData";
import require from "../utils/require";

class CategoryData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = {
      left: {
        name: '衣鞋洗护服务',
        id: 1,
        icon: ''
      },
      rightTop: {
        name: '家纺洗护服务',
        id: 2,
        icon: ''
      },
      rightBottom: {
        name: '奢品养护',
        id: 3,
        icon: ''
      }
    }
  }
}

const category = new CategoryData({
  prop: 'category',
  getData() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/TradeItem.php',
        data: {
          status: 'showZone'
        },
        timeout: 0,
        token: true
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const oitem = res.data[i];
          if (oitem.zone_id == 1) {
            this.data.left.name = oitem.zone_name
            this.data.left.icon = oitem.zone_picture
          } else if (oitem.zone_id == 2) {
            this.data.rightTop.name = oitem.zone_name
            this.data.rightTop.icon = oitem.zone_picture
          } else if (oitem.zone_id == 3) {
            this.data.rightBottom.name = oitem.zone_name
            this.data.rightBottom.icon = oitem.zone_picture
          }
        }
        this.$syncPage()
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
})

export default category
