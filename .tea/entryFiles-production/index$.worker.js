/**! __BUGME_START__ */ !function(){"use strict";var e,n,t,o,r,a,i,c,s,u;!function(e){e.PageResume="pageResume",e.PagePause="pagePause",e.DebugPanelClick="tinyRemoteDebugPanelButtonClick",e.DebugConsole="onTinyDebugConsole",e.DebugNetworkRequest="tinyAppRemoteDebug_network_request",e.DebugNetworkResponse="tinyAppRemoteDebug_network_response",e.DebugNetworkError="tinyAppRemoteDebug_network_error",e.DebugStorageChanged="tinyAppRemoteDebug_storage",e.MessageFromVConsole="onMessageFromVConsole"}(e||(e={})),function(e){e.GetPagesData="Tiny.Data.getPageData",e.SetPageData="Tiny.Data.setPageData"}(n||(n={})),function(e){e.DataChanged="Tiny.Data.dataChanged"}(t||(t={})),function(e){e.GetStorageInfo="Tiny.Storage.getStorageInfo",e.ClearStorage="Tiny.Storage.clearStorage",e.RemoveStorage="Tiny.Storage.removeStorage",e.SetStorage="Tiny.Storage.setStorage"}(o||(o={})),function(e){e.StorageChanged="Tiny.Storage.storageChanged"}(r||(r={})),function(e){e.Enable="MiniAppLog.enable"}(a||(a={})),function(e){e.ApiSyncCall="MiniAppLog.onApiSyncCall",e.ApiSyncCallback="MiniAppLog.onApiSyncCallback",e.ApiCall="MiniAppLog.onApiCall",e.ApiCallback="MiniAppLog.onApiCallback",e.SetData="MiniAppLog.onSetData",e.SetDataCallback="MiniAppLog.onSetDataCallback",e.ShareAppMessage="MiniAppLog.onShareAppMessage"}(i||(i={})),function(e){e.consoleAPICalled="Runtime.consoleAPICalled",e.executionContextDestroyed="Runtime.executionContextDestroyed",e.executionContextsCleared="Runtime.executionContextsCleared",e.executionContextCreated="Runtime.executionContextCreated"}(c||(c={})),function(e){e.RequestWillBeSent="Network.requestWillBeSent",e.ResponseReceived="Network.responseReceived",e.LoadingFinished="Network.loadingFinished",e.LoadingFailed="Networkw.loadingFailed",e.GetResponseBody="Network.getResponseBody"}(s||(s={})),function(e){e.Data="data",e.Storage="storage",e.AppLog="applog"}(u||(u={}));var l=self,g="\\x"+("0"+"~".charCodeAt(0).toString(16)).slice(-2),p="\\"+g,f=new RegExp(g,"g"),d=new RegExp(p,"g"),y=new RegExp("(?:^|([^\\\\]))"+p),h=[].indexOf||function(e){for(var n=this.length;n--&&this[n]!==e;);return n},C=String;function m(e,n,t){return n instanceof Array?function(e,n,t){for(var o=0,r=n.length;o<r;o++)n[o]=m(e,n[o],t);return n}(e,n,t):n instanceof C?n.length?t.hasOwnProperty(n)?t[n]:t[n]=function(e,n){for(var t=0,o=n.length;t<o;e=e[n[t++].replace(d,"~")]);return e}(e,n.split("~")):e:n instanceof Object?function(e,n,t){for(var o in n)n.hasOwnProperty(o)&&(n[o]=m(e,n[o],t));return n}(e,n,t):n}var S={stringify:function(e,n,t,o){return S.parser.stringify(e,function(e,n,t){var o,r,a=!1,i=!!n,c=[],s=[e],u=[e],l=[t?"~":"[Circular]"],d=e,y=1;return i&&(r="object"==typeof n?function(e,t){return""!==e&&n.indexOf(e)<0?void 0:t}:n),function(e,n){return i&&(n=r.call(this,e,n)),a?(d!==this&&(o=y-h.call(s,this)-1,y-=o,s.splice(y,s.length),c.splice(y-1,c.length),d=this),"object"==typeof n&&n?(h.call(s,n)<0&&s.push(d=n),y=s.length,(o=h.call(u,n))<0?(o=u.push(n)-1,t?(c.push((""+e).replace(f,g)),l[o]="~"+c.join("~")):l[o]=l[0]):n=l[o]):"string"==typeof n&&t&&(n=n.replace(g,p).replace("~",g))):a=!0,n}}(e,n,!o),t)},parse:function(e,n){return S.parser.parse(e,function(e){return function(n,t){var o="string"==typeof t;return o&&"~"===t.charAt(0)?new C(t.slice(1)):(""===n&&(t=m(t,t,{})),o&&(t=t.replace(y,"$1~").replace(p,g)),e?e.call(this,n,t):t)}}(n))},parser:JSON},b=S.stringify,A=l.fetch,D=l.AlipayJSBridge&&l.AlipayJSBridge.call;function v(e,n){if(A){var t=encodeURIComponent(JSON.stringify({action:"internalAPI",data:{method:e,param:n}}));A("https://alipay.kylinBridge/?data="+t,{mode:"no-cors"}).then((function(){})).catch((function(){}))}else D&&D("internalAPI",{method:e,param:n})}function R(e,n){return void 0===n?"©undefined":null===n?"©null":n===-1/0?"©-Infinity":n===1/0?"©Infinity":"number"==typeof n&&isNaN(n)?"©NaN":"function"==typeof n?"©Function":n}var k=Function;function w(){l.document&&l.document.addEventListener("push",(function(e){var n=e.data;if(n&&"onMessageFromVConsole"===n.func){var t;try{var o=n.param.content||n.param.data.content;if(!o)return;t=JSON.parse(o)}catch(e){return}if(t.fromVConsoleToWorker&&"exec"===t.method)try{new k("requestId","sendBack","var res = "+t.script+";console.log(res);")(t.requestId,(function(e){return function(e,n){v("tinyDebugConsole",{type:"msgFromWorkerToVConsole",content:b({requestId:e,returnValue:n},R)})}(t.requestId,e)}))}catch(e){console.warn("bugme execute script error",e)}}}))}if(!l.__BUGME_ON__){l.__BUGME_ON__=!0;try{w(),Object.defineProperties(console,["log","info","error","debug","warn"].reduce((function(e,n){var t=console[n];return e[n]={value:function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];t.apply(console,e);try{var r=b(e.map((function(e){return e instanceof Error?e.name+": "+e.message:e})),R);v("tinyDebugConsole",{content:r,type:"console_"+n})}catch(e){t("bugme console error",e)}},configurable:!0,writable:!0,enumerable:!0},e}),{}))}catch(e){console.warn("bugme init error",e)}}}();
 /**! __BUGME_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/ProductCard/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/AddressCard/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/OrderCard/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/OrderList/index?hash=95dc1a030cf80ae3c7e0cf28e5258515304a09db');
require('../../node_modules/antd-mini/es/Input/index?hash=749bba9d48276e5b3ca959928cddef5b7b4ff081');
require('../../node_modules/antd-mini/es/Popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Picker/index?hash=1e26405b939fb0f22fa79dc760b5c89d57a15021');
require('../../node_modules/antd-mini/es/Picker/CascaderPicker/index?hash=ce5e8ad2c21f10561d6cfd032c3c5791eebae5b0');
require('../../node_modules/antd-mini/es/ImageIcon/index?hash=29405bd980ba4d90793807e2489d99b5efa35acc');
require('../../node_modules/antd-mini/es/List/ListItem/index?hash=25606318477a8ae0864d3c17a3cc4f886de26c65');
require('../../node_modules/antd-mini/es/List/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/antd-mini/es/Button/index?hash=dc16c4564261c93d3748f79b0e515f4d4859b95c');
require('../../node_modules/antd-mini/es/DatePicker/index?hash=ce5e8ad2c21f10561d6cfd032c3c5791eebae5b0');
require('../../node_modules/antd-mini/es/Modal/index?hash=66f61bb6a8cbdd234070309f54142d70e7b16b1a');
require('../../node_modules/antd-mini/es/Rate/index?hash=749bba9d48276e5b3ca959928cddef5b7b4ff081');
require('../../node_modules/antd-mini/es/Steps/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/home/index?hash=c125e432b75928b6fb33e4cccd11eb3890b5a4df');
require('../../pages/login/index?hash=8385356bd8b4ca9fa87738563e035351b35a7175');
require('../../pages/address/index?hash=fd04843125164e493fce761825d980dc7ad7d62b');
require('../../pages/order/index?hash=8c997138e47743dfd962708fcb1d6094f360f759');
require('../../pages/mine/mine?hash=8385356bd8b4ca9fa87738563e035351b35a7175');
require('../../pages/pay/success?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/address/edit?hash=c39c3ff51248f88f25a75da13ac17d470086842e');
require('../../pages/product/index?hash=c125e432b75928b6fb33e4cccd11eb3890b5a4df');
require('../../pages/product/detail/index?hash=c69313cc54437c71a485cfd30859109bcd38f3a0');
require('../../pages/mine/collect/collect?hash=8385356bd8b4ca9fa87738563e035351b35a7175');
require('../../pages/mine/info/info?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/payment/payment?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/set?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/feedback/feedback?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/about/about?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/about/policy/policy?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/about/agreement/agreement?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/cred/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/set/account/account?hash=8385356bd8b4ca9fa87738563e035351b35a7175');
require('../../pages/mine/help/help?hash=8385356bd8b4ca9fa87738563e035351b35a7175');
require('../../pages/mine/help/artificial/artificial?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/order/use/index?hash=97b3c6b644b7e81c30413b78a0c76307cd3f34cc');
require('../../pages/order/detail/index?hash=86d10d538f1f738fad384bdbaf99d2cf51396ab0');
require('../../pages/order/refund/refund?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/web/customer?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}