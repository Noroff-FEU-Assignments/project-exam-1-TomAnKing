const blogDetail = document.querySelector(".blogPost");

const modal = document.querySelector(".modalImg");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://www.tomanking.one/wp-json/wp/v2/posts/" + id;

async function fetchPost() {
  try {
    const response = await fetch(url);

    const article = await response.json();

    const post = getPost(article);
    blogDetail.innerHTML = "";
    blogDetail.innerHTML = `<div id="backButton">
    <p>
    <a href="blog.html"><b>Blog ></b></a>
    <span>${post.title}</span>
    </p>
    </div>
    <div class="articleImg" onclick="openModal()">
    <img id="openModal" src="${post.img}" alt="" />
    </div>
    <h1>${post.title}</h1>
    <p class="author">${post.author}</p>
    <p class="date">${post.date}</p>
    <p>${post.body}</p>`;
    modal.innerHTML += `<img src="${post.img}" alt="" />
    <p class="description">${post.title}</p>`;
  } catch (error) {
    console.log("error");
  }
}

function getPost(article) {
  const sections = article.content.rendered.split("#");

  const post = {
    title: article.title.rendered,
    body: sections[0],
    author: sections[1],
    date: sections[2],
    img: article.better_featured_image.source_url,
  };

  return post;
}

fetchPost();

function openModal() {
  modal.style.display = "block";
  console.log("here");
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
