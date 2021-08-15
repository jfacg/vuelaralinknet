import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
// import colors from 'vuetify/lib/util/colors'
import pt from 'vuetify/lib/locale/pt'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: false },
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'md'
  }
})
