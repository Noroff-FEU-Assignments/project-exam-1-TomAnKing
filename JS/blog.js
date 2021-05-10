const url = "https://www.tomanking.one/wp-json/wp/v2/posts/?per_page=12";

const blogContainer = document.querySelector(".blogContainer");

const moreButton = document.querySelector(".moreButton");

let article;

async function displayPosts(start, end) {
  try {
    const response = await fetch(url);

    articles = await response.json();

    const posts = getPosts(articles, start, end);

    posts.forEach((post) => {
      blogContainer.innerHTML += `<a href="article.html?id=${post.id}">
      <div class="post">
        <img id="image" src="${post.img}" alt="" />
        <p class="title">${post.title}</p>
        <p class="date">${post.author}${post.date}</p>
        <p class="readMore">Read More</p>
      </div>
      </a>`;
    });
  } catch (error) {
    console.log("An error occured");
  }
}

function getPosts(articles, start, end) {
  const posts = [];

  for (let i = start; i <= end; i++) {
    const sections = articles[i].content.rendered.split("#");
    let post = {};
    post = {
      id: articles[i].id,
      title: articles[i].title.rendered,
      body: sections[0],
      author: sections[1],
      date: sections[2],
      img: articles[i].better_featured_image.source_url,
    };
    posts.push(post);
  }
  return posts;
}

moreButton.addEventListener("click", () => {
  displayPosts(7, articles.length - 1);
  moreButton.style.display = "none";
});

displayPosts(0, 6);
