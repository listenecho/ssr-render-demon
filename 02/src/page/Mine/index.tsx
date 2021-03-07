
import React from 'react'

class Mine extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render(){
        
        return <h3 onClick={() => console.log(7777)
        }>服务端渲染(Greate)</h3>
    }
}
  export default Mine