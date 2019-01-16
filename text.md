#### 基于typescript的vue-cli3.0的一些写法

>项目新增node包vue-class-component，vuex-class。npm install vue-class-component vuex-class --save
##### 1、父子组件传值，重要看ts部分
```html
<template>
  <!-- 父组件 -->
  <div class="index">
    <el-button type="primary" 
    @click.native="dialogVisible = true">
      我是父组件
    </el-button>
    <DialogMask
    v-if="dialogVisible"
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
```
```html
<template>
  <!-- 子组件 -->
  <el-dialog
    title="我是子组件"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>我是子组件</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { setTimeout } from 'timers';
@Component
export default class DialogMask extends Vue {
  @Prop() private dialogVisible!: boolean;
  private handleClose(done: any) {
    this.$emit('closeDialog', false);
  }
}
</script>
```
父组件引入 Emit 装饰器，子组件引入 Prop 装饰器，父组件通过自定义属性（:dialogVisible="dialogVisible"）将值传过来，子组件通过@Prop()接收（@Prop() private dialogVisible!: boolean）。子组件不能直接修改父组件传过来的值，必须通过$emit来修改（this.$emit('closeDialog', false)），父组件再通过@Emit()对值进行操作。

##### 2、过滤器
```js
// ts文件
import moment from 'moment';
/**
 * filterData: 过滤时间
 * value: 原始值（时间戳）
 */
export function filterData(value: number) {
  return moment(value).format('YYYY-MM-DD');
}
```
可以新增一个ts文件，里面导出一些过滤器函数
```html
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
```
通过filters注入局部过滤器函数

##### 3、混合函数
```js
// 定义混合属性或函数
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class MinxinsTest extends Vue {
  private message: string = 'hello word';
  public consoleStr() {
    this.$message.info('测试混合函数');
  }
}
```
新增一个ts文件，里面定义一些混合公用的属性或函数。注意，混合公用的属性或函数在template中使用时可以定义为private，但如果在生命周期中使用需要定义为public，然后还需在shims-vue.d.ts文件中将混合公用的属性或函数声明下。
```html
<template>
<!-- 使用 -->
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
```
通过mixins注入混合函数
##### 4、计算属性
```html
<template>
  <el-form :model="ruleForm2" :rules="rulesValidate" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ComputedComp extends Vue {
  private ruleForm2: any = {
    pass: '',
    checkPass: '',
    age: '',
  };
  // 计算属性
  get rulesValidate() {
    const checkAge = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const rules = {
      pass: [
        { validator: validatePass, trigger: 'blur' },
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' },
      ],
      age: [
        { validator: checkAge, trigger: 'blur' },
      ],
    };
    return rules;
  }
  // 方法
  private submitForm(formName: any) {
    const refFormName = this.$refs[formName] as HTMLFormElement;
    refFormName.validate((valid: any) => {
      if (valid) {
        alert('submit!');
      } else {
        return false;
      }
    });
  }
  private resetForm(formName: any) {
    const refName = this.$refs[formName] as HTMLFormElement;
    refName.resetFields();
  }
}
</script>
```
计算属性比较简单，直接通过get加函数名的形式
##### 5、vuex
store的目录结构

index.ts导入模块
```js
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
```
state.ts
```js
// 定义数据接口类型
interface State {
  listTest: any[];
}
// 初始化
const state: State  = {
  listTest: [],
};
export default state;
```
mutations.ts
```js
import { MutationTree } from 'vuex';
const mutations: MutationTree<any> = {
  // 同步调用
  setListTest(state, arr): void {
    state.listTest = arr;
  },
};
export default mutations;
```
页面中使用
```html
<template>
  <div class="vuex">
    <el-button type="primary" @click.native="addNewData">添加数据</el-button>
    <VuexTable v-if="listTest.length"></VuexTable>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import VuexTable from '../components/vuex/index.vue';
@Component({
  components: {
    VuexTable,
  },
})
export default class VuexComp extends Vue {
  private tableData: any[] = [];
  @State private listTest: any;
  @Mutation('setListTest') private setListTest!: any;
  private addNewData() {
    this.tableData.push({
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
    });
    this.setListTest(this.tableData);
  }
}
</script>
```