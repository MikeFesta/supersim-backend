import Crypto from "crypto";
import "dotenv/config";
import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
// import passport from 'passport';
// import session from 'express-session';
// import { RedisStore } from 'connect-redis';
// import { createClient } from 'redis';

import routerIndex from "#root/routes/index.js";
/*
import { AppError } from '#core/AppError.js';
import ErrorHandler from '#core/ErrorHandler.js';
import LocalStrategy from '#root/auth.js';
import Log from '#root/log.js';
import User from '#models/User.js';
//import TaskMessage from '#models/TaskMessage.js';
*/

/*
import Favicon from 'serve-favicon';
import Morgan from 'morgan';
import Path from 'path';
import { authTokenStrategy, bearerStrategy, localStrategy } from './auth/strategies';
*/

class App {
  public app: Application;

  private constructor() {
    this.app = express();
  }

  public static async create(): Promise<App> {
    const instance = new App();

    await instance.config();

    // Note: routes can only be run after passport is set up
    instance.setupRoutes();

    // Must be last
    //instance.setupErrorHandling();

    return instance;
  }

  private async config(): Promise<void> {
    this.app.enable("trust proxy"); // For IP address logging
    this.app.use(helmet());
    const nonce = Crypto.randomBytes(16).toString("base64");
    this.app.use((req, res, next) => {
      res.locals.cspNonce = nonce;
      next();
    });
    // Note: may not need this as this repo is not rendering content, only providing an api endpoint
    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'", "supersim.superdnax.com"],
          "frame-ancestors": ["'none'"],
          imgSrc: ["'self'", "blob:", "data:", "cdn.3dmf.com"], // probably don't need 3dmf cdn, but leave it just in case for now
          scriptSrc: [
            `'nonce-${nonce}'`,
            "cdn.3dmf.com",
            "supersim.superdnax.com",
          ],
          styleSrc: [
            `'nonce-${nonce}'`,
            "cdn.3dmf.com",
            "supersim.superdnax.com",
          ],
          "script-src-attr": null,
        },
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //await this.configAuthentication();
  }

  /*
  private async configAuthentication() {
    const redisClient = createClient({ url: 'redis://redis:6379' });
    redisClient.on('error', e => console.error(e));
    await redisClient.connect();

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: '3dmf:',
    });

    passport.use(LocalStrategy);
    //Passport.use('authtoken', authTokenStrategy);
    //Passport.use(bearerStrategy);

    passport.serializeUser((user: any, next: Function) => {
      next(null, user.id);
    });
    passport.deserializeUser(async (id: number, next: Function) => {
      // Note: this DB call happens with every data request. Can redis help?
      const user = await User.scope('login').findByPk(id);
      if (user) {
        next(null, user);
      } else {
        Log.error(`User not found with id ${id}`);
      }
    });
    this.app.use(
      session({
        store: redisStore,
        secret: process.env.REDIS_SECRET as string,
        resave: false,
        saveUninitialized: false,
        //cookie: { sameSite: 'Strict', secure: true },
        // Note: Got this working for http://localhost on Firefox developer edition by changing about:config
        // network.cookie.sameSite.laxByDefault: false
        // network.cookie.sameSite.noneRequiresSecure: false
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  */

  private async setupRoutes(): Promise<void> {
    this.app.get("/test", (req, res) => {
      res.json({
        status: "OK",
      });
    });

    this.app.use("/", routerIndex);
  }

  /*
  private setupErrorHandling(): void {
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof AppError) {
        ErrorHandler.resJsonWithCode(res, err, err.statusCode);
      } else {
        ErrorHandler.resJson(res, err); // 500 error
      }
    });
  }
  */
}

export default App;
