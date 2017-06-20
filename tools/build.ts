import * as webpack from 'webpack'
import config from '../config/webpack.config.prod'
import * as log from './logger'

log.info('Generating minified bundle. This will take a moment...')
webpack(config).run((error, stats) => {
  if (error) {
    log.error('Bundling Failed', error)
    return 1
  }

  const jsonStats = stats.toJson()

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map((jsonStatsError: any) => log.error(jsonStatsError))
  }

  if (jsonStats.hasWarnings) {
    log.warn('Webpack generated the following warnings: ')
    jsonStats.warnings.map((warning: any) => log.warn(warning))
  }

  log.log(`Webpack stats: ${stats}`)

  log.success('Your app is compiled in production mode in /dist. It\'s ready to roll!')

  return 0
})
