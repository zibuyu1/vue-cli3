import moment from 'moment';
/**
 * filterData: 过滤时间
 * value: 原始值（时间戳）
 */
export function filterData(value: number) {
  return moment(value).format('YYYY-MM-DD');
}
