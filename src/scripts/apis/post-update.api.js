import { Storage } from "../utils/storage.js";

export class UpdatePost {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async getPostById(id) {
      try {
        const token = Storage.getItem("token");
  
        if (!id) {
          throw new Error("Post ID is required");
        }
  
        const response = await fetch(`${this.baseUrl}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch post with ID ${id}`);
        }
  
        const post = await response.json();
        return post;
      } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
      }
    }
  
    async updatePost(id, postData) {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${this.baseUrl}/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update post with ID ${id}`);
        }
  
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Error updating post:", error);
        throw error;
      }
    }
  }
  