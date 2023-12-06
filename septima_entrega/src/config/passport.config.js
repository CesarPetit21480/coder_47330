import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createHash, isValidPassword } from '../utils.js'
import UserModel from '../models/user.model.js';
import { Strategy as LocalStrategy } from "passport-local";
import { JWT_SECRET} from '../utils.js'
import {Strategy as JWTStrategy , ExtractJwt } from "passport-jwt";
const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}
const gitHubopts = {
    clientID:  'se cargara clientID',
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
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('User already registered'))
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password)
            })
            done(null,  newUser);

        } catch (error) {
            done(new Error(`ocurrio un errror durante la autenticacion ${error.message} 😒)`));
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
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

        console.log(profile);

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
        secretOrKey: JWT_SECRET,
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