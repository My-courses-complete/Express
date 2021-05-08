const config = require("../../config/index");

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: `https://${config.sentryDns}/${config.sentryId}`,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  // catch errors for AJAX request
  if (req.xhr) {
    res.status(500).json({ err: err.message });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (!config.dev) delete err.stack;

  res.status(err.status || 500);
  res.render("error", { error: err });
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler,
};
