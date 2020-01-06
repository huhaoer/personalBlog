let fs = require('fs');
let globalConf = {};//全局配置对象
let conf = fs.readFileSync('./server.fong');
let confArr = conf.toString().split('\n');

for (let i = 0; i < confArr.length; i++) {
    let temp = confArr[i].split('=');
    if (temp.length < 2) {
        return
    }else{
        globalConf[temp[0].trim()] = temp[1].trim()
    }
}

module.exports = globalConf;