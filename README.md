E-commerce API
This project provides the backend API for the Postaway Application, an e-commerce platform. It offers various endpoints for user authentication, post management, likes, and comments on posts.

Authentication
Signin
POST /api/users/signin: Allows users to login and receive a JWT token for authentication.
Parameters:
email: User's email address.
password: User's password.
Responses:
200 OK: Successful login.
400 Incorrect Credentials: Incorrect email or password.
Signup
POST /api/users/signup: Enables users to create a new account.
Parameters:
name: User's name.
email: User's email address.
password: User's password.
Responses:
201 Created: Account successfully created.
400 Bad Request: Invalid request.
Posts
Create Post
POST /api/posts: Allows users to create a new post.
Security: Requires JWT token.
Parameters:
imageUrl: Image file to upload.
caption: Caption for the post.
Responses:
201 Created: Post successfully created.
400 Unauthorized: Invalid or missing JWT token.
Get All Posts
GET /api/posts: Retrieves all posts.
Responses:
200 OK: Successful retrieval.
400 Bad Request: Invalid request.
Get Post by ID
GET /api/posts/{id}: Retrieves a specific post by its ID.
Parameters:
id: ID of the post to retrieve.
Responses:
200 OK: Successful retrieval.
400 Bad Request: Invalid request.
Update Post by ID
PUT /api/posts/{id}: Updates a post by its ID.
Parameters:
id: ID of the post to update.
imageUrl (Optional): Updated image file.
caption (Optional): Updated caption.
Responses:
200 OK: Successful update.
400 Bad Request: Invalid request.
401 Unauthorized: Unauthorized access.
Delete Post by ID
DELETE /api/posts/{id}: Deletes a post by its ID.
Parameters:
id: ID of the post to delete.
Responses:
200 OK: Successful deletion.
400 Bad Request: Invalid request.
Get Posts by User Credential
GET /api/posts/user-post: Retrieves posts created by the authenticated user.
Responses:
200 OK: Successful retrieval.
404 Not Found: No posts found for the user.
Likes
Toggle the Likes
POST /api/likes/{id}: Allows users to like or unlike a post by toggling.
Parameters:
id: ID of the post to like/unlike.
Responses:
200 OK: Toggle successful.
400 Bad Request: Invalid request.
404 Not Found: Post not found.
Get All Likes
GET /api/likes/{id}: Retrieves all likes for a post.
Parameters:
id: ID of the post to get likes.
Responses:
200 OK: Successful retrieval.
400 Bad Request: Invalid request.
404 Not Found: Post not found.
Comments
Get All Comments
GET /api/comments/{id}: Retrieves all comments for a post.
Parameters:
id: ID of the post to get comments.
Responses:
200 OK: Successful retrieval.
400 Bad Request: Invalid request.
404 Not Found: Post not found.
Add Comment
POST /api/comments/{id}: Allows users to add a new comment to a post.
Parameters:
id: ID of the post to add a comment.
comment: Comment details.
Responses:
200 OK: Comment successfully added.
400 Bad Request: Invalid request.
404 Not Found: Post not found.
Update Comment
PUT /api/comments/{id}: Updates a comment on a post.
Parameters:
id: ID of the post to update a comment.
postId: ID of the post.
commentId: ID of the comment.
userId: ID of the user.
updateContent: Updated comment content.
Responses:
200 OK: Comment successfully updated.
400 Bad Request: Invalid request.
404 Not Found: Post or comment not found.
Delete Comment
DELETE /api/comments/{id}: Deletes a comment from a post.
Parameters:
id: ID of the post to delete a comment.
commentId: ID of the comment.
userId: ID of the user.
Responses:
200 OK: Comment successfully deleted.
400 Bad Request: Invalid request.
404 Not Found: Post or comment not found.
