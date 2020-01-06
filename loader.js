let fs = require('fs');
let globalConf = require('./config')
let controllerSet = []//记录controller文件
let pathMap = new Map();//导出的map文件

let files = fs.readdirSync(globalConf['web_path'])//读取web文件夹下文件 数组
for (let i = 0; i < files.length; i++) {
    var temp = require('./' + globalConf['web_path'] + '/' + files[i])//读取每一个controller文件
    if(temp.path) {
        for(let [k,v] of temp.path) {
            if (pathMap.get(k) == null) {
                pathMap.set(k,v)
            }else{
                throw new Error('path路径错误,path:' + k)
            }
        }
        controllerSet.push(temp)
    }
}

module.exports = pathMap;