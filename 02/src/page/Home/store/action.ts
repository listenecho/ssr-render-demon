import { fetchHOMEData } from '../../../api'
import TYPES from './types'


export function getHomeDataAction() {
    if(!window) {
        console.log('服务端请求');
    } else {
       console.log('客户端请求');
    }
    return async (dispatch: any) => {
        const res = await fetchHOMEData()
       return dispatch({
            playload: res.data.imgurl,
            type: TYPES.SET_MAIN_DATA
        })
    }
}



