<template>
  <table>
    <tr>
      <!--左侧列表-->
      <td class="counter_list counter_list_width2">
        <ul class="clearfix fl">
          <li class="">
            <span>现持有资金：</span>
            <input type="text" v-on:input="infoIpt1" v-model="totalMoney" placeholder="请输入现持有资金" name="" />
            <i>元</i>
          </li>
          <li class="zhushi">（包括现金、存款、有价证券和可以筹措到的资金总和） </li>
          <li class="">
            <span>现家庭月收入：</span>
            <input  v-model="monthIncome" type="text" v-on:input="infoIpt2" placeholder="请输入家庭月收入" name="" />
            <i>元</i>
          </li>
          <li class="">
            <span>家庭平均每月固定支出：</span>
            <input type="text" v-on:input="infoIpt3" v-model="monthPay" placeholder="请输入家庭每月固定支出" name="" />
            <i>元</i>
          </li>
          <li>
            <span>您期望偿还贷款的年限：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" @click="clickYear" v-model="yearCon" name="" readonly="readonly" />
                <i></i>
              </p>
              <aj-year v-show="showYear" v-on:year-msg="yearMsg"></aj-year>
            </div>
          </li>
          <li class="">
            <span>您计划购买房屋的面积：</span>
            <input type="text" v-on:input="infoIpt4" v-model="expectArea" placeholder="请输入您计划购买的房屋面积" name="" />
            <i>平方米</i>
          </li>
          <li>
            <span> </span>
            <span @click="startCalculate" class="start">开始计算</span>
            <span class="empty" @click="clearAll">清空重填</span>
          </li>
        </ul>
      </td>
      <!--中间竖线-->
      <td class="counter_center">
        <img src="../../assets/center_line.jpg" alt="" />
      </td>
      <!--右侧计算结果-->
      <transition enter-active-class="fadeInRight">
      <td v-if="showResult && !showUnable" class="counter_right counter_right_width2"  valign="top">
        <ul>
          <li class="title">
            <h2>计算结果</h2></li>
          <li class="clearfix">
            <h3>您可以购买的房屋总价为 </h3>
            <span class="on">{{totalPrice}}</span>
            <i>万元</i>
          </li>
          <li class="clearfix">
            <h3>您可以购买的房屋单价为 </h3>
            <span class="on">{{unitPrice}}</span>
            <i>元/平米</i>
          </li>
        </ul>
        <p class="note">*以上结果仅供参考</p>
      </td>
      </transition>
      <!--右侧还未计算时-->
      <td :class="{none:showResult}" class="counter_right2">
        <img src="../../assets/jisuan_right.png" alt="" class="" />
        <p>要贷款买房，赶紧算算吧！</p>
      </td>
      <td v-show="showUnable" class="counter_right2">
        <p>根据计算，您的购房能力暂时较弱，可以考虑减少开支或是增加收入！</p>
      </td>
    </tr>
  </table>
</template>
<script>
import AjYear from "../../components/ajYear.vue";
import Toast from "../../components/common/toast.vue";

const util = require('@/pages/index/util/util');

export default {
  components: {
    AjYear,
  },
  name: 'gfnl',
  data() {
    return {
      showYear:false,
      yearCon:'20年（240期）',
      year:20,
      totalPrice:0,
      unitPrice:0,
      monthIncome:'',
      monthPay:'',
      expectArea:'',
      showResult:false,
      totalMoney:'',
      rate:0.0049,
      showUnable:false
    }
  },
  methods:{
    clickYear(e) {
      this.showYear = !this.showYear;
      e.stopPropagation();
    },
    yearMsg(obj) {
      this.yearCon = obj.text;
      this.year = obj.val;
      this.showYear = false;
    },
    limitVal(reg, value) {
      return value.match(reg)[0];
    },
    infoIpt1(ev) {
      this.totalMoney = this.limitVal(/\d{0,10}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt2(ev) {
      this.monthIncome = this.limitVal(/\d{0,8}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt3(ev) {
      this.monthPay = this.limitVal(/\d{0,8}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt4(ev) {
      this.expectArea = this.limitVal(/\d{0,4}(\.\d{0,2})?/g, ev.target.value)
    },
    startCalculate() {
      let that = this;
      if (!this.totalMoney) {
        this.$toast.show('请填写现可用于购房的资金');
        return false;
      } else if (this.totalMoney <= 0) {
        this.$toast.show('可用于购房的资金应大于0，请重新输入');
        return false;
      } else if (!this.monthIncome) {
        this.$toast.show('请填写现家庭月收入');
        return false;
      } else if (this.monthIncome <= 0) {
        this.$toast.show('家庭月收入应大于等于0，请重新输入');
        return false;
      } else if (!this.monthPay) {
        this.$toast.show('请填写预计家庭每月可用于购房支出');
        return false;
      } else if (this.monthPay <= 0) {
        this.$toast.show('家庭每月可用于购房的开支应大于等于0，请重新输入');
        return false;
      } else if (!this.expectArea) {
        this.$toast.show('请填写您计划购买房屋的面积');
        return false;
      } else if (this.expectArea <= 0) {
        this.$toast.show('计划购买房屋的面积应大于等于0，请重新输入');
        return false;
      }
      this.totalPrice = parseFloat((((this.monthIncome - this.monthPay) * ((Math.pow(1 + this.rate, this.year * 12) - 1) / (this.rate * Math.pow(1 + this.rate, this.year * 12))) + parseFloat(this.totalMoney)) / 10000).toFixed(2));
      this.unitPrice = util.formatNumber(that.totalPrice * 10000 / this.expectArea) || 0;
      this.showUnable = (this.totalPrice < 0);
      this.showResult = false;
      setTimeout(() => {
        this.showResult = true;
      }, 0);
    },
    clearAll() {
      this.totalMoney = '';
      this.year = 20;
      this.yearCon = '20年（240期）';
      this.totalPrice = 0;
      this.unitPrice = 0;
      this.monthIncome = '';
      this.monthPay = '';
      this.expectArea = '';
      this.showResult = false;
    }
  },
  mounted() {
    let that = this;
    window.addEventListener('click', function() {
      if (!that.showYear) {
        return false;
      }
      that.showYear = false;
    })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
