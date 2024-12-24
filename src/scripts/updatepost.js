import { API } from './api.js';

class PostService {
    constructor() {
        this.api = new API('https://simple-blog-api-red.vercel.app/api');
    }

    fetchPostById(postId) {
        return this.api.get(`posts/${postId}`)
            .then(post => {
                this.populateForm(post);
            })
            .catch(error => {
                console.error('Error fetching post by ID:', error);
            });
    }


    updatePost(postId, title, story, imgLink, authorName) {
        const updatedPost = {
            title: title,
            story: story,
            img: imgLink,
            authorName: authorName
        };

        this.api.put(`posts/${postId}`, updatedPost)
            .then(post => {
                console.log('Post updated:', post);
                window.location.href = './home.html';
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });
    }

    populateForm(post) {
        document.getElementById('postId').value = post.id;
        document.getElementById('postautor').value = post.authorName;
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postStory').value = post.story;
        document.getElementById('imageLink').value = post.img;
    }
}

function createUpdateFormLayout(postId) {
    const container = document.createElement("div");
    container.classList.add("container-root");

    

    document.body.appendChild(container);

    const postService = new PostService();
    const form = document.getElementById('updatePostForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const postId = document.getElementById('postId').value;
        const title = document.getElementById('postTitle').value;
        const story = document.getElementById('postStory').value;
        const imgLink = document.getElementById('imageLink').value;
        const authorName = document.getElementById('postautor').value;

        postService.updatePost(postId, title, story, imgLink, authorName);
        
    });

    postService.fetchPostById(postId);
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (postId) {
        createUpdateFormLayout(postId);
    } else {
        console.error('No post ID found in URL parameters');
    }
});

