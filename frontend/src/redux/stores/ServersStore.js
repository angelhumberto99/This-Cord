import { createStore } from 'redux';
import { ServersActions } from '../actions'

const serversReducer = (state = [], action) => {
    switch (action.type) {
        case ServersActions.ADD:
            return [...state, action.payload]
        case ServersActions.DELETE:
            return state.filter(e => e !== action.payload)
        default:
            return state
    }
}

const ServersStore = createStore(serversReducer)

export default ServersStore