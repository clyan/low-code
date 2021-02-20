import { defineConfig } from 'umi';
import theme from './src/common/themeVarivable';
export default defineConfig({
  hash: true,
  locale: { antd: false },
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    ...theme
  },
  dva: {
    immer: true,
    hmr: false,
  },
  fastRefresh: {},
});
