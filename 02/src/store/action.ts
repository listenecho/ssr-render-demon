import { TYPES } from './types'


export function getGstateAction() {
    return (dispatch: any) => {
        dispatch({
            type: TYPES.GET_GSTATE
        })
    }
}

 