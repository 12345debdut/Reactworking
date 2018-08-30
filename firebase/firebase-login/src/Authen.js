import React,{Component} from 'react';
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAwHJoEk-LccDqH3bqAIoXYoEJL_03GTGE",
    authDomain: "ucourse-cf972.firebaseapp.com",
    databaseURL: "https://ucourse-cf972.firebaseio.com",
    projectId: "ucourse-cf972",
    storageBucket: "ucourse-cf972.appspot.com",
    messagingSenderId: "870483030468"
  };
  firebase.initializeApp(config);


class Authen extends Component{
    login(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise=auth.signInWithEmailAndPassword(email,password);
        promise.then(user=>{
            var lout=document.getElementById('logout');
            lout.classList.remove('hide');
        });
        promise.catch(e=>{
            var err = e.message;
            console.log({err});
            this.setState({err:err});
        });
    }
    signup(event){
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise=auth.createUserWithEmailAndPassword(email,password);
        console.log(promise);
        promise.then(users =>{
           // console.log(users.user.email);
             var err = "welcome"+users.user.email;
               firebase.database().ref('users/').set({
                   email:users.user.email
              });
             //console.log(users);
            this.setState({err:err});
        });
        promise.catch(e=>{
            var err = e.message;
            console.log(err);
            this.setState({err:err});
        });
    }
    logout(){
        const promise=firebase.auth().signOut();
        promise.then(user=>{
            var lout=document.getElementById('logout');
            lout.classList.add('hide');
        });
    }
    google(){
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise=firebase.auth().signInWithPopup(provider);
        promise.then(result =>{
            var user = result.user;
            console.log(result);
            firebase.database().ref('users/'+user.uid).set({
                email:user.email,
                name:user.displayName
            });
        });
        promise.catch(e=>{
            var msg = e.message;
            console.log(msg);
        })
    }


    constructor(props){
        super(props);
        this.state={
            err:''
        };
        this.login=this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout=this.logout.bind(this);
        this.google=this.google.bind(this);
    }
    render(){
        return(
            <div>
                <input id="email" ref="email" type="email" placeholder="Enter your email"/><br/>
                <input id="pass" ref="password" type="password" placeholder= "Enter your password"/><br/>
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log in</button>
                <button onClick={this.signup}>SignUP</button>
                <button onClick={this.logout} id="logout" className="hide">Logout</button><br/>
                <button onClick={this.google} id="Signinwithgoogle" className="google">Signinwithgoogle</button>
                
                </div>
        );
    }
}
export default Authen;