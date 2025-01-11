import { PostApi } from "./post.api.js";
import { UserApi } from "./user.api.js";
import { AuthApi } from "./auth.api.js";
import { FileUpload } from "./file-upload.api.js";
import { UpdatePost } from "./post-update.api.js";

export const BASE_URL = 'https://simple-blog-api-red.vercel.app/api'

class Api {
  post = null;
  user = null;
  auth = null;
  fileUpload = null;
  updatePost = null;

  constructor(baseUrl) {
      this.post = new PostApi(baseUrl);
      this.user = new UserApi(baseUrl);
      this.auth = new AuthApi(baseUrl);
      this.fileUpload = new FileUpload(baseUrl);
      this.updatePost = new UpdatePost(baseUrl);
  }
  
}


export const api = new Api(BASE_URL);