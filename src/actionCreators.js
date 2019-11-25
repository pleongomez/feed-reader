import Parser from 'rss-parser';
import uuid from 'uuid';

const loadFeedList = () =>{
    return {
        type: "GET_FEED_LIST"
      }
    }
  
// const removeFeed = feed =>{
//     return {
//         type: "REMOVE_FEED",
//         feed
//     }
// }

const loadFeed = (feed) =>{
    let parser = new Parser();
    let feedUrl = feed.feedUrl;
    return dispatch => {
      return parser.parseURL( 'https://cors-anywhere.herokuapp.com/' + feedUrl)
        .catch(err => {
            console.log(err);
            dispatch({
                type: "TOGGLE_ERROR",
                isLoading: false,
            })
            throw 'parsing error';
        })
        .then(response => {
            let feeds = [];
            response.items.map(item =>
                feeds = feeds.concat(item)
            )
            feed.items = feeds;

            dispatch({
            type: "LOAD_FEED",
            feed
            })
        });
    };
}

const addFeed = (e) => (dispatch, getState) => {
    e.preventDefault();
    const state = getState(); 
    let parser = new Parser();
    let feedUrl = state.form.contact.values.url;
    return parser.parseURL( 'https://cors-anywhere.herokuapp.com/' + feedUrl)
    .catch(err => {
        console.log(err);
        dispatch({
            type: "TOGGLE_ERROR",
            isAdding: false,
        })
        throw 'parsing error';
    })
    .then(response => {
      
        let feeds = [];
        response.items.map(item =>
            feeds = feeds.concat(item)
        )

        dispatch({
            type: "ADD_FEED",
            feed: {
                "feedUrl": response.feedUrl,
                "title": response.title,
                "description": response.description,
                "generator": response.generator,
                "link": response.link,
                "language": response.language,
                "lastBuildDate": response.lastBuildDate,
                "id": uuid(),
                "url": response.url,
                "items": feeds
            }
        })
    });
};

const initLoadFeed = (feed) => {
    return {
        type: "INIT_LOAD_FEED",
        isLoading: true
    }
}

const fetchFeeds = (feed) => {
    return dispatch => {
      dispatch(initLoadFeed(feed))
      dispatch(loadFeed(feed))
    }
}

const initAddFeed = () => {
    return {
        type: "INIT_ADD_FEED",
        isAdding: true
    }
}

const CreateFeed = (e) => {
    return dispatch => {
      dispatch(initAddFeed())
      dispatch(addFeed(e)).then(dispatch(
        {
            type: "FORM_RESET"
          }
      ))
    }
}

const initRemoveFeed = () => {
    return {
        type: "INIT_REMOVE_FEED",
        isRemoving: true
    }
}

const removeFeed = (feed) => {
    return dispatch => {
      dispatch(initRemoveFeed())
      dispatch({
          type: "REMOVE_FEED",
          feed
      })
    //   dispatch(addFeed(e)).then(dispatch(
    //     {
    //         type: "FORM_RESET"
    //       }
    //   ))
    }
}


export {loadFeedList, removeFeed, loadFeed, addFeed, fetchFeeds, initLoadFeed, initAddFeed, CreateFeed};