import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser },
    rules: {
      // Set the maximum line length to 80 characters (or any other limit you prefer)
      'max-len': ['error', { code: 80 }],
    },
  },
  pluginJs.configs.recommended,
];
