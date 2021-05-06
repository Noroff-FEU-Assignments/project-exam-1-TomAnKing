const url = "https://www.tomanking.one/wp-json/wp/v2/posts/?per_page=12";

const blogContainer = document.querySelector(".blogContainer");

async function displayPosts(start, end) {
  try {
    const response = await fetch(url);

    const content = await response.json();

    let posts = getPosts(content, start, end);

    posts.forEach((post) => {
      blogContainer.innerHTML += `<a href="blogDetail.html">
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

function getPosts(content, start, end) {
  const posts = [];

  for (let i = start; i <= end; i++) {
    const sections = content[i].content.rendered.split("#");
    let post = {};
    for (let j = 0; j < sections.length; j++) {
      post = {
        title: content[i].title.rendered,
        body: sections[0],
        author: sections[1],
        date: sections[2],
        img: content[i].better_featured_image.source_url,
      };
    }
    posts.push(post);
  }

  return posts;
}

displayPosts(0, 11);
