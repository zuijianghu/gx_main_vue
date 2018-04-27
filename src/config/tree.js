/**
 * Created by hasee on 2018/4/24.
 */

export default{
  install(Vue){
    Vue.component('dxcr-tree',{
      props: ['model'],
      template:' <el-menu default-active="2" style="height: 100%" @select="addTab($event)"> <template v-for="item in model"> <el-submenu v-if="item.children" :index="item.id"> <template slot="title"> <i class="el-icon-location"></i> <span>{{item.text}}</span> </template><dxcr-tree :model="item.children"> </dxcr-tree> </el-submenu> <el-menu-item v-else :index="item.id"> <i class="el-icon-menu"></i> <span slot="title">{{item.text}}</span> </el-menu-item> </template> </el-menu>'
    })
  }
}
