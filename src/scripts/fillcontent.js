document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.querySelector('.blog-post__cards');

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('blog-post__card');
        postCard.innerHTML = `
        <div class="blog-post__header">
            <h3>${post.title}</h3>  
            <p><strong>Author: ${post.authorName}</strong></p>
        </div>
        <div class="blog-post__content">
            <img class="blog-post__content-img" src="${post.img}" alt="${post.title}">
            <p>${post.story}</p>
        </div>   
        `;
        postContainer.appendChild(postCard);
    });

   
});











