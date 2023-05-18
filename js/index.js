const videoIframe = document.querySelector(".vide__iframe");
const search = document.querySelector(".header__search");

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
    return data;
  } catch (error) {
    console.error(error);
  }
};

const cargarComentarios = async (urlComentarios) => {
  const data = await (await fetch(urlComentarios, options)).json();
  console.log(data);
  return data;
};

const cargarRelatedVideos = async (urlRelatedVideos) => {
  const data = await (await fetch(urlRelatedVideos, options)).json();
  console.log(data);
  return data;
};

const cargarVideo = async (urlSearch) => {
  const data = await getData(urlSearch);
  const idVideo = data.contents[0].video.videoId;

  const urlVideo = getUrlById(idVideo);
  videoIframe.src = urlVideo;

  const urlVideosRelated = getUrlRelacionados(idVideo);
  cargarComentarios(urlVideosRelated)
  const urlComentarios = getUrlComentarios(idVideo);
  cargarRelatedVideos(urlComentarios)

};
