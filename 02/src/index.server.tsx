import React from 'react'
import ReactDom from 'react-dom';
import { renderRoutes } from 'react-router-config';
import router from '../src/router'
import { StaticRouter } from 'react-router-dom';


console.log(4444444);

const App = () => {
    return <StaticRouter>
   <div>
        {renderRoutes(router)}
      </div>
    </StaticRouter>
  
}
const createApp = () => App()

export {
  createApp,
  router
}
// ReactDom.render(<App />, document.getElementById('root'));
// export default App