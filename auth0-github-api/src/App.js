import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Header from './component/Header';
import Auth0Lock from 'auth0-lock';
class App extends Component {
  
constructor(props){
  super(props);
  this.state={
    idToken:'',
    profile:{}
  };
  this.getProfile = this.getProfile.bind(this);
}

  static defaultProps= {
    clientId:'p8FQ14TWZ7alUPZeNH9yYpHKcWq0m2LX',
    domain:'debdutsaha.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientId,this.props.domain);
    this.lock.on('authenticated',(authResult)=>{
      console.log(authResult);
      this.lock.getProfile(authResult.accessToken,(error,profile)=>{
      if(error){
        console.log(error);
        return;
      }
      //console.log(profile);
      this.setProfile(authResult.accessToken,profile);
      });
    });
    this.getProfile();
  }
  setProfile(idToken,profile){
    localStorage.setItem('idToken',idToken);
    localStorage.setItem('profile',JSON.stringify(profile));
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile:JSON.parse(localStorage.getItem('profile'))
    });
  }
getProfile(){
  if(localStorage.getItem('idToken') !=null){
    this.setState({
      idToken:localStorage.getItem('idToken'),
      profile:JSON.parse(localStorage.getItem('profile'))
    },()=>{
      console.log(this.state);
    })
  }
}

  showLock(){
    this.lock.show();
  }


  logout(){
    this.setState({
      idToken:'',
      profile: ''
    },()=>{
      console.log(this.state);
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  
  
  render() {
    let gitty;
    if(this.state.idToken){
      gitty=<Github/>
      
    }
    else{
      gitty = "click on Login to view Github Viewer";
    }

    return (
      <div className="App">
      <Header 
      lock={this.lock}
      idToken={this.state.idToken}
      profile={this.state.profile}
      onLogout={this.logout.bind(this)}
      onLogin = {this.showLock.bind(this)}/>
       {gitty} 
      </div>
    );
  }
}

export default App;
