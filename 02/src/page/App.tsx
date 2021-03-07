import * as React from 'react'
import TabBarExample from '../components/tab-bar'
import { renderRoutes } from 'react-router-config';
const App = (props: any) => {
    return <div>
        <TabBarExample />
        {renderRoutes(props.route.routes)}
        </div>
}
export default App