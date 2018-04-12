/**
 * 数字规范插件
 */
function formatData() {

}
formatData.prototype.format = function(number, len) {
  let length = len || 0;
  let num = number || 0;
  num = parseFloat(parseFloat(num).toFixed(length));
  if (num < 1000000) {
    return num;
  } else if (num < 100000000) {
    return parseFloat((num / 10000).toFixed(length)) + '万';
  } else if (num > 100000000) {
    return parseFloat((num / 100000000).toFixed(length)) + '亿';
  }
};
export {formatData}
