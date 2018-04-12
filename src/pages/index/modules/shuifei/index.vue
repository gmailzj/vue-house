<template>
  <table>
    <tr>
      <!--左侧列表-->
      <td class="counter_list counter_list_width3 xfStyle" valign="top">
        <ul class="clearfix fl">
          <select-component v-on:select-msg="selectMsg" title="房屋" :items="items1">
          </select-component>
          <li class="">
            <span>房屋面积：</span>
            <input type="text" v-model="buildArea" maxlength="7" pattern="[0-9]*" v-on:input="infoIpt1" placeholder="请输入房屋面积" name=""/>
            <i>平米</i>
          </li>
          <li class="">
            <span>房屋单价：</span>
            <input type="text" v-model="unitPrice" maxlength="6" pattern="[0-9]*" v-on:input="infoIpt2" placeholder="请输入房屋单价" name=""/>
            <i>元/平米</i>
          </li>
          <li v-show="showEsf" class="">
            <span>房屋总价：</span>
            <input type="text" v-model="totalMoney" maxlength="6" pattern="[0-9]*" v-on:input="infoIpt3" placeholder="请输入房屋总价" name=""/>
            <i>万元</i>
          </li>
          <li v-show="showYj" class="">
            <span>房屋原价：</span>
            <input type="text" v-model="price2" maxlength="6" pattern="[0-9]*" v-on:input="infoIpt4" placeholder="请输入房屋原价" name=""/>
            <i>万元</i>
          </li>
          <li v-show="showEsf">
            <span>计征方式：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" @click="clickJz" v-model="jzTypeCon" name="" readonly="readonly"/>
                <i></i>
              </p>
              <jz-type v-show="showJz" v-on:jztype-msg="jzMsg"></jz-type>
            </div>
          </li>
          <li v-show="showEsf">
            <span>房产性质：</span>
            <div class="clearfix">
              <p class="select">
                <input type="" @click="clickFw" v-model="buildTypeCon" name="" readonly="readonly"/>
                <i></i>
              </p>
              <fwxz-component v-show="showFw" v-on:fw-msg="fwMsg"></fwxz-component>
            </div>
          </li>
          <select-component v-show="showEsf" title="房产购置满5年" :items="items2"
                            v-on:select-msg="fiveMsg"></select-component>
          <select-component title="买房家庭首次购房" :items="items3" v-on:select-msg="firstMsg"></select-component>
          <select-component v-show="showEsf" title="卖方家庭唯一住房" :items="items4"
                            v-on:select-msg="onlyMsg"></select-component>
          <li>
            <span></span>
            <span class="start" @click="getTax">开始计算</span>
            <span class="empty" @click="clearSelect">清空重填</span>
          </li>
        </ul>
      </td>
      <!--中间竖线-->
      <td class="counter_center">
        <img src="../../assets/center_line.jpg" alt=""/>
      </td>
      <!--右侧计算结果-->
      <td v-show="showResult" class="counter_right counter_right_width3" :class="{fadeInRight:showResult}"
          valign="top">
        <ul>
          <li class="title">
            <h2>计算结果</h2></li>
          <li v-show="!showEsf" class="clearfix">
            <h3>房款总款：</h3>
            <span class="on">{{resultTotal}}</span>
            <i>元</i>
          </li>
          <li v-show="!showEsf" class="clearfix">
            <h3>工本费：</h3>
            <span>{{gbTax}}</span>
            <i>元</i>
          </li>
          <li v-show="showEsf" class="clearfix">
            <h3>工本印花税：</h3>
            <span>{{gbyhTax}}</span>
            <i>元</i>
          </li>
          <li v-show="showEsf" class="clearfix">
            <h3>印花税：</h3>
            <span>{{yhTax}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>契税：</h3>
            <span>{{qTax}}</span>
            <i>元</i>
          </li>
          <li v-show="showEsf" class="clearfix">
            <h3>个人所得税：</h3>
            <span>{{gsTax}}</span>
            <i>元</i>
          </li>
          <li v-show="showEsf" class="clearfix">
            <h3>增值税：</h3>
            <span>{{zzTax}}</span>
            <i>元</i>
          </li>
          <li v-show="showEsf" class="clearfix">
            <h3>综合地价款：</h3>
            <span>{{zhdjTax}}</span>
            <i>元</i>
          </li>
          <li v-show="!showEsf" class="clearfix">
            <h3>权属登记费：</h3>
            <span>{{qsdjTax}}</span>
            <i>元</i>
          </li>
          <li v-show="!showEsf" class="clearfix">
            <h3>维修基金：</h3>
            <span>{{wxjjTax}}</span>
            <i>元</i>
          </li>
          <li class="clearfix">
            <h3>合计：</h3>
            <span class="on">{{totalTax}}</span>
            <i>元</i>
          </li>
        </ul>
        <p class="note">*以上结果仅供参考</p>
      </td>
      <!--右侧还未计算时-->
      <td v-show="!showResult" class="counter_right2">
        <img src="../../assets/jisuan_right.png" alt="" class=""/>
        <p>{{tipCon}}</p>
      </td>
    </tr>
  </table>
</template>
<script>
import SelectComponent from "../../components/select.vue";
import FwxzComponent from "./fwxzComponent.vue";
import JzType from "./jzType.vue";
import Toast from "../../components/common/toast.vue";

const util = require('@/pages/index/util/util');

export default {
  components: {
    JzType,
    FwxzComponent,
    SelectComponent,
    Toast
  },
  name: 'shuifei',
  data() {
    return {
      // 税费类别
      items1: [
        {text: '新房', cla: 'on'},
        {text: '二手房', cla: ''},
      ],
      // 房产购置满5年
      items2: [
        {text: '满5年', cla: 'on', val: 3},
        {text: '满2年', cla: '', val: 2},
        {text: '不满两年', cla: 'on', val: 1},
      ],
      // 是否首次
      items3: [
        {text: '是', cla: 'on', val: 1},
        {text: '否', cla: '', val: 2},
      ],
      // 是否唯一
      items4: [
        {text: '是', cla: 'on', val: 1},
        {text: '否', cla: '', val: 2},
      ],
      // 房屋面积
      buildArea: '',
      // 房屋单价
      unitPrice: '',
      // 房屋原价
      price2: '',
      // 计价方式
      jzType: 0,
      // 计价方式内容
      jzTypeCon: '总价',
      // 房屋性质
      buildType: 1,
      // 房屋性质内容
      buildTypeCon: '普通住宅',
      // 是否满五
      isFive: 3,
      // 是否首套
      isFirst: 1,
      // 是否唯一
      isOnly: 1,
      showFw: false,
      showJz: false,
      showEsf: false,
      resultTotal: 0,
      yhTax: 0,
      // 契税
      qTax: 0,
      // 工本费
      gbTax: '',
      // 权属登记费
      qsdjTax: '',
      // 维修基金
      wxjjTax: '',
      // 工本印花税
      gbyhTax: '',
      // 增值税
      zzTax: '',
      // 综合地价款
      zhdjTax: '',
      // 个人所得税
      gsTax: '',
      // 税费总价
      totalTax: 0,
      ajaxData: {},
      showResult: false,
      tipCon:'要买新房，快来算算吧！',
      totalMoney:''
    }
  },
  computed: {
    showYj() {
      return this.showEsf && this.jzType === 2;
    }
  },
  methods: {
    // 选择二手房，新房
    selectMsg(obj) {
      this.showEsf = obj.text === '二手房';
      this.tipCon = obj.text === '二手房' ? '要买二手房，快来算算吧！' : '要买新房，快来算算吧！';
      this.clearSelect();
    },
    // 选择计征方式
    clickJz(e) {
      this.showJz = !this.showJz;
      e.stopPropagation()
    },
    clickFw(e) {
      this.showFw = !this.showFw;
      e.stopPropagation();
    },
    limitVal(reg, value) {
      return value.match(reg)[0];
    },
    infoIpt1(ev) {
      this.buildArea = this.limitVal(/\d{0,4}(\.\d{0,2})?/g, ev.target.value);
      if (this.showEsf) {
        this.totalMoney = parseFloat(((this.buildArea * this.unitPrice) / 10000).toFixed(2)) || '';
      }
    },
    infoIpt2(ev) {
      this.unitPrice = this.limitVal(/\d{0,6}/, ev.target.value);
      if (this.showEsf) {
        this.totalMoney = parseFloat(((this.buildArea * this.unitPrice) / 10000).toFixed(2)) || '';
      }
    },
    infoIpt3(ev) {
      this.totalMoney = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
    },
    infoIpt4(ev) {
      this.price2 = this.limitVal(/\d{0,6}(\.\d{0,2})?/g, ev.target.value);
    },
    // 选择房屋性质
    fwMsg(obj) {
      this.buildTypeCon = obj.text;
      this.buildType = obj.val;
      this.showFw = false;
    },
    // 选择计征方式
    jzMsg(obj) {
      this.jzType = obj.val;
      this.jzTypeCon = obj.text;
      this.showJz = false;
    },
    // 选择是否满五
    fiveMsg(obj) {
      this.isFive = obj.val;
    },
    // 选择是否首次
    firstMsg(obj) {
      this.isFirst = obj.val;
    },
    // 选择是否唯一
    onlyMsg(obj) {
      this.isOnly = obj.val;
    },
    // 重置数据
    resetData(item, data) {
      for (let i = 0; i < item.length; i++) {
        item[i].cla = ''
      }
      item[0].cla = 'on';
      data = item[0].val;
    },
    // 清除选择的数据
    clearSelect() {
      this.buildArea = '';
      this.unitPrice = '';
      this.totalMoney = '';
      this.jzType = 1;
      this.jzTypeCon = '总价';
      this.buildType = 1;
      this.buildTypeCon = '普通住宅';
      this.resetData(this.items2, this.isFive);
      this.resetData(this.items3, this.isFirst);
      this.resetData(this.items4, this.isOnly);
      this.showResult = false;
    },
    // 获取税费
    getTax() {
      let that = this;
      // 二手房税费
      if (this.showEsf) {
        if (!this.buildArea) {
          this.$toast.show('请输入房屋面积');
          return false;
        } else if (this.buildArea === '0') {
          this.$toast.show('房屋面积不能为0');
          return false;
        } else if (!this.unitPrice) {
          this.$toast.show('请输入房屋单价');
          return false;
        } else if (!this.totalMoney) {
          this.$toast.show('请输入房屋总价');
          return false;
        } else if (this.totalMoney === '0') {
          this.$toast.show('房屋总价不能为0');
          return false;
        } else if (this.jzType === 2 && !this.price2) {
          this.$toast.show('请输入房屋原价');
          return false;
        }
        this.ajaxData = {
          // 计算方式
          CaculateType: this.jzType,
          // 房屋面积
          Area: this.buildArea,
          // 房屋性质
          HouseType: this.buildType,
          // 是否首套
          IsFirstHouse: this.isFirst,
          // 是否唯一
          IsOnlyHouse: this.isOnly,
          // 房屋价格
          Price: this.totalMoney * 10000,
          // 房屋原价
          Price2: this.price2 * 10000,
          // 房产购置年限
          YearType: this.isFive,
          // 城市
          city:this.G.city
        };
        this.$axios.get(that.G.urlESFSF, {
          params: that.ajaxData
        }).then(function(res) {
          let result = res.data;
          if (result) {
            that.gsTax = util.formatNumber(result.geshui, 2);
            that.gbyhTax = util.formatNumber(result.gongbenyinhuashui, 2);
            that.qTax = util.formatNumber(result.qishui, 2);
            that.yhTax = util.formatNumber(result.yinhuashui, 2);
            that.zzTax = util.formatNumber(result.zengzhishui, 2);
            that.zhdjTax = util.formatNumber(result.zonghedijiakuan, 2);
            that.totalTax = util.formatNumber(result.heji, 2);
            that.showResult = false;
            setTimeout(() => {
              that.showResult = true;
            }, 0);
          } else {
            that.$toast.show('输入信息不合法，请重新输入');
          }
        }).catch(function(err) {
          that.$toast.show(err);
        })
      } else {
        if (!this.buildArea) {
          this.$toast.show('请输入房屋面积');
          return false;
        } else if (this.buildArea === '0') {
          this.$toast.show('房屋面积不能为0');
          return false;
        } else if (!this.unitPrice) {
          this.$toast.show('请输入房屋单价');
          return false;
        } else if (this.unitPrice === '0') {
          this.$toast.show('房屋单价不能为0');
          return false;
        }
        // 新房税费
        this.ajaxData = {
          // 房屋面积
          Area: that.buildArea,
          // 是否首套
          IsFirstHouse: that.isFirst,
          // 房屋单价
          priceper: that.unitPrice,
          // 城市
          city:this.G.city
        };
        this.$axios.get(that.G.urlXFSF, {
          params: that.ajaxData
        }).then(function(res) {
          let result = res.data;
          if (result) {
            that.qTax = util.formatNumber(result.qishui, 2);
            that.gbTax = util.formatNumber(result.gongbenfei, 2);
            that.qsdjTax = util.formatNumber(result.quanshudengjifei, 2);
            that.wxjjTax = util.formatNumber(result.weixiujijin, 2);
            that.totalTax = util.formatNumber(result.shuifeizongjia, 2);
            that.resultTotal = util.formatNumber(result.zongjia, 2);
            that.showResult = false;
            setTimeout(() => {
              that.showResult = true;
            }, 0);
          } else {
            that.$toast.show('输入不合法，请重新输入')
          }
        }).catch(function(err) {
          that.$toast.show(err);
        });
      }
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

    let showList = ['showJz', 'showFw'];
    for (let i = 0; i < showList.length; i++) {
      close(showList[i]);
    }
  }


}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
