
// GET ALL ELEMENTS FROM DOM

const SearchInput = document.getElementById('dev-search');
const DevBox = document.getElementById('dev-box');
const GoButton = document.getElementById('go-button');
const Loading = document.getElementById('loading');
const Error = document.getElementById('error');
const OtherDetailBox = document.getElementById('other-details-ul');

const UserAvatar = document.getElementById('user-avatar');
const UserFullName = document.getElementById('dev-name');
const UserName = document.getElementById('git-link');
const JoinDate = document.getElementById('joined-date');
const UserBio = document.getElementById('bio');

const RepoCount = document.getElementById('repo-count');
const FollowersCount = document.getElementById('followers-count');
const FollowingCount = document.getElementById('following-count');

const UserTwitter = document.getElementById('twitter-link');
const UserWebsite = document.getElementById('website-link');
const UserLocation = document.getElementById('location');
const UserMail = document.getElementById('mail');
const UserHireStatus = document.getElementById('hire-status');
const UserCompany = document.getElementById('company');
const UserLink = document.getElementById('website-link');

const changeDetailLayout = (input) => {
    OtherDetailBox.style.gridTemplateColumns = 'auto auto';
}

const DOMReset = () => {
    UserAvatar.src = 'img/eclipse.png';
    UserFullName.textContent = "Github Name null";
    UserName.textContent = "Github Username null";
    UserName.removeAttribute('href');
    JoinDate.textContent = "--";
    RepoCount.textContent = '0';
    FollowersCount.textContent = "0";
    FollowingCount.textContent = "0";
    UserBio.textContent = "Bio null";

    UserTwitter.textContent = "null";
    UserLocation.textContent = "null";
    UserMail.textContent = "null";
    UserTwitter.removeAttribute('href');
    UserMail.removeAttribute('href');
    UserHireStatus.textContent = 'null';
    UserCompany.textContent = 'null';
    UserLink.textContent = 'null';
    UserLink.removeAttribute('href');
}

const nothing = () => {
    console.log('I am nothing');
}

const setDomValues = (gitUser) => {
    gitUser.avatar_url ? UserAvatar.src = gitUser.avatar_url : nothing();
    gitUser.name ? UserFullName.textContent = gitUser.name : nothing();
    gitUser.login ? UserName.textContent = `@${gitUser.login}` : nothing();
    gitUser.login ? UserName.href = `https://github.com/${gitUser.login}` : nothing();
    gitUser.created_at ? JoinDate.textContent = `Joined ${(gitUser.created_at).slice( 0 , 10 )}` : nothing();
    gitUser.public_repos ? RepoCount.textContent = String(gitUser.public_repos) : nothing();
    gitUser.followers ? FollowersCount.textContent = String(gitUser.followers) : nothing();
    gitUser.following ? FollowingCount.textContent = String(gitUser.following) : nothing();
    gitUser.bio ? UserBio.textContent = gitUser.bio : nothing();

    gitUser.twitter_username ? UserTwitter.textContent = gitUser.twitter_username : nothing();
    gitUser.location ? UserLocation.textContent = gitUser.location : nothing();
    gitUser.email ? UserMail.textContent = gitUser.email : nothing();
    gitUser.twitter_username ? UserTwitter.href = `http://twitter.com/${gitUser.twitter_username}` : nothing();
    gitUser.email ? UserMail.href =  `mailto:${gitUser.email}` : nothing();
    gitUser.company ? UserCompany.textContent = gitUser.company : nothing();
    gitUser.hireable ? UserHireStatus.textContent = gitUser.hireable : nothing();
    gitUser.blog ? UserLink.textContent = gitUser.blog : nothing();
    gitUser.blog ? UserLink.href = gitUser.blog : nothing();
}

const displayResults = (input) => {
    if( input.message === "Not Found" ) {
        Loading.style.display = 'none';
        Error.style.display = 'block';
        DOMReset();
    } else {
        DOMReset();
        setDomValues(input);
        Error.style.display = 'none';
        Loading.style.display = 'none';
        DevBox.style.display = 'grid';   
        console.log(input);
    }
}


const searchDev = () => {
    fetch(`https://api.github.com/users/${SearchInput.value}`)
    .then ( res => res.json() )
    .then ( data => displayResults(data));
    DevBox.style.display = 'none';
    Error.style.display = 'none';
    Loading.style.display = 'block';
}

const keyPress = (event) => {
    if (event.key === 'enter') {
        searchDev();
    }
}

SearchInput/addEventListener('keypress' , keyPress);