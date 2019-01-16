<template>
  <div>
    {{temp | filterData}}
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { filterData } from '../filters/index';
@Component({
  filters: {
    filterData,
  },
})
export default class FiltersComp extends Vue {
  private temp: number = 1547454303721;
}
</script>
