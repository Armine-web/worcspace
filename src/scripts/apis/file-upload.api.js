import { Storage } from '../utils/storage.js';

export class FileUpload {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async upload(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log("File:", file);
      

      const token = Storage.getItem("token");
      console.log("Token used in file upload:", token);

      const response = await fetch(this.getFullUrl("/file-upload/upload"), {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.json();

    } catch (error) {
      console.log("File upload error:", error);
    }
  }

  getFullUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`;
  }
}
