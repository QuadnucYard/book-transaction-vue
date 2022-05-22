
<template>
  <div class="about">
    <el-header :name="'关于我们'"></el-header>
    <div class="about-body">
    <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">简介</van-divider>
    <div>本项目是一套二手书交易系统，包括二手书交易商城系统及商城后台管理系统，基于 Spring Boot及相关技术栈开发。 前台商城系统包含首页门户、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理等模块。 后台管理系统包含数据面板、商品管理、订单管理、设置等模块。</div>
     </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
}
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px;
    .about-body {
      margin-top: 44px;
      font-size: 16px;
      a {
        color: #007fff;
      }
    }
  }
</style>
