var http = require('http')
var https = require('https')
var app = http.createServer((req, res) => {
    const APPID = 'wx6f82132a4ceaa5de'
    const SECRET = '85e3400fc9e3194ed87622927c16fbb0'
    
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
                    console.log(str)
                    res.write(JSON.stringify({
                        errMsg: JSON.stringify(JSCODE)
                    }))
                    res.end()
                })
                
            }
        )
        
        
    } else {
        const result = {
            data: [
                {
                    type: 'singlePic',
                    data: {
                        title: '测试标题1',
                        imageList: [
                            ''
                        ]
                    }
                },
                {
                    type: 'multiplePic',
                    data: {
                        title: '测试标题1',
                        imageList: [
                            ''
                        ]
                    }
                }
            ]
        };
        res.write(JSON.stringify(result))
        res.end()
    }

    
})
console.log('use localhost:9000')
app.listen(9000)