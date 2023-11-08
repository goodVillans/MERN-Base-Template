// Route doesnt exist catch-all
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalURL}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // handles manual error creation if status code is 200
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // handle CastError from mongoose
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found'
    }

    res.status(statusCode).json({ 
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}


export { notFound, errorHandler };