import "../scss/write-post.scss";
import "../static/favicon.png";
import "../font/Dosis/Dosis-Regular.ttf";
import "../font/Montserrat/Montserrat-Regular.ttf";
import "../font/Montserrat/Montserrat-Regular.ttf";
import "../font/Montserrat/Montserrat-Thin.ttf";
import "../font/Montserrat/Montserrat-Bold.ttf";
import "../font/Playfair_Display/PlayfairDisplay-Regular.ttf";

function showError(fileds) {
    document.querySelector("#error").innerHTML = `Fileds should have been fill [ ${fileds.join(", ")} ]`
}

function showMessage(text) {
    document.querySelector("#success").innerHTML = text;
    setTimeout(()=>{
        document.querySelector("#success").innerHTML = "";
        clearForm();
    }, 2000);
}

function clearForm() {
    document.querySelector("#category").value = document.querySelector("#category option").value;
    document.querySelector("#title").value = "";
    document.querySelector("#text").value = "";
    document.querySelector("#file").value = "";
}


document.querySelector("#send-post").addEventListener("click", (event) => {
    let dataPost = {
        category : document.querySelector("#category").value,
        categoryId : +document.querySelector("#category").options[document.querySelector("#category").selectedIndex].dataset.id,
        title : document.querySelector("#title").value,
        text : document.querySelector("#text").value,
        image : document.querySelector("#file").files[0]
    }

    console.log(dataPost);

    let errorsFileds = [];

    for (const key in dataPost) {
        if (dataPost.hasOwnProperty(key)) {
            if ( key === "image") {
                if(dataPost[key] === undefined) continue;
                if(dataPost[key].type !== "image/jpeg" && dataPost[key].type !== "image/png" && dataPost[key].type !== "image/svg+xml")  errorsFileds.push(key);
                continue;
            }
            if( key === "categoryId") continue;
            if (dataPost[key].trim().length !== 0) continue;
            errorsFileds.push(key);            
        }
    }

    if(!errorsFileds.length) {
        new Promise( (resolve, reject) => {
            const postData = new FormData();

            postData.append("category", dataPost.category)
            postData.append("categoryId", dataPost.categoryId)
            postData.append("title", dataPost.title)
            postData.append("text", dataPost.text)
            postData.append("image", dataPost.image)

            fetch("/create-post", {
                method : "post",
                body : postData
            }).then( response =>{
                return response.json();
            }).then( data => {
                showMessage(data.text);
            })
        })
    } else {
        showError(errorsFileds);
    }
})


