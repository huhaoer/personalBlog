function nowTimeUtil() {
    return parseInt(Date.now() / 1000);
}
module.exports.getNowTime = nowTimeUtil