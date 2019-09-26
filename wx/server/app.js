var http = require('http')
var https = require('https')
var fs = require('fs')

var app = http.createServer((req, res) => {
    const APPID = 'wx6f82132a4ceaa5de'
    const SECRET = 'fb26175577bf4a2a1ec4ad2649482da3'
    
    if (/login/.test(req.url)) {
        // login的逻辑
        const JSCODE = /code=([^&]*)/.exec(req.url)[1]
        https.get(
            `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code
            `,
            function(resHandler) {
                var str = ''
                resHandler.on('data', chunk => {
                    str += chunk
                })
                resHandler.on('end', function() {
                    res.write(JSON.stringify({
                        data: JSON.parse(str),
                        errMsg: "ok"
                    }))
                    res.end()
                })
                
            }
        )
        
        
    } else {
        fs.readFile(__dirname + '/list___all__.json', 'utf-8', function (err, content) {
            // console.log('err:', err, content); 
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(content);
            res.end();
        });
    }

    
})
console.log('use localhost:9000')
app.listen(9000)