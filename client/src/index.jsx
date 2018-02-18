import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
    this.getTopRepos = this.getTopRepos.bind(this);
    this.getTopRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // When a user types a github username into the text field (and clicks 'Add Repos'),
    // use jQuery's ajax method to send a POST request to /repos
    $.ajax({
        url: 'http://localhost:1128/repos',
        method: 'POST',
        data: {username: term},
        // TODO use a promise to delay getTopRepos() until
        // info is saved in DB
        success: this.getTopRepos,
    });
  }
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
  getTopRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({repos: data});
      },
      error: (err) => {
        console.log('GET request failed:', err);
      }
    })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

