/** * @file 提前还贷计算器 * @author fenglinzeng@fang.com * @date 20170905 */
<template>
    <table>
        <tr>
            <!--左侧列表-->
            <td class="counter_list counter_list_width3">
                <ul class="clearfix fl">
                    <li>
                        <span>还款类型：</span>
                        <drop-select :selectItem="repayType" @selectDrop="selectType" name="repayType" :defaultItem="selected.repayType"></drop-select>
                    </li>
                    <li class="">
                        <span>原房贷金额：</span>
                        <input type="text" v-model.number="selected.repayNum" v-on:input="yfdIpt" placeholder="请输入原房贷金额" />
                        <i>万元</i>
                    </li>
                    <li>
                        <span>原房贷年限：</span>
                        <drop-select :selectItem="repayTime" @selectDrop="selectType" name="repayTime" :defaultItem="selected.repayTime"></drop-select>
                    </li>
                    <li class="">
                        <span>利率：</span>
                        <drop-select :selectItem="rateType" @selectDrop="selectType" name="rateType" :defaultItem="selected.rateType"></drop-select>
                    </li>
                    <li class="date_select clearfix">
                        <span>第一次还款时间：</span>
                        <drop-select :selectItem="firstYear" @selectDrop="selectType" klass="date_right" name="firstYear" :defaultItem="selected.firstYear"></drop-select>
                        <drop-select :selectItem="month" @selectDrop="selectType" name="firstMonth" :defaultItem="selected.firstMonth"></drop-select>
                    </li>
                    <li class="date_select clearfix">
                        <span>预计提前还款时间：</span>
                        <drop-select :selectItem="advYear" @selectDrop="selectType" klass="date_right" name="advYear" :defaultItem="selected.advYear"></drop-select>
                        <drop-select :selectItem="month" @selectDrop="selectType" name="advMonth" :defaultItem="selected.advMonth"></drop-select>
                    </li>
                    <li class="way_block">
                        <span>还款方式：</span>
                        <p class="fangshi" @click="selectType(repayMode[0], 'repayMode')">
                            <i :class="{on: selected.repayMode.value === 'all'}"></i>
                            {{repayMode[0].name}}
                        </p>
                        <p class="fangshi" @click="selectType(repayMode[1], 'repayMode')">
                            <i :class="{on: selected.repayMode.value === 'part'}"></i>
                            {{repayMode[1].name}}
                            <input type="number" v-model.number="selected.partInput" placeholder="请输入部分提前还款额" maxlength="10" />
                            <i class="position_wen">万元</i>
                        </p>
                    </li>
                    <li class="way_block" v-show="selected.repayMode.value === 'part'">
                        <span>处理方式：</span>
                        <p class="fangshi" @click="selectType(repayMethod[0], 'repayMethod')">
                            <i :class="{on: selected.repayMethod.value === 'short'}"></i>
                            {{repayMethod[0].name}}
                        </p>
                        <p class="fangshi" @click="selectType(repayMethod[1], 'repayMethod')">
                            <i :class="{on: selected.repayMethod.value === 'reduce'}"></i>
                            {{repayMethod[1].name}}
                        </p>
                    </li>
                    <li>
                        <span> </span>
                        <span class="start" @click="cal">开始计算</span>
                        <span class="empty" @click="empty">清空重填</span>
                    </li>
                </ul>
            </td>
            <!--中间竖线-->
            <td class="counter_center">
                <img src="../../assets/center_line.jpg" alt="" />
            </td>
            <!--右侧计算结果-->
            <td class="counter_right counter_right_width5" valign="top" :class="{none: !calDone, fadeInRight: calDone}">
                <ul>
                    <li class="title">
                        <h2>计算结果</h2>
                    </li>
                    <li class="clearfix">
                        <h3>原月还款额：</h3>
                        <span class="on">{{result.resultNum}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>原最后还款期：</h3>
                        <span class="on">{{result.resultDate}}</span>
                        <i></i>
                    </li>
                    <li class="clearfix">
                        <h3>已还款总额：</h3>
                        <span>{{result.resultAlready}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>已还利息额：</h3>
                        <span>{{result.resultAlreadyInterest}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>该月一次还款额：</h3>
                        <span>{{result.resultOnce}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>下月起月还款额：</h3>
                        <span>{{result.resultNextMonth}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>节省利息支出：</h3>
                        <span>{{result.resultSave}}</span>
                        <i>元</i>
                    </li>
                    <li class="clearfix">
                        <h3>新的最后还款期：</h3>
                        <span>{{result.resultDateNew}}</span>
                        <i></i>
                    </li>
                    <li class="clearfix" v-show="hasTip">
                        <h3>计算结果提示：</h3>
                        <span>{{result.resultTip}}</span>
                        <i></i>
                    </li>
                </ul>
                <p class="note">*以上结果仅供参考</p>
            </td>
            <!--右侧还未计算时-->
            <td class="counter_right2" :class="{none: calDone}">
                <img src="../../assets/jisuan_right.png" alt="" class="" />
                <p>提前还贷款，快来算算吧！</p>
            </td>
        </tr>
    </table>
</template>

<script>
    import dropSelect from "@/pages/index/components/common/dropSelect.vue";
    import Toast from '@/pages/index/components/common/toast.vue';

    const lilvArr = require('@/pages/index/config/lilv');
    const util = require('@/pages/index/util/util');
    // 利率
    const rateType = [
        { value: 37, name: '15年10月24日利率上限（1.3倍）' },
        { value: 36, name: '15年10月24日利率上限（1.2倍）' },
        { value: 35, name: '15年10月24日利率上限（1.1倍）' },
        { value: 34, name: '15年10月24日利率下限（95折）' },
        { value: 33, name: '15年10月24日利率下限（9折）' },
        { value: 32, name: '15年10月24日利率下限（88折）' },
        { value: 31, name: '15年10月24日利率下限（85折）' },
        { value: 30, name: '15年10月24日利率下限（7折）' },
        { value: 29, name: '15年10月24日基准利率' },
        { value: 28, name: '15年8月26日利率上限（1.1倍）' },
        { value: 27, name: '15年8月26日利率下限（85折）' },
        { value: 26, name: '15年8月26日利率下限（7折）' },
        { value: 25, name: '15年8月26日基准利率' },
        { value: 24, name: '15年6月28日利率上限（1.1倍）' },
        { value: 23, name: '15年6月28日利率下限（85折）' },
        { value: 22, name: '15年6月28日利率下限（7折）' },
        { value: 21, name: '15年6月28日基准利率' },
        { value: 20, name: '15年5月11日利率上限（1.1倍）' },
        { value: 19, name: '15年5月11日利率下限（85折）' },
        { value: 18, name: '15年5月11日利率下限（7折）' },
        { value: 17, name: '15年5月11日基准利率' },
        { value: 16, name: '15年3月1日利率上限（1.1倍）' },
        { value: 15, name: '15年3月1日利率下限（85折）' },
        { value: 14, name: '15年3月1日利率下限（7折）' },
        { value: 13, name: '15年3月1日基准利率' },
        { value: 12, name: '14年11月22日利率上限（1.1倍）' },
        { value: 11, name: '14年11月22日利率下限（85折）' },
        { value: 10, name: '14年11月22日利率下限（7折）' },
        { value: 9, name: '14年11月22日基准利率' },
        { value: 8, name: '12年7月6日利率上限（1.1倍）' },
        { value: 7, name: '12年7月6日利率下限（85折）' },
        { value: 6, name: '12年7月6日利率下限（7折）' },
        { value: 5, name: '12年7月6日基准利率' },
        { value: 4, name: '12年6月8日利率上限（1.1倍）' },
        { value: 3, name: '12年6月8日利率下限（85折）' },
        { value: 2, name: '12年6月8日利率下限（7折）' },
        { value: 1, name: '12年6月8日基准利率' }
    ];

    // 还款类型
    const repayType = [
        { name: '商业贷款', value: 0 },
        { name: '公积金贷款', value: 1 }
    ];

    // 房贷年限
    const repayTime = [
        { name: '2年(24期)', value: 24 },
        { name: '3年(36期)', value: 36 },
        { name: '4年(48期)', value: 48 },
        { name: '5年(60期)', value: 60 },
        { name: '6年(72期)', value: 72 },
        { name: '7年(84期)', value: 84 },
        { name: '8年(96期)', value: 96 },
        { name: '9年(108期)', value: 108 },
        { name: '10年(120期)', value: 120 },
        { name: '11年(132期)', value: 132 },
        { name: '12年(144期)', value: 144 },
        { name: '13年(156期)', value: 156 },
        { name: '14年(168期)', value: 168 },
        { name: '15年(180期)', value: 180 },
        { name: '20年(240期)', value: 240 },
        { name: '25年(300期)', value: 300 },
        { name: '30年(360期)', value: 360 }
    ];

    // 本年度
    const NowYear = new Date().getFullYear();
    // 第一次还款年往前多少年
    const firstBefore = 12;
    // 第一次还款年往后多少年
    const firstAfter = 0;
    // 提前还款年往前多少年
    const advBefore = 7;
    // 提前还款年往后多少年
    const advAfter = 30;
    // 传本年的前后年或者年份列表
    function getYearArr(now, before, after) {
        let startYear = NowYear - before;
        let endYear = NowYear + after;
        let yearArr = [];
        for (let i = startYear; i <= endYear; i++) {
            yearArr.push({ value: i, name: `${i}年` });
        }
        return yearArr;
    }

    // 第一次还款年列表
    const firstYear = getYearArr(NowYear, firstBefore, firstAfter);

    // 提前还款年列表
    const advYear = getYearArr(NowYear, advBefore, advAfter);

    // 月份列表
    const month = [
        { value: 1, name: '01月' },
        { value: 2, name: '02月' },
        { value: 3, name: '03月' },
        { value: 4, name: '04月' },
        { value: 5, name: '05月' },
        { value: 6, name: '06月' },
        { value: 7, name: '07月' },
        { value: 8, name: '08月' },
        { value: 9, name: '09月' },
        { value: 10, name: '10月' },
        { value: 11, name: '11月' },
        { value: 12, name: '12月' },
    ];

    // 处理方式
    const repayMethod = [
        { value: 'short', name: '缩短还款期限，月还款额基本不变' },
        { value: 'reduce', name: '减少月还款额，还款期限不变' }
    ];

    // 还款方式
    const repayMode = [
        { value: 'all', name: '一次性还清' },
        { value: 'part', name: '部分提前还款' }
    ];


    export default {
        // name: 'huandai',
        components: {
            dropSelect,
            Toast
        },
        data() {
            return {
                hasTip: false,
                calDone: false,
                // 还款类型
                repayType: repayType,
                // 年限
                repayTime: repayTime,
                // 利率
                rateType: rateType,
                // 第一次还款时间 - 年份
                firstYear: firstYear,
                // 月份
                month: month,
                // 预计提前还款时间 - 年份
                advYear: advYear,
                // 还款方式
                repayMode: repayMode,
                // 处理方式
                repayMethod: repayMethod,
                // 选中的
                selected: {
                    // 还款类型
                    repayType: repayType[0],
                    // 原贷款金额
                    repayNum: '',
                    // 还款年限
                    repayTime: repayTime[14],
                    // 利率
                    rateType: rateType[8],
                    // 第一次还款年
                    firstYear: firstYear[12],
                    // 第一次还款月
                    firstMonth: month[new Date().getMonth()],
                    // 提前还款年
                    advYear: advYear[7],
                    // 提前还款月
                    advMonth: month[new Date().getMonth()],
                    // 还款方式
                    repayMode: { value: 'all' },
                    // 处理方式
                    repayMethod: { value: 'short' },
                    // 部分提前还款额
                    partInput: ''
                },
                // 计算结果
                result: {
                    // 原月还款额
                    resultNum: 0,
                    // 原最后还款额
                    resultDate: '',
                    // 已还款总额
                    resultAlready: '',
                    // 已还款利息
                    resultAlreadyInterest: '',
                    // 该月一次还款额
                    resultOnce: '',
                    // 下月起月还款额
                    resultNextMonth: '',
                    // 节省利息支出
                    resultSave: '',
                    // 新的最后还款期
                    resultDateNew: '',
                    // 计算结果提示
                    resultTip: ''
                }
            }
        },
        methods: {
            // 选择了下拉菜单，单选也用这个方法
            selectType(item, name) {
                this.selected[name] = item;
            },
            yfdIpt(e) {
                let value = e.target.value;
                this.selected.repayNum = value.match(/\d{0,10}(\.\d{0,2})?/g)[0];
            },
            // 计算
            // !TODO 计算逻辑参考线上，一些变量还没改
            cal() {
                let that = this;

                let userInput = this.selected;
                console.log(userInput);
                // 原房贷金额
                let repayNum = userInput.repayNum;
                // 还款方式
                let repayMode = userInput.repayMode;
                // 部分还款
                let partInput = userInput.partInput ? userInput.partInput : '';
                // 如果没输入房贷金额
                if (!repayNum) {
                    this.$toast.show('请填入贷款总额')
                    return;
                }
                repayNum = parseFloat(repayNum) * 10000;

                // 如果选择了部分提前还贷，却没有填写金额
                if (repayMode.value === 'part' && !partInput) {
                    this.$toast.show('请填入部分提前还款额度')
                    return;
                }

                // 房贷年限
                let repayTime = userInput.repayTime.value;
                let loanRate;
                // 月利率，如果是公积金贷款
                if (userInput.repayType.value === 1) {
                    if (repayTime > 60) {
                        loanRate = this.getlilv(userInput.rateType.value, 2, 10) / 12; // 公积金贷款利率5年以上4.23%
                    } else {
                        loanRate = this.getlilv(userInput.rateType.value, 2, 3) / 12; // 公积金贷款利率5年(含)以下3.78%
                    }
                }
                // 月利率，如果是商业贷款
                if (userInput.repayType.value === 0) {
                    if (repayTime > 60) {
                        loanRate = this.getlilv(userInput.rateType.value, 1, 10) / 12; // 商业性贷款利率5年以上5.31%
                    } else {
                        loanRate = this.getlilv(userInput.rateType.value, 1, 3) / 12; // 商业性贷款利率5年(含)以下4.95%
                    }
                }
                // 已还贷款期数
                let alreadyNum = (userInput.advYear.value * 12 + userInput.advMonth.value) - (userInput.firstYear.value * 12 + userInput.firstMonth.value);

                if (alreadyNum < 0 || alreadyNum > repayTime) {
                    this.$toast.show('预计提前还款时间与第一次还款时间有矛盾，请查实');
                    return false;
                }

                let yhk = repayNum * (loanRate * Math.pow((1 + loanRate), repayTime)) / (Math.pow((1 + loanRate), repayTime) - 1);
                // 月还款结束时间
                let repayEndTime = Math.floor((userInput.firstYear.value * 12 + userInput.firstMonth.value + repayTime - 2) / 12) + '年' + ((userInput.firstYear.value * 12 + userInput.firstMonth.value + repayTime - 2) % 12 + 1) + '月';
                // 已还贷款期数
                let alreadyPeriod = yhk * alreadyNum;

                let yhlxs = 0;
                let yhbjs = 0;
                for (let i = 1; i <= alreadyNum; i++) {
                    yhlxs += (repayNum - yhbjs) * loanRate;
                    yhbjs = yhbjs + yhk - (repayNum - yhbjs) * loanRate;
                }
                // 计算结果提示
                let remark = '',
                    // 本月还款
                    byhk,
                    // 下月还款
                    xyhk,
                    //
                    jslx,
                    // 新贷款结束时间
                    xdkjssj;
                if (repayMode.value === 'part') {
                    partInput = parseInt(partInput) * 10000;
                    if (partInput + yhk >= (repayNum - yhbjs) * (1 + loanRate)) {
                        remark = '您的提前还款额已足够还清所欠贷款！';
                        that.hasTip = true;
                    } else {
                        that.hasTip = false;
                        yhbjs += yhk;
                        byhk = yhk + partInput;
                        if (userInput.repayMethod.value === 'short') {
                            let yhbjs_temp = yhbjs + partInput;
                            let xdkqs = 0;
                            for (xdkqs = 0; yhbjs_temp <= repayNum; xdkqs++) yhbjs_temp = yhbjs_temp + yhk - (repayNum - yhbjs_temp) * loanRate;
                            xdkqs -= 1;
                            xyhk = (repayNum - yhbjs - partInput) * (loanRate * Math.pow((1 + loanRate), xdkqs)) / (Math.pow((1 + loanRate), xdkqs) - 1);
                            jslx = yhk * repayTime - alreadyPeriod - byhk - xyhk * xdkqs;
                            xdkjssj = Math.floor((userInput.advYear.value * 12 + userInput.advMonth.value + xdkqs - 2) / 12) + '年' + ((userInput.advYear.value * 12 + userInput.advMonth.value + xdkqs - 2) % 12 + 1) + '月';
                        } else if (userInput.repayMethod.value === 'reduce') {
                            xyhk = (repayNum - yhbjs - partInput) * (loanRate * Math.pow((1 + loanRate), (repayTime - alreadyNum))) / (Math.pow((1 + loanRate), (repayTime - alreadyNum)) - 1);
                            jslx = yhk * repayTime - alreadyPeriod - byhk - xyhk * (repayTime - alreadyNum);
                            xdkjssj = repayEndTime;
                        }
                    }
                }

                if (repayMode.value === 'all' || remark != '') {
                    byhk = (repayNum - yhbjs) * (1 + loanRate);
                    xyhk = 0;
                    jslx = yhk * repayTime - alreadyPeriod - byhk;
                    xdkjssj = userInput.advYear.value + '年' + userInput.advMonth.value + '月';
                }

                let result = this.result;

                let resultNum = Math.round(yhk * 100) / 100;
                let resultAlready = Math.round(alreadyPeriod * 100) / 100;
                let resultAlreadyInterest = Math.round(yhlxs * 100) / 100;
                let resultOnce = Math.round(byhk * 100) / 100;
                let resultNextMonth = Math.round(xyhk * 100) / 100;
                let resultSave = Math.round(jslx * 100) / 100;

                // 原月还款额
                result.resultNum = resultNum > 10000 ? (resultNum / 10000).toFixed(2) + '万' : resultNum;
                result.resultNum = resultNum > 100000000 ? (resultNum / 100000000).toFixed(2) + '亿' : resultNum;
                // 最后还款期
                result.resultDate = repayEndTime;
                // 已还款总额
                result.resultAlready = util.formatNumber(resultAlready);
                // 已还息额
                result.resultAlreadyInterest = util.formatNumber(resultAlreadyInterest);
                // 该月一次还款额
                result.resultOnce = util.formatNumber(resultOnce);
                // 下月起月还款额
                result.resultNextMonth = util.formatNumber(resultNextMonth);
                // 节省利息支出
                result.resultSave = util.formatNumber(resultSave);
                // 新的最后还款期限
                result.resultDateNew = xdkjssj;
                // 还款提示
                result.resultTip = remark;

                this.calDone = false;
                setTimeout(() => {
                    this.calDone = true;
                }, 0);
            },
            // 获取利率
            getlilv(lilvClass, type, years) {
                const indexNumSd = this.getArrayIndexFromYear(years, 1); // 商贷
                const indexNumGj = this.getArrayIndexFromYear(years, 2); // 公积金
                lilvClass = parseInt(lilvClass);
                if (type == 1) {
                    return lilvArr[lilvClass][type][indexNumSd];
                } else if (type == 2) {
                    return lilvArr[lilvClass][type][indexNumGj];
                }
            },
            // 根据获取序号
            getArrayIndexFromYear(year, dkType) {
                let indexNum = 0;
                if (dkType == 1) {
                    if (year == 1) {
                        indexNum = 1;
                    } else if (year > 1 && year <= 3) {
                        indexNum = 3;
                    } else if (year > 3 && year <= 5) {
                        indexNum = 5;
                    } else {
                        indexNum = 10;
                    }
                } else if (dkType == 2) {
                    if (year > 5) {
                        indexNum = 10;
                    } else {
                        indexNum = 5;
                    }
                }
                return indexNum;
            },
            empty() {
                let selected = this.selected;
                // 默认还款类型
                this.selected.repayType = repayType[0];
                // 房贷金额
                this.selected.repayNum = '';
                // 还款年限
                this.selected.repayTime = repayTime[14];
                // 还款利率
                this.selected.rateType = rateType[8];
                // 第一次还款年
                this.selected.firstYear = year[0];
                // 第一次还款月
                this.selected.firstMonth = month[new Date().getMonth()];
                // 提前还款年
                this.selected.advYear = year[0];
                // 提前还款月
                this.selected.advMonth = month[new Date().getMonth()];
                // 还款方式
                this.selected.repayMode = { value: 'all' };
                // 处理方式
                this.selected.repayMethod = { value: 'short' };
                // 部分还款额
                this.selected.partInput = '';
            }
        },
        mounted() {
            console.log('提前还贷~');
        }
    }
</script>
<style scoped>
    /*修复间距不够的问题*/

    .note {
        margin-top: 65px;
    }
</style>
