<template>
  <div class="hz_upload">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :accept="accept"
      :withCredentials="true"
      :http-request="httpRequest">
      <slot></slot>
    </el-upload>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import UploadMethods from '../../mixins/uploadMethods';
interface Item {
  name: string;
  age: number;
}

@Component({
  mixins: [UploadMethods],
})
export default class Upload extends Vue {
  private item: Item = {
    name: 'jsakd',
    age: 39,
  };
  @Prop() private accept!: string;
  private created() {
    // console.log(this.item.name);
  }
}
</script>

