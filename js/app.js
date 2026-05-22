let articles = [];
let categories = [];

let selectedCategory = "All";
let searchText = "";


// Load JSON
async function loadData() {

    try {

        categories = await fetch(
            "data/categories.json"
        ).then(res => res.json());

        articles = await fetch(
            "data/articles.json"
        ).then(res => res.json());

        renderCategories();

        applyFilters();

    }

    catch(err){

        console.log(err);

    }

}



// Category Menu
function renderCategories(){

let menu =
document.getElementById(
"categoryMenu"
);

menu.innerHTML='';

let allBtn=
createCategoryButton(
"All"
);

allBtn.classList.add(
"active"
);

menu.appendChild(
allBtn
);


categories.forEach(cat=>{

menu.appendChild(

createCategoryButton(
cat.name
)

);

});

}


// Create Category Button
function createCategoryButton(name){

let btn=
document.createElement(
"button"
);

btn.className=
"category-btn";

btn.innerText=
name;


btn.onclick=()=>{

selectedCategory=
name;


//remove old active

document
.querySelectorAll(
".category-btn"
)
.forEach(btn=>{

btn.classList.remove(
"active"
);

});


btn.classList.add(
"active"
);


applyFilters();

};


return btn;

}



// Apply Search + Category together
function applyFilters(){


let filtered=
articles.filter(article=>{


let categoryMatch=

selectedCategory==="All"

||

article.category===selectedCategory;



let keywordMatch=

(article.title || '')
.toLowerCase()
.includes(
searchText
)

||

(article.description || '')
.toLowerCase()
.includes(
searchText
)

||

(article.content || '')
.toLowerCase()
.includes(
searchText
)

||

(article.category || '')
.toLowerCase()
.includes(
searchText
);



return categoryMatch
&&
keywordMatch;


});


renderArticles(
filtered
);


if(filtered.length>0){

showArticle(
filtered[0].id
);

}
else{

document
.getElementById(
"articleDetail"
)

.innerHTML=`

<div class="empty">

<h2>
No Articles Found
</h2>

</div>

`;

}

}



// Render cards
function renderArticles(data){

let container=
document.getElementById(
"articlesContainer"
);

container.innerHTML='';


data.forEach(article=>{


container.innerHTML += `

<div
class="card"
onclick="showArticle(${article.id})">

<h3>

${article.title}

</h3>

<p>

${article.description}

</p>

<div class="meta">

${article.date}

</div>

</div>

`;

});


}




// Show article right side
function showArticle(id){


let article=

articles.find(
a=>a.id==id
);


if(!article) return;


document
.getElementById(
"articleDetail"
)

.innerHTML=`


<h1 class="article-title">

${article.title}

</h1>


<div class="article-meta">

<b>Category:</b>

${article.category}

|

<b>Author:</b>

${article.author}

|

<b>Date:</b>

${article.date}

</div>


<div class="article-content">

${article.content || article.description}

</div>

`;

}



// Search event
document
.getElementById(
"searchBox"
)

.addEventListener(
"keyup",
function(){

searchText=
this.value
.toLowerCase();

applyFilters();

}
);




// Expand reader
document
.getElementById(
"expandBtn"
)

.addEventListener(
"click",
()=>{

document
.getElementById(
"rightPanel"
)

.classList.toggle(
"fullscreen"
);

});



loadData();