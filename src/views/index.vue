<template>
  <div class="index">
    <el-button type="primary" 
    @click.native="dialogVisible = true">
      我是父组件
    </el-button>
    <DialogMask
    :dialogVisible="dialogVisible"
    @closeDialog="closeDialog">
    </DialogMask>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Emit } from 'vue-property-decorator';
import DialogMask from '../components/index/mask.vue';
@Component({
  components: {
    DialogMask,
  },
})
export default class IndexComp extends Vue {
  private dialogVisible: boolean = false;
  @Emit()
  private closeDialog(flag: boolean) {
    this.dialogVisible = flag;
  }
}
</script>
