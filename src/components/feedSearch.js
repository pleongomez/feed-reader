import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { CreateFeed} from '../actionCreators';
import {connect} from 'react-redux';
import ReactLoading from "react-loading";


let FeedSearch = ({CreateFeed, isAdding}) => {
    return (
        <div>
          {!isAdding && (
            <form className="form-inline" onSubmit={CreateFeed}>
          <div className="form-group">
            <Field className="form-control" name="url" component="input" type="text" />
          </div>

          <button type="submit" className="btn btn-default">
              <span className="glyphicon glyphicon-plus"></span>
          </button>
          </form>
          )}

        <div >
          {isAdding && (
            <div className="w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap">
            <ReactLoading type='bars' color="#cccccc" />
            </div>
          )}
        </div>
        </div>
        
    )
}

FeedSearch = reduxForm({
    form: 'contact'
})(FeedSearch)
  
const mapStateToProps = state =>{
    return{
      values: state.form,
      isAdding: state.feeds.isAdding
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      CreateFeed: (e) => dispatch(CreateFeed(e))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FeedSearch);