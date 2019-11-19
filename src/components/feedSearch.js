import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { addFeed} from '../actionCreators';
import {connect} from 'react-redux';


let FeedSearch = ({addFeed}) => {
    return (
        <form className="form-inline" onSubmit={addFeed}>
          <div className="form-group">
            <Field className="form-control" name="firstName" component="input" type="text" />
          </div>

          <button type="submit" className="btn btn-default">
              <span className="glyphicon glyphicon-plus"></span>
          </button>
        </form>
    )
}

FeedSearch = reduxForm({
    form: 'contact'
})(FeedSearch)
  

const mapStateToProps = state =>{
    return{
      values: state.form
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      addFeed: (e) => dispatch(addFeed(e))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FeedSearch);