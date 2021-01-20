<template>
  <div id="content-fixed">
    <!--右侧表格内容-->
    <div>
      <pay-merchant-table></pay-merchant-table>
    </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import payMerchantTable from './payMerchantTable';

  export default {
    name:'basic_merchant_payMerchantIndex',
    components:{
        payMerchantTable
    }
  }
</script>

<style lang="scss" scoped>

</style>