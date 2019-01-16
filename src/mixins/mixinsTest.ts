import { Vue, Component } from 'vue-property-decorator';
@Component
export default class MinxinsTest extends Vue {
  private message: string = 'hello word';
  public consoleStr() {
    this.$message.info('测试混合函数');
  }
}
