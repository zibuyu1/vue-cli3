<template>
  <el-menu default-active="/index" class="el-menu-vertical-demo" :router="true">
    <el-menu-item index="/index">
      <i class="el-icon-menu"></i>
      <span slot="title">父子组件间的传值</span>
    </el-menu-item>
    <el-menu-item index="/filters">
      <i class="el-icon-menu"></i>
      <span slot="title">过滤器</span>
    </el-menu-item>
    <el-menu-item index="/mixins">
      <i class="el-icon-menu"></i>
      <span slot="title">混合函数</span>
    </el-menu-item>
    <el-menu-item index="/computed">
      <i class="el-icon-menu"></i>
      <span slot="title">计算属性</span>
    </el-menu-item>
    <el-menu-item index="/vuex">
      <i class="el-icon-menu"></i>
      <span slot="title">vuex</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SubmenuComp extends Vue {}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    float: left;
    width: 200px;
    min-height: 100vh;
  }
</style>
