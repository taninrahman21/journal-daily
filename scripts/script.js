const categoriesContainer = document.getElementById("categories-container");
const listOfCategories = document.getElementById("list-of-categories");

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
  const displayNews = document.getElementById("display-categories-news");
  displayNews.textContent = "";
  news.forEach(element => {
    // console.log(element);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("d-flex");
    newsDiv.classList.add("news");
    newsDiv.innerHTML = `
    <div class="me-4">
        <img src="${element.thumbnail_url}" alt="">
    </div>
    <div class="p-3">
        <h3>${element.title}</h3>
        <p class="news-details">${element.details}</p>
        
    </div>`;
  displayNews.appendChild(newsDiv);
  })
}
loadCategories();