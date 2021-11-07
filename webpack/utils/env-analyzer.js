/*!
 * @author claude
 * date 07/05/2019
 * 解析 webpack 命令行参数
 * npm run dev --param
 */

const argv = require('minimist')(process.argv.slice(2));

const envConfig = {
  excludes:  [],  // dev 时忽略的项目
  envParams: {}, // 命令行参数集合
  devMode:   process.env.NODE_ENV !== 'production',
};

// 获取 xx=xx 参数
argv._.forEach(item => {
  const param = item.replace(/^--/, '');
  const [key, value] = param.split('=');

  envConfig.envParams[key] = value || '';
});

module.exports = envConfig;
