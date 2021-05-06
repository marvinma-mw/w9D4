window.addEventListener("DOMContentLoaded", (event) => {
  let catImage = document.querySelector('.cat-pic')
  let errDiv = document.querySelector('.error')
  let imgButton = document.querySelector('#new-pic')
  let loadingMessage = document.querySelector(".loader");
  let popularityScore = document.querySelector(".score");
  let upVoteButton = document.querySelector("#upvote");
  let downVoteButton = document.querySelector("#downvote")
  let userCommentForm = document.querySelector(".comment-form")
  let comment = document.querySelector(".user-comment");



  //Section One: GETTING THE IMAGE FROM SERVER
  const getCatImage = async() => {
    const catImageRes = await fetch('/kitten/image');
    const resImg = await catImageRes.json();
    catImage.src = resImg.src;

    if (!catImageRes.ok) {
      loadingMessage.innerHTML = "Loading..."
      errDiv.innerHTML = "Something went wrong! Please try again!"
    }
  }

  getCatImage();

  imgButton.addEventListener("click", getCatImage);

  //Section Two -1: up vote button
  upVoteButton.addEventListener('click', async(event) => {
    upVoteButtonRes = await fetch("/kitten/upvote", {
      method: "PATCH",
    })
    const json = await upVoteButtonRes.json();
    popularityScore.innerHTML = json.score
  })

  //Section Two -2: down vote button
  downVoteButton.addEventListener('click', async(event) => {
    downVoteButton = await fetch("/kitten/downvote", {
      method: "PATCH",
    })
    const json = await downVoteButton.json();
    popularityScore.innerHTML = json.score;

    if (!downVoteButton.ok) {
      errDiv.innerHTML = "Something went wrong! Please try again!"
    }

  })

  userCommentForm.addEventListener('submit', async(event) => {
    event.preventDefault()
    let message = document.getElementById('user-comment').value
    userCommentForm = await fetch("/kitten/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: message })
    })

    const json = await userCommentForm.json();
    console.log(json)
    let addedMessage = document.createElement('h2')
    addedMessage.innerHTML = message
    document.querySelector(".comments").appendChild(addedMessage)

  })

})