import { levels } from 'libs/logger/levels'
import * as winston from 'winston'

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${process.env.DD_API_KEY}&ddsource=nodejs&service=${process.env.SERVICE_NAME}`,
  ssl: true,
}

let logger = winston.createLogger({
  levels,
  transports: [new winston.transports.Console()],
})

if (process.env.NODE_ENV === 'production') {
  logger = winston.createLogger({
    level: 'info',
    exitOnError: false,
    format: winston.format.json(),
    transports: [new winston.transports.Http(httpTransportOptions)],
  })
}

// Example logs
logger.log('info', 'Hello simple log!')
logger.info('Hello log with metas', { color: 'blue' })

export default logger
