
window.addEventListener("DOMContentLoaded", async(event)=>{
    let catImage = document.querySelector('.cat-pic')
        let errDiv = document.querySelector('error')
        const catImageRes = await fetch('/kitten/image');
        const resImg = await catImageRes.json();

        catImage.src = resImg.src;

        if(!catImageRes.ok){
            errDiv.innerHTML = " ERROR ";
        }

})
