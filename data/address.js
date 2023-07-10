import BaseData from "../class/BaseData";
import { showAlert, showMsg } from "../utils";
import require from "../utils/require";
import user from "./user";

console.error('检查传参，特别是编辑')

class AddressData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = []
    this.cityMap = {}
    this.location = []
  }
  loadLocation() {
    return new Promise((resolve, reject) => {
      user.auth().then(() => {
        require.post({
          url: '/tb_api/api/Address.php',
          token: true,
          data: {
            status: "getArea"
          }
        }).then((res) => {
          this.location = []
          this.cityMap = {}
          let originList = res.data || []
          for (let i = 0; i < originList.length; i++) {
            const oitem = originList[i]
            const item = {
              value: oitem.province_name,
              label: oitem.province_name,
              id: oitem.province_id,
              load: true,
              children: oitem.city.map(citem => {
                let ccitem = {
                  value: citem.city_name,
                  label: citem.city_name,
                  load: false,
                  id: citem.city_id,
                  children: []
                }
                this.cityMap[oitem.province_name + ccitem.value] = ccitem
                return ccitem
              })
            }
            this.location.push(item)
          }
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
  getCounty(valueList) {
    return new Promise((resolve, reject) => {
      const prop = valueList.join('')
      const cityItem = this.cityMap[prop]
      if (cityItem.load) {
        resolve({ list: cityItem.children })
      } else {
        require.post({
          url: '/tb_api/api/Address.php',
          token: true,
          data: {
            status: "getCounty",
            city_id: cityItem.id
          }
        }).then((res) => {
          cityItem.children = []
          let originList = res.data || []
          for (let i = 0; i < originList.length; i++) {
            const oitem = originList[i]
            const item = {
              value: oitem.county_name,
              label: oitem.county_name,
              id: oitem.county_id,
            }
            cityItem.children.push(item)
          }
          cityItem.load = true
          this.$syncPage()
          resolve({ list: cityItem.children })
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      }
    })
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
            resolve(addressInfo)
            // this.autoBuildData(addressInfo).then(res => {
            //   resolve(res)
            // }).catch(err => {
            //   console.error(err)
            //   reject(err)
            // })
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
  changeItem(addressInfo) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Address.php',
        token: true,
        data: {
          status: "setAddress",
          type: 2,
          ...addressInfo
        }
      }).then((res) => {
        for (let i = 0; i < this.data.length; i++) {
          const item = this.data[i];
          if (item.value == addressInfo.address_id) {
            this.data[i] = this.formatData(addressInfo)
            break
          }
        }
        this.$syncPage()
        resolve()
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  formatData(addressInfo) {
    addressInfo.value = addressInfo.address_id
    addressInfo.totalAddress = (addressInfo.province_name || '') + (addressInfo.city_name || '') + (addressInfo.county_name  || '') + (addressInfo.address || '')
    addressInfo.label = addressInfo.name + '/' + addressInfo.mobile + '/' + addressInfo.totalAddress
    return addressInfo
  }
  deleteItem(index) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Address.php',
        token: true,
        data: {
          status: "delAddress",
          address_id: this.data[index].value
        }
      }).then((res) => {
        this.data.splice(index, 1)
        this.$syncPage()
        resolve()
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
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
