import {createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

const InitialState = {
    isLoading: false,
    isAdding: false,
    feedLoaded: false,
    isWrongOperation: false,
    feed:'',
    feeds: []
}

const feeds = (state = InitialState, action) =>{

    if(action.type === "GET_FEED_LIST"){
        return {
            ...state,
            feeds: action.feeds
        };
    }

    if(action.type === "ADD_FEED"){
        return {
            ...state,
            feeds: state.feeds.concat(action.feed),
            isAdding: false
        };
    }

    if(action.type === "REMOVE_FEED"){
        return {
            ...state,
            feeds: state.feeds.filter(p => p.id !== action.feed.id)
        };
    }

    if(action.type === "LOAD_FEED"){
        return {
            ...state,
            feed: state.feeds.find(p => p.id == action.feed.id),
            isLoading: false,
            feedLoaded: true
        };
    }

    if(action.type === "INIT_LOAD_FEED"){
        return {
            ...state,
            isLoading: action.isLoading
        };
    }

    if(action.type === "END_LOAD_FEED"){
        return {
            ...state,
            isLoading: action.isLoading
        };
    }

    if(action.type === "TOGGLE_ERROR"){
        return {
            ...state,
            isWrongOperation: action.isWrongOperation,
            isAdding: action.isAdding,
            isLoading: action.isLoading
        };
    }

    if(action.type === "INIT_ADD_FEED"){
        return {
            ...state,
            isAdding: action.isAdding,
        };
    }

    return state;
};

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const rootReducer = combineReducers({
    feeds,
    form: formReducer.plugin({
        contact: (state, action) =>{
            if(action.type === "FORM_ADD"){
                return {
                    ...state
                };
            }
            return state;
        }
    })
})

let store = createStore(rootReducer,  applyMiddleware(logger, thunk));

export default store;