<template>
  <div class="layout">
    <headers></headers>
    <mains></mains>
    <footers></footers>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Headers from '../components/common/header.vue';
import Footers from '../components/common/footer.vue';
import Mains from '../components/common/mains.vue';
@Component({
  components: {
    Headers,
    Footers,
    Mains,
  },
})
export default class Layout extends Vue {}
</script>
<style>
</style>



