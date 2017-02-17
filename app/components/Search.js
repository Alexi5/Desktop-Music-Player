import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit}>
        
         <input type="text" 
           value={this.props.searchValue} 
           onChange={this.props.handleChange}/>
         <input type="submit"/>
      </form>
    );
  }
}

export default Search