import TYPES from './types'

const initalState = {
    homeData: {}
}


export default (state = initalState, { type, playload}: any ) => {
    switch(type) {
        case TYPES.SET_MAIN_DATA: 
        return {
            ...state,
            homeData: playload
        }
        default:
            return {
                ...state
            }
    }
}