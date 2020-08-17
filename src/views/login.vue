<template>
  <div class="fill-contain"
       :style="{backgroundImage: 'url(' + backgroundImg + ')', backgroundSize:'cover',backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat'}">
    <div class="form-container">
      <el-tabs v-model="activeName" :stretch="true" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户名登陆" name="first">
          <section class="main-form">
            <el-form :model="loginForm" style="padding-top: 30px" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input v-model="loginForm.name" placeholder="请输入用户名"
                          prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                          clearable/>
              </el-form-item>
              <el-form-item style="margin-bottom: 20px;" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                          prefix-icon="el-icon-wqs-suoding"
                          clearable/>
              </el-form-item>
              <sliding-verification ref="slidingVerification" :key="timer2"></sliding-verification>
              <el-form-item style="margin-bottom: 5px;">
                <el-link :underline="false" style="float: left;margin-left: 10px" @click="register">没有账号？点击注册</el-link>
                <el-checkbox style="float: right;margin-right: 10px">记住密码</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" @click="login('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </section>
        </el-tab-pane>
        <el-tab-pane label="手机验证码登录" name="second">
          <section class="main-form">
            <el-form :model="codeLoginForm" ref="codeLoginForm" :rules="codeLoginRules" style="margin-top: 30px">
              <el-form-item prop="phoneNumber">
                <el-input v-model="codeLoginForm.phoneNumber" prefix-icon="el-icon-wqs-Mobile" placeholder="请输入手机号"
                          clearable></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input v-model="codeLoginForm.verifyCode" style="width: 200px" class="el-input-verify-code"
                          prefix-icon="el-icon-wqs-yanzhengma3" placeholder="输入右侧图形验证码" clearable></el-input>
                <i style="float: right;margin: 12px;cursor: pointer;" class="el-icon-wqs-shuaxin"
                   @click="refreshVCode"></i>
                <valid-code ref="validCode" style="float: right" @update:value="compareVCode"></valid-code>
              </el-form-item>
              <el-alert style="margin-bottom: 10px;" :title="alertContext" type="warning" show-icon v-show="alert"
                        :closable="false"></el-alert>
              <el-form-item prop="phoneCode">
                <el-input v-model="codeLoginForm.phoneCode" class="el-input-verify-code"
                          prefix-icon="el-icon-wqs-yanzhengma4" placeholder="请输入手机短信验证码"
                          clearable></el-input>
                <el-button v-show="show" class="el-button-verify-code" @click="getCode">获取短信验证码</el-button>
                <span v-show="!show" class="el-button-verify-code cant-select">{{count + 's后可重新发送'}}</span>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" @click="login('codeLoginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </section>
        </el-tab-pane>
        <el-tab-pane label="app扫码登录" name="third">
          <section class="main-form">
          </section>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ValidCode from '@/components/ValidCode'
import SlidingVerification from '@/components/SlidingVerification'

export default {
  data: function () {
    const bgLogin = this.$img.bgLogin
    return {
      normalLoginUrl: '/customer/normalLogin',
      codeLoginUrl: '/customer/verifyLogin',
      loginForm: {
        name: null,
        phone: null,
        password: null
      },
      codeLoginForm: {
        phoneNumber: null,
        verifyCode: null,
        phoneCode: null
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 11, message: '请输入正确的用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      codeLoginRules: {
        phoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'}
        ],
        verifyCode: [
          {required: true, message: '请输入图形验证码', trigger: 'blur'}
        ],
        phoneCode: [
          {required: true, message: '请输入手机验证码', trigger: 'blur'}
        ]
      },
      activeName: 'first',
      show: true,
      count: '',
      timer: null,
      timer2: '',
      alert: false,
      VCodeValue: null,
      alertContext: '',
      bgLogin: bgLogin
    }
  },
  components: {
    ValidCode,
    SlidingVerification
  },
  computed: {
    loginCode () {
      return this.codeLoginForm.verifyCode
    },
    backgroundImg () {
      const randIndex = Math.floor(Math.random() * this.bgLogin.length)
      return this.bgLogin[randIndex]
    }
  },
  watch: {
    loginCode (value) {
      if (value === null || value === '') {
        this.alert = true
        this.alertContext = '验证码不能为空'
      } else if (value !== null && value !== '' && this.VCodeValue !== value) {
        this.alert = true
        this.alertContext = '验证码输入错误'
      } else {
        this.alert = false
      }
      console.log(value)
    },
    VCodeValue (value) {
      this.codeLoginForm.verifyCode = null
      this.alert = false
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    loginVerify (url, param) {
      this.loginForm.phone = this.loginForm.name
      // this.loginForm.password = this.$md5(this.loginForm.password)
      // this.loginForm.password = this.$md5(this.loginForm.password)
      console.log(param)
      this.$api.requestApi.post(url, param)
        .then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            sessionStorage.setItem('save_username', this.loginForm.name)
            sessionStorage.setItem('order_number', res.data.orderNumber)
            this.$router.push('/home').then(() => {
              if (res.data.orderNumber !== 0) {
                this.$confirm('您有一个正在进行的订单，是否立即查看', '订单提示', {
                  cancelButtonText: '取消',
                  confirmButtonText: '确定',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/order')
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消并返还主页面'
                  })
                })
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '跳转失败'
              })
            })
          } else if (res.data.code === 500) {
            this.$message({
              message: '账号或密码错误！请重试！',
              type: 'error'
            })
          } else {
            this.$message({
              message: '未知错误，请及时联系管理员！',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err.data)
          console.log(this.url)
          this.timer2 = new Date().getTime()
          return false
        })
    },
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeName === 'first') {
            if (!this.$refs.slidingVerification.confirmSuccess) {
              this.$message({
                message: '请先完成拖动滑块功能',
                type: 'error'
              })
            } else {
              this.loginVerify(this.normalLoginUrl, this[formName])
            }
          } else if (this.activeName === 'second') {
            this.loginVerify(this.codeLoginUrl, this[formName])
          }
        }
      })
    },
    verLogin () {
      this.$router.push('/home')
    },
    getCode () {
      const TIME_COUNT = 60
      this.$api.getRequestApi.get('/customer/getVerifyCode/this.codeLoginForm.phoneNumber')
        .then(res => {
          console.log(res.data)
          if (res.data === 200) {
            if (!this.timer) {
              this.count = TIME_COUNT
              this.show = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.show = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else if (res.data === 500) {
            this.$confirm('该手机号尚未注册，是否马上注册？', '登录信息', {
              confirmButtonText: '是',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(
              this.$route.push('/register')
            ).catch(
              this.$message({
                type: 'info',
                message: '已取消'
              })
            )
          }
        })
        .catch(err => {
          this.$message({
            message: '无网络，请求失败，请检查您的网络连接',
            type: 'error'
          })
          console.log(err.code)
        })
    },
    register () {
      this.$router.push('/register')
    },
    compareVCode (codeList) {
      this.VCodeValue = codeList
    },
    refreshVCode () {
      this.$refs.validCode.refreshCode()
    }
  },
  mounted () {
  }
}

</script>

<style lang="less" scoped>
  @import "../style/style";

  .form-container {
    .global-centre(460px, 380px);
    .width-and-height(460px, 380px);
  }

  .login-button {
    width: 420px;
    height: 40px;
  }

  .el-input-verify-code {
    float: left;
    width: 250px;
  }

  .el-button-verify-code {
    float: right;
    width: 140px;
  }

  .login-btn {
    width: 400px;
  }

</style>
