

const getNewJoke = () => {
  fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(data => {
        jokeListener(data);
    })
    .catch(err => console.error(err));
}
//getNewJoke()
