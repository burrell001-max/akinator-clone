/* The one language list for the whole site.
   index.html (the Genie) and /games/ (the arcade) both read window.LANGS, so a
   language added here appears in both switchers. `rtl: true` flips the page
   direction when that language is active.

   The storage key is shared too: "mindgenie_lang". Picking a language in the
   arcade therefore carries back to the Genie and the other way round. */
window.LANGS = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'zh', name: '中文' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'he', name: 'עברית', rtl: true },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'fa', name: 'فارسی', rtl: true }
];
