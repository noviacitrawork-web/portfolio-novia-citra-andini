/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAIL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_WHATSAPP_NUMBER: string
  readonly VITE_RESUME_FILE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
