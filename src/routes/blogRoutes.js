const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// הגדרת כתובת הבסיס של האתר. יש לעדכן לכתובת הדומיין האמיתית שלכם.
const BASE_URL = 'https://www.aloutomation.guru';

// נתיב לתיקייה שמכילה את קבצי המאמרים
const postsDirectory = path.join(__dirname, '../../public/pages', 'posts');

// פונקציה לטעינת המאמרים מהקבצים
const loadBlogPosts = () => {
    try {
        const files = fs.readdirSync(postsDirectory);
        const posts = files
            .filter(file => path.extname(file) === '.js') // מוודא שקוראים רק קבצי JS
            .map(file => {
                const filePath = path.join(postsDirectory, file);
                // מנקה את המטמון כדי לאפשר טעינה מחדש של שינויים בקבצי המאמרים בזמן פיתוח
                delete require.cache[require.resolve(filePath)];
                const post = require(filePath);
                // מוודא שלכל פוסט יש slug URL-friendly
                if (!post.slug) {
                    // פונקציית slugify פשוטה להדגמה. עדיף להגדיר slug ייחודי ידנית בקובץ הפוסט.
                    post.slug = post.title.toLowerCase()
                        .replace(/[^a-z0-9\u0590-\u05FF\s-]/g, '') // שומר על אותיות, מספרים, עברית, רווחים ומקפים
                        .trim().replace(/[\s\W-]+/g, '-');
                }
                // מוודא שה-URL של הפוסט תמיד מצביע לכתובת ה-SEO החדשה
                post.url = `/blog/${post.slug}`;
                return post;
            });
        // ממיין את המאמרים לפי תאריך בסדר יורד (החדש ביותר ראשון)
        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error("שגיאה בטעינת מאמרי הבלוג:", error);
        return []; // מחזיר מערך ריק במקרה של שגיאה
    }
};

const blogPosts = loadBlogPosts();

// נתיב עבור עמוד הבלוג הראשי
router.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages', 'blog.html'));
});

// נתיב API שמחזיר את רשימת המאמרים עבור עמוד הבלוג הראשי
router.get('/api/blog-posts', (req, res) => {
    // Return only the fields needed for the blog list, not the full content
    const postsForList = blogPosts.map(({ id, url, slug, image, category, title, excerpt, author, date }) => ({
        id,
        url,
        slug,
        image,
        category,
        title,
        excerpt,
        author,
        date
    }));
    res.json(postsForList);
});

// נתיב חדש ליצירת sitemap.xml דינאמי
router.get('/sitemap.xml', (req, res) => {
    const staticPages = [
        { url: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
        { url: `${BASE_URL}/about.html`, changefreq: 'monthly', priority: '0.8' },
        { url: `${BASE_URL}/blog`, changefreq: 'weekly', priority: '0.9' },
    ];

    const postUrls = blogPosts.map(post => ({
        url: `${BASE_URL}${post.url}`,
        changefreq: 'yearly',
        priority: '0.7',
        lastmod: post.date 
    }));

    const allUrls = [...staticPages, ...postUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(page => `
    <url>
      <loc>${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    </url>`).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
});

// נתיב חדש וידידותי ל-SEO המציג מאמר בודד באמצעות רינדור בצד השרת
router.get('/blog/:slug', (req, res) => {
    const postSlug = req.params.slug;
    const post = blogPosts.find(p => p.slug === postSlug);
    const postIndex = blogPosts.findIndex(p => p.slug === postSlug);

    if (post) {
        const templatePath = path.join(__dirname, '../../public/pages', 'blog-post.html');
        fs.readFile(templatePath, 'utf8', (err, template) => {
            if (err) {
                console.error("שגיאה בקריאת תבנית המאמר:", err);
                return res.status(500).send("שגיאה בטעינת המאמר.");
            }

            // החלפת placeholders בתוכן המאמר האמיתי
            const pageTitle = `${post.title} - AG Technology`;
            const metaDescription = post.excerpt.replace(/"/g, '&quot;');
            const postDate = new Date(post.date).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
            const canonicalUrl = `${BASE_URL}${post.url}`;

            // מציאת מאמרים קשורים (ללא הנוכחי)
            const relatedPosts = blogPosts.filter(p => p.slug !== postSlug).slice(0, 3);
            const relatedPostsHtml = generateRelatedPostsHtml(relatedPosts);

            // יצירת נתונים מובנים (Structured Data) עבור מנועי חיפוש
            const structuredData = `
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${canonicalUrl}"
              },
              "headline": "${post.title.replace(/"/g, '\\"')}",
              "description": "${metaDescription}",
              "image": "${post.image}",  
              "author": {
                "@type": "Person",
                "name": "${post.author}"
              },  
              "publisher": {
                "@type": "Organization",
                "name": "AG Technology",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${BASE_URL}/assets/logo.png"
                }
              },
              "datePublished": "${post.date}",
              "dateModified": "${post.date}"
            }
            </script>`;

            // יצירת תגי Open Graph ו-Twitter Cards לשיתוף ברשתות חברתיות
            const socialTags = `
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDescription}" />
    <meta property="og:image" content="${post.image}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="AG Technology" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${metaDescription}" />
    <meta name="twitter:image" content="${post.image}" />`;

            const html = template
                .replace(/{{PAGE_TITLE}}/g, pageTitle)
                .replace(/{{META_DESCRIPTION}}/g, metaDescription)
                .replace(/{{CANONICAL_URL}}/g, canonicalUrl)
                .replace('{{STRUCTURED_DATA}}', structuredData) // החלפה חד פעמית
                .replace('{{SOCIAL_TAGS}}', socialTags) // החלפה חד פעמית
                .replace(/{{POST_TITLE}}/g, post.title)
                .replace(/{{POST_CATEGORY}}/g, post.category)
                .replace(/{{POST_AUTHOR}}/g, post.author)
                .replace(/{{POST_DATE}}/g, postDate)
                .replace(/{{POST_IMAGE_SRC}}/g, post.image)
                .replace(/{{POST_IMAGE_ALT}}/g, post.title)
                .replace(/{{POST_CONTENT}}/g, post.content)
                .replace('{{RELATED_POSTS}}', relatedPostsHtml);
            res.send(html);
        });
    } else {
        // מומלץ ליצור קובץ 404.html ייעודי
        res.status(404).send('המאמר לא נמצא');
    }
});

// פונקציית עזר ליצירת HTML עבור מאמרים קשורים
function generateRelatedPostsHtml(relatedPosts) {
    if (!relatedPosts || relatedPosts.length === 0) {
        return '';
    }

    const postsHtml = relatedPosts.map(post => `
        <a href="${post.url}" class="related-post-card">
            <div class="related-post-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="related-post-content">
                <h4 class="related-post-title">${post.title}</h4>
                <span class="related-post-link">קרא עוד...</span>
            </div>
        </a>
    `).join('');

    return `
        <section class="related-posts-section">
            <h3>מאמרים נוספים שיעניינו אותך</h3>
            <div class="related-posts-grid">${postsHtml}</div>
        </section>`;
}

module.exports = router;