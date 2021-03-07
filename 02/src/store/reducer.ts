
import { TYPES } from './types'
const initGState = {
}

export default (state = initGState, action: any) =>  {
   const { types, playload } = action
    switch(types) {
        case TYPES.GET_GSTATE:
            return {
                ...initGState
            }
        default :
        return {
           ...initGState
        }
    }
}   