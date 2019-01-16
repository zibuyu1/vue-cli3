<template>
  <div class="layout">
    <SubmenuComp></SubmenuComp>
    <mains></mains>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SubmenuComp from '../components/common/submenu.vue';
import Mains from '../components/common/mains.vue';
@Component({
  components: {
    Mains,
    SubmenuComp,
  },
})
export default class Layout extends Vue {
  @Watch('$route', { deep: true })
  private onroute(cur: any, old: any) {
    this.routerChange();
  }
  private routerChange() {
    if (this.$route.path === '/filters') {
      this.$message.success('监听路由成功');
    }
  }
}
</script>
