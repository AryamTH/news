



const homeBtn =document.getElementById("Home");
const BusinessBtn =document.getElementById("Business");
const generalBtn =document.getElementById("Lifestyle");
const sportsn =document.getElementById("Sports");
const searchBtn =document.getElementById("SearchBtn");
const newsQuery = document.getElementById("newsQuery");
const newstype = document.getElementById("newstype");
const newsdetails=document.getElementById("newsdetails");
//array 
var newsDataArr =[];

//apis 
const API_KEY="1de734fa62544877aaf3b0c97662c43d";
const HEADLINES_NEWS="https://newsapi.org/v2/top-headlines?country=sa&apiKey=1de734fa62544877aaf3b0c97662c43d";
const BUSINESS_NEWS="https://newsapi.org/v2/top-headlines?country=sa&category=business&apiKey=1de734fa62544877aaf3b0c97662c43d";
const GENERAL_NEWS="https://newsapi.org/v2/top-headlines?country=sa&category=general&apiKey=1de734fa62544877aaf3b0c97662c43d";
const SPORTS_NEWS="https://newsapi.org/v2/top-headlines?country=sa&category=sports&apiKey=1de734fa62544877aaf3b0c97662c43d";
const SEARC_NEWS =" https://newsapi.org/v2/everything?q=bitcoin&apiKey=1de734fa62544877aaf3b0c97662c43d";


window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};









homeBtn.addEventListener("click",function(){
    console.log('hello');
});

BusniessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
  fetchBusinessNews();
});

generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General news</h4>";
    fetchgeneralNews();


});

sportsn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
    
});
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchgeneralNews = async () => {
    const responce = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr =[];
    if(responce.status >=200 && responce.status <300){

        const myJson= await responce.json();
        newsDataArr = myJson;
    } else {
        //handle errors 
    }
    displayNews();
}
const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}
const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}
const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}
function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}
