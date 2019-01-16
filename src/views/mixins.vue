<template>
  <div>
    {{message}}
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import MinxinsTest from '../mixins/mixinsTest';
@Component({
  mixins: [MinxinsTest],
})
export default class MixinsComp extends Vue {
  private created() {
    this.consoleStr();
  }
}
</script>
