
import React from 'react'
import './index.less'
import { connect } from 'react-redux';
import { getHomeDataAction } from './store/action'


class Home extends React.Component {
    constructor(props: any) {
        super(props)
        this.getInitData =  this.getInitData.bind(this)
    }
     componentDidMount() {
      
        this.getInitData()
    }
    async getInitData() {
        const { getHomeData, home } = this.props as any
   
        await getHomeData()
        
     }
    render(){
     const { home } = this.props.props
        return<div>
            <h3>服务端渲染(Home)</h3>
            <button onClick={() => this.getInitData()}>更新</button>
            <div className='bg'></div>
            <img style={{ width: '200px', height: '300px'}} src={home.homeData} />
        </div> 
    }
}
const mapStatePorps = (state: any) => ({
    props: state
})

const mapDispatchToProps = (dispatch: any) => ({
    getHomeData() {
      dispatch(getHomeDataAction())
    }
  });
  export default connect(mapStatePorps, mapDispatchToProps)(Home)