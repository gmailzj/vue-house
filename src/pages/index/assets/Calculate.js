/**
 * Created by lina on 2017/7/13.
 * 首付月供计算公用插件
 */
function Calculate() {

}
Calculate.prototype.calculate = function(data) {
  let returnData = {
    // 每月利息
    interest: '',
    toatlInterest: '',
    rate:data.rate
  };
  let that = this;
  that.data = data;
  // 等额本息计算月供
  let monRate = this.data.rate / 12;
  // 等额本息：每月应还利息 = 贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
  // 等额本金：每月应还利息= 剩余本金×月利率+(贷款本金-已归本金累计额)×月利率
  let monLx = [];
  // 等额本息： 每月应还本金 = 贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔((1+月利率)^还款月数)-1〕
  // 等额本金：每月应还本金=贷款本金÷还款月数
  var monMoney = [];
  let totalMon = parseInt(that.data.month);
  let totalMoney = parseFloat(that.data.totalMoney);
  var i = 0;
  let reMoney = 0;
  let totalLx = 0;
  let leftMoney = [];
  if (that.data.type == 1) {
    // 等额本息： 总利息= 还款月数×每月月供额-贷款本金
    // 等额本息： 每月月供 = 〔贷款本金×月利率×(1＋月利率)＾还款月数〕÷〔((1＋月利率)＾还款月数)-1〕
    var monYg = totalMoney * monRate * (Math.pow((1 + monRate), totalMon)) / (Math.pow((1 + monRate), totalMon) - 1);
    for (;i < that.data.month; i++) {
      // 每月利息 = 贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
      monLx.push(Math.round(totalMoney * monRate * (Math.pow((1 + monRate), totalMon) - Math.pow((1 + monRate), i)) / (Math.pow((1 + monRate), totalMon) - 1)));
      // 每月应还本金
      monMoney.push(Math.round(totalMoney * monRate * Math.pow((1 + monRate), i) / (Math.pow((1 + monRate), totalMon) - 1)));
      reMoney += monMoney[i];
    }
    for (var i = 0; i < monLx.length;i++) {
      totalLx += Number(monLx[i]);
    }
    totalLx = Math.round(monYg * totalMon - totalMoney);
    monYg = Math.round(monYg);
    for (let n = 1; n <= that.data.month; n++) {
      // 每月剩余贷款
      leftMoney.push(Math.round(totalLx - Math.round(monYg) * n));
    }
  } else if (that.data.type == 2) {
    // 每月应还本金
    var monMoney = Math.round(totalMoney / totalMon);
    // 等额本金： 每月月供 = (贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
    var monYg = [];
    // 每月月供递减额 = 每月应还本金×月利率
    let djMoney = monMoney * monRate;
    // 等额本金：总利息=〔(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×款月数-总贷款额
    totalLx = Math.round((((totalMoney / totalMon + totalMoney * monRate) + totalMoney / totalMon * (1 + monRate)) / 2 * totalMon - totalMoney));
    let sumMoney = 0;
    for (;i < that.data.month; i++) {
      // 每月利息
      monLx.push(Math.round((totalMoney - reMoney) * monRate));
      // 每月月供
      monYg.push(parseInt(monMoney + (totalMoney - reMoney) * monRate));
      // 已还本金
      reMoney = monMoney * (i + 1) ;
      // 已还钱数
      sumMoney += Math.round(monYg[i]);
      leftMoney.push(Math.round(totalMoney + totalLx - sumMoney));
    }
    // 每月递减额
    returnData.djMoney = Math.round(djMoney);
  }
  // 每月利息
  returnData.interest = monLx;
  // 总利息
  returnData.toatlInterest = totalLx;
  // 每月月供
  returnData.monYg = monYg;
  // 每月应还本金
  returnData.moMoney = monMoney;
  // 剩余贷款
  returnData.leftMoney = leftMoney;
  // 还款总额
  returnData.totalMoney = totalMoney;
  // 首月月供
  returnData.firstMonYg = typeof monYg === 'number' ? monYg : monYg[0];
  return returnData;
};
export {Calculate}

