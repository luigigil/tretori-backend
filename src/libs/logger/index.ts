import { levels } from 'libs/logger/levels'
import * as winston from 'winston'

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${process.env.DD_API_KEY}&ddsource=nodejs&service=${process.env.NODE_SERVICE_NAME}`,
  ssl: true,
}

let logger = winston.createLogger({
  levels,
  transports: [new winston.transports.Console()],
})

if (process.env.NODE_ENV === 'production') {
  logger = winston.createLogger({
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    },
    exitOnError: true,
    format: winston.format.json(),
    transports: [new winston.transports.Http(httpTransportOptions)],
  })
}

export { logger }
