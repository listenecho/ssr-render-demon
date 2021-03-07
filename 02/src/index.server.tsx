import React from 'react'
import ReactDom from 'react-dom';
import { renderRoutes } from 'react-router-config';
import router from '../src/router'
import { StaticRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import createStore from './store'




const createApp = (context: any, url: any, store: any) => {
  return <Provider store={store}> <StaticRouter context={context} location={url}>
    <div>
      {renderRoutes(router)}
    </div>
  </StaticRouter>
  </Provider>
}

export {
  createStore,
  createApp,
  router
}
