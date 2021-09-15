import Vue from 'vue'
// import App from './SqlPanel/Index.vue'
// import App from './components/ztree/ZTree.vue'
// import App from './components/rxjs/RxJsDemo'
// import App from './components/g6'
import App from './components/Nprogress'

require('./mock');

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import _ from 'lodash'
Vue.prototype._ = _

new Vue({
  render: h => h(App),
}).$mount('#app')
