import { createStore } from 'redux';
import ServerActions from '../actions/serverActions'

const serverReducer = (state = "", action) => {
    switch (action.type) {
        case ServerActions.ADD:
            return [...state, action.paidload]
        case ServerActions.DELETE:
            return state.filter(e => e !== action.paidload)
        default:
            return state
    }
}

const ServerStore = createStore(serverReducer)

export default ServerStore