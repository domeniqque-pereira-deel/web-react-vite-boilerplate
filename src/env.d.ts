//https://vitejs.dev/guide/env-and-mode.html

interface ImportMetaEnv {
  readonly VITE_TOKEN: string;
  readonly VITE_CLIENT_ID: number;

  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
