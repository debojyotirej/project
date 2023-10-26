var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cluster = require("cluster");

var noOfCpu = require('os').cpus().length;

console.log(noOfCpu);

var sessionConfing = {
    secret: 'any secret msg',
    cookie: { maxAge: 60000 }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var validaterouter = require("./routes/validatingCredentials");
var getProductDetails = require("./routes/getProductDetails");
var newUsersignup = require("./routes/addNewUser");
var addNewProductRouter = require("./routes/addNewProduct");
var uploadResourceRouter = require("./routes/uploadResource");
var checkloginRouter = require("./routes/checkUserSession");
var empRouter = require("./routes/empdata");

var bookRouter = require("./routes/getBookDetails");

if (cluster.isMaster) {
    for (let i = 0; i < noOfCpu; i++) {
      cluster.fork();
    }
} else {
    var app = express();
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    var noOfUsersConnected = 0;

    io.on("connection", (socket) => {
      noOfUsersConnected++;
      console.log("No of useres connected are " + noOfUsersConnected);
      socket.on("receiveMsg", (msg) => {
        console.log(msg);
        socket.broadcast.emit("sendMsg", msg)
        // socket.emit("sendMsg", msg)
      })
      socket.on('disconnect', function () {
        noOfUsersConnected--;
        console.log("No of useres connected are " + noOfUsersConnected);
      })
    })

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(session(sessionConfing));

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/validate/userCredentials', validaterouter);
    app.use('/get/product/details', getProductDetails);
    app.use("/new/user/signup", newUsersignup )
    app.use("/new/addProduct", addNewProductRouter);
    app.use("/upload/productImage", uploadResourceRouter);
    app.use("/user/validateSession", checkloginRouter);
    app.use("/get/empDetails", empRouter);
    app.use("/get/bookDetails", bookRouter);


    server.listen(8081, () => {
      console.log("Server is listing at 8081 and processor id " + process.pid )
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
}

module.exports = app;