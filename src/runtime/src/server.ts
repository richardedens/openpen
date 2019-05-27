import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as http from "http";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as createError from "http-errors";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as sassMiddleware from "node-sass-middleware";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

import { Intro } from "../../shared/util/intro";
const intro = new Intro();

createConnection().then(async connection => {

	const app = express();

	// Call midlewares
	app.use(cors());
	app.use(helmet());
	app.use(bodyParser.json());

	// This section is optional and used to configure twig.
	app.set("twig options", {
		allow_async: true, // Allow asynchronous compiling
		strict_variables: false
	});

	// view engine setup
	app.set('views', path.join(__dirname, '../../../views'));
	app.set('view engine', 'twig');

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(sassMiddleware({
		src: path.join(__dirname, '../../../public'),
		dest: path.join(__dirname, '../../../public'),
		indentedSyntax: true // true = .sass and false = .scss
	}));
	app.use(express.static(path.join(__dirname, '../../../public')));

	// Index
	app.use('/', routes);

	// catch 404 and forward to error handler
	// @ts-ignore
	app.use(function (req, res, next) {
		next(createError(404));
	});

	// error handler
	// @ts-ignore
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});

	// Set port
	let port = process.env.PORT || 3000;
	http.createServer(app).listen(port, () => {
		intro.show("OpenPEN", () => {
			console.log("Server Running on http://localhost:" + port);
		});
	})

}).catch(error => console.log(error));