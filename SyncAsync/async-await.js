
async function run() {
  try{
    const user = await getUser(1);
    const repos = await getRepos(user.githubID);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch(error) {
    console.error(error.message)
  }
}

run();

/* functions */

function getUser(id) {
  console.log('Reading Data from DB');
  const users = [
    { id: 1, githubID: 'neo'},
    { id: 2, githubID: 'john'}
  ]

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      if(user) resolve(user);
      else reject(new Error(`Can not find user with id: ${id}`));
    }, 2000)
  });
}

function getRepos (userID) {
  console.log(`Finding [ ${userID} ]'s all github repo...`);
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      const i = Math.floor(Math.random() * 100)
      if(i % 2 === 1) resolve(['TIL', 'ES6', 'Express-demo']);
      else reject(new Error(`Can not find repos with userID: ${userID}`));
    }, 1500)
  }) 
}

function getCommits (repo) {
  console.log(`Getting all commits in [ ${repo} ]`);
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(['Init repo', 'Finish Something'])
    }, 2000);
  }); 
}