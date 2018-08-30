import React,{Component} from 'react';
var firebase=require('firebase');
var uuid=require('uuid');
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAwHJoEk-LccDqH3bqAIoXYoEJL_03GTGE",
    authDomain: "ucourse-cf972.firebaseapp.com",
    databaseURL: "https://ucourse-cf972.firebaseio.com",
    projectId: "ucourse-cf972",
    storageBucket: "ucourse-cf972.appspot.com",
    messagingSenderId: "870483030468"
  };
  firebase.initializeApp(config);

class Ucourse extends Component{
    nameSubmit(event){
        var studentName = this.refs.name.value;
        this.setState({studentName:studentName},function(){
            console.log(this.state);
        });
    }
    answerSelected(event){
        var answers = this.state.answers;
        if(event.target.name ==='answer1'){
            answers.answer1 = event.target.value;
        }
        else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
                }
        else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value;
        }
        this.setState({answers:answers},function(){
            console.log(this.state);
        })
        }
    questionSubmit(event){
        firebase.database().ref('uSurvey/'+ this.state.uid).set({
            studentName: this.state.studentName,
            answers:this.state.answers
        });
        this.setState({isSubmitted:true});
    }
    constructor(props){
        super(props);
        this.state={
            uid: uuid.v1(),
            studentName:'',
            answers:{
                answer1:'',
                answer2: '',
                answer3:''
            },
            isSubmitted:false
        };
        this.nameSubmit=this.nameSubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    render(){
        var studentName;
        var questions;
        if(this.state.studentName === ''&& this.state.isSubmitted===false){
        studentName=<div>
        <h1>Hey Student,please let us know your name:</h1>
        <form onSubmit={this.nameSubmit}>
            <input className="namy" type="text" placeholder="Enter Your Name" ref="name"/>
        </form>
        </div>
        }else if(this.state.studentName !=='' && this.state.isSubmitted ===false ){
            studentName=<h1>Welcome to U-survey,{this.state.studentName}</h1>
                questions = <div>>
                    <h2>Here are some questions</h2>
                    <form onSubmit={this.questionSubmit}>
                        <div className="card">
                            <label>What kind of Courser?</label><br/>
                            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} ref="answer" />Technology
                            <input type="radio" name="answer1" value="Business" onChange={this.answerSelected} ref="answer"/>Business
                            <input type="radio" name="answer1" value="Accounts" onChange={this.answerSelected} ref="answer"/>Accounts
                            <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} ref="answer"/>Marketing

                        </div>
                        <div className="card">
                            <label>What are you in?</label><br/>
                            <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
                            <input type="radio" name="answer2" value="Business" onChange={this.answerSelected} />Business
                            <input type="radio" name="answer2" value="In Job" onChange={this.answerSelected} />In Job
                            <input type="radio" name="answer2" value="othsers" onChange={this.answerSelected} />others
                        </div>
                        <div className="card">
                            <label>is Online learning helpful?</label><br/>
                            <input type="radio" name="answer3" value="No" onChange={this.answerSelected} />Yes
                            <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} />No
                        </div>
                        <input className="feedback-button" type="submit" value="submit"/>
                    </form>
                </div>
        }else if(this.state.isSubmitted==true){
            studentName=<h1>Thanks,{this.state.studentName}</h1>
        }
        return(
            <div>
                {studentName}
                ------------------------------------
                {questions}
            </div>
        );
    }
}
export default Ucourse;