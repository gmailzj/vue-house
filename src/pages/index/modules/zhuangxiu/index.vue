
<template>
			<table>
				<tr>
					<!--左侧列表-->
					<td class="counter_list counter_list_width7">
						<ul class="clearfix fl">
							<li>
								<span><b>*</b>贷款种类：</span>
								<div class="clearfix">
									<p class="select">
										<input @click="clickType" v-model="type" name="" readonly="readonly"/>
										<i></i>
									</p>
									<ul v-show="showType" class="option">
										<li v-for="item in items" @click="selectType(item)">{{item.text}}</li>
									</ul>
								</div>
							</li>
							<li class="">
								<span><b>*</b>贷款金额：</span>
								<input type="text" v-model="totalMoney" placeholder="请输入贷款金额"  v-on:input="infoIpt1"  name=""/>
								<i>万元</i>
							</li>
							<li class="">
								<span><b>*</b>贷款期限：</span>
								<input type="text"  v-on:input="infoIpt2" placeholder="请输入贷款期限" v-model="calculateMsg.month" name=""/>
								<i>个月</i>
							</li>
							<li class="">
								<span><b>*</b>年利率：</span>
								<input type="text" placeholder="请输入年利率"  v-on:input="infoIpt3" v-model="rate"  name=""/>
								<i>%</i>
							</li>
							<li class="">
								<span>月管理费：</span>
								<input type="text"  placeholder="请输入月管理费比例（选填）" v-on:input="infoIpt4" v-model="chargeTax" name=""/>
								<i>%</i>
							</li>
							<li class="">
								<span>一次收费：</span>
								<input type="text"  placeholder="请输入一次收费比例（选填）" v-on:input="infoIpt5" v-model="payTax"  name=""/>
								<i>%</i>
							</li>
							<select-component title="还款种类" v-on:select-msg="selectMsg" :items="items2"></select-component>
							<li>
								<span> </span>
								<span class="start" @click="startCalculate">开始计算</span>
								<span class="empty" @click="clearAll">清空重填</span>
							</li>
						</ul>
					</td>
					<!--中间竖线-->
					<td class="counter_center">
						<img src="../../assets/center_line.jpg" alt=""/>
					</td>
					<!--右侧计算结果-->
					<td v-show="showResult" class="counter_right counter_right_width1" :class="{fadeInRight:showResult}" valign="top">
						<ul>
							<li class="title"><h2>计算结果</h2></li>
							<li class="clearfix">
								<h3>首月供：</h3>
								<span class="on">{{firstMoney}}</span>
								<i>元</i>
							</li>
							<li v-show="showDj" class="clearfix">
								<h3>月递减：</h3>
								<span class="on">{{djMoney}}</span>
								<i>元</i>
							</li>
							<li class="clearfix">
								<h3>总利息：</h3>
								<span>{{totalLx}}</span>
								<i>元</i>
							</li>
							<li class="clearfix">
								<h3>其他费用：</h3>
								<span>{{otherTax}}</span>
								<i>元</i>
							</li>
						</ul>
						<p class="note">*以上结果仅供参考</p>
					</td>
					<!--右侧还未计算时-->
					<td v-show="!showResult" class="counter_right2">
						<img src="../../assets/jisuan_right.png" alt="" class="" />
						<p>要贷款买房，赶紧算算吧！</p>
					</td>

				</tr>
			</table>
</template>

<script>
import SelectComponent from "../../components/select.vue";
import {Calculate} from "../../assets/Calculate.js";
import Toast from "../../components/common/toast.vue";

const util = require('@/pages/index/util/util');

let calculate = new Calculate();
export default {
  components: {
    SelectComponent,
    Toast
  },
  name: 'fangdai',
  data() {
    return {
      items:[
        {text:'个人装修贷款'},
        {text:'个人购车贷款'}
      ],
      items2:[
        {text:'等额本金', val:2, cla:'on'},
        {text:'等额本息', val:1, cla:''}
      ],
      type:'个人装修贷款',
      showType:false,
      chargeTax:'',
      payTax:'',
      totalMoney:'',
      rate:'',
      showResult:false,
      calculateMsg:{
        type:2,
        totalMoney:'',
        month:'',
        rate:''
      },
      firstMoney:'',
      djMoney:'',
      totalLx:'',
      otherTax:''
    }
  },
  computed:{
    showDj() {
      return this.calculateMsg.type === 2;
    }
  },
  methods:{
    clickType(e) {
      this.showType = !this.showType;
      e.stopPropagation();
    },
    selectType(obj) {
      this.type = obj.text;
      this.showType = false;
      this.showResult = false;
      this.clearAll();
    },
    limitVal(reg, value) {
      return value.match(reg)[0];
    },
    infoIpt1(ev) {
      this.totalMoney = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
    },
    infoIpt2(ev) {
      this.calculateMsg.month = this.limitVal(/\d{0,3}/, ev.target.value);
    },
    infoIpt3(ev) {
      this.rate = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    infoIpt4(ev) {
      this.chargeTax = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    infoIpt5(ev) {
      this.payTax = this.limitVal(/\d{0,2}(\.\d{0,2})?/g, ev.target.value);
    },
    clearAll() {
      this.rate = '';
      this.totalMoney = '';
      this.calculateMsg.month = '';
      this.chargeTax = '';
      this.payTax = '';
      this.showResult = false;
    },
    calculate() {
      this.calculateMsg.totalMoney = this.totalMoney * 10000;
      this.calculateMsg.rate = this.rate / 100;
      let returnData = calculate.calculate(this.calculateMsg);
      this.djMoney = util.formatNumber(returnData.djMoney, 2) || 0;
      this.firstMoney = util.formatNumber(returnData.firstMonYg, 2);
      this.totalLx = util.formatNumber(returnData.toatlInterest, 2);
      this.otherTax = util.formatNumber((this.totalMoney * this.payTax).toFixed(2) || 0, 2);
      this.showResult = false;
      setTimeout(() => {
        this.showResult = true;
      }, 0);
    },
    startCalculate() {
      if (!this.totalMoney) {
        this.$toast.show('贷款金额不能为空，请输入！');
        return false;
      } else if (this.totalMoney === '0') {
        this.$toast.show('贷款金额不能为0，请输入！');
        return false;
      } else if (!this.rate) {
        this.$toast.show('贷款利率不能为空，请输入！');
        return false;
      } else if (this.rate === '0') {
        this.$toast.show('贷款利率不能为0，请输入！');
        return false;
      } else if (!this.calculateMsg.month) {
        this.$toast.show('贷款期限不能为空，请输入！');
        return false;
      } else if (this.calculateMsg.month === '0') {
        this.$toast.show('贷款期限不能为0，请输入！');
        return false;
      }
      this.calculate();
    },
    selectMsg(obj) {
      this.calculateMsg.type = obj.val;
      this.showResult = false;
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
    let showList = ['showType'];
    for (let i = 0 ; i < showList.length; i++) {
      close(showList[i]);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
