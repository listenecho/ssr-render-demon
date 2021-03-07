import React from 'react'
import ReactDom from 'react-dom';
import { renderRoutes } from 'react-router-config';
import router from '../src/router'
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from "@loadable/component";
import { Provider } from 'react-redux'
import createStore from './store'


const App = () => {
  const initialState = (window as any).__INITIAL_STATE__ || {app: '初始化SSR'};
  const store = createStore(initialState)
  
  return <Provider store={store}>
    <BrowserRouter>
        {renderRoutes(router)}
    </BrowserRouter>
  </Provider>
}
const createApp = () => App()



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