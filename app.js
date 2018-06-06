let createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const ejs = require('ejs')
const childProcess = require('child_process')
let url = 'http://localhost:8888'
let cmd

let indexRouter = require('./routes/index')

let app = express()
// view engine setup
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// 静态资源托管
app.use(express.static('views/submit'))

// 配置可用路由
app.use('/', indexRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

if (process.platform === 'wind32') {
  cmd = 'start "%ProgramFiles% Internet Explorer iexplore.exe"'
} else if (process.platform === 'linux') {
  cmd = 'xdg-open'
} else if (process.platform === 'darwin') {
  cmd = 'open'
}
childProcess.exec(`${cmd} "${url}"`)

module.exports = app
