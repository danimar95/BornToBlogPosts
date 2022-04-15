

/*function capitalize(str){
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}*/

/*function removeBreaks(str){
return str.replace(/(\r\n|\n|\r)/gm, "");
}*/
let getCardToEdit = ""
let getTitleToEdit = ""
let getIdToEdit = ""
let getBodyToEdit= ""
let getNameToEdit= ""
let getCommentBodyToEdit = ""
let getSaveBtn= ""
let getSaveCommentBtn = ""
let commentNumber = 0
let newCommentCard =""
let commentsContainer = ""

function clearPostInputs () {
  document.getElementById("title").value = "";
  document.getElementById("recipe").value = "";
}

function clearCommentInputs () {
  document.getElementById("commentInput").value = "";
}

function createNewPost() {
  const postTitle = document.getElementById("title").value;
  const postBody = document.getElementById("recipe").value;

  if ((postTitle.length > 0) && (postBody.length > 0)) {
    postPostRequest({title:postTitle, body:postBody});
    clearPostInputs();
  } else {
    swal.fire("Warning","Please make sure you have filled al the inputs.","warning");
  }
}

function deleteCard () {
  const getPost = this.parentElement.parentElement.parentElement.parentElement
  const postId = getPost.getElementsByClassName("post-id")[0].value;
  console.log('postIdCard',postId)
  deletePostRequest(getPost,postId)
}

function deleteComment () {
  const getComment = this.parentElement.parentElement.parentElement
  const commentId = getComment.getElementsByClassName("comment-id")[0].value
  deleteCommentRequest(getComment,commentId)
}

function activateEditCard () {
  getCardToEdit = this.parentElement.parentElement.parentElement.parentElement
  getIdToEdit = getCardToEdit.getElementsByClassName("post-id")[0]
  getTitleToEdit = getCardToEdit.getElementsByClassName("card-title")[0]
  getTitleToEdit.disabled = false
  getTitleToEdit.value

  getBodyToEdit = getCardToEdit.getElementsByClassName("card-body")[0]
  getBodyToEdit.disabled = false
  getSaveBtn = getCardToEdit.getElementsByClassName("saveBtn")[0];
  getSaveBtn.hidden = false
}

function activateEditComment () {
  getCommentToEdit = this.parentElement.parentElement.parentElement
  getIdToEdit = getCommentToEdit.getElementsByClassName("comment-id")[0]
  getNameToEdit = getCommentToEdit.getElementsByClassName("comment-name")[0]
  getNameToEdit.disabled = false
  getNameToEdit.value

  getCommentBodyToEdit = getCommentToEdit.getElementsByClassName("comment-body")[0]
  getCommentBodyToEdit.disabled = false
  getSaveCommentBtn = getCommentToEdit.getElementsByClassName("save-comment-btn")[0]
  getSaveCommentBtn.hidden = false
}

function editCard (event) {
  event.preventDefault();
  const editedTitle = getTitleToEdit.value;
  const editedBody = getBodyToEdit.value;
  const editedId = getIdToEdit.value;
  if ((editedTitle.length > 0) && (editedBody.length > 0)) {
    putPostRequest({ title:editedTitle, body:editedBody, id:editedId });
  } else {
    swal.fire("Warning","Please make sure you have filled al the inputs.","warning");
  }
  getSaveBtn.hidden = true
  getNameToEdit.disabled = true
  getCommentBodyToEdit.disabled = true
}

function editComment(event) {
  event.preventDefault();
  console.log("editeeee")
  const editedName = getNameToEdit.value;
  const editedCommentBody = getCommentBodyToEdit.value;
  const editedCommentId = getIdToEdit.value;
  if((editedName.length > 0) && (editedCommentBody.length > 0)){
    putCommentRequest({ name:editedName, body:editedCommentBody, id:editedCommentId });
  } else {
    swal.fire("Warning","Please make sure you have filled al the inputs.","warning");
  }
  getSaveCommentBtn.hidden = true
  getTitleToEdit.disabled = true
  getBodyToEdit.disabled = true
}


function createNewComment(event){
  if (event.code === 'Enter'){
    const getCurrentPostCommentsContainer = this.parentElement.parentElement;
    console.log('currentpost',getCurrentPostCommentsContainer)
    const newCommentId = getCurrentPostCommentsContainer.getElementsByClassName("comment-id")[0].value;
    console.log('newCommentId',newCommentId)
    const newCommentBody = this.value;
    const newCommentEmail = "janeth94@gmail.com";
    const newCommentName = "New comment!";
  
    if(newCommentBody.length > 0) {
      postCommentRequest({ name:newCommentName, email:newCommentEmail, body:newCommentBody, postId:newCommentId })
      clearCommentInputs();
    }
  };
};

function getCommentInformation (event){
  event.preventDefault();
  const getCurrentContainer = this.parentElement.parentElement.parentElement.parentElement;
  const getPostId = Number(getCurrentContainer.getElementsByClassName("post-id")[0].value);
  console.log('getpostid',getPostId)
  console.log('currentcontainer',getCurrentContainer)
  //const commentContainer = document.getElementById(`collapse ${getPostId}`);
  $(`#collapse-${getPostId}`).on('shown.bs.collapse', function () {
    console.log("Opened")
    getCommentsRequest(getPostId);
  });
  $(`#collapse-${getPostId}`).on('hidden.bs.collapse', function () {
    console.log("Closed")
 });

};

function createPost(title,body,id) {
  const newPostCard = document.createElement("div");
  newPostCard.className = "newPost card";
  newPostCard.value = id;
  newPostCard.setAttribute('id', id);

  const newPostContainer = document.createElement("div");
  newPostContainer.className="container";
  newPostCard.appendChild(newPostContainer);

  // First Row
  const newPostFirstRow = document.createElement("div");
  newPostFirstRow.className="row";
  newPostContainer.appendChild(newPostFirstRow)

  const newPostFirstRowLeftCol = document.createElement("div");
  newPostFirstRowLeftCol.className="col-8";
  newPostFirstRow.appendChild(newPostFirstRowLeftCol);

  const newPostFirstRowLeftColNewRecipe = document.createElement("div");
  newPostFirstRowLeftColNewRecipe.className="new-recipe";
  newPostFirstRowLeftColNewRecipe.innerText= "+ NEW RECIPE";
  newPostFirstRowLeftCol.appendChild(newPostFirstRowLeftColNewRecipe)

  const newPostFirstRowLeftColTitle = document.createElement("input");
  newPostFirstRowLeftColTitle.className="card-title";
  newPostFirstRowLeftColTitle.setAttribute("disabled", "true")
  newPostFirstRowLeftColTitle.setAttribute("id", "title")
  newPostFirstRowLeftColTitle.value= title;
  newPostFirstRowLeftCol.appendChild(newPostFirstRowLeftColTitle);

  const newPostFirstRowRightCol = document.createElement("div");
  newPostFirstRowRightCol.className="col-4 edit-delete-icons";
  newPostFirstRow.appendChild(newPostFirstRowRightCol);

  const cardEditBtn = document.createElement("button");
  cardEditBtn.className= "btn cardOptions";
  cardEditBtn.setAttribute("data-toggle","tooltip");
  cardEditBtn.setAttribute("data-placement","bottom");
  cardEditBtn.setAttribute("title","Delete task");
  const editIcon = document.createElement("i");
  editIcon.className="fas fa-edit";
  cardEditBtn.addEventListener("click", activateEditCard);
  cardEditBtn.appendChild(editIcon)
  newPostFirstRowRightCol.appendChild(cardEditBtn);

  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.className= "btn cardOptions";
  cardDeleteBtn.setAttribute("data-toggle","tooltip");
  cardDeleteBtn.setAttribute("data-placement","bottom");
  cardDeleteBtn.setAttribute("title","Delete task");
  const deleteIcon = document.createElement("i");
  deleteIcon.className="fas fa-trash-alt";
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardDeleteBtn.appendChild(deleteIcon)
  newPostFirstRowRightCol.appendChild(cardDeleteBtn);

  // Second Row
  const newPostSecondRow = document.createElement("div");
  newPostSecondRow.className="row";
  newPostContainer.appendChild(newPostSecondRow);

  const newPostBody = document.createElement("input");
  newPostBody.className="card-body";
  newPostBody.setAttribute("disabled", "true")
  newPostBody.value= body;
  newPostSecondRow.appendChild(newPostBody);

  // Third Row
  const newPostThirdRow = document.createElement("div");
  newPostThirdRow.className = "row third";
  newPostContainer.appendChild(newPostThirdRow)

  const saveBtn =  document.createElement("button");
  saveBtn.className = "btn btn-danger saveBtn";
  saveBtn.setAttribute("type", "button");
  saveBtn.setAttribute("hidden","true")
  saveBtn.innerText = "Save";
  saveBtn.addEventListener("click", editCard);
  newPostThirdRow.appendChild(saveBtn)

  // Fourth Row
  const newPostFourthRow = document.createElement("div");
  newPostFourthRow.className="row fourth";
  newPostContainer.appendChild(newPostFourthRow)

  //Fourth Row User Div
  const newPostFourthRowFirstDiv = document.createElement("div");
  newPostFourthRowFirstDiv.className="user-name-container";
  newPostFourthRow.appendChild(newPostFourthRowFirstDiv);

  const userIcon = document.createElement("i");
  userIcon.className="fas fa-user-alt";
  newPostFourthRowFirstDiv.appendChild(userIcon);

  const newPostFourthRowFirstDivName = document.createElement("div");
  newPostFourthRowFirstDivName.className="user-name";
  newPostFourthRowFirstDivName.innerText="Daniela Martinez";
  newPostFourthRowFirstDiv.appendChild(newPostFourthRowFirstDivName)

  //Fourth Row Comments Div
  const newPostFourthRowSecondDiv = document.createElement("div");
  newPostFourthRowSecondDiv.className="comments";
  newPostFourthRow.appendChild(newPostFourthRowSecondDiv);

  const commentsBtn = document.createElement("button");
  commentsBtn.className= "btn comments-btn";
  commentsBtn.setAttribute("data-toggle","tooltip");;
  commentsBtn.setAttribute("data-placement","bottom");
  commentsBtn.setAttribute("type","button")
  commentsBtn.setAttribute("data-toggle", "collapse");
  commentsBtn.setAttribute("data-target" ,`#collapse-${id}`)
  commentsBtn.setAttribute("title","View comments");
  commentsBtn.addEventListener("click" , getCommentInformation)
  //commentsBtn.addEventListener("click", getCommentsRequest(userId))
  const commentsIcon = document.createElement("i");
  commentsIcon.className="fas fa-comment-dots";
  commentsBtn.appendChild(commentsIcon)
  newPostFourthRowSecondDiv.appendChild(commentsBtn);

  //Fourth Row Date Div
  const newPostFourthRowThirdDiv = document.createElement("div");
  newPostFourthRowThirdDiv.className="date-container";
  newPostFourthRow.appendChild(newPostFourthRowThirdDiv);

  const calendarIcon = document.createElement("i");
  calendarIcon.className="fas fa-calendar-alt";
  newPostFourthRowThirdDiv.appendChild(calendarIcon);

  const newPostFourthRowThirdDivCalendar = document.createElement("div");
  newPostFourthRowThirdDivCalendar.className="date";
  newPostFourthRowThirdDivCalendar.innerText="September 16 2022";
  newPostFourthRowThirdDiv.appendChild(newPostFourthRowThirdDivCalendar)

  // Post id
  const postId = document.createElement("input");
  postId.className="post-id";
  postId.type ="hidden";
  postId.value = id;
  newPostFourthRow.appendChild(postId);

  const postList = document.getElementById("postList");
  postList.prepend(newPostCard);

  // Comments Container
  commentsContainer = document.createElement("div");
  commentsContainer.className = "comments-container";
  commentsContainer.setAttribute("id",`collapse-${id}`);
  newPostCard.appendChild(commentsContainer);

  // First row comments
  const firstRowComments = document.createElement("div");
  firstRowComments.className = "row add-comment";
  commentsContainer.appendChild(firstRowComments)

  const userIconComments = document.createElement("i");
  userIconComments.className = "fas fa-user";
  firstRowComments.appendChild(userIconComments);

  const newComment = document.createElement("input");
  newComment.setAttribute("id","commentInput")
  newComment.className = "new-comment";
  newComment.addEventListener("keypress", createNewComment)
  newComment.setAttribute("placeholder", "Write your comment here!")
  firstRowComments.appendChild(newComment);

  return newPostCard;
}

function createComment(name,email,body,id,postId){
  newCommentCard = document.createElement("div");
  newCommentCard.className = "new-comment-card";
  newCommentCard.setAttribute("id",`postId ${postId}`)

  const newCommentContainer = document.createElement("div");
  newCommentContainer.className="new-comment-container";
  newCommentCard.appendChild(newCommentContainer);

  const commentFirstRow = document.createElement("div");
  commentFirstRow.className= "comment-first-row";
  const commentFirstDiv = document.createElement("input");
  commentFirstDiv.className = "comment-name";
  commentFirstDiv.value = name
  commentFirstDiv.setAttribute("disabled", "true")
  const editCommentBtn = document.createElement("button");
  editCommentBtn.className= "btn cardOptions";
  editCommentBtn.setAttribute("data-toggle","tooltip");
  editCommentBtn.setAttribute("data-placement","bottom");
  editCommentBtn.setAttribute("title","Edit comment");
  editCommentBtn.addEventListener("click", activateEditComment);
  const editIcon = document.createElement("i");
  editIcon.className="fas fa-edit comment-edit-icon";
  editCommentBtn.appendChild(editIcon)
  commentFirstRow.appendChild(commentFirstDiv)
  commentFirstRow.appendChild(editCommentBtn)
  

  const deleteCommentBtn = document.createElement("button");
  deleteCommentBtn.className= "btn cardOptions";
  deleteCommentBtn.setAttribute("data-toggle","tooltip");
  deleteCommentBtn.setAttribute("data-placement","bottom");
  deleteCommentBtn.setAttribute("title","Delete comment");
  deleteCommentBtn.addEventListener("click", deleteComment);
  const deleteIcon = document.createElement("i");
  deleteIcon.className="fas fa-trash-alt comment-delete-icon";
  deleteCommentBtn.appendChild(deleteIcon)
  commentFirstRow.appendChild(deleteCommentBtn)
  newCommentContainer.appendChild(commentFirstRow)

  const commentSecondDiv = document.createElement("div");
  commentSecondDiv.className = "comment-email";
  commentSecondDiv.innerText = email
  newCommentContainer.appendChild(commentSecondDiv)

  const commentThirdDiv = document.createElement("input");
  commentThirdDiv.className = "comment-body";
  commentThirdDiv.setAttribute("disabled", "true")
  commentThirdDiv.value = body
  commentThirdDiv.setAttribute("id",`comment-${id}`)
  newCommentContainer.appendChild(commentThirdDiv)

  const commentSaveCommentDiv = document.createElement("div");
  const saveCommentBtn =  document.createElement("button");
  saveCommentBtn.className = "btn btn-danger save-comment-btn";
  saveCommentBtn.setAttribute("type", "button");
  saveCommentBtn.setAttribute("hidden","true")
  saveCommentBtn.innerText = "Save";
  saveCommentBtn.addEventListener("click", editComment);
  commentSaveCommentDiv.appendChild(saveCommentBtn)
  newCommentContainer.appendChild(commentSaveCommentDiv)

  const commentFourthDiv = document.createElement("div");
  commentFourthDiv.className = "comments-date-container";
  newCommentContainer.appendChild(commentFourthDiv)

  const calendarCommentsIcon = document.createElement("i");
  calendarCommentsIcon.className = "fas fa-calendar-alt";
  commentFourthDiv.appendChild(calendarCommentsIcon);

  const commentsDate = document.createElement("div");
  commentsDate.className="date";
  commentsDate.innerText="September 18 2022";
  commentFourthDiv.appendChild(commentsDate)

  // Comment id
  const commentId = document.createElement("input");
  commentId.className="comment-id";
  commentId.type ="hidden";
  commentId.value = id;
  commentFourthDiv.appendChild(commentId);

  console.log("postId",postId)
  console.log("id",document.getElementById(`collapse-${postId}`))
  const currentCommentsContainer = document.getElementById(`collapse-${postId}`)
  console.log('currenttttt',currentCommentsContainer)
  currentCommentsContainer.appendChild(newCommentCard);

  // const commentsContainerId = getCurrentCommentsContainer.getElementsByClassName("post-id")[0].value;
  // console.log("commentsId", commentsContainerId)
  return newCommentCard;  
}
//REST API'S FUNCTIONS 
// POSTS
// GET METHOD
function getPostsRequest() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((postsList) => {
      postsList.map(function (post) {
        createPost(post.title, post.body, post.id, post.userId);
      });
    });
}

// POST METHOD
function postPostRequest(body){
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(postPost => 
    createPost(postPost.title, postPost.body,postPost.id, postPost.userId));
  }

  // DELETE METHOD
  function deletePostRequest(getCard,cardId){
    fetch(`https://jsonplaceholder.typicode.com/posts/${cardId}`,{
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => getCard.remove());
  }

  //PUT METHOD
  function putPostRequest(body){
    const cardId = getCardToEdit.getElementsByClassName("post-id")[0].value;
    fetch(`https://jsonplaceholder.typicode.com/posts/${cardId}`, {
      method: 'PUT', 
      body: JSON.stringify(body),
      headers:{"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json())
      .then(editedPost => 
        editCard(editedPost.title, editedPost.body, editedPost.id));
  }

  // COMMENTS
  // GET METHOD
  function getCommentsRequest(postIdProp) {
    console.log('postIdProp',typeof(postIdProp))
    //let commentPlace = document.getElementById(`collapse-${postId}`)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postIdProp}/comments`)
    .then((response) => response.json())
    .then((comment) => {
      console.log('comment.postID',typeof(comment[commentNumber].postId))
      for (let index=0; index < comment.length; index++){
        //console.log(comment[commentNumber].postId === postIdProp)
        if (comment[commentNumber].postId === postIdProp){
          //console.log("aqui voy")
          createComment(comment[commentNumber].name, comment[commentNumber].email, comment[commentNumber].body, comment[commentNumber].id, comment[commentNumber].postId);
        }
        commentNumber = commentNumber+1;
      }
      commentNumber = 0
    });
  }

  // POST METHOD
  function postCommentRequest(body){
    fetch(`https://jsonplaceholder.typicode.com/posts/${body.postId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(postComment => 
    createComment({name:postComment.name, email:postComment.email, body:postComment.body, id:postComment.id, postId:postComment.postId}));   
  }

  //DELETE METHOD
  function deleteCommentRequest(getComment,commentId){
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`,{
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(() => getComment.remove());
  }

  //PUT METHOD
  function putCommentRequest(body){
    const commentId = getCommentToEdit.getElementsByClassName("comment-id")[0].value;
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
      method: 'PUT', 
      body: JSON.stringify(body),
      headers:{"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json())
      .then(editedComment => 
        editComment(editedComment.name, editedComment.body, editedComment.id));
  }
  // https://jsonplaceholder.typicode.com/posts/1/comments GET sending title
  // https://jsonplaceholder.typicode.com/posts/1/comments POST
  // https://jsonplaceholder.typicode.com/comments/1 DELETE id on url
  // https://jsonplaceholder.typicode.com/comments/1 PUT same as
//ARREGLAR EL GET COMMENTS. (UNICO QUE ME FALTARIA)
//ARREGLAR EL COMMENTARIO DEFAULT QUE NO SE ESCONDE
//PARA HACER EL GET  const currentContainer = document.getElementById(`collapse-${postId}`) ID PARA POST



const publishPost = document.getElementById("publishPost");
publishPost.addEventListener("click", createNewPost);
window.addEventListener("load", getPostsRequest);