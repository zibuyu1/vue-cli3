<template>
  <div class="hz_index">
    <hello></hello>
    <hz-upload uploadType="uploadType1" :accept="accept">
      <el-button type="primary">主要按钮</el-button>
    </hz-upload>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HzUpload from '../components/common/upload.vue';
import Hello from '../components/HelloWorld.vue';
@Component({
  components: {
    HzUpload,
    Hello,
  },
})
export default class Upload extends Vue {
  private accept: string = '.SLDPRT,.PRT,.STEP,.stp,.IGS,.IGES';
}
</script>
