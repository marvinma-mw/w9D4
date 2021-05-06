window.addEventListener("DOMContentLoaded", (event) => {
  let catImage = document.querySelector('.cat-pic')
  let errDiv = document.querySelector('error')
  let imgButton = document.querySelector('#new-pic')
  let loadingMessage = document.querySelector("loader");

  const getCatImage = async() => {
    const catImageRes = await fetch('/kitten/image');
    const resImg = await catImageRes.json();
    catImage.src = resImg.src;

    if (!catImageRes.ok) {
      //   errDiv.innerHTML = " ERROR ";
      loadingMessage.innerHTML = "Loading..."
    }
  }
  getCatImage();
  imgButton.addEventListener("click", getCatImage);


})