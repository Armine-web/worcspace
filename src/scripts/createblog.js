import { API } from './api.js';

class PostService {
    constructor() {
        this.api = new API('https://simple-blog-api-red.vercel.app/api');
    }

    fetchPosts() {
        this.api.get('posts')
            .then(posts => {
                this.displayPosts(posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    displayPosts(posts) {
        const postContainer = document.querySelector('.blog-post__cards');
        
        postContainer.innerHTML = ''; 

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('blog-post__card');
            postCard.innerHTML = `
                <div class="blog-post__header">
                    <h3>${post.id} - ${post.title}</h3>
                    <p><strong>Author: ${post.authorName}</strong></p>
                </div>
                <div class="blog-post__content">
                    <img class="blog-post__content-img" src="${post.img}" alt="${post.title}">
                    <p>${post.story}</p>
                </div>
                <div class="blog-post__footer-wrapper">
                    <div class="blog-post__footer">
                        <a href="./updatepost.html?postId=${post.id}">Edit</a>  <!-- Add link to edit page -->
                    </div>
                    <div id = "deletePostButton" class="blog-post__footer delete">
                        <a href="./deletepost.html?postId=${post.id}">Delete</a>  <!-- Add link to edit page -->
                    </div>
                </div>   
            `;
            postContainer.appendChild(postCard);
        });
    }
}
function createBlocLayout(){
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./registration.html" }, "Registration"),
            UI.createElement("a",{href: "./index.html"}, "Log In")
          ]),
        UI.createElement("div", {class: "workspace workspace__post"}, [
            UI.createElement("div", {class: "workspace__post-blogger"}, [
                UI.createElement("div", {class: "sidebar__blogger-item workspace__post-blogger-item"}, [
                    UI.createElement("img", {src: "https://www.w3schools.com/howto/img_avatar2.png", class: "sidebar__avatar"}),
                        UI.createElement("span", {class: "workspace__post-author"}, "name surname")
                        ]),
                        UI.createElement("a", {class: "workspace__post-button", href:"./createpost.html"}, "Create New Post" )  
                        ]),

                            UI.createElement("div", { class: "blog-post workspace__post-post" }, [
                              UI.createElement("section", { class: "blog-post__cards" }, null)  
                            ]),
                            UI.createElement("section", { class: "workspace__footer workspace__post-footer" }, "section")
                          ]),
                         
    ])

    UI.render(container, document.body);

    const postService = new PostService();
    postService.fetchPosts();

}


createBlocLayout()