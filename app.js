let url =
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=kG3GLir6FB4I4rE6iEJlF6U9LyyJenAH";

let favaoret = [];

fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    // Examine the text in the response
    return response
      .json()

      .then(function (data) {
        let element = data.results.books;
        console.log(element);

        let main = document.getElementById("main");

        for (let i = 0; i < element.length; i++) {
          let img = element[i].book_image;
          let title = element[i].title;
          let author = element[i].author;
          let description = element[i].description;
          let div = document.createElement("div");
          let divCol = document.createElement("div");
          let cardH = document.createElement("div");
          let divB = document.createElement("div");
          let img1 = document.createElement("img");
          let h4 = document.createElement("h4");
          let h6 = document.createElement("h6");
          let p = document.createElement("p");
          let button = document.createElement("button");

          divCol.className = "col";
          cardH.className = "card h-100";
          divB.className = "card-body";
          img1.className = "card-img-top";
          h4.className = "card-title";
          h6.className = "card-author";
          p.className = "card-text";
          button.className = "btn btn-lg btn-success";

          img1.src = img;
          h4.innerText = title;
          h6.innerText = author;
          p.innerText = description;
          button.innerText = "Add To Fave";

          divB.appendChild(h4);
          divB.appendChild(h6);
          divB.appendChild(p);
          divB.appendChild(button);

          cardH.appendChild(img1);
          cardH.appendChild(divB);
          divCol.appendChild(cardH);
          main.appendChild(divCol);

          button.addEventListener("click", function () {
            // favaoret.push(element[i]);
            // saveFave();
            // console.log(element[i].title);

            let check = false;
            for (let x = 0; x < favaoret.length; x++) {
              console.log(favaoret[x].rank);
              if (element[i].rank == favaoret[x].rank) {
                alert("Already Add To Fave");
                check = true;
                // console.log(favaoret[x]);
                break;
              }
            }
            if (!check) {
              favaoret.push(element[i]);
              alert("Add To Fave");
              saveFave();
            }
          });
        }
      });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });

//--------------  Session Storage  -------------
// Save cart
function saveFave() {
  localStorage.setItem("fave", JSON.stringify(favaoret));
  //localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
}
// Load cart
function loadFave() {
  favaoret = JSON.parse(localStorage.getItem("fave"));
  //totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
}
//------------- Check if there is products in the shopping cart then load it  -------------
if (localStorage.getItem("fave") != null) {
  loadFave();
}

let mainFave = document.getElementById("mainFave");

function addToFave() {
  for (let i = 0; i < favaoret.length; i++) {
    let img = favaoret[i].book_image;
    let title = favaoret[i].title;
    let author = favaoret[i].author;
    let description = favaoret[i].description;
    let div = document.createElement("div");
    let divCol = document.createElement("div");
    let cardH = document.createElement("div");
    let divB = document.createElement("div");
    let img1 = document.createElement("img");
    let h4 = document.createElement("h4");
    let h6 = document.createElement("h6");
    let p = document.createElement("p");
    let button = document.createElement("button");

    divCol.className = "col";
    cardH.className = "card h-100";
    divB.className = "card-body";
    img1.className = "card-img-top";
    h4.className = "card-title";
    h6.className = "card-author";
    p.className = "card-text";
    button.className = "btn btn-lg btn-danger";

    img1.src = img;
    h4.innerText = title;
    h6.innerText = author;
    p.innerText = description;
    button.innerText = "Remove";

    divB.appendChild(h4);
    divB.appendChild(h6);
    divB.appendChild(p);
    divB.appendChild(button);

    cardH.appendChild(img1);
    cardH.appendChild(divB);
    divCol.appendChild(cardH);
    mainFave.appendChild(divCol);

    button.addEventListener("click", function () {
      for (let x = 0; x < favaoret.length; x++) {
        console.log(favaoret[x].rank);

        if (favaoret[x].rank == favaoret[i].rank) {
          favaoret.splice(favaoret[i], 1);

          mainFave.removeChild(divCol);

          saveFave();

          break;
        }
      }
      alert("Remove from Fave");
    });
  } //for
} //function
