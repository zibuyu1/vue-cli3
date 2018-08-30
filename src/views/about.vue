<template>
  <div class="about">
    <hz-upload uploadType="uploadType2" :accept="accept">
      <el-button type="primary">主要按钮</el-button>
    </hz-upload>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HzUpload from '../components/common/upload.vue';
@Component({
  components: {
    HzUpload,
  },
})
export default class Upload extends Vue {
  private accept: string = '.gif,.jpeg,.jpg,.png,.bmp,.docx,.doc,.xls,.xlsx,.pptx,.ppt,.pdf,.txt,.csv,.zip,.rar,.7z';
}
</script>

