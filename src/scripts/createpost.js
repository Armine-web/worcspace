import { API } from './api.js';

class PostService {
    constructor() {
        this.api = new API('https://simple-blog-api-red.vercel.app/api');
    }

    createPost(title, story, imgLink, authorName) {
        const newPost = {
            title: title,
            story: story,
            img: imgLink,
            authorName: authorName
        };

        this.api.post('posts', newPost)
            .then(post => {
                console.log('Post created:', post);
                window.location.href = 'home.html'; 
            })
            .catch(error => {
                console.error('Error creating post:', error);
                let posts = JSON.parse(localStorage.getItem('posts')) || [];
                posts.unshift(newPost);
                localStorage.setItem('posts', JSON.stringify(posts));
                window.location.href = 'home.html'; 
            });
    }
}

function createPostLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
        ]),
        UI.createElement("div", { class: "form-wrapper" }, [
            UI.createElement("div", { class: "form-container post-form" }, [
                UI.createElement("form", { class: "login-form", id: "createPostForm" }, [
                    UI.createElement("input", { id: "postTitle", placeholder: "Title" }),
                    UI.createElement("input", { id: "postAuthor", placeholder: "Autor Name" }),
                    UI.createElement("textarea", { id: "postStory", placeholder: "Story (the main content of the post)" }),
                    UI.createElement("input", { id: "imageLink", type: "text", placeholder: "Image Link" }),
                    UI.createElement("button", { type: "submit" }, "Create"),
                ]),
            ]),
        ]),
    ]);

    UI.render(container, document.body);
    
    const postService = new PostService();
    const form = document.getElementById('createPostForm');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const story = document.getElementById('postStory').value;
        const imgLink = document.getElementById('imageLink').value;
        const authorName = document.getElementById('postAuthor').value;

        if (title && story && imgLink && authorName) {
            postService.createPost(title, story, imgLink, authorName);
        } else {
            alert('All fields are required!');
        }

        
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(posts));

      window.location.href = 'home.html';


    });
}

createPostLayout();
