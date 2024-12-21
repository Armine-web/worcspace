import { API } from './api.js';

class PostService {
    constructor() {
        this.api = new API('https://simple-blog-api-red.vercel.app/api');
    }

    deletePost(postId) {
        this.api.delete(`posts/${postId}`)
            .then(response => {
                console.log('Post deleted:', response);
                window.location.href = './home.html';
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

if (postId) {
    const postIdDisplay = document.getElementById('postIdDisplay');
    postIdDisplay.textContent = `Are you sure you want to delete post with ID: ${postId}?`;

    const postService = new PostService();
    const deleteButton = document.getElementById('deletePostButton');

    deleteButton.addEventListener('click', function () {
        postService.deletePost(postId); 
    });
} 
