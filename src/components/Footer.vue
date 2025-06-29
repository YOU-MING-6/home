<template>
  <footer id="footer" :class="store.footerBlur ? 'blur' : null">
    <Transition name="fade" mode="out-in">
      <div v-if="!store.playerState || !store.playerLrcShow" class="power">
        <!-- 版权信息 -->
        <span>
          Copyright&nbsp;&copy;
          <span v-if="siteStartDate?.length >= 4" class="site-start">
            {{ siteStartDate.substring(0, 4) }}
            -
          </span>
          {{ fullYear }}
          <a href="https://docs.youming.v6.army/notes/更多/工作室.html" target="_blank">Youming 工作室</a>
        </span>
        <!-- Powered by -->
        <span class="hidden">
          | Powered by 
          <a href="https://github.com/imsyy/home" target="_blank">[imsyy-home]</a>
        </span>
        <span class="">
          | 
          <a href="https://web.youming.v6.army" target="_blank">YM 站点监控</a>
        </span>
        <!-- 站点备案 -->
        <a v-if="siteIcp" href="https://beian.miit.gov.cn" target="_blank">
          &amp;
          {{ siteIcp }}
        </a>
      </div>
      <div v-else class="lrc">
        <Transition name="fade" mode="out-in">
          <div class="lrc-all" :key="store.getPlayerLrc">
            <music-one theme="filled" size="18" fill="#efefef" />
            <span class="lrc-text text-hidden" v-html="store.getPlayerLrc" />
            <music-one theme="filled" size="18" fill="#efefef" />
          </div>
        </Transition>
      </div>
    </Transition>
  </footer>
</template>

<script setup>
import { MusicOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import config from "@/../package.json";

const store = mainStore();
const fullYear = new Date().getFullYear();

// 加载配置数据
const siteStartDate = ref(import.meta.env.VITE_SITE_START);
const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 14px;
  .power {
    animation: fade 0.3s;
  }
  .lrc {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .lrc-all {
      width: 98%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .lrc-text {
        margin: 0 8px;
      }
      .i-icon {
        width: 18px;
        height: 18px;
        display: inherit;
      }
    }
  }
  &.blur {
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
    font-size: 16px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease-in-out;
  }
  @media (max-width: 720px) {
    font-size: 0.85rem;
    &.blur {
      font-size: 0.85rem;
    }
  }
  @media (max-width: 480px) {
    .hidden {
      display: none;
    }
  }
}
</style>
