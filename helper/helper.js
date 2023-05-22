const responseObj = {
    status: null,
    data: null,
    message: "",
    error: ","
}

const sendResponse = (status, data, message, error) => {
    responseObj.status = status;
    responseObj.data = data;
    responseObj.message = message;
    responseObj.error = error;
    return responseObj
}

module.exports = { sendResponse }