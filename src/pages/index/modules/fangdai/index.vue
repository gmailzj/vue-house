<template>
  <table>
    <tr>
      <!--左侧列表-->
      <td class="counter_list" v-bind:class="isWidth5">
        <ul class="clearfix fl">
          <li>
            <span>贷款类别：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" v-model="dkType" name="" @click="clickDk" readonly="readonly"/>
                <i></i>
              </p>
              <ul v-show="showDkType" class="option">
                <li v-for="item  in items1" @click="selectDkType(item)">{{item.text}}</li>
              </ul>
            </div>
          </li>
          <li v-show="showCom">
            <span>商业贷款额：</span>
            <input class="black" type="text" v-model="sdtotal" placeholder="请输入商业贷款额" v-on:input="sdIpt"  name=""/>
            <i>万</i>
          </li>
          <li v-show="showCom" class="money_rate">
            <span>商贷利率：</span>
            <div class="clearfix">
              <p class="select">
                <input type="text" v-model="sdRateCon" @click="sdClickRate" name="" readonly="readonly"/>
                <i></i>
              </p>
              <aj-rate v-show="showRatesd" v-on:rate-msg="rateComSd"></aj-rate>
            </div>
            <input type="text" v-model="sdRate" name="" placeholder="" v-on:input="sdRateIpt"/>
            <i>%</i>
          </li>
          <li v-show="showCom">
            <span>公积金贷款额：</span>
            <input type="text" v-model="gjjtotal" placeholder="请输入公积金贷款额" v-on:input="gjjIpt"  name=""/>
            <i>万</i>
          </li>
          <li v-show="showCom" class="money_rate">
            <span>公积金利率：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" v-model="gjjRateCon" @click="gjjClickRate" name="" readonly="readonly"/>
                <i></i>
              </p>
              <aj-rate v-show="showRategjj" v-on:rate-msg="rateComGjj"></aj-rate>
            </div>
            <input type="text" v-model="gjjRate" name="" placeholder="" v-on:input="gjjRateIpt"/>
            <i>%</i>
          </li>
          <li v-show="!showCom">
            <span>计算方式：</span>
            <div class="clearfix">
              <p class="select">
                <input class="black" type="text" v-model="calcuTypeCon" @click="selectCalType" name="" readonly="readonly"/>
                <i></i>
              </p>
              <ul v-show="showCalType" class="option">
                <li v-for="(item ,index) in items2" @click="calcuType(index,item)">{{item.text}}</li>
              </ul>
            </div>
          </li>
          <li v-show="showDkIpt">
            <span>贷款总额：</span>
            <input type="text" v-model="dktotal" placeholder="请输入贷款总额" v-on:input="dktotalIpt"  name=""/>
            <i>万</i>
          </li>
          <li v-show="!showDkIpt && !showCom">
            <span>房屋单价：</span>
            <input type="text" v-model="unitPrice" placeholder="请输入房屋单价" v-on:input="priceIpt"  name=""/>
            <i>元/平米</i>
          </li>
          <li v-show="!showDkIpt && !showCom">
            <span>房屋面积：</span>
            <input type="text"  class="black" v-model="buildArea" placeholder="请输入房屋面积" v-on:input="areaIpt"  name=""/>
            <i>平方米</i>
          </li>
          <li v-show="!showDkIpt && !showCom">
            <span>按揭成数：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" v-model="fewCon" @click="clickFew"  name="" readonly="readonly"/>
                <i></i>
              </p>
              <aj-few v-show="showFew" v-on:few-msg="fewMsg"></aj-few>
            </div>
          </li>
          <li>
            <span>按揭年数：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" v-model="yearCon" @click="clickYear" name="" readonly="readonly"/>
                <i></i>
              </p>
              <aj-year v-show="showYear" v-on:year-msg="yearMsg"></aj-year>
            </div>
          </li>
          <li v-show="!showCom" class="money_rate">
            <span>贷款利率：</span>
            <div class="clearfix">
              <p class="select">
                <input v-model="rateCon" @click="clickRate" name="" readonly="readonly"/>
                <i></i>
              </p>
              <aj-rate v-show="showRate" v-on:rate-msg="rateMsg"></aj-rate>
            </div>
            <input type="text" v-model="rate" v-on:input="rateIpt" name="" placeholder=""/>
            <i>%</i>
          </li>
          <li>
            <span>还款方式：</span>
            <span v-for="item in items3" @click="hkType(item)" class="fangshi"><i v-bind:class="item.cla"></i>{{item.text}}</span>
          </li>
          <li>
            <span> </span>
            <span class="start" @click="startCalcu">开始计算</span>
            <span class="empty" @click="clearAll">清空重填</span>
          </li>
        </ul>
      </td>
      <!--中间竖线-->
      <td class="counter_center">
        <img src="../../assets/center_line.jpg" alt=""/>
      </td>
      <!--右侧计算结果-->
      <td class="counter_right counter_right_width1" :class="{fadeInRight:showResult,none:!showResult}" valign="top">
        <ul>
          <li class="title"><h2>计算结果</h2></li>
          <li v-show="!showDkIpt && !showCom" class="clearfix">
            <h3>首付：</h3>
            <span class="on">{{firstMoney}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>{{isType1}}：</h3>
            <span class="on">{{monMoney}}</span>
            <i>元</i>
          </li>
          <li v-show="showDj" class="clearfix">
            <h3>每月递减：</h3>
            <span class="on">{{djMoney}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>贷款总额：</h3>
            <span>{{dkMoney}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>支付利息：</h3>
            <span>{{totalLx}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>还款总额：</h3>
            <span>{{totalMoney}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>还款月数：</h3>
            <span>{{totalMon}}</span>
            <i>月</i>
          </li>
        </ul>
        <p class="note">*以上结果仅供参考</p>
      </td>
      <!--右侧还未计算时-->
      <td :class="{none:showResult}" class="counter_right2">
        <img src="../../assets/jisuan_right.png" alt="" class=""/>
        <p>要贷款买房，赶紧算算吧！</p>
      </td>
    </tr>
  </table>
</template>
<script>
import AjYear from "../../components/ajYear.vue";
import AjRate from "../../components/ajRate.vue";
import AjFew from "../../components/ajFew.vue";
import {Calculate} from "../../assets/Calculate.js";
import Toast from "../../components/common/toast.vue"

const util = require('@/pages/index/util/util');

let calculate = new Calculate();
export default {
  components: {
    AjFew,
    AjRate,
    AjYear,
    Toast
  },
  name: 'fangdai',
  data() {
    return {
      // 贷款类别
      items1: [
        {text: '商业贷款', val:1},
        {text: '公积金贷款', val:2},
        {text: '组合型贷款', val:3}
      ],
      // 计算方式
      items2:[
        {text:'根据面积、单价计算'},
        {text:'根据贷款总额计算'}
      ],
      // 还款方式
      items3:[
        {text:'等额本息', cla:'on', val:1},
        {text:'等额本金', cla:'', val:2}
      ],
      // 计算方式显示
      showCalType:false,
      // 计算方式内容
      calcuTypeCon:'根据面积、单价计算',
      // 选择几成
      fewCon:(this.G.city === 'bj' || this.G.city === 'sh') ? '6.5成' : '7成',
      // 成数
      few:(this.G.city === 'bj' || this.G.city === 'sh') ? 6.5 : 7,
      // 显示贷款类别
      showDkType: false,
      // 贷款类别内容
      dkType:'商业贷款',
      // 显示按揭成数
      showFew:false,
      // 房屋面积
      buildArea:'',
      // 房屋单价
      unitPrice : '',
      // 贷款总额
      dktotal:'',
      // 按揭利率
      rate:4.9,
      // 商贷基准利率
      baseRate:4.9,
      // 公积金基准利率
      gjjBaseRate:3.25,
      // 显示贷款总额输入框,计算方式为按总额计算时显示
      showDkIpt:false,
      // 利率内容
      rateCon:'15年10月24日基准利率（基准利率）',
      // 贷款年限
      year:this.G.city === 'bj' ? 25 : 30,
      // 贷款年限显示内容
      yearCon:this.G.city === 'bj' ? '25年（ 300期 ）' : '30年（ 360期 ）',
      // 显示贷款年限
      showYear:false,
      // 显示贷款利率
      showRate:false,
      // 总利息
      totalLx: 0,
      // 每月月供
      monMoney: 0,
      // 还款总额
      totalMoney: 0,
      // 还款月数
      totalMon:'',
      // 计算信息,公积金，商贷
      calculateMsg:{
        // 利率
        rate:0.049,
        // 月数
        month:240,
        // 贷款额
        totalMoney:'',
        // 计算方式，1为等额本金，2为等额本息
        type:1
      },
      // 计算信息,组合
      calculateComMsg:{
        sd:{
          // 利率
          rate:0.049,
          // 月数
          month:'',
          // 贷款额
          totalMoney:'',
          // 计算方式，1为等额本金，2为等额本息
          type:1
        },
        gjj:{
          // 利率
          rate:0.025,
          // 月数
          month:'',
          // 贷款额
          totalMoney:'',
          // 计算方式，1为等额本金，2为等额本息
          type:1
        },
      },
      // 组合贷款中的公积金
      gjjRateCon:'15年10月24日基准利率（基准利率）',
      // 组合贷款中的商贷
      sdRateCon:'15年10月24日基准利率（基准利率）',
      // 显示组合贷款
      showCom:false,
      // 组合贷款中商贷利率
      sdRate:4.9,
      // 组合贷款中公积金利率
      gjjRate:3.25,
      // 组合贷款中显示公积金利率选择框
      showRategjj:false,
      // 组合贷款中显示商贷利率选择框
      showRatesd:false,
      isWidth5:'counter_list_width1',
      // 公积金贷款总额
      gjjtotal:0,
      // 商业贷款总额
      sdtotal:100,
      // 当前选择的贷款类别
      type:'sd',
      isType1:'每月月供',
      // 计算方式为等额本金的时候每个月的递减额
      djMoney:100,
      firstMoney:'0',
      dkMoney:'0',
      // 利率折扣
      disCount:{
        disCount:1,
        sdDisCount:1,
        gjjDisCount:1
      },
      showResult:false,
      isFade:true
    }
  },
  computed:{
    showDj() {
      return this.isType1 === '首月月供';
    },
    // 首付
    firstMoneyBx() {
      return parseFloat((this.buildArea * this.unitPrice * (10 - this.few) / 10).toFixed(2)) || 0;
    },
    // 贷款总额
    dkTotalMoney() {
      return parseFloat((this.buildArea * this.unitPrice * this.few / 10).toFixed(2)) || 0;
    }
  },
  methods: {
    // 点击贷款类别
    clickDk(e) {
      this.hide('showDkType');
      this.showDkType = !this.showDkType;
      e.stopPropagation();
    },
    // 选择贷款类别
    selectDkType(obj) {
      this.dkType = obj.text;
      if (obj.val === 3) {
        this.showCom = true;
        this.isWidth5 = 'counter_list_width5';
        this.type = 'com';
      } else {
        if (obj.val === 2) {
          this.type = 'gjj';
          this.rate = this.gjjBaseRate;
        } else {
          this.type = 'sd';
          this.rate = this.baseRate;
        }
        this.showCom = false;
        this.isWidth5 = 'counter_list_width1';
        this.calculateMsg.rate = this.rate / 100;
      }
      this.showDkType = false;
      this.clearAll();
    },
    // 点击计算方式
    selectCalType(e) {
      this.hide('showCalType');
      this.showCalType = !this.showCalType;
      this.showResult = false;
      e.stopPropagation();
    },
    // 选择计算方式
    calcuType(index, obj) {
      this.showDkIpt = index === 1;
      this.calcuTypeCon = obj.text;
      this.showCalType = false;
    },
    // 点击按揭成数
    clickFew(e) {
      this.hide('showFew');
      this.showFew = !this.showFew;
      e.stopPropagation();
    },
    // 选择贷款年限
    clickYear(e) {
      this.hide('showYear');
      this.showYear = !this.showYear;
      e.stopPropagation();
    },
    // 点击贷款利率
    clickRate(e) {
      this.hide('showRate');
      this.showRate = !this.showRate;
      e.stopPropagation();
    },
    // 组合贷款中选择公积金利率
    gjjClickRate(e) {
      this.hide('showRategjj');
      this.showRategjj = !this.showRategjj;
      e.stopPropagation();
    },
    // 组合贷款中选择商贷利率
    sdClickRate(e) {
      this.hide('showRatesd');
      this.showRatesd = !this.showRatesd;
      e.stopPropagation();
    },
    // 选择按揭成数
    fewMsg(obj) {
      this.fewCon = obj.text;
      this.few = obj.val;
      this.showFew = false;
    },
    // 选择贷款利率
    rateMsg(obj) {
      let baseRate = this.type === 'sd' ? this.baseRate : this.gjjBaseRate;
      this.rateCon = '15年10月24日基准利率（' + obj.text + '）';
      this.rate = parseFloat((baseRate * obj.val).toFixed(3));
      this.calculateMsg.rate = this.rate / 100;
      this.disCount.disCount = obj.val;
      this.showRate = false;
    },
    limitVal(reg, value) {
      return value.match(reg)[0];
    },
    // 组合贷款中商业贷款额输入
    sdIpt(ev) {
      this.sdtotal = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
      this.calculateComMsg.sd.totalMoney = this.sdtotal * 10000 || 0;
    },
    // 组合贷款中公积金贷款额输入
    gjjIpt(ev) {
      this.gjjtotal = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
      this.calculateComMsg.gjj.totalMoney = this.gjjtotal * 10000 || 0;
    },
    sdRateIpt(ev) {
      this.sdRate = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    gjjRateIpt(ev) {
      this.gjjRate = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    priceIpt(ev) {
      this.unitPrice = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
    },
    areaIpt(ev) {
      this.buildArea = this.limitVal(/\d{0,4}(\.\d{0,2})?/g, ev.target.value);
    },
    rateIpt(ev) {
      this.rate = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    dktotalIpt(ev) {
      this.dktotal = this.limitVal(/\d{0,10}(\.\d{0,2})?/g, ev.target.value)
    },
    // 组合贷款选择商贷利率
    rateComSd(obj) {
      this.sdRateCon = '15年10月24日基准利率（' + obj.text + '）';
      this.sdRate = parseFloat((this.baseRate * obj.val).toFixed(3));
      this.calculateComMsg.sd.rate = this.sdRate / 100;
      this.disCount.sdDisCount = obj.val;
      this.showRatesd = false;
    },
    // 组合贷款选择公积金利率
    rateComGjj(obj) {
      this.gjjRateCon = '15年10月24日基准利率（' + obj.text + '）';
      this.gjjRate = parseFloat((this.gjjBaseRate * obj.val).toFixed(3));
      this.calculateComMsg.gjj.rate = this.gjjRate / 100;
      this.disCount.gjjDisCount = obj.val;
      this.showRategjj = false;
    },
    // 选择按揭年数
    yearMsg(obj) {
      this.yearCon = obj.text;
      this.showYear = false;
      this.year = obj.val;
      if (obj.val === 1) {
        this.baseRate = 4.35;
        this.gjjBaseRate = 2.75;
      } else if (obj.val > 1 && obj.val <= 5) {
        this.baseRate = 4.75;
        this.gjjBaseRate = 2.75;
      } else if (obj.val > 5) {
        this.baseRate = 4.9;
        this.gjjBaseRate = 3.25
      }
      if (this.type === 'gjj') {
        this.rate = this.parseNumber(this.gjjBaseRate * this.disCount.disCount);
      } else if (this.type === 'sd') {
        this.rate = this.parseNumber(this.baseRate * this.disCount.disCount);
      } else if (this.type === 'com') {
        this.gjjRate = this.parseNumber(this.gjjBaseRate * this.disCount.gjjDisCount);
        this.sdRate = this.parseNumber(this.baseRate * this.disCount.sdDisCount);
      }
      this.calculateMsg.month = this.year * 12;
    },
    parseNumber(number) {
      return parseFloat(parseFloat(number).toFixed(3));
    },
    // 选择还款类型
    hkType(obj) {
      this.items3.forEach(function(value, inx, array) {
        array[inx].cla = '';
      });
      obj.cla = 'on';
      this.isType1 = obj.val === 1 ? '每月月供' : '首月月供';
      // 组合贷款特殊处理
      if (this.type === 'com') {
        this.calculateComMsg.sd.type = obj.val;
        this.calculateComMsg.gjj.type = obj.val;
      } else {
        this.calculateMsg.type = obj.val;
      }
      this.showResult = false;
    },
    sum(a, b, isWan) {
      if (a && b) {
        return parseFloat((parseFloat(a) + parseFloat(b)).toFixed(2));
      }
      if (a && !b) {
        return parseFloat(parseFloat(a).toFixed(2));
      } else if (!a && b) {
        return parseFloat(parseFloat(b).toFixed(2));
      }
    },
    calculate(data) {
      let that = this;
      if (this.type === 'com') {
        let returnDataSd = calculate.calculate(data.sd);
        let returnDataGjj = calculate.calculate(data.gjj);
        this.dkMoney = that.sum(returnDataSd.totalMoney, returnDataGjj.totalMoney) || 0;
        this.monMoney = that.sum(returnDataSd.firstMonYg, returnDataGjj.firstMonYg) || 0;
        this.totalLx = util.formatNumber(that.sum(returnDataSd.toatlInterest, returnDataGjj.toatlInterest)) || 0;
        this.totalMoney = util.formatNumber(that.sum(that.sum(returnDataSd.totalMoney, returnDataGjj.totalMoney), that.totalLx)) || 0;
        this.totalMon = (this.year * 12 + '个') || 0;
        this.djMoney = (returnDataSd.djMoney + returnDataGjj.djMoney) || 0;
      } else {
        let returnData = calculate.calculate(data);
        this.firstMoney = this.firstMoneyBx || 0;
        this.dkMoney = (this.showDkIpt ? this.dktotal * 10000 : this.dkTotalMoney) || 0;
        this.monMoney = returnData.firstMonYg || 0;
        this.totalLx = util.formatNumber(returnData.toatlInterest) || 0;
        this.totalMoney = util.formatNumber(that.sum(returnData.totalMoney, returnData.toatlInterest)) || 0;
        this.totalMon = (this.year * 12 + '个') || 0;
        this.djMoney = util.formatNumber(returnData.djMoney) || 0;
      }
      this.showResult = false;
      setTimeout(() => {
        this.showResult = true;
      }, 0);
    },
    // 开始计算
    startCalcu() {
      // 非组合贷款模式
      if (!this.showCom) {
        if (this.showDkIpt && !this.dktotal) {
          this.$toast.show('请输入贷款总额');
          this.showResult = false;
          return false;
        } else if (!this.showDkIpt) {
          if (!this.unitPrice) {
            this.$toast.show('请输入房屋单价');
            this.showResult = false;
            return false;
          }
          if (!this.buildArea) {
            this.$toast.show('请输入房屋面积');
            this.showResult = false;
            return false;
          }
        }
        if (!this.rate || this.rate === '0') {
          this.$toast.show('利率输入不合法，请重新输入');
          return false;
        }
        this.dkMoney = this.showDkIpt ? (this.dktotal * 10000 || 0) : this.dkTotalMoney;
        this.calculateMsg.totalMoney = this.dkMoney;
        this.calculateMsg.rate = this.rate / 100;
        this.calculateMsg.month = this.year * 12;
        this.calculate(this.calculateMsg);
        // 组合贷款模式
      } else {
        if (this.sdtotal === '' && this.sdRate > 0) {
          this.$toast.show('请输入商业贷款金额');
          this.showResult = false;
          return false;
        } else if (this.gjjtotal === '' && this.gjjRate > 0) {
          this.$toast.show('请输入公积金贷款金额');
          this.showResult = false;
          return false;
        } else if (this.sdtotal && !this.sdRate) {
          this.$toast.show('请输入商业贷款利率');
          this.showResult = false;
          return false;
        } else if (this.gjjtotal && !this.gjjRate) {
          this.$toast.show('请输入公积金贷款利率');
          this.showResult = false;
          return false;
        } else if (!this.sdtotal && !this.sdRate && !this.gjjRate && !this.gjjtotal) {
          this.$toast.show('请输入商业贷款金额');
          this.showResult = false;
          return false;
        }
        this.calculateComMsg.gjj.month = this.year * 12;
        this.calculateComMsg.sd.month = this.year * 12;
        this.calculateComMsg.gjj.rate = this.gjjRate / 100 || 0;
        this.calculateComMsg.sd.rate = this.sdRate / 100 || 0;
        this.calculate(this.calculateComMsg);
      }
    },
    hide(nohide) {
      let showList = ['showYear', 'showRate', 'showRatesd', 'showRategjj', 'showFew', 'showDkType', 'showCalType'];
      let that = this;
      for (let i = 0 ; i < showList.length; i++) {
        if (showList[i] !== nohide) {
          that[showList[i]] = false;
        }
      }
    },
    // 清空条件
    clearAll() {
      this.showResult = false;
      // 清空所有条件
      this.showDkIpt = false;
      this.calcuTypeCon = '根据面积、单价计算';
      this.fewCon = (this.G.city === 'bj' || this.G.city === 'sh') ? '6.5成' : '7成';
      this.few = (this.G.city === 'bj' || this.G.city === 'sh') ? 6.5 : 7;
      this.buildArea = '';
      this.unitPrice = '';
      this.dktotal = '';
      this.rate = this.type === 'sd' ? 4.9 : 3.25;
      this.baseRate = 4.9;
      this.gjjBaseRate = 3.25;
      this.year = this.G.city === 'bj' ? 25 : 30;
      this.yearCon = this.G.city === 'bj' ? '25年（ 300期 ）' : '30年（ 360期 ）';
      this.rateCon = '15年10月24日基准利率（基准利率）';
      this.totalLx = 0;
      this.monMoney = 0;
      this.totalMoney = 0;
      this.totalMon = '';
      this.calculateMsg = {
        rate:0.049,
        month:240,
        totalMoney:'',
        type:1
      };
      this.calculateComMsg = {
        sd:{
          rate:0.049,
          month:'',
          totalMoney:'',
          type:1
        },
        gjj:{
          rate:0.025,
          month:'',
          totalMoney:'',
          type:1
        }
      };
      this.gjjRateCon = '15年10月24日基准利率（基准利率）';
      this.sdRateCon = '15年10月24日基准利率（基准利率）';
      this.sdRate = 4.9;
      this.gjjRate = 3.25;
      this.gjjtotal = '';
      this.sdtotal = '';
      this.isType1 = '每月月供';
      this.djMoney = '';
      this.firstMoney = '0';
      this.dkMoney = '0';
      this.disCount = {
        disCount:1,
        sdDisCount:1,
        gjjDisCount:1
      };
      this.isWidth5 = this.type === 'com' ? 'counter_list_width5' : 'counter_list_width1';
      this.items3.forEach(function(value, inx, array) {
        array[inx].cla = '';
      });
      this.items3[0].cla = 'on';
    }
  },
  mounted() {
    let that = this;
    function close(showEle) {
      window.addEventListener('click', function() {
        if (!that[showEle]) {
          return false;
        }
        that[showEle] = false;
      })
    }
    let showList = ['showYear', 'showRate', 'showRatesd', 'showRategjj', 'showFew', 'showDkType', 'showCalType'];
    for (let i = 0 ; i < showList.length; i++) {
      close(showList[i]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
