import React, { Component } from 'react';
import {loadFeed, removeFeed} from '../actionCreators';
import {connect} from 'react-redux';


const FeedDetail = ({feed, loadFeed}) => {
    return(
        <span>{feed.title}</span>
    )
}

const mapStateToProps = state => {
    return {
      feed: state.feeds.feed
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      loadFeed: (feed) => dispatch(loadFeed(feed))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (FeedDetail);