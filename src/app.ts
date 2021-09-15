import httpErrors from "http-errors";
import express, {NextFunction, Request, Response} from 'express';
import path from "path";
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import router from "./router";

const app = express();

// variables
app.set('views', path.join(process.env.PWD ?? '', 'views'))
app.set('view engine', 'pug')

// logger middleware
app.use(morgan('dev'))
// json parser middleware
app.use(express.json())
// urlencoded parser middleware
app.use(express.urlencoded({extended: false}))
// cookie parser middleware
app.use(cookieParser())

// static route
app.use(express.static(path.join(process.env.PWD ?? '', 'public')));
// router
app.use('/', router)
// 404
app.use((req: Request, res: Response, next: NextFunction) => {
    // redirect
    next(httpErrors(404));
});
// Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // @ts-ignore
    res.status(err.status || 500);
    res.render('error');
});

export = app