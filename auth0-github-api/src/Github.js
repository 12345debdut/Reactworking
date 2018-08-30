import React,{Component} from 'react';
import Search from './Search';
import Profile from './Profile';
const API = 'https://api.github.com/users';
class Github extends Component{

    constructor(props){
        super(props);
        this.state={
            username: '',
            name:'',
            avatar:'',
            followers: '',
            following: '',
            homeURL: '',
            notFound:''
        };
    }

    getProfile(username){
        let finalURL = `${API}/${username}`;
        fetch(finalURL).then((res)=>res.json())
        .then((data)=>{
            this.setState({
                username: data.login,
                name:data.name,
                avatar:data.avatar_url,
                followers: data.public_repos,
                following: data.followers,
                homeURL: data.html_url,
                notFound:data.message
            })
        })
        .catch((error)=> console.log('There was a problem in fetching data'))
    }

componentDidMount(){
    this.getProfile(this.state.username);
}

    render(){
        return(
            <div>
                <section className="card">
                <Search searchProfile={this.getProfile.bind(this)}/>
                <Profile userdata={this.state}/>
                </section>
            </div>
        );
    }
}
export default Github;