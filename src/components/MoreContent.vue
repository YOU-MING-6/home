<template>
  <div class="more-content">
    <div class="countdown">
      <div><h2>📅距离 {{ nearestHoliday.name }} 还有</h2> {{ nearestHoliday.days }} 天 {{ nearestHoliday.hours }} 小时 {{ nearestHoliday.minutes }} 分 {{ nearestHoliday.seconds }} 秒</div>
    </div>
  </div>
</template>

<script>
import { getSolarDate } from '@/utils/lunar2solar';

export default {
  data() {
    return {
      birthdayDays: 0,
      birthdayHours: 0,
      birthdayMinutes: 0,
      birthdaySeconds: 0,
      nearestHoliday: {
        name: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      birthday: new Date(new Date().getFullYear() + 1, 6, 3), // 生日是7月3日，月份从0开始计数
      holidays: [
        // 固定节日
        { name: '元旦', date: new Date(new Date().getFullYear(), 0, 1) },
        { name: '植树节', date: new Date(new Date().getFullYear(), 2, 1) },
        { name: '消费者权益日', date: new Date(new Date().getFullYear(), 2, 15) },
        { name: '劳动节', date: new Date(new Date().getFullYear(), 4, 1) },
        { name: '青年节', date: new Date(new Date().getFullYear(), 4, 4) },
        { name: '护士节', date: new Date(new Date().getFullYear(), 4, 15) },
        { name: '儿童节', date: new Date(new Date().getFullYear(), 5, 1) },
        { name: '建党节', date: new Date(new Date().getFullYear(), 6, 1) },
        { name: '建军节', date: new Date(new Date().getFullYear(), 7, 1) },
        { name: '教师节', date: new Date(new Date().getFullYear(), 8, 10) },
        { name: ' 🚩国庆节', date: new Date(new Date().getFullYear(), 9, 1) },
        { name: '万圣夜', date: new Date(new Date().getFullYear(), 9, 31) },
        { name: '万圣节', date: new Date(new Date().getFullYear(), 10, 2) },
        { name: '圣诞节', date: new Date(new Date().getFullYear(), 11, 25) },
        
        // 农历节日
        { name: '春节', date: getSolarDate(1, 1) },      // 正月初一
        { name: '元宵节', date: getSolarDate(1, 15) },   // 正月十五
        { name: '端午节', date: getSolarDate(5, 5) },    // 五月初五
        { name: '七夕节', date: getSolarDate(7, 7) },    // 七月初七
        { name: '中秋节', date: getSolarDate(8, 15) },   // 八月十五
        { name: '重阳节', date: getSolarDate(9, 9) },    // 九月初九
      ]
    };
  },
  mounted() {
    this.updateCountdowns();
    setInterval(this.updateCountdowns, 1000);
  },
  methods: {
    updateCountdowns() {
      this.updateBirthdayCountdown();
      this.updateNearestHoliday();
    },
    updateBirthdayCountdown() {
      const now = new Date();
      const diff = this.birthday - now;

      if (diff < 0) {
        this.birthday.setFullYear(this.birthday.getFullYear() + 1);
        this.updateBirthdayCountdown();
        return;
      }

      this.birthdayDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.birthdayHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.birthdayMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.birthdaySeconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
    updateNearestHoliday() {
      const now = new Date();
      let nearest = null;
      let nearestDiff = Infinity;

      this.holidays.forEach(holiday => {
        let diff = holiday.date - now;
        if (diff < 0) {
          holiday.date.setFullYear(holiday.date.getFullYear() + 1);
          diff = holiday.date - now;
        }

        if (diff < nearestDiff) {
          nearestDiff = diff;
          nearest = holiday;
        }
      });

      this.nearestHoliday.name = nearest.name;
      this.nearestHoliday.days = Math.floor(nearestDiff / (1000 * 60 * 60 * 24));
      this.nearestHoliday.hours = Math.floor((nearestDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.nearestHoliday.minutes = Math.floor((nearestDiff % (1000 * 60 * 60)) / (1000 * 60));
      this.nearestHoliday.seconds = Math.floor((nearestDiff % (1000 * 60)) / 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.more-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
