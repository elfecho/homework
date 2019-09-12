/**
 * @file 大图组件
 * @author junhao
*/
import Component from './component'
export default class BigPic extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const {data} = this.props;

        return `<div class="item big-pic">
                <h3>
                    ${data.title}
                </h3>
                <div class="img_nav">
                    <img src="${data.imageList[0]}" />
                </div>
            </div>`
    }
}
