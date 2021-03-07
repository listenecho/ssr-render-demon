import React from 'react'
import ReactDom from 'react-dom';
import { renderRoutes } from 'react-router-config';
import router from '../src/router'
import { HashRouter } from 'react-router-dom';
import { loadableReady } from "@loadable/component";



const App = () => {
    return <HashRouter>
   <div>
        {renderRoutes(router)}
      </div>
    </HashRouter>
}
const createApp = () => App() 
console.log(4);

// ReactDom.render(<App />, document.getElementById('root'));
// 开始渲染之前加载所需的组件
loadableReady().then(() => {
  ReactDom.hydrate(createApp(), document.getElementById("root"));
});

// 热更新
if (module.hot) {
  module.hot.accept("../src/router", () => {
    ReactDom.hydrate(createApp(), document.getElementById("root"));
  });
}

export default App