import * as React from 'react'
import TabBarExample from '../components/tab-bar'
import { renderRoutes } from 'react-router-config';
 
const App = (props: any) => {
    return <div>
        <TabBarExample />
      <div>
      {renderRoutes(props.route.routes)}
      </div>
        </div>
}
export default App