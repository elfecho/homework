const Vue = require('vue')
const server = require('express')()
const fs = require('fs')

//读取模版
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.html', 'utf-8')
})  
// 此参数是vue 生成Dom之外位置的数据  如vue生成的dom一般位于body中的某个元素容器中，
//此数据可在header标签等位置渲染，是renderer.renderToString()的第二个参数，
//第一个参数是vue实例，第三个参数是一个回调函数。
const context = {
      title: 'Vue-ssr初探',
      meta:` <meta name="viewport" content="width=device-width, initial-scale=1" /> `
}

server.get('*', (req, res) => {
      //创建vue实例   主要用于替换index.html中body注释地方的内容，
    //和index.html中 <!--vue-ssr-outlet-->的地方是对应的
    const app = new Vue({
        data: {
            url: req.url,
            data: ['加油，你是最胖的'],
            title: '欢迎学习vue-ssr服务端渲染'
        },
        //template 中的文本最外层一定要有容器包裹， 和vue的组件中是一样的，
      //只能有一个父级元素，万万不能忘了！
        template: `
            <div>
                <div>url : {{url}}</div>
                <p>{{title}}</p>
                <p v-for='item in data'>{{item}}</p>
            </div>
        `
    })

//将 Vue 实例渲染为字符串  (其他的API自己看用法是一样的)
    renderer.renderToString(app, context,  (err, html) => {
        if (err) {
            res.status(500).end('err:' + err) 
            return 
        }
    //将模版发送给浏览器
        res.end(html)
        console.log('http://localhost:9000/')
    })
})

server.listen(9000)