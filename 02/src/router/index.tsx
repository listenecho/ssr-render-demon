
import Home from '../page/Home'
import Mine from '../page/Mine'
import News from '../page/News'
import App from '../page/App'
import { getHomeDataAction } from '../page/Home/store/action'
export default [
    {
        component: App,
        routes: [
            {

                path: "/",
                component: Home,
                exact: true,
                loadData: (store: any) => {
                    return store.dispatch(getHomeDataAction())
                }
                // component: () => import('../page/Home')
            },
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
