/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_HOSTNAME: string;
  readonly VITE_APP_API_ENDPOINT: string;
  readonly VITE_APP_PROTOCOL: string;
  readonly VITE_APP_API_ENDPOINT_AUTH: string;
  readonly VITE_APP_API_ENDPOINT_ADMIN: string;
  readonly VITE_APP_API_ENDPOINT_TEACHER: string;
  readonly VITE_APP_API_ENDPOINT_STUDENT: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
