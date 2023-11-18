import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createHash, isValidPassword } from '../utils.js'
import UserModel from '../models/user.model.js';
import { Strategy as LocalStrategy } from "passport-local";

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}
const gitHubopts = {
    clientID: 'Iv1.371623f04cc27484',
    clientSecret: '7e246298471650881d07b6524fbe39f7fdf1572c',
    callbackURL: "http://localhost:8080/api/sessions/github/callback"
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
                password: createHash(body.password)
            })
            done(null, newUser);

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
            done(null, newUser);

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



    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user);
    });







}