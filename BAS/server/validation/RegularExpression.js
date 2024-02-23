exports.expressionName = /^[a-zA-Z]+$/;

exports.expressionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

exports.expressionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\s]).{8,}$/;

exports.expressionMobile = /^[1-9]\d{9}$/;