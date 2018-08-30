import React,{Component} from 'react';

//userData
class Profile extends Component{
    render(){
    let userdata =this.props.userdata;
    let followers = `${userdata.homeURL}/followers`;
    let following = `${userdata.homeURL}/following`;
    let repos = `${userdata.homeURL}/repos`;
     if(userdata.notFound === 'user not found'){
        return(
            <div>
                <h2>Heyyyyyy</h2>
                <p>Are you sure,for whom are you looking for?</p>
            </div>
        );
    }
    else{
        return(
            <section className="github-profile">
                <div className="github-profile-info">
                    <a href={userdata.homeURL} tittle="{userdata.name|| userdata.username}"><img src={userdata.avatar}/></a>
                    <h2><a href={userdata.homeURL} tittle={userdata.username} target="_blank">{userdata.name||userdata.username}</a></h2>
                    <h3>{userdata.location}</h3>
                </div>
                <div className="github-profile-state">
                    <ul>
                    <li><h1>Followers:</h1>
                    <a href={followers} target="_blank" tittle="Number of Followers"><i>{userdata.followers}</i></a>
                    </li>
                    <li><h1>Repository</h1>
                    <a href={repos} target="_blank" tittle="Number of Repository"><i>{userdata.repos}</i></a>
                    </li>
                    <li> <h1>Followings</h1>
                    <a href={following} target="_blank" tittle="Number of Followings"><i>{userdata.following}</i></a>
                    </li>
                    </ul>
                </div>
            </section>
        );
    }

  }
}
export default Profile;