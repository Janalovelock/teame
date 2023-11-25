import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { guid } from "./uid.js";

let addCommentBtn = document.getElementById("addCommentBtn");
let commentText = document.getElementById("comment-input");

addCommentBtn.onclick = function() {
    addComment(); 
    displayComments();
    commentText.value = ""; //? Clears the text field.
};

function displayComments() {
    let productComments = comments.map(comment => comment);
    //? Add comments to localStorage.
    setLocalStorage("comments", productComments);
    // console.log(productComments);
}

function addComment() {
    let newComment = {
        id: guid(),
        text: commentText.value
    };
    comments.unshift(newComment);
    const maxComments = 10;
    if(comments.length > maxComments) {
        comments = comments.slice(0, maxComments);
    }
    return newComment;
}

//? Get comments from localStorage.
let comments = getLocalStorage("comments") || [];
// console.log(comments);
for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
    let eachComment = document.createElement("p");
    eachComment.innerHTML = `<li class="commentsList">@:_${comment.id}: ${comment.text}</li>`
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.append(eachComment);
    // console.log(comment);
}