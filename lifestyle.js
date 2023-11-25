
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '1de734fa62544877aaf3b0c97662c43d';
    // const LIFESTYLE_NEWS = `https://newsapi.org/v2/top-headlines?country=sa&apiKey=${apiKey}`;
    const LIFESTYLE_NEWS = `https://newsapi.org/v2/everything?q=lifestyle&apiKey=${apiKey}`;

    fetch(LIFESTYLE_NEWS, {
        method: 'GET',
        headers: {
            // Remove 'Content-Type' header for a simple GET request
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // console.log('News data:', data);
        if (data.articles) {
            displayNews(data.articles);
        } else {
            throw new Error('Unexpected API response format');
        }
    })
    .catch(error => console.error('Error fetching news:', error));

    function displayNews(articles) {
        const newsSection = document.getElementById('lifestyle-section');

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');

            // Customize the content based on your needs
            articleElement.innerHTML = `
                <div class="card" >
                    <img style="margin:10px; width: 18rem;" src="${article.urlToImage || './image/NewsAppLogo.png'}" class="card-img-top" alt="News Photo">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text"><strong>Description: </strong> ${article.description}</p>
                        <p class="card-text"><strong>Author:</strong> ${article.author || 'Not available'}</p>
                        <p class="card-text"><strong>Publish Date:</strong> ${new Date(article.publishedAt).toLocaleString()}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                    </div>
                </div>
            `;

            newsSection.appendChild(articleElement);
        });
    }
});
