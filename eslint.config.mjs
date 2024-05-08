import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser },
    rules: {
      // Character limit 
      'max-len': ['error', { code: 80 }],
    },
  },
  pluginJs.configs.recommended,
];
