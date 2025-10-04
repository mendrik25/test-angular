import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import { config } from "../app/app.config";
import { AuthenticationResponse } from "../authentication/authentication.model";

class AuthenticationService {
  logIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<AuthenticationResponse> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        async (err: Error, retUser: any, _info: any) => {
          if (err || !retUser) {
            reject({ message: "Nom d'utilisateur ou mot de passe incorrect" });
          }

          const user = {
            _id: retUser._id,
            login: retUser.login,
            firstName: retUser.firstName,
            lastName: retUser.lastName,
            role: retUser.role,
          };

          const token = jwt.sign(
            { _id: user._id, login: user.login },
            config.jwt.secretKey,
            {
              expiresIn: config.jwt.expiration,
            }
          );
          resolve({ user, token });
        }
      )(req, res, next);
    });
  }
}

export const authenticationService = new AuthenticationService();
