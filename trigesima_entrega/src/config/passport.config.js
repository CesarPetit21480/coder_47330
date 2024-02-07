import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createHash, isValidPassword } from '../utils/util.js'
import UserModel from '../models/user.model.js';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import UserController from "../controllers/user.controller.js";
import config from '../config/config.js';
import { logMessage } from '../config/logger.js';
const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}
const gitHubopts = {
    clientID: 'se cargara clientID',
    clientSecret: 'se cargara clientSecret',
    callbackURL: "http://localhost:8080/api/sessions/github/callback"
}


const cookieExtractor = (req) => {
    let token = null;

    if (req.signedCookies && req) {
        token = req.signedCookies["access_token"];
    }
    return token;
}



export const init = () => {

    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {

        try {
            const newUser = await UserController.create(req.body, email, password);
            done(null, newUser);

        } catch (error) {
            done(new Error(`ocurrio un errror durante la autenticacion ${error.message} 😒)`));
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserController.getByLogin(email);


            //await UserModel.findOne({ email });
            if (!user) {
                return done(new Error(`correo o password Invalidos 😢`));
            }

            const isPasswordValid = isValidPassword(password, user)

            if (!isPasswordValid) {
                return done(new Error(`correo o password Invalidos 😢`));
            }
            done(null, user);

        } catch (error) {
            done(new Error(`ocurrio un errror durante la autenticacion ${error.message} 😒)`));
        }
    }));

    passport.use('github', new GitHubStrategy(gitHubopts, async (accessToken, refreshToken, profile, done) => {

        logMessage(profile, "info");

        const email = profile._json.email;
        let user = await UserModel.findOne({ email });

        if (user)
            return done(null, user);

        user = {
            first_name: profile._json.name,
            last_name: '',
            email,
            age: 18,
            password: '',
            rol: 'usuario',
            provider: 'github'
        }

        const newuser = await UserModel.create(user);
        done(null, { ...newuser, rol: undefined });
    }));

    passport.use('jwt', new JWTStrategy({

        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwtSecret,
    }, (payload, done) => {

        return done(null, payload);

    }));


    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user);
    });

}