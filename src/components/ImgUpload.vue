<template>
    <div>
      <el-upload class="avatar-uploader" action='string' :before-upload="beforeUpload"
                 :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <img v-if="uploadSuccess" :src="imageFile.file" class="avatar" alt="图片未正常显示">
        <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:120px"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body width="40%">
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vue-cropper
              ref="cropper"
              :img="option.image"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"></vue-cropper>
          </div>
        </div>
        <div slot="footer">
          <el-button type="primary" @click.native="uploadPicture()">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      uploadSuccess: false,
      dialogVisible: false,
      picLocation: '',
      option: {
        image: '',
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        full: true, // 是否输出原图比例的截图
        canMove: true,
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        autoCrop: true, // 是否默认生成截图框
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        fixedBox: true // 固定截图框大小 不允许改变
      },
      loading: false, // 防止重复提交
      imageFile: {
        name: '',
        type: '',
        file: ''
      }
    }
  },
  methods: {
    async beforeUpload (file) {
      const minSize = file.size / 1024 > 20
      const maxSize = file.size / 1024 / 1024 < 8
      if (!minSize) {
        this.$message.error('上传图片大小不能小于20k')
      } else if (!maxSize) {
        this.$message.error('上传图片最大不能大于8M')
      }
      this.option.image = window.URL.createObjectURL(file.raw)
    },
    async changeUpload (file) {
      this.dialogVisible = true
      this.fileinfo = file
      console.log(file)
      this.option.image = window.URL.createObjectURL(file.raw)
      this.$nextTick(() => {
        console.log(this.option.image)
      })
    },
    async uploadPicture () {
      this.$refs.cropper.getCropData((data) => {
        const splitName = this.fileinfo.name.split('.')
        const type = splitName[splitName.length - 1]
        this.imageFile.name = 'user' + this.fileinfo.uid + '.' + type
        this.imageFile.file = data
        this.$emit('upload-pic', this.imageFile)
        this.dialogVisible = false
        this.uploadSuccess = true
      })
    }
  }
}
</script>

<style lang="less">
  .cropper-content {
    .cropper {
      width: auto;
      height: 300px;
    }
  }

  .avatar-uploader {
    float: left;
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
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
