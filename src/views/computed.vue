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
