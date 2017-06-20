import * as express from "express"
import * as path from 'path'

class Server {
  public static bootstrap(): Server {
    return new Server()
  }
  private static port = 4000
  private app: express.Application
  constructor() {
    this.app = express()
    this.app.use(express.static(path.resolve(__dirname, '..', 'dist')))
    this.app.listen(Server.port, () => {
      console.log(`example app listening on port ${Server.port}`)
    })
  }
}

Server.bootstrap()
