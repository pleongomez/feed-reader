import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import ReactLoading from "react-loading";
import '../App.css'
import {fetchFeeds, removeFeed} from '../actionCreators';
import {connect} from 'react-redux';

const FeedList = ({feeds, fetchFeeds, removeFeed}) => {
    return(
        <div>
            <div className="list-group">
                {feeds.map(feed =>
                    <button type="button" className="list-group-item" key={feed.id}
                    onClick={() => fetchFeeds(feed)}>
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
      fetchFeeds: (feed) => dispatch(fetchFeeds(feed)),
      removeFeed: (feed) => dispatch(removeFeed(feed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);