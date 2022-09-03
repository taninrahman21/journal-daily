const blogsContainer = document.getElementById("blogs-container");
const firstBlogTitle = document.getElementById("first-blog-title");
const secondBlogTitle = document.getElementById("second-blog-title");
const thirdBlogTitle = document.getElementById("third-blog-title");
const firstBlogPara = document.getElementById("first-blog-para");
const secondBlogPara = document.getElementById("second-blog-para");
const thirdBlogPara = document.getElementById("third-blog-para");

firstBlogTitle.textContent = "Difference between var, let, and const?";
firstBlogPara.textContent = "Var variable can be re-declared and updated.But let variable can not be re-declared but can be updated.and const is constant this can't be change.The scope of a var variable is functional scope. The scope of a let variable is block scope. The scope of a const variable is block scope. It can be updated and re-declared into the scope.";

secondBlogTitle.textContent = "What is defference between Arrow Function and Regular Function?";
secondBlogPara.textContent = "Unlike regular functions, arrow functions do not have their own this . The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.it's also called anonymous function.";

thirdBlogTitle.textContent = "What is Difference map(), forEach(), filter(), find()?";
thirdBlogPara.textContent = "The forEach() method does not create a new array based on the given array. The map() method creates an entirely new array. The forEach() method returns “undefined“. The map() method returns the newly created array according to the provided callback function.The Filter method give a new array with the matching conditions.and The Find method gives only the first matched element of an array.Find method does not returns an array it returns a value.";