const jokeContainer = document.querySelector('#joke-container');
const getJokeButton = document.querySelector('#joke-button')
const savedContainer = document.querySelector('#saved-container');

const getNewJoke = () => {
  fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
    .then(response => response.json())
    .then(singleJoke => {
      renderJoke(singleJoke);
    })
    .catch(err => console.error(err));
}
getNewJoke();

// setup: 'The past, the present and the future walk into a bar.', 
// delivery: 'It was tense.'

const renderJoke = (joke) => {
// console.log(joke.setup)
// console.log(joke.delivery)
  const jokeSetup = document.createElement('h3');
  jokeSetup.textContent = joke.setup;
  const jokeDelivery = document.createElement('h4');
  jokeDelivery.textContent = joke.delivery;
  const saveButton = document.createElement('button');
  saveButton.id = 'save-button';
  saveButton.textContent = 'Save this joke';
  const buttonContainer = document.createElement('div');
  buttonContainer.append(saveButton);
  jokeContainer.append(jokeSetup, jokeDelivery, buttonContainer);
  saveButton.addEventListener('click', () => {
    savedContainer.append(jokeSetup, jokeDelivery);
    jokeContainer.innerHTML = ''
  })
  
}






getJokeButton.addEventListener('click', () => {
    jokeContainer.innerHTML = ''
    getNewJoke()
})