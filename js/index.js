const search = document.querySelector(".header__search");
const busqueda = document.querySelector("#search").value;

const getUrlRelacionados = (id) =>
  `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;

const getUrlById = (id) => `https://www.youtube.com/embed/${id}`;

const getUrlComentarios = (id) =>
  `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;

const getUrlSearch = (busqueda) => {
  const busquedaLimpia = busqueda.replace("&", "%26");
  return `https://youtube138.p.rapidapi.com/search/?q=${busquedaLimpia}&hl=en&gl=US`;
};

const options = {
  headers: {
    "X-RapidAPI-Key": "30222f5993msh1220c26d88a52b7p1cfb1cjsn21d430b9fbcf",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};


search.addEventListener("submit", (e) => {
  e.preventDefault();
  const busqueda = document.querySelector("#search").value;
  const urlSearch = getUrlSearch(busqueda);
  cargarVideo(urlSearch);
});



const getData = async (url) => {
  try {
    const data = await (await fetch(url, options)).json();
    return data
  } catch (error) {
    console.error(error);
  }
};


const cargarVideo = async (urlSearch) => {
  const data = await getData(urlSearch);
  const idVideo = data.contents[0].video.videoId;
  const urlVideo = getUrlById(idVideo);
  const videoIframe = document.querySelector(".vide__iframe");
  videoIframe.src = urlVideo;
  console.log(videoIframe);
};





