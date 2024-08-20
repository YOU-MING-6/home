<template>
  <div class="set" @mouseenter="closeShow = true" @mouseleave="closeShow = false" @click.stop>
    <transition name="el-fade-in-linear">
      <close-one
        class="close"
        theme="filled"
        size="28"
        fill="#ffffff60"
        v-show="closeShow"
        @click="store.setOpenState = false"
      />
    </transition>
    <el-row :gutter="40">
      <el-col :span="12" class="left">
        <div class="logo text-hidden">
          <span class="bg">{{ siteUrl[0] }}</span>
          <span class="sm">.{{ siteUrl[1] }}</span>
        </div>
        <div class="version">
          <div class="num">v&nbsp;{{ config.version }}</div>
          <el-tooltip content="基于 Github 项目" placement="right" :show-arrow="false">
          </el-tooltip>
        </div>
        <el-card class="update">
          <template #header>
            <div class="card-header">
              <span>倒计时</span>
            </div>
          </template>
          <div class="upnote">
            <h3>生日︱7月3日🍀</h3>
            <div>还有 {{ birthdayDays }} 天 {{ birthdayHours }} 小时 {{ birthdayMinutes }} 分 {{ birthdaySeconds }} 秒</div>
          </div>
        </el-card>
        <el-card class="update">
          <template #header>
            <div class="card-header">
              <span>网站存活时间</span>
            </div>
          </template>
          <div class="upnote">
            <h3>柚明︱主页🍀</h3>已存活 {{ siteUpDays }} 天 {{ siteUpHours }} 小时 {{ siteUpMinutes }} 分 {{ siteUpSeconds }} 秒
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="right">
        <div class="title">
          <setting-two theme="filled" size="28" fill="#ffffff60" />
          <span class="name">全局设置</span>
        </div>
        <Set />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { CloseOne, SettingTwo } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import Set from "@/components/Set.vue";
import config from "@/../package.json";

const store = mainStore();
const closeShow = ref(false);

// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "imsyy.top".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});

// 生日倒计时
const birthday = new Date(new Date().getFullYear(), 6, 3); // 生日是7月3日，月份从0开始计数
const birthdayDays = ref(0);
const birthdayHours = ref(0);
const birthdayMinutes = ref(0);
const birthdaySeconds = ref(0);

// 网站存活时间
const siteUpTime = new Date(2024, 6, 10); // 网站上线时间是2024年7月10日
const siteUpDays = ref(0);
const siteUpHours = ref(0);
const siteUpMinutes = ref(0);
const siteUpSeconds = ref(0);

const updateCountdowns = () => {
  const now = new Date();

  // 更新生日倒计时
  let diff = birthday - now;
  if (diff < 0) {
    birthday.setFullYear(birthday.getFullYear() + 1);
    diff = birthday - now;
  }
  birthdayDays.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  birthdayHours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  birthdayMinutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  birthdaySeconds.value = Math.floor((diff % (1000 * 60)) / 1000);

  // 更新网站存活时间
  diff = now - siteUpTime;
  siteUpDays.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  siteUpHours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  siteUpMinutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  siteUpSeconds.value = Math.floor((diff % (1000 * 60)) / 1000);
};

onMounted(() => {
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
</script>

<style lang="scss" scoped>
.set {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: rgb(255 255 255 / 40%);
  border-radius: 6px;
  padding: 40px;

  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(1);
    }
  }

  .el-row {
    height: 100%;
    flex-wrap: nowrap;

    .left {
      height: 100%;
      padding-left: 40px !important;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .logo {
        transform: translateY(-8%);
        font-family: "Pacifico-Regular";
        padding-left: 22px;
        width: 100%;
        height: 260px;
        min-height: 140px;
        .bg {
          font-size: 5rem;
        }

        .sm {
          margin-left: 6px;
          font-size: 2rem;
        }

        @media (max-width: 990px) {
          .bg {
            font-size: 4.5rem;
          }
          .sm {
            font-size: 1.7rem;
          }
        }
        @media (max-width: 825px) {
          .bg {
            font-size: 3.8rem;
          }
          .sm {
            font-size: 1.3rem;
          }
        }
      }

      .version {
        display: flex;
        flex-direction: row;
        align-items: center;

        .num {
          font-size: 2rem;
          font-family: "Pacifico-Regular";
        }

        .github {
          width: 24px;
          height: 24px;
          margin-left: 12px;
          margin-top: 6px;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      .update {
        margin-top: 30px;
        height: 100%;

        :deep(.el-card__body) {
          height: 100%;

          .upnote {
            padding: 20px;
            height: calc(100% - 56px);
            overflow-y: auto;

            .uptext {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding-bottom: 16px;

              &:nth-last-of-type(1) {
                padding: 0;
              }

              .i-icon {
                width: 22px;
                height: 22px;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }

    .right {
      height: 100%;
      padding-right: 40px !important;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        display: flex;
        align-items: center;
        flex-direction: row;
        font-size: 18px;
        margin-bottom: 16px;

        .i-icon {
          width: 28px;
          height: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
