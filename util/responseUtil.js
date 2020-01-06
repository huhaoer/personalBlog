
//用于返回数据时统一设置格式
function writeResponse(status,msg,data) {
    return JSON.stringify({
        status,
        msg,
        data
    })
}
module.exports.writeResponse = writeResponse