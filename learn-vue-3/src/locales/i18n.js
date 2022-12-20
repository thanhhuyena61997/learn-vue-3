import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  allowComposition: true,
  messages: {
    en: {
      signUp: 'Sign UP',
      name: 'Lionel'
    },
    vn: {
      signUp: 'Đăng kí',
      name: 'Huyền'
    }
  }
});

export default i18n;
