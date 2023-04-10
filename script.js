window.onload = function() {
    loadDogBreeds();    
};

function showError(message) {
    var err = document.querySelector("#error-msg");
    err.classList.remove("hidden");
    err.innerHTML = message;
}

function updateBreedList(breedList) {
    var select = document.querySelector("#breeds");
    var buttonLoad = document.querySelector("#btn-load");

    function createBreedOption(name) {
        var option = document.createElement("option");
        option.value = name;
        option.innerHTML = name;
    
        return option;
    }
    
    breedList.forEach(function(breed) {
        var breedOption = createBreedOption(breed);
        select.appendChild(breedOption);
    });

    buttonLoad.onclick = function(e) {
        var breed = select.value;
        loadBreedImages(breed);
    };
}

function getImageCount() {
    var input = document.querySelector("#image-count");
    return input.value;
}

function extractBreedImageList(response) {
    if(response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return response.message;
}

function updateBreedImages(breedImageList){
    var imagesContainer = document.querySelector("#images-container");
    var breedName = document.querySelector("#breed-name");
    var breedsSelect = document.querySelector("#breeds");
    breedName.innerHTML = breedsSelect.value;
    imagesContainer.innerHTML = "";
    function createImgElement(url) {
        var img = document.createElement("img");
        img.src = url;
        return img;
    }

    breedImageList.forEach(function(url) {
        var img = createImgElement(url);
        imagesContainer.appendChild(img);
    });
};
function loadBreedImages(breed) {
    var imageCount = getImageCount();
    var url = `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`;
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        try {
            var response = JSON.parse(this.responseText);
            var breedImageList = extractBreedImageList(response);
            updateBreedImages(breedImageList);
        } catch(e) {
            showError("Unable to load dog breeds");
        }
    };

    xhr.onerror = function() {
        showError("Unable to load dog breeds");
    };

    xhr.open("GET", url);
    xhr.send();
}
function extractBreedList(response) {
    if(response.status !== "success") {
        throw new Error("response wasn't successful");
    }
    return Object.keys(response.message);
}

function loadDogBreeds() {
    var url = "https://dog.ceo/api/breeds/list/all";
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        try {
            var response = JSON.parse(this.responseText);
            var breedList = extractBreedList(response);
            updateBreedList(breedList);
        } catch(e) {
            showError("Unable to load dog breeds");
        }
    };

    xhr.onerror = function() {
        showError("Unable to load dog breeds");
    };

    xhr.open("GET", url);
    xhr.send();
}
