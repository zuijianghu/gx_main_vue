<template>
  <el-container style="height: 100vh">
    <el-header>
      <div class="header">
        <el-row>
          <el-col>

            <div class="header_title">
              <el-menu default-active="1" mode="horizontal" @select="select">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">我的工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item style="float:right" index="3">贵州省重点用能单位能耗在线监测平台</el-menu-item>
              </el-menu>
            </div>

          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-container class="content">
      <el-aside>
        <div class="aside">
          <el-menu :default-active="menuIndex" style="height: 100%" @select="addTab">
            <dxcr-tree :model="menus">
              <!--<el-menu-->
              <!--default-active="2" style="height: 100%" @select="addTab($event)">-->
              <!--<template v-for="item in model">-->
              <!--<el-submenu v-if="item.children" :index="item.id">-->
              <!--<template slot="title">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>{{item.text}}</span>-->
              <!--</template>-->
              <!--<dxcr-tree :model="item.children">-->

              <!--</dxcr-tree>-->
              <!--</el-submenu>-->
              <!--<el-menu-item v-else :index="item.id">-->
              <!--<i class="el-icon-menu"></i>-->
              <!--<span slot="title">{{item.text}}</span>-->
              <!--</el-menu-item>-->
              <!--</template>-->
              <!--</el-menu>-->
            </dxcr-tree>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <div class="main">
          <el-tabs type="border-card" v-model="tabIndex" editable @tab-remove="removeTab">
            <el-tab-pane v-for="item in tabs"
                         :key="item.name"
                         :label="item.title"
                         :name="item.name" :url="item.url" :ref="item.title">
              <template v-if="isVue(item.url)" >
                <component v-bind:is="item.vue"></component>
              </template>
              <template v-else>
                <div v-html="item.content">

                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import $ from "jquery";
  import Config from '@/config/config.js'
  let vm;
  export default{
    data () {
      return {
        tabView: 'Test',
        tabs: [{
          title: '我的行程',
          name: '我的行程',
          content: '我的行程',
        }, {
          title: '消息中心',
          name: '消息中心',
          content: '消息中心',
        }, {
          title: '角色管理',
          name: '角色管理',
          content: '我角色管理',
        }, {
          title: '定时任务补偿',
          name: '定时任务补偿',
          content: '定时任务补偿',
        }],
        tabIndex: '角色管理',
        menuIndex: '',
        menus: []
      }
    },
    computed: {},
    methods: {
      removeTab(targetName) {
        let tabs = this.tabs;
        let activeName = this.tabIndex;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName
            ) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
          ;
        }
        this.tabIndex = activeName;
        this.tabs = tabs.filter(tab => tab.name !== targetName);
      },
      addTab(targetName) {
        let arr =[];
        arr.push( this.menus);
        let url="";
        while (arr.length > 0 && url=="") {
          let arr1 = [];
          for (let i in arr) {
            let item = arr[i];
            for (let j in item) {
              let item1 = item[j];
              let children = item1.children;
              if (children) {
                arr1.push(item1.children);
              }else{
                if(targetName==item1.text){
                  url=item1.url;
                  break;
                }
              }
            }
          }
          arr = arr1;
        }
        //添加tab
        let newTabName = targetName;
        let tabs = vm.tabs;
        let b = tabs.some(val => val.name == newTabName)
        if (!b) {
          vm.tabs.push({
            title: newTabName,
            name: newTabName,
            content:'你好',
            url: url
          });

          //设置tab内容
          this.$http.get( url).then(res=> {
            vm.tabs.forEach((val,index)=>{
              if(val.title==targetName){
                let content=res.body;
                vm.tabs[index].content=content;
                console.log()
                let r = /<script[^>]*>([^<]*)<\/script>/g;
                let scripts=content.match(r);
                Vue.nextTick(()=>{
                  // DOM 更新了
                  //当前tab对象
                  var dom = this.$refs[targetName][0].$el;
                  scripts.forEach(val=>{
                    $(dom).append($(val));
                  })
                })
              }
            })


          }, res=> {
            const loading = this.$loading({
              lock: true,
              text: '请求失败(━┳━ _ ━┳━)',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 2000);
          })
        }



        vm.tabIndex = newTabName;
      },
      select(){

      },
      asideSelect(index, indexPath){
        console.log(index)
      },
      isVue (url) {
        if(!url){
          return false;
        }
        let r = /.jsp$/;
        return !r.test(url);
      },
      addt(event){
        console.log(event)
      }
    },
    components: {
      'dxcr-tree': {
        props: ['model'],
        name: 'dxcr-tree',
        template: '<div><template v-for="item in model"> <el-submenu v-if="item.children" :index="item.text" :url="item.url"> <template slot="title"> <i class="el-icon-location"></i> <span>{{item.text}}</span> </template><dxcr-tree :model="item.children"> </dxcr-tree> </el-submenu> <el-menu-item v-else :index="item.text" :url="item.url"> <i class="el-icon-menu"></i> <span slot="title">{{item.text}}</span> </el-menu-item> </template></div>'
      }
    },
    mounted(){
      this.$http.get(Config.path + '/menu').then(res=> {
        this.menus = res.body.menus;
        this.menuIndex = res.body.menus[0].text;
      }, res=> {
        const loading = this.$loading({
          lock: true,
          text: '请求失败(━┳━ _ ━┳━)',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      })
    },
    beforeCreate(){
      vm = this;
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main
    width 100%
    height 100%

  .aside
    width 100%
    height 100%

  .header
    width 100%
    height 100%
    .header_title
      float left
      width: 100%

  .content
    padding-top: 1px;
</style>
