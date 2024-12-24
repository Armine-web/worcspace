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
                    <h3>${post.title}</h3>
                    <p><strong>Author: ${post.authorName}</strong></p>
                </div>
                <div class="blog-post__content">
                    <img class="blog-post__content-img" src="${post.img}" alt="${post.title}">
                    <p>${post.story}</p>
                </div>
                <div class="blog-post__footer-wrapper">
                    <div class="blog-post__footer">
                        <a href="./updatepost.html?postId=${post.id}">Edit</a>  
                    </div>
                    <div id="deletePostButton" class="blog-post__footer delete">
                        <a href="./deletepost.html?postId=${post.id}">Delete</a>  
                    </div>
                </div>
            `;
            postContainer.appendChild(postCard);
        });
    }
}

function fetchBloggers() {
    const bloggerList = document.querySelector('.sidebar__blogger-list');

    if (!bloggerList) {
        console.error("Blogger list element not found!");
        return;
    }

    fetch('https://simple-blog-api-red.vercel.app/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(bloggers => {
            bloggers.forEach(blogger => {
                const randomSeed = Math.random().toString(36).substring(2, 15);
                const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${randomSeed}.svg`;
                const bloggerItem = document.createElement('li');
                bloggerItem.classList.add('sidebar__blogger-item');
                bloggerItem.innerHTML = `
                    <img src="${avatarUrl}" alt="${blogger.firstName} ${blogger.lastName}" class="sidebar__avatar">
                    <span><strong>${blogger.firstName} ${blogger.lastName}</strong></span>
                `;
                bloggerList.appendChild(bloggerItem);
            });
        })
        .catch(error => {
            console.error('Error fetching bloggers:', error);
        });
}

function createHomeLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./index.html" }, "Log In"),
            UI.createElement("a", { href: "./registration.html" }, "Registration"),
            UI.createElement("a", { href: "./createblog.html" }, "Create Blog")
        ]),
        UI.createElement("div", { class: "workspace" }, [
            UI.createElement("main", { class: "workspace__main" }, [
                UI.createElement("div", { class: "blog-post" }, [
                    UI.createElement("section", { class: "blog-post__cards" }, null)
                ]),
                UI.createElement("section", { class: "workspace__footer" }, "footer section")
            ]),
            UI.createElement("nav", { class: "sidebar" }, [
                UI.createElement("ul", { class: "sidebar__blogger-list" }, null)
            ])
        ]),
        createFooter()
    ]);

    UI.render(container, document.body);

    const postService = new PostService();
    postService.fetchPosts();

    fetchBloggers();
}

document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = './index.html';
    } else {
        createHomeLayout();
    }
});
