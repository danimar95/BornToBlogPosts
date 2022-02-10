

/*function capitalize(str){
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}*/

/*function removeBreaks(str){
return str.replace(/(\r\n|\n|\r)/gm, "");
}*/
let getCardToEdit = ""
let getTitleToEdit = ""
let getBodyToEdit= ""
let getSaveBtn= ""

function clearInputs () {
  document.getElementById("title").value = "";
  document.getElementById("recipe").value = "";
}

function createNewPost() {
  const postTitle = document.getElementById("title").value;
  const postBody = document.getElementById("recipe").value;

  if ((postTitle.length > 0) && (postBody.length > 0)) {
    postPostRequest({title:postTitle, body:postBody});
    clearInputs();
  } else {
    swal.fire("Warning","Please make sure you have filled al the inputs.","warning");
  }
}

function deleteCard () {
  const getPost = this.parentElement.parentElement.parentElement.parentElement
  const postId = getPost.getElementsByClassName("post-id")[0].value;
  deletePostRequest(getPost,postId)
}

function activateEditCard () {
  getCardToEdit = this.parentElement.parentElement.parentElement.parentElement
  getTitleToEdit = getCardToEdit.getElementsByClassName("card-title")[0]
  getTitleToEdit.disabled = false
  getTitleToEdit.value

  getBodyToEdit = getCardToEdit.getElementsByClassName("card-body")[0]
  getBodyToEdit.disabled = false
  getSaveBtn = getCardToEdit.getElementsByClassName("saveBtn")[0];
  getSaveBtn.hidden = false
}

function editCard (event) {
  event.preventDefault();
  const editedTitle = getTitleToEdit.value;
  const editedBody = getBodyToEdit.value;
  if ((editedTitle.length > 0) && (editedBody.length > 0)) {
    putPostRequest({ title:editedTitle, body:editedBody });
  } else {
    swal.fire("Warning","Please make sure you have filled al the inputs.","warning");
  }
  getSaveBtn.hidden = true
  getTitleToEdit.disabled = true
  getBodyToEdit.disabled = true
}

function createPost(title,body,id) {
  const newPostCard = document.createElement("div");
  newPostCard.className = "newPost card";

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

  const commentsIcon = document.createElement("i");
  commentsIcon.className="fas fa-comment-dots";
  newPostFourthRowSecondDiv.appendChild(commentsIcon);

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
}


//REST API'S FUNCTIONS 

// GET METHOD
function getPostsRequest() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((postsList) => {
      postsList.map(function (post) {
        createPost(post.title, post.body, post.id);
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
    createPost(postPost.title, postPost.body,postPost.id));
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
    headers:{
      'Content-Type': 'application/json'
      
    }
  }).then(response => response.json())
    .then(editedPost => 
      editCard(editedPost.title, editedPost.body));
 }

const publishPost = document.getElementById("publishPost");
publishPost.addEventListener("click", createNewPost);
window.addEventListener("load", getPostsRequest());