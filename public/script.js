fetch(`/user/me`)
  .then((res) => res.json())
  .then(({ user }) => {
    console.log(user);
    toggleRightNav(user);
  });

function toggleRightNav(user) {
  let navItem = "";
  let title = "Welcome to Booklet";

  if (user !== undefined) {
    title = `${title}, ${user.name}`;
    navItem = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/logout">Logout</a>
            </li>
            <li class="nav-item">
                <a id="books" onclick="getBooks()" class="nav-link active" aria-current="page">Books</a>
            </li>
        `;
  } else {
    navItem = `
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/login">Login</a>
            </li>
        `;
  }

  document.getElementById("title").innerText = title;
  document.getElementById("right-nav").innerHTML = navItem;

  getBooks();
}

function getBooks() {
  fetch("/books")
    .then((res) => res.json())
    .then(({ books }) => {
      displayBooks(books);
    });
}

function displayBooks(books) {
  for (const book of books) {
    const card = document.createElement("div");
    card.style.width = "18rem";
    card.classList.add("card");

    card.innerHTML = `
    <img class="card-img-top" src=${book.photo} alt=${book.title}>
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <p class="card-text">${book.author}</p>
    </div>
    `;

    document.getElementById("books_container").appendChild(card);
  }
}
