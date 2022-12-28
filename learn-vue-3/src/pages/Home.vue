<script lang="ts" setup>
// import { Rule } from 'ant-design-vue/lib/form';
import { useUserStore } from '@/store/user';

import { computed, CSSProperties, reactive, ref, UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaQuery, useParallax } from '@vueuse/core';
import YAML from 'js-yaml';
import { useI18n } from 'vue-i18n';
import SVideoPlayerX from '@/components/VideoPlayerX/index.vue';

interface FormState {
  credential: string;
  password: string;
}

const formState: UnwrapRef<FormState> = reactive({
  credential: '',
  password: ''
});

const rules = {
  credential: [
    {
      required: true,
      message: '',
      trigger: 'change'
      // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/,
      // validator: async (_rule: Rule, value: string) => {
      //   if (formState.minAge && Number(value) < Number(formState.minAge)) {
      //     return Promise.reject(new Error('年齢を正しく選択してください'));
      //   }

      //   return Promise.resolve();
      // }
    }
  ],
  password: [{ required: true, message: '', trigger: 'change' }]
};

const userStore = useUserStore();

const handleLogin = async (values: FormState) => {
  userStore.getProfile(values);
};

const logout = async () => {
  userStore.logout();
};

const target = ref(null);
const isMobile = useMediaQuery('(max-width: 700px)');
const parallax = reactive(useParallax(target));
const targetStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '500px',
  transition: '.3s ease-out all'
};
const cardWindowStyle: CSSProperties = {
  overflow: 'hidden',
  fontSize: '6rem',
  position: 'absolute',
  top: 'calc(50% - 1em)',
  left: 'calc(50% - 1em)',
  height: '2em',
  width: '2em',
  margin: 'auto'
};
const layerBase: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  transition: '.3s ease-out all'
};
const containerStyle: CSSProperties = {
  margin: '3em auto',
  perspective: '300px'
};
const infoStyle = computed(() => ({
  opacity: 0.4,
  top: '20px',
  left: '40px',
  position: isMobile.value ? 'inherit' : 'absolute'
}));
const layer0 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 10}px) translateY(${parallax.roll * 10}px) scale(1.33)`
}));
const layer1 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 20}px) translateY(${parallax.roll * 20}px) scale(1.33)`
}));
const layer2 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 30}px) translateY(${parallax.roll * 30}px) scale(1.33)`
}));
const layer3 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 40}px) translateY(${parallax.roll * 40}px) scale(1.33)`
}));
const layer4 = layerBase;
const cardStyle = computed(() => ({
  background: '#fff',
  height: '20rem',
  width: '15rem',
  borderRadius: '5px',
  border: '1px solid #cdcdcd',
  overflow: 'hidden',
  transition: '.3s ease-out all',
  boxShadow: '0 0 20px 0 rgba(255, 255, 255, 0.25)',
  transform: `rotateX(${parallax.roll * 20}deg) rotateY(${parallax.tilt * 20}deg)`
}));

const { t } = useI18n();
const language = useI18n();

const carouselItems = ref<any>({
  type: 'VIDEO',
  value: {
    videoId: 1,
    src: '',
    title: '',
    cover: '',
    preventPause: false,
    captions: '@/assets/temp/demo.vtt',
    control: false,
    onVideoEnded: () => {
      //startCountdown()
    }
  }
});
</script>
<template>
  <section id="home">
    <h1>Home component</h1>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      autocomplete="off"
      class="flex flex-col items-center home-input"
      name="basic"
      @finish="handleLogin"
    >
      <div class="form-username mb-3">
        <a-form-item ref="credential" class="flex relative" label="ログインID" name="credential">
          <a-input
            v-model:value="formState.credential"
            placeholder="ログインIDを入力してください"
          />
        </a-form-item>
      </div>
      <a-form-item ref="password" class="flex password mb-8" label="パスワード" name="password">
        <a-input v-model:value="formState.password" placeholder="パスワードを入力してください" />
      </a-form-item>

      <a-form-item>
        <a-button class="block text-md" html-type="submit" type="primary">init pinia</a-button>
        <a-button class="block text-md" type="primary" @click="logout">clear data</a-button>
      </a-form-item>
    </a-form>
    <div class="home__use">
      <div ref="target" :style="targetStyle">
        <!-- <pre :style="infoStyle as CSSProperties">{{ YAML.dump(parallax) }}</pre> -->
        <div :style="containerStyle">
          <div :style="cardStyle">
            <div :style="cardWindowStyle">
              <img
                :style="layer0"
                src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer0.png"
                alt=""
              />
              <img
                :style="layer1"
                src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer1.png"
                alt=""
              />
              <img
                :style="layer2"
                src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer2.png"
                alt=""
              />
              <img
                :style="layer3"
                src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png"
                alt=""
              />
              <img
                :style="layer4"
                src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="test_flex-box flex">
      <img src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" alt="" />
      <img src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" alt="" />
      <img src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" alt="" />
      <img src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" alt="" />
    </div>
    <div class="home__multi-language">
      <p>{{ t('signUp') }}</p>
      <p>{{ t('name') }}</p>
    </div>
    <SVideoPlayerX :options="carouselItems.value"></SVideoPlayerX>
  </section>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/share/breakpoint.scss';
#home {
  @include xl {
    padding-left: 20px;
  }
  .home-input {
    @include xl {
      align-items: flex-start;
    }
  }
  .home__multi-language {
    @include lg {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      @include lg {
        width: 51%;
      }
    }
  }
  .test_flex-box {
    flex-wrap: nowrap;
    img {
      width: 26%;
    }
  }
}
</style>
