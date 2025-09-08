document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog-posts-container');
    const categoryFilter = document.getElementById('category-filter');
    const authorFilter = document.getElementById('author-filter');
    const dateSort = document.getElementById('date-sort');
    const postCountElement = document.getElementById('post-count-number');

    let allPosts = [];

    // Fetch blog posts from the server
    fetch('/api/blog-posts')
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;
            populateFilters(allPosts);
            displayPosts(allPosts);
        })
        .catch(error => console.error('Error fetching blog posts:', error));

    // Populate filter dropdowns
    function populateFilters(posts) {
        const categories = [...new Set(posts.map(post => post.category))];
        const authors = [...new Set(posts.map(post => post.author))];

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorFilter.appendChild(option);
        });
    }

    // Display blog posts
    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        postCountElement.textContent = posts.length;

        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('a');
            postElement.href = post.url;
            postElement.classList.add('blog-post-card');

            postElement.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <span class="post-category">${post.category}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <span>מאת: ${post.author}</span> | <span>${new Date(post.date).toLocaleDateString('he-IL')}</span>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Filter and sort posts
    function filterAndSortPosts() {
        let filteredPosts = [...allPosts];

        // Filter by category
        if (categoryFilter.value !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.category === categoryFilter.value);
        }

        // Filter by author
        if (authorFilter.value !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.author === authorFilter.value);
        }

        // Sort by date
        if (dateSort.value === 'newest') {
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        displayPosts(filteredPosts);
    }

    // Event listeners for filters
    categoryFilter.addEventListener('change', filterAndSortPosts);
    authorFilter.addEventListener('change', filterAndSortPosts);
    dateSort.addEventListener('change', filterAndSortPosts);
});