import React, { Component } from 'react';
import {loadFeed, removeFeed} from '../actionCreators';
import {connect} from 'react-redux';
import ReactLoading from "react-loading";

class FeedDetail extends Component  {
  
  constructor(props){
    super(props);
  }

  render(){
    const {feed, feedList, isLoading, feedLoaded} = this.props;
    return(
      <div>
        <div >
          {isLoading && (
            <div className="w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap">
            <ReactLoading type='bars' color="#cccccc" />
            </div>
          )}
        </div>

        <div >
          {!isLoading && (
            <div>
                <span>{feed != undefined ? feed.title : 'No hay feed seleccionado'}</span>
                {feedLoaded && (
                  feedList.map(feed => <span>{feed.title}</span>)
                )}
            </div>
            
          )}
        </div>
      </div>
    )
  }
    
}

const mapStateToProps = state => {
    return {
      feed: state.feeds.feed,
      feedList: state.feeds.feed.items,
      isLoading: state.feeds.isLoading,
      feedLoaded: state.feeds.feedLoaded
    }
}
  
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps) (FeedDetail);