import React, { Component } from 'react';
import {loadFeed, removeFeed} from '../actionCreators';
import {connect} from 'react-redux';
import ReactLoading from "react-loading";
import {Card, CardDeck}  from 'react-bootstrap';

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
              <div className="page-header"><h1>{feed.title}</h1></div>
                {feedLoaded && (
                  <CardDeck>
                    {feedList.map(feed => 
                      <Card>
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                        <Card.Body>
                          <Card.Title>{feed.title}</Card.Title>
                          <Card.Text dangerouslySetInnerHTML={{ __html: feed.content }}>
                          {/* {parse(feed.content)} */}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">{feed.updated}</small>
                        </Card.Footer>
                        </Card>
                        )
                      }    
                  </CardDeck>
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