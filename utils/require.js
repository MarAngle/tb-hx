import { getLocal, setLocal, showMsg } from "."
import cloud from '@tbmp/mp-cloud-sdk'

cloud.init({
  env: 'test' 
});

export const data = {
  token: undefined,
  refresh: undefined
}

export const getToken = function() {
  token.data = data
  getLocal('token', data)
}
export const getRefreshToken = function(refreshToken) {
  token.refresh = refreshToken
  getLocal('refreshToken', refreshToken)
}

const showMsgAllType = function(data) {
  if (typeof data === 'object') {
    showMsg(JSON.stringify(data), undefined, {
      duration: 9000
    })
  } else {
    showMsg(data, undefined, {
      duration: 9000
    })
  }
}

const require = {
  token: {
    data: undefined,
    refresh: undefined
  },
  setToken(token) {
    this.token.data = token
    setLocal('token', token)
  },
  setRefreshToken(refresh) {
    this.token.refresh = refresh
    setLocal('refresh', refresh)
  },
  getToken() {
    if (!this.token.data) {
      this.token.data = getLocal('token')
    }
    return this.token.data
  },
  getRefreshToken() {
    if (!this.token.refresh) {
      this.token.refresh = getLocal('refresh')
    }
    return this.token.refresh
  },
  require(requireOption) {
    return new Promise((resolve, reject) => {
      if (!requireOption.data) {
        requireOption.body = {}
      } else {
        requireOption.body = requireOption.data
        delete requireOption.data
      }
      if (!requireOption.headers) {
        requireOption.headers = {}
      }
      requireOption.headers["Content-Type"] = "application/json;charset=UTF-8"
      if (requireOption.token === true || requireOption.token === undefined) {
        requireOption.headers.token = this.getToken()
      }
      requireOption.path = requireOption.url
      const fail = requireOption.fail
      delete requireOption.token
      delete requireOption.url
      delete requireOption.fail
      requireOption.exts = {
        domain: 'https://tb.ihuanxi.cn',
        timeout: 6000
      }
      cloud.application.httpRequest(requireOption).then(res => {
        res = JSON.parse(res)
        if (res.success) {
          resolve(res)
        } else {
          if (fail === undefined || fail.show === undefined || fail.show) {
            showMsg(res.errorMessage || '请求失败且无错误信息！', 'fail')
          }
          reject(res)
        }
      }).catch(err => {
        console.log(err)
        if (fail === undefined || fail.show === undefined || fail.show) {
          showMsg('请求失败！', 'fail')
        }
        reject(err)
      })
    })
  },
  get(requireOption) {
    requireOption.method = 'GET'
    return this.require(requireOption)
  },
  post(requireOption) {
    requireOption.method = 'POST'
    return this.require(requireOption)
  },
  top({api, scope}) {
    return new Promise((resolve, reject) => {
      cloud.topApi.invoke({  
        api: api,  
        authScope: scope  
      }).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        my.alert({ content: 'error ' + err.message })
        reject(err)
      })
    })
  }
}



export default require
