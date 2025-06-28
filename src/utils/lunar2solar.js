import { Lunar } from 'lunar-javascript';

/**
 * 获取指定农历节日在今年的公历日期
 * @param {number} lunarMonth 农历月（1-12）
 * @param {number} lunarDay 农历日（1-30）
 * @param {boolean} [isLeap=false] 是否闰月
 * @returns {Date}
 */
export function getSolarDate(lunarMonth, lunarDay, isLeap = false) {
  const year = new Date().getFullYear();
  const lunar = Lunar.fromYmd(year, lunarMonth, lunarDay, isLeap);
  const solar = lunar.getSolar();
  return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
}
