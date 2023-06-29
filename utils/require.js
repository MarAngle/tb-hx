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
      if (requireOption.token === true || requireOption.token === undefined) {
        requireOption.headers.token = this.getToken()
      }
      // if (requireOption.url.indexOf('http://') !== 0 && requireOption.url.indexOf('https://') !== 0) {
      //   requireOption.url = 'https://tb.ihuanxi.cn' + requireOption.url
      //   requireOption.$auto = true
      // }
      requireOption.path = requireOption.url
      delete requireOption.url
      if (requireOption.$fail === undefined) {
        requireOption.$fail = {}
      }
      requireOption.exts = {
        domain: 'https://tb.ihuanxi.cn',
        timeout: 6000
      }

      cloud.application.httpRequest(requireOption).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })

      // return new Promise((resolve, reject) => {
      //   requireOption.success = function(result) {
      //     const res = result.data
      //     if (requireOption.$auto) {
      //       if (res.code == 0) {
      //         resolve(res)
      //       } else {
      //         if (!requireOption.$fail.data) {
      //           showMsg(res.codemsg || '请求失败且无错误信息！', 'fail')
      //         }
      //         reject(res)
      //       }
      //     } else {
      //       resolve(res)
      //     }
      //   }
      //   requireOption.fail = function(err) {
      //     if (!requireOption.$fail.service) {
      //       showMsg('服务器请求失败！' + requireOption.url, 'fail', {
      //         duration: 3000
      //       })
      //       setTimeout(() => {
      //         showMsgAllType(err)
      //       }, 4000)
      //     }
      //     reject(err)
      //   }
      //   try{
      //     my.tb.request(requireOption)
      //   }catch(err) {
      //     console.log(err.message)
      //     showMsgAllType(err.message)
      //     reject(err)
      //   }
      // })
  },
  get(requireOption) {
    requireOption.method = 'GET'
    return this.require(requireOption)
  },
  post(requireOption) {
    requireOption.method = 'POST'
    return this.require(requireOption)
  }
}



export default require
