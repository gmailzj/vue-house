<template>
  <table>
    <tr>
      <!--左侧列表-->
      <td class="counter_list counter_list_width4">
        <ul class="clearfix fl">
          <li class="">
            <span><b>*</b>住房公积金个人月缴存额：</span>
            <input type="text" v-on:input="infoIpt1" v-model="gjjJc" placeholder="请输入公积金个人月缴存额" name=""/>
            <i>元</i>
          </li>
          <li class="">
            <span><b>*</b>缴存比例：</span>
            <input type="text" v-on:input="infoIpt2" v-model="jcPoint" placeholder="请输入个人缴存比例" name=""/>
            <i>%</i>
          </li>
          <li class="">
            <span>配偶住房公积金个人月缴存额：</span>
            <input type="text" v-on:input="infoIpt3" v-model="otherJc" placeholder="请输入配偶公积金月缴存额" name=""/>
            <i>元</i>
          </li>
          <li class="">
            <span>缴存比例：</span>
            <input type="text" v-on:input="infoIpt4" v-model="otherJcPoint" placeholder="请输入配偶公积金缴存比例" name=""/>
            <i>%</i>
          </li>
          <li class="">
            <span><b>*</b>房屋评估价值或实际购房款：</span>
            <input type="text" v-on:input="infoIpt5" v-model="buildPrice" placeholder="请输入房屋评估价值或实际购房款" name=""/>
            <i>元</i>
          </li>
          <select-component v-on:select-msg="fwMsg" showImportant="ok" title="房屋性质" :items="items1"></select-component>
          <li class="">
            <span><b>*</b>贷款申请年限：</span>
            <input type="text" v-on:input="infoIpt6" v-model="dkYear" placeholder="请输入贷款年限" name=""/>
            <i>年</i>
          </li>
          <li class="zhushi">( 注：贷款期限最长可计算到借款人70周岁，同时不得超过30年。)</li>
          <select-component v-on:select-msg="jbMsg" showImportant="ok" title="个人信用等级"
                            :items="items2"></select-component>
          <li>
            <span></span>
            <span class="start" @click="getResult">开始计算</span>
            <span class="empty" @click="clearBoth">清空重填</span>
          </li>
        </ul>
      </td>
      <!--中间竖线-->
      <td class="counter_center">
        <img src="../../assets/center_line.jpg" alt=""/>
      </td>
      <!--右侧计算结果-->
      <td v-show="showResult" class="counter_right counter_right_width4" :class="{fadeInRight:showResult}" valign="top">
        <ul>
          <li class="title">
            <h2>计算结果</h2></li>
          <li class="clearfix">
            <h3>您可以申请的最高贷款额度是 </h3>
            <span class="on">{{totalMoney}}</span>
            <i>万元</i>
          </li>
        </ul>
        <p class="note">*以上结果仅供参考</p>
      </td>
      <!--右侧还未计算时-->
      <td v-show="!showResult" class="counter_right2">
        <img src="../../assets/jisuan_right.png" alt="" class=""/>
        <p>要贷款买房，赶紧算算吧！</p>
      </td>
    </tr>
  </table>
</template>
<script>
import SelectComponent from "../../components/select.vue";
import Toast from "../../components/common/toast.vue"

export default {
  components: {SelectComponent, Toast},
  name: 'fangdai',
  data() {
    return {
      items1: [
        {text: '政策性住房', cla: '', val: 0},
        {text: '其他', cla: 'on', val: 1}
      ],
      items2: [
        {text: 'AAA级', cla: '', val: 0},
        {text: 'AA级', cla: '', val: 1},
        {text: '其他', cla: 'on', val: 2}
      ],
      // 公积金个人缴存额
      gjjJc: '',
      // 公积金个人缴存比例
      jcPoint: 12,
      // 配偶缴存额
      otherJc: '',
      // 配偶缴存比例
      otherJcPoint: 12,
      // 房屋价值
      buildPrice: '',
      // 贷款年限
      dkYear: 20,
      // 房屋性质
      fwType: 1,
      // 个人信用等级
      selfxyJb: 2,
      // 公积金最高额度
      totalMoney: 0,
      showResult: false
    }
  },
  methods: {
    jbMsg(obj) {
      this.selfxyJb = obj.val;
    },
    fwMsg(obj) {
      this.fwType = obj.val;
    },
    limitVal(reg, value) {
      return value.match(reg)[0];
    },
    infoIpt1(ev) {
      this.gjjJc = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt2(ev) {
      this.jcPoint = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt3(ev) {
      this.otherJc = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt4(ev) {
      this.otherJcPoint = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt5(ev) {
      this.buildPrice = this.limitVal(/\d{0,12}(\.\d{0,2})?/g, ev.target.value)
    },
    infoIpt6(ev) {
      this.dkYear = this.limitVal(/\d{0,2}?/g, ev.target.value)
    },
    // 获取公积金额度
    getResult() {
      let that = this;
      if (!this.gjjJc) {
        this.$toast.show('住房公积金个人月缴存额不能为空，请输入');
        return false;
      } else if (!this.jcPoint || this.jcPoint > 100 || this.jcPoint == 0) {
        this.$toast.show('缴存比例不正确');
        return false;
      } else if (this.otherJc && (!this.otherJcPoint || this.otherJcPoint > 100 || this.otherJcPoint == 0)) {
        this.$toast.show('配偶缴存比例不正确')
      } else if (!this.buildPrice) {
        this.$toast.show('"房屋评估价值或实际购房款"不能为空，请输入');
        return false;
      } else if (this.buildPrice == 0) {
        this.$toast.show('"房屋评估价值或实际购房款"不能为零，请输入');
        return false;
      } else if (!this.dkYear) {
        this.$toast.show('贷款年限不能为空，请输入');
        return false;
      } else if (this.dkYear == 0) {
        this.$toast.show('贷款年限不能为零，请重新输入');
        return false;
      } else if (this.dkYear > 30) {
        this.$toast.show('贷款年限不能大于30年，请重新输入');
        this.dkYear = '';
        return false;
      }
      let familyMoney = (this.gjjJc / (this.jcPoint / 100) || 0) + (this.otherJc / (this.otherJcPoint / 100) || 0);
      if (familyMoney <= 400) {
        this.$toast.show('家庭月收入低于400，不符合贷款条件');
        return false;
      }
      let baseEd = Math.round((familyMoney - 400) / this.calculate() * 10000 * 10) / 10;
      let baseEd2;
      switch (that.selfxyJb) {
      case 0:
        baseEd *= 1.3;
        break;
      case 1:
        baseEd *= 1.15;
        break;
      }
      baseEd = Math.min(baseEd, 800000);
      switch (that.fwType) {
      case 0:
        baseEd2 = 0.9 * that.buildPrice;
        break;
      case 1:
        baseEd2 = 0.8 * that.buildPrice;
      }
      baseEd = Math.floor(Math.min(baseEd, baseEd2) / 10000 * 10) / 10;
      this.totalMoney = baseEd || 0;
      this.showResult = false;
      setTimeout(() => {
        this.showResult = true;
      }, 0);
    },
    formatNumber(value, num) // 直接去尾
    {
      let a,
        b,
        c,
        i;
      a = value.toString();
      b = a.indexOf('.');
      c = a.length;
      if (num == 0) {
        if (b != -1) { a = a.substring(0, b); }
      } else if (b == -1) {
        a += ".";
        for (i = 1;i <= num;i++) { a += "0"; }
      } else {
        a = a.substring(0, b + num + 1);
        for (i = c;i <= b + num;i++) { a += "0"; }
      }
      return a
    },
    formatData(value, num) {
      let a_str = this.formatNumber(value, num);
      let a_int = parseFloat(a_str);
      if (value.toString().length > a_str.length) {
        let b_str = value.toString().substring(a_str.length, a_str.length + 1)
        let b_int = parseFloat(b_str);
        if (b_int < 5) {
          return a_str
        }

        let bonus_str,
          bonus_int;
        if (num == 0) {
          bonus_int = 1;
        } else {
          bonus_str = "0.";
          for (let i = 1; i < num; i++) { bonus_str += "0"; }
          bonus_str += "1";
          bonus_int = parseFloat(bonus_str);
        }
        a_str = this.formatNumber(a_int + bonus_int, num)
      }
      return a_str
    },
    calculate() {
      // 个人公积金
      let l1_5 = 0.0405;
      let l6_30 = 0.0459;
      let that = this;
      let bcv,
        r;
      if (that.dkYear > 5) {
        bcv = Math.round(1000000 * l6_30 / 12) / 1000000;
      } else {
        bcv = Math.round(1000000 * l1_5 / 12) / 1000000;
      }
      r = this.formatData((10000 * bcv * Math.pow(1 + bcv, 12 * that.dkYear)) / (Math.pow(1 + bcv, 12 * that.dkYear) - 1), 2);
      return r;
    },
    resetData(item, data) {
      for (let i = 0; i < item.length; i++) {
        item[i].cla = ''
      }
      item[0].cla = 'on';
      data = 0;
    },
    clearBoth() {
      this.gjjJc = '';
      this.jcPoint = '';
      this.otherJc = '';
      this.otherJcPoint = '';
      this.buildPrice = '';
      this.dkYear = '';
      this.totalMoney = 0;
      this.resetData(this.items1, this.fwType);
      this.resetData(this.items2, this.selfxyJb);
      this.showResult = false;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
