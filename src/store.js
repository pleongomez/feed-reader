import {createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { save, load } from "redux-localstorage-simple";

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
            isLoading: false,
            isAdding: false,
            feedLoaded: false,
            isWrongOperation: false,
            isRemoving: false,
            feed: {}
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
            //isRemoving: false
        };
    }

    if(action.type === "LOAD_FEED"){

        if(state.isRemoving){
            return {
                ...state,
                feed: {},
                isLoading: false,
                feedLoaded: false,
                isRemoving: false
            }
        }else{
            return {
                ...state,
                feed: action.feed, //state.feeds.find(p => p.id == action.feed.id),
                isLoading: false,
                feedLoaded: true
            };
        }
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
            isLoading: action.isLoading,
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

    if(action.type === "INIT_REMOVE_FEED"){
        return {
            ...state,
            isRemoving: action.isRemoving,
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
            if(action.type === "FORM_RESET"){
                return {
                    ...state,
                    values: {url: ''}
                };
            }
            return state;
        }
    })
})

let store = createStore(rootReducer, load({ feeds: ["feeds"] , form: {}}), applyMiddleware(logger, thunk, save()));

export default store;