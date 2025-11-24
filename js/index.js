const btn = document.querySelector('.toggle-btn');
const rebtn=document.querySelector('.x-btn')
const menu = document.querySelector('#sideMenu');
const nav=document.querySelector('.nav')
const navLinks = document.querySelector('.nav-links');
const btnsearch=document.querySelector('.searchbtn')
const home=document.querySelector('.home')
const pagesearch=document.querySelector('.search')
const mealdetails=document.querySelector('.meal-details')
const categorybtn=document.querySelector('.category-btn')
const pagecategory=document.querySelector('.category')
const btnarea = document.querySelector('.area-btn');
const pagearea = document.querySelector('.area');
const btningred=document.querySelector('.btn-ingred')
const pageingred=document.querySelector('.Ingredients-all')
const btncontact=document.querySelector('.btn-contact')
const pagecontact=document.querySelector('.contact')
var mealList=[]


btn.addEventListener('click', () => {
    menu.classList.add('open');    
    nav.classList.add('show'); 
     btn.classList.add('d-none')
     rebtn.classList.remove('d-none')


    if(menu.classList.contains('open')){
        nav.classList.add('show');
        nav.style.left = "0";
    } 
  
    else {
        nav.classList.remove('show');
        nav.style.left = "-250px";
  }});
rebtn.addEventListener('click',function(){
   
    nav.classList.remove('show');
    nav.style.left = "-250px"; 
  
    menu.classList.remove('open');

    
    rebtn.classList.add('d-none'); 
    btn.classList.remove('d-none');
});




btnsearch.addEventListener('click',function(){
    home.classList.add('d-none');
    pagesearch.classList.remove('d-none')
    mealdetails.classList.add('d-none')
    pagecategory.classList.add('d-none')
 rebtn.classList.add('d-none');
   btn.classList.remove('d-none');
    nav.classList.remove('show');  
        nav.style.left = "-250px";      
    menu.classList.remove('open');

        navLinks.classList.remove('open');
});



categorybtn.addEventListener('click',function(){
      home.classList.add('d-none');
    pagesearch.classList.add('d-none')
    pagearea.classList.add('d-none')
    pageingred.classList.add('d-none')
    mealdetails.classList.add('d-none')
   pagecategory.classList.remove('d-none')
   rebtn.classList.add('d-none');
   btn.classList.remove('d-none');
    nav.classList.remove('show');  
        nav.style.left = "-250px";      
    menu.classList.remove('open');

        navLinks.classList.remove('open');

viewCategory()
   ;})




btnarea.addEventListener('click',function(){
      home.classList.add('d-none');
    pagesearch.classList.add('d-none')
    mealdetails.classList.add('d-none')
   pagecategory.classList.add('d-none')
   pagearea.classList.add('d-none');
   pageingred.classList.add('d-none')
pagearea.classList.remove('d-none');
rebtn.classList.add('d-none');
   btn.classList.remove('d-none');
 nav.classList.remove('show');  
        nav.style.left = "-250px";      
    menu.classList.remove('open');

        navLinks.classList.remove('open');

getArea();
})

btningred.addEventListener('click',function(){
   home.classList.add('d-none');
    pagesearch.classList.add('d-none')
    mealdetails.classList.add('d-none')
   pagecategory.classList.add('d-none')
pagearea.classList.add('d-none');   
pageingred.classList.remove('d-none')
rebtn.classList.add('d-none');

   btn.classList.remove('d-none');
 nav.classList.remove('show');  
        nav.style.left = "-250px";      
    menu.classList.remove('open');

        navLinks.classList.remove('open');
 ingredientsAll(); 
})

btncontact.addEventListener('click',function(){
     home.classList.add('d-none');
    pagesearch.classList.add('d-none')
    mealdetails.classList.add('d-none')
   pagecategory.classList.add('d-none')
pagearea.classList.add('d-none');   
pageingred.classList.add('d-none')
rebtn.classList.add('d-none');
pagecontact.classList.remove('d-none')

   btn.classList.remove('d-none');
 nav.classList.remove('show');  
        nav.style.left = "-250px";      
    menu.classList.remove('open');

        navLinks.classList.remove('open');
})
// home all meals

async function getAllmeals() {

    document.getElementById('loading').classList.replace('d-none','d-flex')
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var data = await res.json();
let meals = data.meals;
    displayFood(meals);
}
getAllmeals()
   document.getElementById('loading').classList.replace('d-flex','d-none')

async function displayFood(meals) {
    var cartona = '';
  
    
     meals.forEach(meal => {   cartona += `
<div class="col-md-3 col-sm-6 mb-4">
    <div class="outer">
        <div onclick="getMealDetails(${meal.idMeal})" class="inner-food rounded-3">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
            <div class="inner-caption text-dark">
                <h2>${meal.strMeal}</h2>
            </div>
        </div>
    </div>
</div>
`;

     });
    
    document.getElementById('rowData').innerHTML = cartona;

}



 
 async function getMealDetails(mealID) {
        document.getElementById('loading').classList.replace('d-none','d-flex')

       var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    var data = await res.json();
    let meal = data.meals[0];
displayMealDetails(meal)
   document.getElementById('loading').classList.replace('d-flex','d-none')

}


async function displayMealDetails(meal){
    document.querySelector('.home').classList.add('d-none')
     document.querySelector('.meal-details').classList.remove('d-none')

    var cartona  = '';

    
        cartona+=` <div class="col-md-4">
    <div class="image-meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded-3">
        <h2>${meal.strMeal}</h2>
    </div>
</div>

<div class="col-md-8">
    <div class="det-meal">
        <h2>Instructions:</h2>
        <p>${meal.strInstructions}</p>
        <h1>Area: ${meal.strArea}</h1>
        <h1>Category :${meal.strCategory}</h1>
    </div>

    <div class="re">
        <h1>Recipes :</h1>
        <ul class="ingredients">
            ${getIngredients(meal)}
        </ul>
        <h1>Tags:</h1>
        <ul class="tags">
            <a href="${meal.strSource}"  class="source " target="_blank"><li>source</li></a>
            <a href="${meal.strYoutube}" class="yout " target="_blank"><li>youtube</li></a>
        </ul>
    </div>
</div>

        `
    document.getElementById('row-det').innerHTML=cartona
}
    

function getIngredients(meal) {
    let list = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return list;
}




// search by name

const searchNameInput = document.getElementById('search-name');
const searchletter=document.getElementById('search-letter')

searchNameInput.addEventListener('keyup', () => {

    
    let query = searchNameInput.value.trim();
    if(query !== '') searchByName(query);
});
searchletter.addEventListener('keyup', () => {
    let query = searchletter.value.trim();
    if(query !== '') searchByLatter(query);
});
async function searchByName(name) {
            document.getElementById('loading').classList.replace('d-none','d-flex')

   var res= await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
   var data= await res.json();
   let meals = data.meals; 
 displaySearchName(meals)
    document.getElementById('loading').classList.replace('d-flex','d-none')

 }
 async function searchByLatter(letter) {
                document.getElementById('loading').classList.replace('d-none','d-flex')

   var res= await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
   var data= await res.json();
   let meals = data.meals; 
 displaySearchName(meals)
    document.getElementById('loading').classList.replace('d-flex','d-none')


 }
 async function displaySearchName(meals) {
    var cartona=''
     
     meals.forEach(meal => {   cartona += `
<div class="col-md-3 col-sm-6 mb-4">
    <div class="outer">
        <div onclick="getMealDetails(${meal.idMeal})" class="inner-food rounded-3">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
            <div class="inner-caption text-dark">
                <h2>${meal.strMeal}</h2>
            </div>
        </div>
    </div>
</div>
`;
 })
document.getElementById('row-search').innerHTML=cartona

}

// category

async function viewCategory() {
                document.getElementById('loading').classList.replace('d-none','d-flex')

    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var data = await res.json();
    var meals = data.categories;

    displayCategory(meals);
    document.getElementById('loading').classList.replace('d-flex','d-none')
}

     function displayCategory(categories) {
         var cartona = ``;

         categories.forEach(cat=> {
           
             let shortDesc = cat.strCategoryDescription.split(' ').slice(0, 20).join(' ');

             cartona += `
             <div class="col-md-3 col-sm-6 ">
                 <div class="outer">
                     <div onclick="filterByCategory('${cat.strCategory}')" class="inner-food rounded-3">
                         <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" class="w-100">
                         <div class="inner-caption text-dark">
                             <h2 class="head-disc">${cat.strCategory}</h2>
                             <p>${shortDesc}</p>  
                         </div>
                     </div>
                 </div>
             </div>
             `;
         });

         document.getElementById('row-cat').innerHTML = cartona;
     }
     
async function filterByCategory(category) {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

    var res= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    var data=await res.json()
    var meals=data.meals
displayMealBycate(meals)
    document.getElementById('loading').classList.replace('d-flex','d-none')

}

function displayMealBycate(meals){
        
 document.querySelector('.category').classList.add('d-none')
 document.querySelector('.filter-categ').classList.remove('d-none')

 var cartona = ``;

 meals.forEach(meal => {
           
     cartona += `
     <div class="col-md-3 col-sm-6 ">
         <div class="outer">
             <div onclick="getMealDetails('${meal.idMeal}')" class="inner-food rounded-3 m-3 d-flex justify-content-center align-items-center">
                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
                 <div class="inner-caption text-dark">
                     <h2 class="head-disc">${meal.strMeal}</h2>
                 </div>
             </div>
         </div>
     </div>
     `;
 });

 document.getElementById('row-filter').innerHTML = cartona;
}

     
async function getMealDetails(mealID) {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

       var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    var data = await res.json();
    let meal = data.meals[0];
displayMealDetails(meal)
    document.getElementById('loading').classList.replace('d-flex','d-none')

}


async function displayMealDetails(meal) {
    document.querySelector('.filter-categ').classList.add('d-none');
    document.querySelector('.meal-details').classList.remove('d-none');

    let cartona = `
    <div class="col-md-4">
        <div class="image-meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded-3" id="meal-img">
            <h2>${meal.strMeal}</h2>
        </div>
    </div>
    <div class="col-md-8">
        <div class="det-meal">
            <h2>Instructions:</h2>
            <p>${meal.strInstructions}</p>
            <h1>Area: ${meal.strArea}</h1>
            <h1>Category :${meal.strCategory}</h1>
        </div>
        <div class="re">
            <h1>Recipes :</h1>
            <ul class="ingredients">
                ${getIngredients(meal)}
            </ul>
            <h1>Tags:</h1>
            <ul class="tags">
                ${meal.strSource ? `<li><a href="${meal.strSource}" target="_blank">Source</a></li>` : ''}
                ${meal.strYoutube ? `<li><a href="${meal.strYoutube}" target="_blank">Youtube</a></li>` : ''}
            </ul>
        </div>
    </div>
    `;

    document.getElementById('row-det').innerHTML = cartona;

}


function getIngredients(meal) {
    let list = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return list;
}









    //  area

    async function getArea() {
                        document.getElementById('loading').classList.replace('d-none','d-flex')

   var res=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      
   var data=await res.json()
 var areas = data.meals;
displayArea(areas);
    document.getElementById('loading').classList.replace('d-flex','d-none')


    }
   
async function displayArea(areas) {
    var cartona = ``;

    areas.forEach(area => {
        cartona += `
        <div class="col-md-3 col-sm-6">
            <div class="outer">
                <div onclick="filterByArea('${area.strArea}')" class="inner-food rounded-3 d-flex flex-column justify-content-center align-items-center">
                    <i class="fa-solid fa-house-laptop text-light"></i>
                    <h2 class="text-light">${area.strArea}</h2>
                </div>
            </div>
        </div>`;
    });

    document.getElementById('row-area').innerHTML = cartona;
}


async function filterByArea(area) {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var data = await res.json();
    var meals = data.meals;
   displayMeals(meals)
  
  
   
}


function displayMeals(meals) {
      document.querySelector('.area').classList.add('d-none')
     document.querySelector('.getmealsarea').classList.remove('d-none')
    var cartona = ``;
    meals.forEach(meal => {
        cartona += `
        <div class="col-md-3 col-sm-6 mb-4">
            <div class="outer">
                <div onclick="infoMealArea('${meal.idMeal}')" class="inner-food rounded-3">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
                    <div class="inner-caption text-dark">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('row-get').innerHTML = cartona;  
}




async function infoMealArea(mealID) {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

       var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    var data = await res.json();
    let meal = data.meals[0];
moreInfo(meal)
    document.getElementById('loading').classList.replace('d-flex','d-none')

}


async function moreInfo(meal){
    document.querySelector('.getmealsarea').classList.add('d-none')
     document.querySelector('.moreinfo').classList.remove('d-none')

    var cartona  = '';

    
        cartona+=` <div class="col-md-4">
    <div class="image-meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded-3">
        <h2 class="text-white" >${meal.strMeal}</h2>
    </div>
</div>

<div class="col-md-8  text-white">
    <div class="det-meal">
        <h2>Instructions:</h2>
        <p>${meal.strInstructions}</p>
        <h1>Area: ${meal.strArea}</h1>
        <h1>Category :${meal.strCategory}</h1>
    </div>

    <div class="re text-white">
        <h1>Recipes :</h1>
        <ul class="ingredients">
            ${getIngredients(meal)}
        </ul>
        <h1>Tags:</h1>
        <ul class="tags">
            <a href="${meal.strSource}"  class="source " target="_blank"><li>source</li></a>
            <a href="${meal.strYoutube}" class="yout " target="_blank"><li>youtube</li></a>
        </ul>
    </div>
</div>

        `
    document.getElementById('row-info').innerHTML=cartona
}
    

function getIngredients(meal) {
    let list = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return list;
}

// ingreda
  async function ingredientsAll() {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

   var res=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   var data=await res.json()
var ingers = data.meals.slice(0,30);
displayIngredients(ingers);
    document.getElementById('loading').classList.replace('d-flex','d-none')


 
  }
  function displayIngredients(ingers){
    
    var cartona = ``;

   ingers.forEach(inger=> {
          let shortDesc = inger.strDescription ? inger.strDescription.split(' ').slice(0, 20).join(' ') : '';
        cartona += `
        <div class="col-md-3 col-sm-6">
           <div onclick="filterByIngredient('${inger.strIngredient}')" class="outer m-4">
                <div class="inner-food rounded-3 d-flex flex-column justify-content-center align-items-center">
                  <i class="fa-solid fa-drumstick-bite fs-1 text-light"></i> 
                    <h2 class="text-light">${inger.strIngredient}</h2>
                 <p class="text-light ">${shortDesc}</p>
                </div>
            </div>
        </div>`;
    });

    document.getElementById('row-inger').innerHTML = cartona;
}
async function filterByIngredient(ingredient) {
                    document.getElementById('loading').classList.replace('d-none','d-flex')

    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    var data = await res.json();
    var meals = data.meals;
   displayMealsByIngred(meals)
          document.getElementById('loading').classList.replace('d-flex','d-none')

  
   
}

 function displayMealsByIngred(meals){
 document.querySelector('.Ingredients-all').classList.add('d-none')
     document.querySelector('.Ingredients-get').classList.remove('d-none')
    var cartona = ``;
    meals.forEach(meal => {
        cartona += `
        <div class="col-md-3 col-sm-6 mb-4">
             <div onclick="ingredDetails('${meal.idMeal}')" class="outer p-3">

                <div class="inner-food rounded-3">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100">
                    <div class="inner-caption text-dark">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('row-ing-get').innerHTML = cartona;  
}



async function ingredDetails(mealID){
                    document.getElementById('loading').classList.replace('d-none','d-flex')

    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    var data = await res.json();
    var meals = data.meals;
    getIngredDetails(meals);
        document.getElementById('loading').classList.replace('d-flex','d-none')

}

function getIngredDetails(meals){
    const meal=meals[0]
    document.querySelector('.Ingredients-get').classList.add('d-none')
    document.querySelector('.Ingredients-all').classList.add('d-none')
      document.querySelector('.Ingredients-info').classList.remove('d-none')
      var cartona=``
       cartona+=` <div class="col-md-4">
    <div class="image-meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded-3">
        <h2 class="text-white" >${meal.strMeal}</h2>
    </div>
</div>

<div class="col-md-8  text-white">
    <div class="det-meal">
        <h2>Instructions:</h2>
        <p>${meal.strInstructions}</p>
        <h1>Area: ${meal.strArea}</h1>
        <h1>Category :${meal.strCategory}</h1>
    </div>

    <div class="re text-white">
        <h1>Recipes :</h1>
        <ul class="ingredients">
            ${getIngredients(meal)}
        </ul>
        <h1>Tags:</h1>
        <ul class="tags">
            <a href="${meal.strSource}"  class="source " target="_blank"><li>source</li></a>
            <a href="${meal.strYoutube}" class="yout " target="_blank"><li>youtube</li></a>
        </ul>
    </div>
</div>

        `
    document.getElementById('ing-info').innerHTML=cartona
}

function getIngredients(meal) {
    let list = "";
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            list += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return list;
}

// contact
const submitBtn = document.getElementById('submitBtn');

function validatInput(p_name) {
  let regex = {
    inputName: /^[A-Za-z]{3,15}$/,
    inputemail: /^\w{1,10}@(gmail|yahoo|hotmail)\.(com|net)$/i,
    inputphone: /^01[0-9]{9}$/,
    inputAge: /^(?:[1-9]|[1-7][0-9]|80)$/,
    inputpassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    inputrepassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
  };

  let box = document.getElementById(p_name.id + "Box");

  if (regex[p_name.id].test(p_name.value)) {
      box.classList.add('d-none');
  } else {
      box.classList.remove('d-none');
  }

  if (p_name.id === "inputrepassword") {
      let password = document.getElementById("inputpassword").value;
      if (p_name.value !== password) {
          box.classList.remove('d-none');
      } else {
          box.classList.add('d-none');
      }
  }

  checkAllInputs();
}

function checkAllInputs() {
  let inputs = document.querySelectorAll('.s');  
  let allValid = true;

  inputs.forEach(input => {
    let box = document.getElementById(input.id + "Box");
    if (!box.classList.contains('d-none') || input.value === '') {
      allValid = false;
    }
  });

  submitBtn.disabled = !allValid;
  submitBtn.classList.toggle('disabled', !allValid);
}
