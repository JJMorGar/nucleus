const videoIframe = document.querySelector(".vide__iframe");
const search = document.querySelector(".header__search");
const recomendados = document.querySelector(".recomendados");
const comentarios = document.querySelector(".comentarios")

const getUrlById = (id) => `https://www.youtube.com/embed/${id}`;

const querySearch = (busqueda) => {
  const busquedaLimpia = busqueda.replace("&", "%26");
  return `https://youtube138.p.rapidapi.com/search/?q=${busquedaLimpia}&hl=en&gl=US`;
};

const queryRelatedVideos = (id) =>
  `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;

const queryComentarios = (id) =>
  `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;

const queryDescripccion = (id) =>
  `https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`;

const options = {
  headers: {
    "X-RapidAPI-Key": "2a11985f63msh46971c0814068b1p18da45jsn02bd2bf07f99",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const busqueda = document.querySelector("#search").value;
  const urlSearch = querySearch(busqueda);
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

const cargarComentarios = async (api) => {
  const data = await (await fetch(api, options)).json();
     
  const cometarios = data.comments.map(comment => {
    const {author, content} = comment
    const div = document.createElement("div")
    div.classList.add("comentarios__element")

    const elment = `
        <div class="comentarios__foto">
          <img src="" alt="" />
        </div>
        <div class="comentario__contenido">
          <h3 class="comentario__nombre">${author.title} </h3>
          <p class="comentario__texto">${content}</p>
        </div>
    `
    div.innerHTML = elment
    return div
  })
  comentarios.append(...cometarios)
};

const cargarRelatedVideos = async (api) => {
  const data = await (await fetch(api, options)).json();
  const videos = data.contents.map((e) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const video = `
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${e.video.videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
    card.innerHTML = video;
    return card;
  });
  recomendados.innerHTML = ""
  recomendados.append(...videos);
};

const cargarDescription = async (api) => {
  const data = await (await fetch(api, options)).json();
  const { description } = data;
  const domDescription = document.querySelector(
    ".comentario__texto.descripccion-card"
  );
  domDescription.innerHTML = `${description}`;
  return data;
};

const cargarVideo = async (urlSearch) => {
  const data = await getData(urlSearch);
  const idVideo = data.contents[0].video.videoId;
  const urlVideo = getUrlById(idVideo);
  cargarComentarios(queryComentarios(idVideo));
  cargarRelatedVideos(queryRelatedVideos(idVideo));
  cargarDescription(queryDescripccion(idVideo));
  videoIframe.src = urlVideo;
};
