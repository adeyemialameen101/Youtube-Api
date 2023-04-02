const video = document.querySelector('.video-section');
const input = document.querySelector('.input');
const btn = document.querySelector('.download-btn');
const main = document.querySelector('#main');

const getJokes = (videoId) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b76d9106d7msh5f92fbf4c5f3d4ap1d3bddjsnf9e362de983c',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };

  fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      console.log(response.formats[1].url);
      video.innerHTML = `
      <video class="video" src="${response.formats[2].url}" controls muted download="${response.title}"></video>
      <h1 class="video-title">${response.title}</h1>
      `;
    })
    .catch(err => {
      if (err) {
        main.style.color = 'red';
        main.style.fontSize = '38px';
        main.style.fontWeight = 'bold';
      }
      main.innerHTML = `<h1>Error Fetching Data From Api Please Check Your Internet Connect And Try Again</h1>`;
    });
};

btn.addEventListener('click', () => {
  run();
});

const run = () => {
  // For testing.
  let urls = [
    input.value
  ];

  let i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  for (i = 0; i < urls.length; ++i) {
    r = urls[i].match(rx);
    console.log(r[1]);
    getJokes(r[1]);
  }
};
