const categoriesContainer = document.getElementById("categories-container");
const listOfCategories = document.getElementById("list-of-categories");
const newsNumberCounter = document.getElementById("news-number-counter");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.data.news_category))
  .catch(error => console.log(error));
}
const displayCategories = (categories) => {
  categories.forEach(element => {
    // console.log(element);
    const category = document.createElement("li");
    category.innerText = element.category_name;
    category.addEventListener("click", () => {
      // console.log(element.category_id);
      newsNumberCounter.classList.remove("d-none");
      loader(true);
      loadCategoriesNews(element.category_id);
    })
    listOfCategories.appendChild(category)
  });
}
const loadCategoriesNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
  .then(res => res.json())
  .then(data => displayCategoriesNews(data.data))
  .catch(error => console.log(error));
}
const displayCategoriesNews = news => {
  console.log(news);
  news.sort((a,b )=> b.total_view - a.total_view);
  const showNewsNumber = document.getElementById("news-number");
  showNewsNumber.textContent = `${news.length} items Found!`;
  const displayNews = document.getElementById("display-categories-news");
  displayNews.textContent = "";
  news.forEach(element => {
    console.log(element);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("d-flex");
    newsDiv.classList.add("news");
    newsDiv.innerHTML = `
    <div class="me-4">
        <img src="${element.thumbnail_url}" alt="">
    </div>
    <div class="p-3 d-flex flex-column">
       <div>
       <h3>${element.title}</h3>
       <p>${element.details.slice(0,300)}</p>
       </div>
        <div class="d-flex justify-content-between align-items-center mt-5 align-self-bottom">       
              <div class="d-flex align-items-center">
                  <img class="author-img me-2" src="${element.author.img ? element.author.img : "No image Found"}">
                  <p>${element.author.name ?  element.author.name : "No Author Found"}</p>
              </div>
              <div class="total-view d-flex align-items-center">
                  <i class="fa fa-eye me-3"></i>
                  <p class="m-0">${element.total_view ? element.total_view : "No Views"}</p>
              </div>
              <div class="details-btn">
                <button onclick="loadNewsDetails('${element._id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Show Details</button>
              </div>
       </div>
    </div>`;
  displayNews.appendChild(newsDiv);
  loader(false);
  })
}

// Load News Details By Modal
const loadNewsDetails = news_id => {
  fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
  .then(res => res.json())
  .then(data => displayNewsDetails(data.data[0]))
  .catch(error => console.log(error));
}
const displayNewsDetails = news => {
  console.log(news);
  const modalTitle = document.getElementById("newsDetailsModalLabel");
  const modalDetails = document.getElementById("modal-details");
  const modalAuthor = document.getElementById("author");
  const modalPublishDate = document.getElementById("publish-date");
  const modalImg = document.getElementById("modal-img");
  modalPublishDate.textContent = `Published Date: ${news.author.published_date ? news.author.published_date : "No Author Found!"}`
  modalAuthor.textContent = `Author Name: ${news.author.name ? news.author.name : "No Author Found!"}`;
  modalImg.src = `${news.image_url ? news.image_url : "No image found!"}`;
  modalDetails.textContent = news.details.slice(0,300);
  modalTitle.textContent = news.title;
}


// Spinners Function
const loader = isLoading => {
  const spinners = document.getElementById("loader");
  if(isLoading){
    spinners.classList.remove("d-none");
  } else {
    spinners.classList.add("d-none");
  }
}
loadCategories();