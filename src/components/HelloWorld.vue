<template>
  <div class="hello">
    {{abc|volumeValue(abc)}}
    {{(totalPrice,rate)|allAccount(totalPrice,rate)}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '../api/login';
import Websock from '../mixins/websocket';
import { allAccount, volumeValue } from '../filters/index';
@Component({
  filters: {
    allAccount,
    volumeValue,
  },
  mixins: [Websock],
})
export default class HelloWorld extends Vue {
  private totalPrice: number = 100.34;
  private rate: number = 0.8;
  private abc: number = 1273872843;
  @Prop() private msg!: string;
  private created() {
    api.login();
  }
  private isLogin() {
    api.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
.hello {
  h1 {
    color: red;
  }
}
</style>
