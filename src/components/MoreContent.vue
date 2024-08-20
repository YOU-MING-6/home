<template>
  <div class="more-content">
    <div class="countdown">
      <div><h2>📅距离 {{ nearestHoliday.name }} 还有</h2> {{ nearestHoliday.days }} 天 {{ nearestHoliday.hours }} 小时 {{ nearestHoliday.minutes }} 分 {{ nearestHoliday.seconds }} 秒</div>
    </div>
  </div>
</template>

<script>
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
      birthday: new Date(new Date().getFullYear(), 6, 3), // 生日是7月3日，月份从0开始计数
      holidays: [
        { name: '元旦', date: new Date(new Date().getFullYear(), 0, 1) },  // 元旦为1月1日
        { name: '春节', date: new Date(new Date().getFullYear(), 0, 29) },  // 2025春节为1月29日
        { name: '元宵节', date: new Date(new Date().getFullYear(), 1, 12) },  // 2025春节为2月12日
        { name: '清明节', date: new Date(new Date().getFullYear(), 3, 4) },  // 2025清明节为4月4日
        { name: '劳动节', date: new Date(new Date().getFullYear(), 4, 1) },  // 劳动节为5月1日
        { name: '青年节', date: new Date(new Date().getFullYear(), 4, 4) },  // 青年节为5月4日
        { name: '儿童节', date: new Date(new Date().getFullYear(), 5, 1) },  // 儿童节为6月1日
        { name: '端午节', date: new Date(new Date().getFullYear(), 4, 31) },  // 2025端午节为5月31日
        { name: '国庆节', date: new Date(new Date().getFullYear(), 9, 1) },  // 国庆节为10月1日
        { name: '中秋节', date: new Date(new Date().getFullYear(), 9, 6) },  // 2025中秋节为10月6日
        { name: '七夕节', date: new Date(new Date().getFullYear(), 7, 10) },  // 2025七夕节为8月10日
        { name: '重阳节', date: new Date(new Date().getFullYear(), 8, 9) },  // 2025重阳节为9月9日
        { name: '腊八节', date: new Date(new Date().getFullYear(), 0, 8) }  // 2025腊八节为1月8日
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
}

.countdown {
  margin-top: 20px;
  text-align: center;
}
</style>
