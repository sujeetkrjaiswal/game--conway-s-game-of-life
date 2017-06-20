import * as express from "express"
import * as webpack from "webpack"
import * as webpackDevMiddleware from "webpack-dev-middleware"
import * as webpackHotMiddleware from "webpack-hot-middleware"
import config from "../config/webpack.config.dev"

class Server {
  public static bootstrap(): Server {
    return new Server()
  }
  public app: express.Application
  constructor() {
    this.app = express()
    const compiler = webpack(config)
    const options: webpackDevMiddleware.Options = {
      publicPath: "/",
    }
    this.app.use(webpackDevMiddleware(compiler, options))
    this.app.use(webpackHotMiddleware(compiler))

    this.app.listen(3000, () => {
      console.log("example app listening on port 3000")
    })
  }
}

Server.bootstrap()
