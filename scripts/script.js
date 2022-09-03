// Load Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.data.news_category))
  .catch(error => console.log(error));
}
// Display Categories
const displayCategories = (categories) => {
  const newsNumberCounter = document.getElementById("news-number-counter");
  const listOfCategories = document.getElementById("list-of-categories");
  categories.forEach(element => {
    const category = document.createElement("li");
    category.innerText = element.category_name;
    category.addEventListener("click", (e) => {
      loader(true);
      newsNumberCounter.classList.remove("d-none");
      loadCategoriesNews(element.category_id,e.target);
      // e.target.style.color = "red";
    })
    listOfCategories.appendChild(category);   
  });
}

// Load Categories News
const loadCategoriesNews = (id,targetCategory) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
  .then(res => res.json())
  .then(data => displayCategoriesNews(data.data,targetCategory))
  .catch(error => console.log(error));
}

// Display categories News
const displayCategoriesNews = (news,targetCategory) => {
  news.sort((a,b )=> b.total_view - a.total_view);
  const showNewsNumber = document.getElementById("news-number");
  if(news.length === 0){
    showNewsNumber.textContent = `No items Found for category ${targetCategory.textContent}!`;
  } else {
    showNewsNumber.textContent = `${news.length} items Found for category ${targetCategory.textContent}!`;
  }
 const displayNews = document.getElementById("display-categories-news");
  displayNews.textContent = "";
  news.forEach(element => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("d-flex");
    newsDiv.classList.add("news");
    newsDiv.innerHTML = `
    <div class="">
        <img src="${element.thumbnail_url}" alt="">
    </div>
    <div class="p-3 d-flex flex-column">
       <div>
       <h3>${element.title}</h3>
       <p>${element.details.slice(0,250).concat("...")}</p>
       </div>
        <div class="author-section d-flex justify-content-between align-items-center mt-5 align-self-bottom">       
              <div class="d-flex align-items-center">
                  <img class="author-img me-2 img-fluid" src="${element.author.img ? element.author.img : "No image Found"}">
                  <div class="mt-2">
                  <h5 class="mb-0">${element.author.name ?  element.author.name : "No Author Found"}</h5>
                  <p class="mt-0">${element.author.published_date}</p>
                  </div>
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
// Display News Details By Modal
const displayNewsDetails = news => {
  const modalTitle = document.getElementById("newsDetailsModalLabel");
  const modalDetails = document.getElementById("modal-details");
  const modalAuthor = document.getElementById("author");
  const modalPublishDate = document.getElementById("publish-date");
  const modalImg = document.getElementById("modal-img");
  modalPublishDate.textContent = `Published Date: ${news.author.published_date ? news.author.published_date : "No Author Found!"}`
  modalAuthor.textContent = `Author Name: ${news.author.name ? news.author.name : "No Author Found!"}`;
  modalImg.src = `${news.image_url ? news.image_url : "No image found!"}`;
  modalDetails.textContent = news.details.slice(0,200);
  modalTitle.textContent = news.title;
}

// Spinners Function
const loader =(isLoading) => {
  const spinners = document.getElementById("loader");
  if(isLoading){
    spinners.classList.remove("d-none");
  } else{
    spinners.classList.add("d-none");
  }
}
loadCategories();