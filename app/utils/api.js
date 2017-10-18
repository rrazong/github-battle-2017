import axios from 'axios';

function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&orderder=desc&type=Repositories')
  return axios.get(encodedURI)
    .then((response) => response.data.items)
    .catch(() => {});
}

function battle(usernames) {
  return axios.all(usernames.map(username => axios.get(window.encodeURI('https://api.github.com/users/' + username))))
    .then(results => {
      return results.map(result => {
        return ({
          ...result.data,
          score: getScore(result.data),
        })
      })
    })
    .catch(error => {
      console.log(error);
      return {};
    })
}

function getScore(playerInfo) {
  const { followers = 0, public_repos = 0 } = playerInfo;

  return ( followers * 3 + public_repos * 7 );
}

export { fetchPopularRepos, battle };
