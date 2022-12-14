const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title")
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI objesini başlatmak 

const ui = new UI();


// storage objesi üreteleim

const storage = new Storage();
// tüm eventleri yükleme

eventListeners();

    function eventListeners(){
        form.addEventListener("submit",addFilm);
        document.addEventListener("DOMContentLoaded",function(){
            let films = storage.getFilmsFromStorage();
            ui.loadAllFilms(films);
        });

        cardbody.addEventListener("click",deleteFilm);
        clear.addEventListener("click",clearAllFilms)
    }

    function addFilm(e){
        const title = titleElement.value;
        const director = directorElement.value;
        const url = urlElement.value;

        if (title === "" || director === "" || url === ""){
            // hata
            ui.displayMessages("Tüm alanları doldurunuz...","primary");
        }
        else{  // YENİ FİLM OLUŞTURMA
            const newFilm = new Film(title, director, url)


            ui.addFilmToUI(newFilm); // Arayüze Film ekleme 
            storage.addFilmToStorage(newFilm); // storage film ekleme şeklimiz . 
            ui.displayMessages("Tüm alanları doldurunuz...","success");
        }
        ui.clearInputs(titleElement,urlElement,directorElement);


        e.preventDefault();
    }

    function deleteFilm(e){
        if(e.target.id === "delete-film" ){
            ui.deleteFilmFromUI(e.target);
            storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);     
        }
    }

    function clearAllFilms(){

        if(confirm("Are you sure you want to do that ?")){
           ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage(); 
        }
        
    }