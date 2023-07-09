import BaseData from "../class/BaseData";
import { showAlert, showMsg } from "../utils";
import require from "../utils/require";
import user from "./user";

class AddressData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = []
  }
  choiceData() {
    return new Promise((resolve, reject) => {
      my.authorize({
        scopes: ['scope.addressList'],
        success: () => {
          my.tb.chooseAddress({}, (res) => {
            const addressInfo = {
              name: res.name,
              mobile: res.telNumber,
              province_name: res.provinceName	,
              city_name: res.cityName,
              county_name: res.countyName,
              address: res.streetName + res.detailInfo
            }
            this.autoBuildData(addressInfo).then(res => {
              resolve(res)
            }).catch(err => {
              console.error(err)
              reject(err)
            })
          }, (err) => {
            reject(err)
          })
        },
        fail:(err)=>{
          console.log(err)
          reject(err)
        }
      })
    })
  }
  autoBuildData(addressInfo) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i];
        if (item.name == addressInfo.name && item.mobile == addressInfo.mobile && item.province_name == addressInfo.province_name && item.city_name == addressInfo.city_name && item.county_name == addressInfo.county_name && item.address == addressInfo.address) {
          resolve(item)
          return
        }
      }
      this.buildItem(addressInfo).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  buildItem(addressInfo) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Address.php',
        token: true,
        data: {
          status: "setAddress",
          type: 1,
          ...addressInfo
        }
      }).then((res) => {
        let id = res.data.address_id
        addressInfo.address_id = id
        this.data.push(this.formatData(addressInfo))
        this.$syncPage()
        resolve(addressInfo)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  formatData(addressInfo) {
    addressInfo.value = addressInfo.address_id
    addressInfo.label = addressInfo.name + '/' + addressInfo.mobile + '/' + addressInfo.province_name + addressInfo.city_name + addressInfo.county_name + addressInfo.address
    return addressInfo
  }
}

const address = new AddressData({
  prop: 'address',
  getData() {
    return new Promise((resolve, reject) => {
      user.auth().then(() => {
        require.post({
          url: '/tb_api/api/Address.php',
          token: true,
          data: {
            status: "showAddress",
          }
        }).then((res) => {
          this.data = []
          let originList = res.data || []
          for (let i = 0; i < originList.length; i++) {
            this.formatData(originList[i])
          }
          this.data = originList
          this.$syncPage()
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
})

export default address
