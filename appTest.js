let url =
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=kG3GLir6FB4I4rE6iEJlF6U9LyyJenAH";

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
          div.innerHTML = `
            
            <div class="col">
              <div class="card h-100">
                <img src='${img}' class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title" id='title'> <b> ${title} </b> </h4>
                  <h6 class="card-author" id='author'> <i>Author: ${author}</i></h6>
                  <p class="card-text">${description}</p>
                  <button type="button" class="btn btn-lg btn-success" id='add-to-fave'${btn} >Add To Favaoret</button>
                </div>
              </div>
            </div>
            </div>
            `;
          main.appendChild(div);
        }

        function addToFave() {
          console.log("click");
        }
      });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });
