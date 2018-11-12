console.log('메인 코드 진행중...');
getUser(1, (u) => {
    getRepos(u.gitHubID, (repos) => {
        console.log(repos);
        getCommits(repos, (commits) => {
            console.log(commits);
        });
    });
});

console.log('메인 코드 계속 진행중...');

function getUser(id, callback){
    const users = [
        {id: 1, gitHubID: 'neo'},
        {id: 2, gitHubID: 'john'}
    ];
    setTimeout(() => {
        console.log('Reading Data from DB')
        const user = users.find(user => user.id === id);

        callback(user)
    }, 2000);
}

function getRepos(userID, callback){
    console.log(`Finding [${userID}]'s all github repo...`);
    setTimeout(() => {
        callback(['TIL', 'ES6', 'Express-demo']);
    }, 1500);
}

function getCommits(repo, callback){
    console.log(`Getting all commits in [ ${repo} ]`);
    setTimeout(() => {
        callback(['Init repo', 'Finish Something'])
    }, 2000)
}