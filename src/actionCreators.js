import Parser from 'rss-parser';

const loadFeedList = () =>{
    return {
        type: "GET_FEED_LIST",
        //TODO: obtener feeds de local storage
        feeds:[
            {
                "feedUrl": "https://cloudacademy.com/blog/category/microsoft-azure/feed/",
                "title": "Microsoft Azure – Cloud Academy",
                "description": "",
                "generator": "https://wordpress.org/?v=5.2.2",
                "link": "https://cloudacademy.com",
                "language": "en-US",
                "lastBuildDate": "Tue, 08 Oct 2019 09:17:07 +0000",
                "id": "1a038e70-f963-11e9-81d8-afe2f7d381cfff", 
                "url": "https://cloudacademy.com/blog/category/microsoft-azure/feed/",
                items:[
                    {
                        "creator": "Nestor Campos",
                        "title": "Azure Search: How to Search for Text in Documents and Images",
                        "link": "https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/",
                        "pubDate": "Tue, 08 Oct 2019 11:16:00 +0000",
                        "content:encoded": "asdsad",
                        "dc:creator": "Nestor Campos",
                        "comments": "https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/#respond",
                        "content": "<p>What is Azure Search? Azure Search is an artificial intelligence (AI)-powered cloud search service that enables full-text searches within documents and images. It&#8217;s a managed service, and we&#8217;ll show you how to implement a search engine in a few steps.  In addition to the ease of creating and managing the...</p>\n<p>The post <a rel=\"nofollow\" href=\"https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/\">Azure Search: How to Search for Text in Documents and Images</a> appeared first on <a rel=\"nofollow\" href=\"https://cloudacademy.com\">Cloud Academy</a>.</p>\n",
                        "contentSnippet": "What is Azure Search? Azure Search is an artificial intelligence (AI)-powered cloud search service that enables full-text searches within documents and images. It’s a managed service, and we’ll show you how to implement a search engine in a few steps.  In addition to the ease of creating and managing the...\nThe post Azure Search: How to Search for Text in Documents and Images appeared first on Cloud Academy.",
                        "guid": "https://cloudacademy.com/?p=38194",
                        "categories": [ "Microsoft Azure" ],
                        "isoDate": "2019-10-08T11:16:00.000Z"
                    }
                ]
            },
            {
                "feedUrl": "https://cloudacademy.com/blog/category/microsoft-azure/feed/",
                "title": "Microsoft Azure – Cloud Academy 2",
                "description": "",
                "generator": "https://wordpress.org/?v=5.2.2",
                "link": "https://cloudacademy.com",
                "language": "en-US",
                "lastBuildDate": "Tue, 08 Oct 2019 09:17:07 +0000",
                "id": "1a038e70-f963-11e9-81d8-afe2f7d381cf", 
                "url": "https://cloudacademy.com/blog/category/microsoft-azure/feed/",
                items:[
                    {
                        "creator": "Nestor Campos",
                        "title": "Azure Search: How to Search for Text in Documents and Images",
                        "link": "https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/",
                        "pubDate": "Tue, 08 Oct 2019 11:16:00 +0000",
                        "content:encoded": "asdsad",
                        "dc:creator": "Nestor Campos",
                        "comments": "https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/#respond",
                        "content": "<p>What is Azure Search? Azure Search is an artificial intelligence (AI)-powered cloud search service that enables full-text searches within documents and images. It&#8217;s a managed service, and we&#8217;ll show you how to implement a search engine in a few steps.  In addition to the ease of creating and managing the...</p>\n<p>The post <a rel=\"nofollow\" href=\"https://cloudacademy.com/blog/azure-search-how-to-search-for-text-in-documents-and-images/\">Azure Search: How to Search for Text in Documents and Images</a> appeared first on <a rel=\"nofollow\" href=\"https://cloudacademy.com\">Cloud Academy</a>.</p>\n",
                        "contentSnippet": "What is Azure Search? Azure Search is an artificial intelligence (AI)-powered cloud search service that enables full-text searches within documents and images. It’s a managed service, and we’ll show you how to implement a search engine in a few steps.  In addition to the ease of creating and managing the...\nThe post Azure Search: How to Search for Text in Documents and Images appeared first on Cloud Academy.",
                        "guid": "https://cloudacademy.com/?p=38194",
                        "categories": [ "Microsoft Azure" ],
                        "isoDate": "2019-10-08T11:16:00.000Z"
                    }
                ]
            }
        ]
      }
    }
  
const removeFeed = feed =>{
    return {
        type: "REMOVE_FEED",
        feed
    }
}

// const loadFeed = feed =>{
//     let parser = new Parser();
//     let feedUrl = feed.feedUrl;
//     (async () => {
//         let rssfeed = await parser.parseURL( 'https://cors-anywhere.herokuapp.com/' + feedUrl);
//         // feed.items.forEach(item => {
//         //   console.log(item);
//         // });

//         rssfeed.items.map(item =>
//             feed.items.concat(item)
//         )
        
//         return {
//             type: "LOAD_FEED",
//             feed
//         }

//     })();
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
                "id": response.id,
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
    //   .then(dispatch(
    //     {
    //         type: "END_LOAD_FEED",
    //         isLoading: false
    //       }
    //   ))
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
      dispatch(addFeed(e))
    }
}


export {loadFeedList, removeFeed, loadFeed, addFeed, fetchFeeds, initLoadFeed, initAddFeed, CreateFeed};