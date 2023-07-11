
import address from "../../data/address";
import { showMsg } from "../../utils";

Page({
  data: {
    [address.$prop]: address,
    county: [],
    id: undefined,
    form: {
      name: '',
      mobile: '',
      provinceCity: [],
      county: undefined,
      address: ''
    }
  },
  onLoad(query) {
    if (query && query.value) {
      this.initData(query)
      this.data.id = query.value
    } else {
      this.data.id = undefined
    }
    this.setData({
      id: this.data.id
    })
  },
  initData(defaultData) {
    console.log(defaultData)
    this.data.form.name = defaultData.name
    this.data.form.mobile = defaultData.mobile
    this.data.form.provinceCity = [defaultData.province_name, defaultData.city_name]
    this.data.form.county = defaultData.county_name
    this.data.form.address = defaultData.address
    address.getCounty(this.data.form.provinceCity).then(res => {
      this.data.county = res.list
      this.setData({
        county: this.data.county
      })
    })
    this.setData({
      form: this.data.form
    })
  },
  onSync() {
    address.choiceData().then(res => {
      this.initData(res)
      address.getCounty(this.data.form.provinceCity).then(res => {
        this.data.county = res.list
        this.setData({
          county: this.data.county
        })
      })
      this.setData({
        form: this.data.form
      })
      console.log(this.data)
    })
  },
  onShow(query) {
    address.$appendPage(this)
    address.loadLocation()
  },
  onLocationChange(valueList) {
    this.data.county = []
    this.data.form.provinceCity = valueList
    this.data.form.county = undefined
    this.setData({
      form: this.data.form,
      county: this.data.county
    })
    address.getCounty(valueList).then(res => {
      this.data.county = res.list
      this.setData({
        county: this.data.county
      })
    })
  },
  onCountyChange(value) {
    this.data.form.county = value
    this.setData({
      form: this.data.form
    })
  },
  onNameChange(value) {
    this.data.form.name = value
    this.setData({
      form: this.data.form
    })
  },
  onMobileChange(value) {
    this.data.form.mobile = value
    this.setData({
      form: this.data.form
    })
  },
  onAddressChange(value) {
    this.data.form.address = value
    this.setData({
      form: this.data.form
    })
  },
  onBuild() {
    if (!this.data.form.name) {
      showMsg('请输入姓名')
    } else if (!this.data.form.mobile) {
      showMsg('请输入手机号')
    } else if (this.data.form.provinceCity.length != 2) {
      showMsg('请选择城市')
    } else if (!this.data.form.county) {
      showMsg('请选择县区')
    } else if (!this.data.form.address) {
      showMsg('请输入详细地址')
    } else if (!this.id) {
      address.buildItem({
        name: this.data.form.name,
        mobile: this.data.form.mobile,
        province_name: this.data.form.provinceCity[0],
        city_name: this.data.form.provinceCity[1],
        county_name: this.data.form.county,
        address: this.data.form.address,
      }).then(() => {
        my.navigateBack()
      })
    } else {
      address.changeItem({
        address_id: this.id,
        name: this.data.form.name,
        mobile: this.data.form.mobile,
        province_name: this.data.form.provinceCity[0],
        city_name: this.data.form.provinceCity[1],
        county_name: this.data.form.county,
        address: this.data.form.address,
      }).then(() => {
        my.navigateBack()
      })
    }
  }
})