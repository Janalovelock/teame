import { setLocalStorage } from "./utils.mjs";

const quickViewBtn = document.getElementById("quickViewBtn");
const addCommentBtn = document.getElementById("addCommentBtn");
const productModal = document.getElementById("product-modal");
const closeMod = document.getElementsByClassName("close-modal")[0];

quickViewBtn.onclick = function() {
    productModal.style.display = "block";
}

closeMod.onclick = function() {
    productModal.style.display = "none";
}

const comments = [{ 

}];

function displayComments() {
    const commentsContainer = document.getElementById("comments-container");
    
    commentsContainer.innerText = '';

    const productComments = comments.filter(comment => comment);
    console.log(productComments);

    productComments.forEach(comment => {
      
        const commentElement = document.createElement("p");
        commentElement.textContent = comment.text;
        commentsContainer.appendChild(commentElement);
    });
}

const commentText = document.getElementById("comment-input");

addCommentBtn.onclick = function() {
    const newComment = {
        text: commentText.value
    };

    comments.unshift(newComment);

    displayComments();

    commentText.value = "";
};

displayComments();
