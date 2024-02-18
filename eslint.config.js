import antfu from '@antfu/eslint-config'

export default antfu({
  // rules: [
  //   { 'ts/ban-ts-comment': 'off' },
  // ],
  ignores: [
    'bun.lockb',
    'src/**/*.scss',
  ],
  rules: {
    'ts/ban-ts-comment': 'off',
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'off',
    'style/jsx-indent': 'off',
    'vue/attributes-order': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/valid-v-slot': 'off',
    'vue/no-template-shadow': 'off',
    'style/no-tabs': 'off',
    'ts/no-use-before-define': 'off',
    'no-useless-return': 'off',
    'style/max-statements-per-line': 'off',
    'vue/no-unused-vars': 'off',
    'vue/valid-v-for': 'off',
    'style/multiline-ternary': 'off',
    'import/order': 'off',
    'no-empty': 'off',
  },
})
