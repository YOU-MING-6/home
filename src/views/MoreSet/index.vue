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
    <!-- 顶部 logo 和版本号 -->
    <div class="top-logo">
      <div class="logo text-hidden">
        <span class="bg">{{ siteUrl[0] }}</span>
        <span class="sm">.{{ siteUrl[1] }}</span>
      </div>
      <div class="version">
        <div class="num">v&nbsp;{{ config.version }}</div>
      </div>
    </div>
    <!-- 主设置区域 -->
    <div class="main-setting">
      <div class="title">
        <setting-two theme="filled" size="28" fill="#ffffff60" />
        <span class="name">全局设置</span>
      </div>
      <Set />
    </div>
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
  if (!url) return "www.youming.v6.army".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});
</script>

<style lang="scss" scoped>
.set {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: rgb(255 255 255 / 40%);
  border-radius: 6px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    &:hover { transform: scale(1.2); }
    &:active { transform: scale(1); }
  }

  .top-logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      font-family: "Pacifico-Regular";
      padding-left: 22px;
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      .bg { font-size: 5rem; }
      .sm { margin-left: 6px; font-size: 2rem; }
    }
    .version {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 24px;
      .num {
        font-size: 2rem;
        font-family: "Pacifico-Regular";
      }
    }
  }

  .main-setting {
    flex: 1;
    width: 70%; // 可根据需要调整宽度
    margin: 0 auto;
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
</style>
