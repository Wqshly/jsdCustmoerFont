<template>
  <div class="fill-contain"
       :style="{backgroundImage: 'url(' + backgroundImg + ')', backgroundSize:'cover',backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat'}">
    <div class="form-container">
      <section class="main-form">
        <div class="title">
          <p>用&nbsp;&nbsp;户&nbsp;&nbsp;注&nbsp;&nbsp;册</p>
        </div>
        <el-form :model="registerForm" :rules="rules" label-width="100px"
                 style="padding-top: 50px;padding-right: 50px;" ref="registerForm">
          <el-form-item label="电话号码:" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="电话号码将绑定登录" prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户姓名:" prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入用户名"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password">
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="确认密码:" prop="rePassword">
            <el-input type="password" v-model="registerForm.rePassword" placeholder="确认密码"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select style="float: left" v-model="registerForm.sex" placeholder="请选择">
              <el-option
                v-for="item in optionTable.gender"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户头像:" prop="picLocal">
            <el-upload
              v-model="registerForm.picLocal"
              accept="image/jpeg,image/png"
              class="avatar-uploader"
              name="picture"
              action="http://localhost:8083/api/file/imageUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarFailed"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item style="padding-right: 50px">
            <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
            <el-button @click="resetForm('register')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const bgRegister = this.$img.bgRegister
    const isRegister = this.validPhoneNumber
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      validPhoneBoolean: {default: true, type: Boolean},
      imageUrl: '',
      typeName: {gender: 'genderCoding'},
      optionTable: {gender: []},
      registerForm: {
        name: '',
        password: '',
        rePassword: '',
        phone: '',
        sex: '',
        picLocal: ''
      },
      bgRegister: bgRegister,
      rules: {
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {min: 11, max: 11, message: '输入正确的电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '输入正确的电话号码', trigger: 'blur'},
          {validator: isRegister, message: '该手机号已被注册!', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 8, message: '输入正确的客户姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, message: '长度过短', trigger: 'blur'},
          {max: 16, message: '长度过长', trigger: 'blur'}
        ],
        rePassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        picLocal: [
          {required: true, message: '请先上传图片', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    backgroundImg () {
      const randIndex = Math.floor(Math.random() * this.bgRegister.length)
      return this.bgRegister[randIndex]
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res) {
        console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log(this.imageUrl)
        this.registerForm.picLocal = res.data
        console.log(this.registerForm.picLocal)
      } else {
        this.$message({
          message: '上传头像失败，请重新上传',
          type: 'error'
        })
      }
    },
    handleAvatarFailed () {
      this.$message({
        message: '上传头像失败，请重新上传',
        type: 'error'
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.postRequestApi.post('/customer/customerRegister', this.registerForm)
            .then(res => {
              this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: `action: ${action}`
                  })
                }
              })
              this.$router.push('/home')
              console.log(res.data)
            }).catch(err => {
              console.log(err)
            })
        }
      })
    },
    getTypeOption (url, optionName) {
      this.$api.getRequestApi.get(url)
        .then(res => {
          console.log(res.data)
          this.optionTable[optionName] = res.data.data
          console.log(this.optionTable[optionName])
        })
        .catch(err => {
          this.$message({
            message: '网络请求失败',
            type: 'error'
          })
          console.log(err.data)
        })
    },
    validPhoneNumber () {
      this.$api.postRequestApi.postJson('/customer/validPhoneNum', this.registerForm.phone)
        .then(res => {
          if (res.data.data === false) {
            this.$message({
              message: '该手机号已被注册!',
              type: 'error'
            })
          } else {
            console.log(res.data)
          }
        })
        .catch()
    }
  },
  mounted () {
    this.getTypeOption('basicCoding/findBasicCodingWithType' + '?type=' + this.typeName.gender, 'gender')
  }
}
</script>

<style lang="less" scoped>
  @import "../style/style";

  .form-container {
    .global-centre(600px, 800px);
    .width-and-height(600px, 800px);
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
  }

  .background-pic {
    .background-img("../assets/img/register.jpg");
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    background: rgba(255, 255, 255, 0.5);
    border: 2px dashed #8c939d;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader {
    float: left;
  }
</style>
