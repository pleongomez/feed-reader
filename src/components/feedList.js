import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Parser from 'rss-parser';
import ReactLoading from "react-loading";
import '../App.css'
import {loadFeed, removeFeed} from '../actionCreators';
import {connect} from 'react-redux';

// function Getrss(){
//     let parser = new Parser();
//         (async () => {
//             let feed = await parser.parseURL('https://azurecomcdn.azureedge.net/en-us/blog/feed/');
//             console.log(feed.title);
//             feed.items.forEach(item => {
//                 console.log(item.title + ':' + item.link)
//             });
//         })();    
// }


const FeedList = ({feeds, loadFeed, removeFeed}) => {
    return(
        <div>
            {/* <div className="w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap">
            <ReactLoading type='cylon' color="#cccccc" />
            </div> */}
            
            <div className="list-group">
                {feeds.map(feed =>
                    <button type="button" className="list-group-item" key={feed.id}
                    onClick={() => loadFeed(feed)}>
                        <span>{feed.title}</span>
                        <a className="remove-icon" onClick={() => removeFeed(feed)}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </a>
                    </button>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state =>{
    return{
      feeds: state.feeds.feeds
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
      loadFeed: (feed) => dispatch(loadFeed(feed)),
      removeFeed: (feed) => dispatch(removeFeed(feed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);