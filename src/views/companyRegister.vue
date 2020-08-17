<template>
  <div class="fill-contain"
       :style="{backgroundImage: 'url(' + backgroundImg + ')', backgroundSize:'cover',backgroundAttachment: 'fixed',backgroundRepeat: 'no-repeat'}">
    <div class="form-container">
      <section class="main-form">
        <div class="title">
          <p>企&nbsp;&nbsp;业&nbsp;&nbsp;注&nbsp;&nbsp;册</p>
        </div>
        <el-form :model="companyRegisterForm" :rules="rules" label-width="100px"
                 style="padding-top: 50px;padding-right: 50px;" ref="companyRegisterForm">
          <el-form-item label="企业名称:" prop="companyName">
            <el-input v-model="companyRegisterForm.companyName" placeholder="输入企业名称" prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="地址:" prop="companyAddress">
            <el-input v-model="companyRegisterForm.companyAddress" placeholder="地址"
                      prefix-icon="el-icon-wqs-shezhi-zhanghaoguanli"
                      clearable/>
          </el-form-item>
          <el-form-item label="详细地址:" prop="addressDetail">
            <el-input type="password" v-model="companyRegisterForm.addressDetail" placeholder="详细地址"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="联系人:" prop="contact">
            <el-input type="password" v-model="companyRegisterForm.contact" placeholder="联系人"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="预留手机号:" prop="contactPhoneNumber">
            <el-input type="password" v-model="companyRegisterForm.contactPhoneNumber" placeholder="预留手机号用于找回密码，请谨慎填写！"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="企业邮箱:" prop="companyEmail">
            <el-input type="password" v-model="companyRegisterForm.companyEmail" placeholder="企业邮箱用于找回密码，请一定填写正确的邮箱！"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item label="法人:" prop="legalPerson">
            <el-input type="password" v-model="companyRegisterForm.legalPerson" placeholder="企业法人"
                      prefix-icon="el-icon-wqs-suoding"
                      clearable/>
          </el-form-item>
          <el-form-item style="padding-right: 10px">
            <el-button type="primary" @click="openDialog">立即创建</el-button>
            <!--                <el-button @click="resetForm('register')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'companyRegister',
  data () {
    const bgRegister = this.$img.bgRegister
    return {
      companyRegisterForm: {
        companyName: '',
        companyAddress: '',
        addressDetail: '',
        contact: '',
        contactPhoneNumber: '',
        companyEmail: '',
        legalPerson: ''
      },
      bgRegister: bgRegister,
      rules: {}
    }
  },
  methods: {
    openDialog () {
      this.$confirm('企业用户注册成功，初始密码为注册手机号, 请及时修改密码！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注册成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注册'
        })
      })
    }
  },
  computed: {
    backgroundImg () {
      const randIndex = Math.floor(Math.random() * this.bgRegister.length)
      return this.bgRegister[randIndex]
    }
  },
  mounted () {
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
