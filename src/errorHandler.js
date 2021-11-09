export const mainErrorHandler = async (err, req, res, next) => {
  if (err.status >= 400 && err.status <= 499) {
    res.status(err.status).send({
      status: "error",
      message: err.message || "Bad requests!",
    });
  } else {
    next(err);
  }
};
export const genericErrorHandler = async (err, req, res, next) => {
  if (err.status >= 500) {
    res.status(err.status).send({
      status: "error",
      message: err.message || "Generic error!",
    });
  } else {
    next(err);
  }
};
