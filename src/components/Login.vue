<template>
  <el-container class="container">
    <el-main>
      <div class="bg"></div>
      <el-row>
        <el-col :span="24">
          <div class="title">
            {{title}}
          </div>
          <div class="content">
            <el-row>
              <el-col>
                <div class="content_title">
                  用户登录
                </div>
              </el-col>
            </el-row>

            <el-form ref="form" :model="form" label-width="60px" size="small">
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mediual" @click.native="login">登录</el-button>
                <el-checkbox v-model="form.checked">记住密码</el-checkbox>
              </el-form-item>
            </el-form>
          </div>
          <div class="footer">
            2018@贵州黔信数据有限公司
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default{
    data () {
      return {
        title: '贵州省重点用能单位能耗在线监测平台',
        form: {
          username: '',
          password: '',
          checked: false,
        }
      }
    },
    methods: {
      login(){
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bg
    background-image: url('../assets/pages/imgs/login.png');
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center center;
    position: fixed;
    top: 0
    left 0
    width 100%
    height 100%

  .content
    background-color: #fff;
    width: 360px;
    margin: 0 auto;
    margin-bottom: 0px;
    padding: 20px;
    padding-top: 20px;
    padding-bottom: 15px;
    .content_title
      font-weight: 300;
      margin-bottom: 25px;
      color: #32c5d2
      font-size: 24px;
      margin-top: 20px;
      text-align center

  .title
    margin: 60px auto 20px auto;
    padding: 15px;
    text-align: center;
    font-size: 36px;
    color: #fff;

  .footer
    text-align: center;
    margin: 0 auto;
    padding: 10px;
    color: #999;
    font-size: 13px;

</style>
