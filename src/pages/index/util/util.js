module.exports = {
  // 万或者亿时返回带单位字符串
  // @num number 价格
  // @return 带单位的价格
  formatNumber: function(num) {
    if (num > 1000000000) {
      return parseFloat((num / 100000000).toFixed(2)) + '亿';
    } else if (num > 100000000) {
      return parseFloat((num / 10000).toFixed(2)) + '万';
    }
    return num;
  }
};
