/**
 * @file 所有item的基类
 * @author junhao
*/

export default {
    props: ['title', 'imageList', 'id'],

    methods: {
        skip(e){
            this.$router.push({
                path: '/page/detail/' + 123333
            })
        }
    }
}