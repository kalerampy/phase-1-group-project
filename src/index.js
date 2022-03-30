const jokeContainer = document.querySelector('#joke-container');
const getJokeButton = document.querySelector('#joke-button')
const savedContainer = document.querySelector('#saved-container');
const saveButton = document.createElement('i');
const jokeSetup = document.createElement('h3');
const jokeDelivery = document.createElement('h4');
const URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart'
//const copyBttn = document.createElement('i')
// copyBttn.className = "fa-solid fa-copy"


const getNewJoke = () => {
  fetch(URL)
    .then(response => response.json())
    .then(joke => {
     singleJoke(joke)
    })
    .catch(err => {
      console.error(err)
    });
}

// setup: 'The past, the present and the future walk into a bar.', 
// delivery: 'It was tense.'

const singleJoke = (joke) => {
  const saveButton = document.createElement('i');
  const jokeSetup = document.createElement('h3');
  const jokeDelivery = document.createElement('h4');
  jokeSetup.textContent = joke.setup;
  jokeDelivery.textContent = joke.delivery;
  saveButton.className = "fa-solid fa-floppy-disk"
  const buttonContainer = document.createElement('div');
  buttonContainer.append(saveButton);
  jokeContainer.append(jokeSetup, jokeDelivery, buttonContainer);
  saveButton.addEventListener('click', (e) => jokeListener(e, jokeSetup, jokeDelivery))
}


const jokeListener = (e, jokeSetup, jokeDelivery) => {
  const childSaved = document.createElement('div')
  const buttonDiv = document.createElement('div')
  const deleteBttn = document.createElement('i')
  const copyBttn = document.createElement('i')
  copyBttn.className = "fa-solid fa-copy"
  buttonDiv.id = 'button-div'
  deleteBttn.className = 'fa-solid fa-trash-can'
  //copyBttn.className = "fa-solid fa-copy"
  buttonDiv.append(deleteBttn, copyBttn)
  deleteBttn.addEventListener('click', () => childSaved.remove())
  copyBttn.addEventListener('click', (e) => copyButtonCall(e, jokeSetup, jokeDelivery))
  childSaved.append(jokeSetup, jokeDelivery, buttonDiv);
  childSaved.className = 'child-saved'
  savedContainer.append(childSaved)
  jokeContainer.innerHTML = ''
}


const copyButtonCall = (e, jokeSetup, jokeDelivery) => {
  const contents = 'Setup: ' + jokeSetup.innerText + ' Delivery: ' + jokeDelivery.innerText
  navigator.clipboard.writeText(contents).then(function() {
    alert('Copied to Clipboard!!!')
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

getJokeButton.addEventListener('click', () => {
    jokeContainer.innerHTML = ''
    getNewJoke()
})

const makeMoves = () => {
  const dogeMoveDiv = document.createElement('div')
  dogeMoveDiv.id = 'dvd'
  const body = document.querySelector('body')
  body.append(dogeMoveDiv)
  var box = document.getElementById('dvd'),
  colors = ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00', '#00ff40', '#00ff80', '#00ffbf', '#00ffff', '#00bfff', '#0080ff', '#0040ff', '#0000ff', '#4000ff', '#8000ff', '#bf00ff', '#ff00ff', '#ff00bf', '#ff0080', '#ff0040', '#ff0000'],
  currentColor = Math.floor((Math.random() * 25) + 1),
  win = window,
  ww = win.innerWidth,
  wh = win.innerHeight,
  translateX = Math.floor((Math.random() * ww) + 1),
  translateY = Math.floor((Math.random() * wh) + 1),
  boxWidth = box.offsetWidth,
  boxHeight = box.offsetHeight,
  boxTop = box.offsetTop,
  boxLeft = box.offsetLeft,
  xMin = -boxLeft,
  yMin = -boxTop,
  xMax = win.innerWidth - boxLeft - boxWidth,
  yMax = win.innerHeight - boxTop - boxHeight,
  request = null,
  direction = 'se',
  speed = 4,
  timeout = null;

init();

// reset constraints on resize
window.addEventListener('resize', function(argument) {
  clearTimeout(timeout);
  timeout = setTimeout(update, 100);
}, false);

function init() {
  request = requestAnimationFrame(init);
  move();
  // setInterval(function() {
  //   move();
  // }, 16.66);
}

// reset constraints
function update() {
  xMin = -boxLeft;
  yMin = -boxTop;
  xMax = win.innerWidth - boxLeft - boxWidth;
  yMax = win.innerHeight - boxTop - boxHeight;
}

function move() {
  setDirection();
  setStyle(box, {
    transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0)',
  });
}

function setDirection() {
  switch (direction) {
    case 'ne':
      translateX += speed;
      translateY -= speed;
      break;
    case 'nw':
      translateX -= speed;
      translateY -= speed;
      break;
    case 'se':
      translateX += speed;
      translateY += speed;
      break;
    case 'sw':
      translateX -= speed;
      translateY += speed;
      break;
  }
  setLimits();
}

function setLimits() {
  if (translateY <= yMin) {
    if (direction == 'nw') {
      direction = 'sw';
    } else if (direction == 'ne') {
      direction = 'se';
    }
    switchColor();
  }
  if (translateY >= yMax) {
    if (direction == 'se') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'nw';
    }
    switchColor();
  }
  if (translateX <= xMin) {
    if (direction == 'nw') {
      direction = 'ne';
    } else if (direction == 'sw') {
      direction = 'se';
    }
    switchColor();
  }
  if (translateX >= xMax) {
    if (direction == 'ne') {
      direction = 'nw';
    } else if (direction == 'se') {
      direction = 'sw';
    }
    switchColor();
  }
}

function switchColor() {
  var color = Math.floor((Math.random() * 25) + 1);
  
  while( color == currentColor ) {
    color = Math.floor((Math.random() * 25) + 1)
  }
  
  setStyle(box, {
    color: colors[color]
  });
  
  currentColor = color;
}

function getVendor() {
  var ua = navigator.userAgent.toLowerCase(),
    match = /opera/.exec(ua) || /msie/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari)/.exec(ua) || /trident/.exec(ua),
    vendors = {
      opera: '-o-',
      chrome: '-webkit-',
      safari: '-webkit-',
      firefox: '-moz-',
      trident: '-ms-',
      msie: '-ms-',
    };

  return vendors[match[0]];
};

function setStyle(element, properties) {
  var prefix = getVendor(),
    property, css = '';
  for (property in properties) {
    css += property + ': ' + properties[property] + ';';
    css += prefix + property + ': ' + properties[property] + ';';
  }
  element.style.cssText += css;
}

}
makeMoves()
