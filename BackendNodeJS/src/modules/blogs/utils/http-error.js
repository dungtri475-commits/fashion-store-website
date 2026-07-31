export function createHttpError(message, status = 500, extra = {}) {
    const error = new Error(message);
    error.status = status;
    Object.assign(error, extra);
    return error;
}

export default createHttpError;
