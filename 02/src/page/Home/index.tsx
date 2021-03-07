
import React from 'react'
import './index.less'
class Home extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render(){
        console.log(this.props);
       
        return<div>
            <h3>服务端渲染(Home)</h3>
            <div className='bg'></div>
        </div> 
    }
}
  export default Home