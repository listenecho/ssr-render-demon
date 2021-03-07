import { Switch, Router, Route, BrowserRouter, StaticRouter } from 'react-router-dom'
import React from 'react'
import Home from '../page/Home'
import Mine from '../page/Mine'
import News from '../page/News'
import App from '../page/App'
export default [
    {
        component: App,
        routes: [
            {

                path: "/home",
                component: Home,
                exact: true,
                // component: () => import('../page/Home')
            },
            {
                path: "/mine",
                component: Mine,
                exact: true,
                // component: () => import('../page/Mine')
            },
            {
                path: "/news",
                component: News,
                exact: true,
                // component: () => import('../page/News')
            }
        ]
    }
]
