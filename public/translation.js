document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        en: {
            // Global & Common
            'nav_about': 'About',
            'nav_process': 'Our Process',
            'nav_calculator': 'Savings Calculator',
            'nav_articles': 'Articles',
            'nav_contact': 'Contact Us',
            'cta_button': 'Schedule Meeting',
            'footer_copyright': '© 2025 AG Technology. All rights reserved.',
            'footer_privacy': 'Privacy Policy',
            'footer_cookies': 'Cookie Policy',
            'footer_accessibility': 'Accessibility Statement',
            'footer_about_link': 'About',
            'contact_form_name_placeholder': 'Full Name',
            'contact_form_phone_placeholder': 'Phone Number',
            'contact_form_consent': 'I agree to receive marketing content and offers from the company.',
            'success_popup_title': 'Thank you for your submission!',
            'success_popup_text': 'We will contact you within the next 24 hours.',
            'cookie_banner_text': 'We use cookies to improve your browsing experience. For more information, see our <a href="/privacy-policy.html" target="_blank">Privacy Policy</a> and <a href="/cookie-policy.html" target="_blank">Cookie Policy</a>.',
            'cookie_accept': 'Accept',
            'cookie_reject': 'Decline',
            'wait_or_schedule': 'Tired of waiting? Schedule a meeting directly in our calendar.',

            // index.html
            'index_hero_h1': 'Your business chaos is an opportunity.<br>We will turn it into an <span class="highlight">automatic growth engine.</span>',
            'index_hero_p': 'We map manual processes and wasted time, build smart AI and automation systems, and free you to focus on what really matters: growing the business.',
            'index_hero_cta': 'Yes, I want to turn chaos into order (free diagnosis)',
            'index_pain_h2': 'Sound familiar? If so, you are losing money every moment.',
            'index_pain1_h3': 'Wasted Hours, Zero Progress',
            'index_pain1_p': 'Are you and your team wasting hours on repetitive tasks? Updating Excel sheets, copying data, sending emails... This is valuable time that could be invested in growth.',
            'index_pain2_h3': 'Cold Leads, Lost Opportunities',
            'index_pain2_p': 'Are inquiries scattered between emails, WhatsApp, and notes? Every lead that doesn\'t get an immediate response is a potential customer going to your competitors. You are simply leaving money on the table.',
            'index_pain3_h3': 'Guessing Instead of Knowing',
            'index_pain3_p': 'Without data, you\'re flying blind. Which campaign is working? What is the real ROI? Decisions based on "gut feelings" are too expensive a gamble for your business.',
            'index_about_h2': 'We are not just another "software company". We are technological partners for growth.',
            'index_about_p1': 'We understood that technology is not the goal, it\'s the tool. Our expertise is to dive into your business\'s DNA, understand the processes in depth, and design a precise solution that combines automation, AI, and smart integrations to solve your real bottlenecks. We make your business machine efficient, profitable, and one that requires less manual work from you.',
            'index_about_p2': '<strong>Our mission is to free you from the grunt work, so you can focus on what only you can do: think strategically, innovate, and build relationships with your customers.</strong>',
            'index_process_h2': 'Our Methodology: From Surgical Diagnosis to a Profitable Solution',
            'index_process_p': 'A proven two-step process that ensures a solution tailored to your needs, not an "off-the-shelf" one.',
            'index_step1_h3': 'Step 1: 360° Diagnosis (Free of charge)',
            'index_step1_p': 'In a focused work session, we don\'t sell - we diagnose. Together, we will map out the processes in your business, identify the failure points that cause wasted time and money, and formulate an action plan with "golden opportunities" for automation with a quick return on investment.',
            'index_step2_h3': 'Step 2: Build, Implement, and Close Support',
            'index_step2_p': 'We turn the diagnosis into a practical solution. Our team builds and implements the tools that will save you time and increase profits. Click on each service to understand how it works.',
            'index_service_crm': 'CRM & Management Systems',
            'index_service_automation': 'Process Automation',
            'index_service_dashboards': 'Smart Dashboards',
            'index_service_integration': 'System Integration',
            'index_service_chatbots': 'AI Chatbots',
            'popup_crm_title': 'One System for All Customers',
            'popup_crm_desc': 'Stop losing customers in the chaos. We\'ll build you a single system that centralizes all customer information, leads, and sales. You\'ll know exactly what\'s happening with every customer, at any moment, and close more deals.',
            'popup_automation_title': 'The Grunt Work? On Us.',
            'popup_automation_desc': 'Tired of repetitive tasks? We\'ll make the computer do the work for you. Sending emails, updating spreadsheets, transferring data - it will all happen automatically, without errors, while you focus on growth.',
            'popup_dashboards_title': 'Guessing? Start Knowing.',
            'popup_dashboards_desc': 'Instead of guessing, start knowing. We\'ll build you a simple, visual dashboard that displays all your business\'s important data in one place. You\'ll understand what\'s working, what\'s not, and make smart decisions based on real information.',
            'popup_integration_title': 'Connecting All the Dots',
            'popup_integration_desc': 'Your systems don\'t talk to each other? We\'ll connect them. When your email, WhatsApp, website, and customer management system work together, information flows automatically, nothing falls through the cracks, and the business simply runs smoother.',
            'popup_chatbots_title': '24/7 Customer Service, Even in Your Dreams',
            'popup_chatbots_desc': 'Give your customers VIP service around the clock. We\'ll build you a smart chatbot that can answer questions, take inquiries, and even sell - while you\'re asleep. It\'s like hiring a customer service agent who never needs a break.',
            'index_calculator_h2': 'How much money can your business save per year?',
            'index_calculator_p': 'Enter 3 data points and discover your immediate savings potential from automation.',
            'index_calculator_employees': 'Number of employees on manual tasks',
            'index_calculator_hours': 'Wasted weekly hours (per employee)',
            'index_calculator_cost': 'Average hourly cost (in ILS)',
            'index_calculator_button': 'Calculate Annual Savings',
            'index_calculator_result': 'Estimated annual savings:',
            'index_calculator_cta': 'I want to realize these savings',
            'index_tech_h2': 'The Technologies That Drive Us',
            'index_contact_h2': 'The next step is simple, and it\'s free.',
            'index_contact_p': 'In a short, no-obligation diagnosis call, we will identify 3 immediate automation opportunities in your business. You will leave the call with clear insights and practical steps. Leave your details and we will coordinate.',
            'index_contact_cta': 'Yes, I want a free diagnosis call!',
            'index_blog_h2': 'Want to dig deeper?',
            'index_blog_p': 'Visit our <a href="/blog">Knowledge Center</a> and discover professional articles on automation, AI, and business growth.',

            // about.html
            'about_hero_h1': 'Behind every smart system is a deep understanding of your problems.',
            'about_hero_p': 'We didn\'t start AG Technology to build another piece of software. We started it out of an obsession with efficiency and a genuine passion to see businesses like yours break boundaries. We believe the best technology is the one that works quietly in the background, simply allowing you to do more.',
            'about_mission_h2': 'Our Mission: To turn high-tech into your competitive advantage.',
            'about_mission_p': 'Giant corporations invest billions in automation and AI. We believe these tools shouldn\'t be a privilege of the big players alone. Our mission is to distill the world\'s most powerful technologies into practical, accessible, and profitable solutions for businesses like yours, so you can compete - and win.',
            'about_dna_h2': 'Our DNA: 4 principles that guarantee results',
            'about_dna_p': 'We are not just another "software company". We are technological partners for growth. This isn\'t a slogan, it\'s our work methodology, built on 4 core principles.',
            'about_feature1_h3': 'Strategy Before Technology',
            'about_feature1_p': 'Our first question is never "What technology to use?", but "What business problem are we solving?". We dive deep into your processes to design a solution that creates a real impact on the bottom line, not just to use the latest shiny gadget.',
            'about_feature2_h3': 'True Partnership, Not "Hit and Run"',
            'about_feature2_p': 'Your success is our success, simple as that. We don\'t disappear after implementation. We stay by your side to ensure the system works, perform optimizations, and think together about the next step. We invest in long-term relationships because we know that growth is a marathon, not a sprint.',
            'about_feature3_h3': 'Solutions Designed for Humans',
            'about_feature3_p': 'Technology should serve people, not the other way around. We design systems with an intuitive user experience, so that team adoption is quick and smooth. Our goal is for the new tools to feel natural from the very first moment.',
            'about_feature4_h3': 'Proven Business Value',
            'about_feature4_p': 'We don\'t believe in technology for technology\'s sake. Every solution we build is measured by the value it creates for your business: cost savings, increased sales, or a dramatic improvement in efficiency. If you can\'t measure it, we don\'t do it.',
            'about_team_h2': 'Our Driving Force',
            'about_team_p': 'Our technology is smart, but our people are the real secret. We are a diverse team of strategists, developers, and automation experts united around one goal: to crack your challenges.',
            'about_strength1_h3': 'Business Strategists with a Keyboard',
            'about_strength1_p': 'We are not just "developers". We analyze your business\'s DNA, think three steps ahead, and design solutions that not only solve today\'s problem but also build you a competitive advantage for the future.',
            'about_strength2_h3': 'Obsessed with the Small Details',
            'about_strength2_p': 'The devil, and success, are in the details. Our team is obsessed with efficiency, from writing clean code to building automated processes that run flawlessly and do exactly what they are supposed to do.',
            'about_strength3_h3': 'Total Commitment to Your Success',
            'about_strength3_p': 'We don\'t see your project as "just another client". We see your goals and make them our mission. Our team becomes a part of your business, with a full commitment to achieving the results we defined together.',
            'about_management_h2': 'Our Leadership',
            'about_founder_name': 'Alon M.',
            'about_founder_title': 'Founder & CEO',
            'about_founder_bio': 'Alon, a software engineering graduate from the Technion, combines a technological background with a passion for the business world to lead the vision of AG Technology. He advocates an approach where technology is a means to achieve goals, and specializes in cracking complex business challenges through smart and practical automation solutions.',
            'about_game_h2': 'Can you keep up?',
            'about_game_p': 'Try to handle manual tasks under time pressure. Click "Start" and try to "close" as many tasks as possible in 10 seconds.',
            'about_game_start_btn': 'Start Game',
            'about_game_time_left': 'Time Left',
            'about_game_tasks_done': 'Tasks Completed',
            'about_game_end_h3': 'Time\'s up! It\'s hard, right?',
            'about_game_end_p': 'Trying to do everything manually is exhausting and inefficient. But there is a better way.',
            'about_game_automate_btn': 'Automate with AG Tech',
            'about_contact_h2': 'Ready to stop wasting time and start growing?',
            'about_contact_p': 'The first step is a short diagnosis call with us, free of charge and with no obligation. <br>In the call, we will understand together where the "money on the floor" is in your business.',
            'about_contact_cta': 'Yes, I want to schedule a free diagnosis call!',

            // blog.html
            'blog_main_title': 'Our Knowledge Center.',
            'blog_subtitle': 'Articles and updates on technology, AI, and business',
            'blog_filter_category': 'Category:',
            'blog_filter_all': 'All',
            'blog_filter_author': 'Author:',
            'blog_filter_sort': 'Sort by date:',
            'blog_sort_newest': 'Newest to Oldest',
            'blog_sort_oldest': 'Oldest to Newest',
            'blog_total_posts': 'Total articles:',

            // blog-post.html
            'blog_post_by': 'By: {{POST_AUTHOR}}',

            // Legal Pages (Privacy, Cookies, Accessibility)
            'privacy_title': 'Privacy Policy',
            'privacy_last_updated': '<em>Last updated: August 29, 2025</em>',
            'privacy_intro_h2': 'Introduction',
            'privacy_intro_p': 'Welcome to AG Technology. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
            'privacy_collection_h2': 'Collection of Your Information',
            'privacy_collection_p': 'We may collect information about you in a variety of ways. The information we may collect on the Site includes:',
            'privacy_collection_li1_strong': 'Personal Data:',
            'privacy_collection_li1_text': ' Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you contact us through the site.',
            'privacy_collection_li2_strong': 'Usage Data:',
            'privacy_collection_li2_text': ' Information your browser automatically sends whenever you visit the Site, such as your IP address, browser type, internet service provider, referring/exit pages, time stamps, and more.',
            'privacy_collection_li3_strong': 'Cookie Data:',
            'privacy_collection_li3_text': ' We use cookies to track the activity on our Site and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.',
            'privacy_usage_h2': 'Use of Your Information',
            'privacy_usage_p': 'We use the information we collect to:',
            'privacy_usage_li1': 'Provide, operate, and maintain our website',
            'privacy_usage_li2': 'Improve, personalize, and expand our website',
            'privacy_usage_li3': 'Understand and analyze how you use our website',
            'privacy_usage_li4': 'Develop new products, services, features, and functionality',
            'privacy_usage_li5': 'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
            'privacy_usage_li6': 'Send you emails',
            'privacy_usage_li7': 'Find and prevent fraud',
            'privacy_security_h2': 'Security of Your Information',
            'privacy_security_p': 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.',
            'privacy_contact_h2': 'Contact Us',
            'privacy_contact_p': 'If you have questions or comments about this Privacy Policy, please contact us at: info.about.help@gmail.com',

            'cookies_title': 'Cookie Policy',
            'cookies_last_updated': '<em>Last updated: August 29, 2025</em>',
            'cookies_what_h2': 'What Are Cookies?',
            'cookies_what_p': 'Cookies are small text files stored on your browser by websites you visit. They contain information about your browsing on those sites. Cookies can be used for a wide range of purposes, such as recognizing you when you return to a site, remembering your preferences, and displaying personalized content.',
            'cookies_how_h2': 'How We Use Cookies',
            'cookies_how_p': 'We use cookies to enhance your experience on our site. We use the following types of cookies:',
            'cookies_how_li1_strong': 'Essential Cookies:',
            'cookies_how_li1_text': ' These cookies are necessary for the proper functioning of the website. They allow you to navigate the site and use its basic features. Without these cookies, certain services would not be available.',
            'cookies_how_li2_strong': 'Performance and Analytics Cookies:',
            'cookies_how_li2_text': ' These cookies collect information about how visitors use our site, for example, which pages they visit most often. This information is used to improve our site and services.',
            'cookies_how_li3_strong': 'Functionality Cookies:',
            'cookies_how_li3_text': ' These cookies allow the site to remember choices you have made (such as your user name, language, or region) and provide enhanced, more personal features.',
            'cookies_how_li4_strong': 'Advertising Cookies:',
            'cookies_how_li4_text': ' These cookies are used to display more relevant ads to you and your interests. They are also used to limit the number of times you see an ad and to measure the effectiveness of advertising campaigns.',
            'cookies_choices_h2': 'Your Choices Regarding Cookies',
            'cookies_choices_p': 'When you first visit the site, you will be given the option to accept or decline the use of non-essential cookies. You can change your preferences at any time. Additionally, most browsers allow you to control cookies through the browser settings.',
            'cookies_contact_h2': 'Contact Us',
            'cookies_contact_p': 'If you have questions or comments about this Cookie Policy, please contact us at: info.about.help@gmail.com.',

            'access_title': 'Accessibility Statement',
            'access_last_updated': '<em>Last updated: September 3, 2025</em>',
            'access_commitment_h2': 'Our Commitment to Accessibility',
            'access_commitment_p': 'We consider it of utmost importance to make our website accessible to people with disabilities, in order to allow the entire population, including people with disabilities, to browse the site easily and comfortably. The site was built in accordance with the provisions of the Equal Rights for People with Disabilities Law, 1998, and the regulations enacted thereunder.',
            'access_level_h2': 'Accessibility Level on the Site',
            'access_level_p': 'The site has been made accessible to level AA according to the WCAG 2.1 standard. We use technologies that assist in making the site accessible, and among other things, the following adjustments have been made:',
            'access_level_li1_strong': 'Navigation:',
            'access_level_li1_text': ' The site is fully navigable using the keyboard.',
            'access_level_li2_strong': 'Screen Readers:',
            'access_level_li2_text': ' The site is adapted for use with screen reader software.',
            'access_level_li3_strong': 'Display:',
            'access_level_li3_text': ' The site allows for changing the font size, and the colors have been carefully chosen to ensure proper contrast.',
            'access_level_li4_strong': 'Structure:',
            'access_level_li4_text': ' The site has a clear semantic structure with headings, lists, and paragraphs.',
            'access_contact_h2': 'Contact Us',
            'access_contact_p': 'We continue to invest efforts in improving the accessibility of the site. If you have encountered an accessibility problem or have a suggestion for improvement, we would be happy to hear from you. You can contact us by email: info.about.help@gmail.com.',

            // Accessibility Widget
            'acc_widget_title': 'Accessibility Menu',
            'acc_btn_label': 'Open Accessibility Menu',
            'acc_group_content': 'Content',
            'acc_increase_text': 'Increase Text',
            'acc_increase_text_label': 'Increase Text',
            'acc_decrease_text': 'Decrease Text',
            'acc_decrease_text_label': 'Decrease Text',
            'acc_readable_font': 'Readable Font',
            'acc_group_color': 'Color & Contrast',
            'acc_high_contrast': 'High Contrast',
            'acc_negative_contrast': 'Negative Contrast',
            'acc_grayscale': 'Grayscale',
            'acc_group_nav': 'Navigation & Highlights',
            'acc_links_highlight': 'Highlight Links',
            'acc_headings_highlight': 'Highlight Headings',
            'acc_keyboard_nav': 'Keyboard Navigation',
            'acc_reset': 'Reset All Settings',
        },
        he: {
            // Global & Common
            'nav_about': 'אודות',
            'nav_process': 'התהליך שלנו',
            'nav_calculator': 'מחשבון חיסכון',
            'nav_articles': 'מאמרים',
            'nav_contact': 'צור קשר',
            'cta_button': 'קבעו פגישת אבחון',
            'footer_copyright': '© 2025 AG Technology. כל הזכויות שמורות.',
            'footer_privacy': 'מדיניות פרטיות',
            'footer_cookies': 'מדיניות עוגיות',
            'footer_accessibility': 'הצהרת נגישות',
            'footer_about_link': 'אודות',
            'contact_form_name_placeholder': 'שם מלא',
            'contact_form_phone_placeholder': 'מספר טלפון',
            'contact_form_consent': 'אני מאשר/ת קבלת תוכן שיווקי והצעות מהחברה.',
            'success_popup_title': 'תודה על פנייתך!',
            'success_popup_text': 'ניצור איתך קשר ב-24 השעות הקרובות.',
            'cookie_banner_text': 'אנו משתמשים בקובצי Cookie כדי לשפר את חווית הגלישה שלכם. למידע נוסף, עיינו ב<a href="/privacy-policy.html" target="_blank">מדיניות הפרטיות</a> ו-<a href="/cookie-policy.html" target="_blank">מדיניות העוגיות</a> שלנו.',
            'cookie_accept': 'אשר',
            'cookie_reject': 'דחה',
            'wait_or_schedule': 'נמאס לכם לחכות? קבעו פגישה ישירות ביומן שלנו.',

            // index.html
            'index_hero_h1': 'הכאוס בעסק שלכם הוא הזדמנות.<br>אנחנו נהפוך אותו ל<span class="highlight">מנוע צמיחה אוטומטי.</span>',
            'index_hero_p': 'אנחנו ממפים תהליכים ידניים ובזבוז זמן, בונים מערכות AI ואוטומציה חכמות, ומשחררים אתכם להתמקד במה שחשוב באמת: להצמיח את העסק.',
            'index_hero_cta': 'כן, אני רוצה להפוך כאוס לסדר (אבחון חינם)',
            'index_pain_h2': 'נשמע מוכר? אם כן, אתם מאבדים כסף בכל רגע.',
            'index_pain1_h3': 'שעות "שרופות", אפס התקדמות',
            'index_pain1_p': 'אתם והצוות שלכם מבזבזים שעות על משימות שחוזרות על עצמן? עדכון אקסלים, העתקת נתונים, שליחת מיילים... זה זמן יקר שאפשר להשקיע בצמיחה.',
            'index_pain2_h3': 'לידים קרים, הזדמנויות אבודות',
            'index_pain2_p': 'פניות מפוזרות בין מיילים, וואטסאפ ופתקים? כל ליד שלא מקבל מענה מיידי הוא לקוח פוטנציאלי שהולך למתחרים. אתם פשוט משאירים כסף על הרצפה.',
            'index_pain3_h3': 'מנחשים במקום לדעת',
            'index_pain3_p': 'בלי דאטה, אתם טסים על עיוור. איזה קמפיין עובד? מה ה-ROI האמיתי? החלטות שמבוססות על "תחושת בטן" הן הימור יקר מדי לעסק שלכם.',
            'index_about_h2': 'אנחנו לא עוד "חברת תוכנה". אנחנו שותפים טכנולוגיים לצמיחה.',
            'index_about_p1': 'הבנו שטכנולוגיה היא לא המטרה, היא הכלי. המומחיות שלנו היא לצלול ל-DNA של העסק שלכם, להבין את התהליכים לעומק, ולתכנן פתרון מדויק שמשלב אוטומציה, AI ואינטגרציות חכמות כדי לפתור את צווארי הבקבוק האמיתיים שלכם. אנחנו הופכים את המכונה העסקית שלכם ליעילה, רווחית, וכזו שדורשת מכם פחות עבודה ידנית.',
            'index_about_p2': '<strong>המשימה שלנו היא לשחרר אתכם מהעבודה השחורה, כדי שתוכלו להתמקד במה שרק אתם יודעים לעשות: לחשוב אסטרטגית, לחדש, ולבנות קשרים עם הלקוחות.</strong>',
            'index_process_h2': 'המתודולוגיה שלנו: מאבחון כירורגי לפתרון שמייצר רווח',
            'index_process_p': 'תהליך מוכח בשני שלבים שמבטיח פתרון מדויק לצרכים שלכם, ולא "פתרון מדף".',
            'index_step1_h3': 'שלב 1: אבחון 360° (ללא עלות)',
            'index_step1_p': 'בשיחת עבודה ממוקדת, אנחנו לא מוכרים - אנחנו מאבחנים. נמפה יחד את התהליכים בעסק, נזהה את נקודות הכשל שגורמות לבזבוז זמן וכסף, ונגבש תוכנית פעולה עם "הזדמנויות זהב" לאוטומציה בעלת החזר השקעה מהיר.',
            'index_step2_h3': 'שלב 2: בנייה, הטמעה וליווי צמוד',
            'index_step2_p': 'אנחנו הופכים את האבחון לפתרון מעשי. הצוות שלנו בונה ומטמיע את הכלים שיחסכו לכם זמן ויגדילו רווחים. לחצו על כל שירות כדי להבין איך זה עובד.',
            'index_service_crm': 'מערכות CRM וניהול',
            'index_service_automation': 'אוטומציה לתהליכים',
            'index_service_dashboards': 'דאשבורדים חכמים',
            'index_service_integration': 'אינטגרציה בין מערכות',
            'index_service_chatbots': 'צ\'אטבוטים עם AI',
            'popup_crm_title': 'מערכת אחת לכל הלקוחות',
            'popup_crm_desc': 'תפסיקו לאבד לקוחות בבלאגן. נבנה לכם מערכת אחת שמרכזת את כל המידע על הלקוחות, הפניות והמכירות. תדעו בדיוק מה קורה עם כל לקוח, בכל רגע, ותסגרו יותר עסקאות.',
            'popup_automation_title': 'העבודה השחורה? זה עלינו',
            'popup_automation_desc': 'נמאס לכם ממשימות שחוזרות על עצמן? אנחנו נגרום למחשב לעשות את העבודה במקומכם. שליחת מיילים, עדכון טבלאות, העברת נתונים - הכל יקרה אוטומטית, בלי טעויות ובזמן שאתם מתרכזים בצמיחה.',
            'popup_dashboards_title': 'מנחשים? תתחילו לדעת',
            'popup_dashboards_desc': 'במקום לנחש, תתחילו לדעת. נבנה לכם לוח מחוונים ויזואלי ופשוט שמציג את כל הנתונים החשובים של העסק במקום אחד. תבינו מה עובד, מה לא, ותקבלו החלטות חכמות שמבוססות על מידע אמיתי.',
            'popup_integration_title': 'לחבר את כל הנקודות',
            'popup_integration_desc': 'המערכות שלכם לא מדברות אחת עם השנייה? אנחנו נחבר אותן. כשהמייל, הוואטסאפ, האתר ומערכת הלקוחות שלכם עובדים יחד, המידע זורם אוטומטית, שום דבר לא נופל בין הכיסאות, והעסק פשוט עובד חלק יותר.',
            'popup_chatbots_title': 'שירות לקוחות 24/7, גם בחלום',
            'popup_chatbots_desc': 'תנו ללקוחות שלכם שירות VIP מסביב לשעון. נבנה לכם צ\'אטבוט חכם שיודע לענות על שאלות, לקבל פניות ואפילו למכור - גם כשאתם ישנים. זה כמו להעסיק איש שירות לקוחות שלא צריך הפסקות.',
            'index_calculator_h2': 'כמה כסף העסק שלכם יכול לחסוך בשנה?',
            'index_calculator_p': 'הזינו 3 נתונים וגלו את פוטנציאל החיסכון המיידי שלכם מאוטומציה.',
            'index_calculator_employees': 'מספר עובדים במשימות ידניות',
            'index_calculator_hours': 'שעות שבועיות מבוזבזות (לעובד)',
            'index_calculator_cost': 'עלות שעת עבודה ממוצעת (בש"ח)',
            'index_calculator_button': 'חשב חיסכון שנתי',
            'index_calculator_result': 'חיסכון שנתי מוערך:',
            'index_calculator_cta': 'אני רוצה לממש את החיסכון הזה',
            'index_tech_h2': 'הטכנולוגיות שמניעות אותנו',
            'index_contact_h2': 'הצעד הבא פשוט, והוא בחינם.',
            'index_contact_p': 'בשיחת אבחון קצרה וללא התחייבות, נזהה יחד 3 הזדמנויות מיידיות לאוטומציה בעסק שלכם. תצאו מהשיחה עם תובנות ברורות וצעדים פרקטיים. השאירו פרטים ונתאם.',
            'index_contact_cta': 'כן, אני רוצה שיחת אבחון חינם!',
            'index_blog_h2': 'רוצים להעמיק?',
            'index_blog_p': 'בקרו ב<a href="/blog">מרכז הידע שלנו</a> וגלו מאמרים מקצועיים על אוטומציה, AI, וצמיחה עסקית.',

            // about.html
            'about_hero_h1': 'מאחורי כל מערכת חכמה, עומדת הבנה עמוקה של הבעיות שלכם.',
            'about_hero_p': 'לא הקמנו את AG Technology כדי לבנות עוד תוכנה. הקמנו אותה מתוך אובססיה ליעילות ותשוקה אמיתית לראות עסקים כמו שלכם פורצים גבולות. אנחנו מאמינים שהטכנולוגיה הטובה ביותר היא זו שעובדת בשקט ברקע, ופשוט מאפשרת לכם לעשות יותר.',
            'about_mission_h2': 'המשימה שלנו: להפוך טכנולוגיית-על ליתרון התחרותי שלכם.',
            'about_mission_p': 'תאגידי ענק משקיעים מיליארדים באוטומציה ו-AI. אנחנו מאמינים שהכלים האלה לא צריכים להיות פריבילגיה של הגדולים בלבד. המשימה שלנו היא לזקק את הטכנולוגיות החזקות ביותר בעולם לפתרונות פרקטיים, נגישים ורווחיים לעסקים כמו שלכם, כדי שתוכלו להתחרות - ולנצח.',
            'about_dna_h2': 'ה-DNA שלנו: 4 עקרונות שמבטיחים תוצאות',
            'about_dna_p': 'אנחנו לא עוד "חברת תוכנה". אנחנו שותפים טכנולוגיים לצמיחה. זו לא סיסמה, זו מתודולוגיית העבודה שלנו, שבנויה על 4 עקרונות יסוד.',
            'about_feature1_h3': 'אסטרטגיה לפני טכנולוגיה',
            'about_feature1_p': 'השאלה הראשונה שלנו היא אף פעם לא "איזו טכנולוגיה להשתמש?", אלא "מה הבעיה העסקית שאנחנו פותרים?". אנחנו צוללים לעומק התהליכים שלכם כדי לתכנן פתרון שמייצר אימפקט אמיתי על השורה התחתונה, לא רק כדי להשתמש בגאדג\'ט החדש והנוצץ.',
            'about_feature2_h3': 'שותפות אמיתית, לא "זבנג וגמרנו"',
            'about_feature2_p': 'ההצלחה שלכם היא ההצלחה שלנו, פשוט כך. אנחנו לא נעלמים אחרי ההטמעה. אנחנו נשארים לצדכם כדי לוודא שהמערכת עובדת, לבצע אופטימיזציות, ולחשוב יחד על השלב הבא. אנחנו משקיעים בקשרים ארוכי טווח כי אנחנו יודעים שצמיחה היא מרתון, לא ספרינט.',
            'about_feature3_h3': 'פתרונות שנועדו לבני אדם',
            'about_feature3_p': 'טכנולוגיה צריכה לשרת אנשים, לא להפך. אנחנו מתכננים מערכות עם חווית משתמש אינטואיטיבית, כך שההטמעה בצוות תהיה מהירה וחלקה. המטרה שלנו היא שהכלים החדשים ירגישו טבעיים מהרגע הראשון.',
            'about_feature4_h3': 'ערך עסקי מוכח',
            'about_feature4_p': 'אנחנו לא מאמינים בטכנולוגיה לשם הטכנולוגיה. כל פתרון שאנחנו בונים נמדד בערך שהוא מייצר לעסק שלך: חיסכון בעלויות, הגדלת מכירות, או שיפור דרמטי ביעילות. אם אי אפשר למדוד את זה, אנחנו לא עושים את זה.',
            'about_team_h2': 'הכוח המניע שלנו',
            'about_team_p': 'הטכנולוגיה שלנו חכמה, אבל האנשים שלנו הם הסוד האמיתי. אנחנו צוות מגוון של אסטרטגים, מפתחים ומומחי אוטומציה שמאוחדים סביב מטרה אחת: לפצח את האתגרים שלכם.',
            'about_strength1_h3': 'אסטרטגים עסקיים עם מקלדת',
            'about_strength1_p': 'אנחנו לא רק "מפתחים". אנחנו מנתחים את ה-DNA של העסק שלכם, חושבים שלושה צעדים קדימה, ומתכננים פתרונות שלא רק פותרים את הבעיה של היום, אלא בונים לכם יתרון תחרותי לעתיד.',
            'about_strength2_h3': 'אובססיביים לפרטים הקטנים',
            'about_strength2_p': 'השטן, וההצלחה, נמצאים בפרטים הקטנים. הצוות שלנו אובססיבי ליעילות, מכתיבת קוד נקי ועד לבניית תהליכים אוטומטיים שרצים ללא תקלות ועושים בדיוק את מה שהם צריכים לעשות.',
            'about_strength3_h3': 'מחויבות טוטאלית להצלחה שלכם',
            'about_strength3_p': 'אנחנו לא רואים את הפרויקט שלכם כ"עוד לקוח". אנחנו רואים את היעדים שלכם והופכים אותם למשימה שלנו. הצוות שלנו הופך לחלק מהעסק שלכם, עם מחויבות מלאה להשגת התוצאות שהגדרנו יחד.',
            'about_management_h2': 'ההנהגה שלנו',
            'about_founder_name': 'אלון מ.',
            'about_founder_title': 'מייסד ומנכ"ל',
            'about_founder_bio': 'אלון, הנדסאי תוכנה בוגר הטכניון, משלב רקע טכנולוגי עם תשוקה לעולם העסקי כדי להוביל את החזון של AG Technology. הוא דוגל בגישה שטכנולוגיה היא אמצעי להשגת יעדים, ומתמחה בפיצוח אתגרים עסקיים מורכבים באמצעות פתרונות אוטומציה חכמים ופרקטיים.',
            'about_game_h2': 'האם תספיקו לעמוד בקצב?',
            'about_game_p': 'נסו להתמודד עם משימות ידניות תחת לחץ של זמן. לחצו על "התחל" ונסו "לסגור" כמה שיותר משימות ב-10 שניות.',
            'about_game_start_btn': 'התחל משחק',
            'about_game_time_left': 'זמן נותר',
            'about_game_tasks_done': 'משימות שבוצעו',
            'about_game_end_h3': 'נגמר הזמן! זה קשה, נכון?',
            'about_game_end_p': 'לנסות לעשות הכל ידנית זה מתיש ולא יעיל. אבל יש דרך טובה יותר.',
            'about_game_automate_btn': 'הפעל אוטומציה עם AG Tech',
            'about_contact_h2': 'מוכנים להפסיק לבזבז זמן ולהתחיל לצמוח?',
            'about_contact_p': 'השלב הראשון הוא שיחת אבחון קצרה איתנו, ללא עלות וללא התחייבות. <br>בשיחה נבין יחד איפה נמצא הכסף ש"על הרצפה" בעסק שלכם.',
            'about_contact_cta': 'כן, אני רוצה לקבוע שיחת אבחון חינם!',

            // blog.html
            'blog_main_title': 'מרכז הידע שלנו.',
            'blog_subtitle': 'מאמרים ועדכונים על טכנולוגיה, AI ועסקים',
            'blog_filter_category': 'קטגוריה:',
            'blog_filter_all': 'הכל',
            'blog_filter_author': 'מחבר:',
            'blog_filter_sort': 'סדר לפי תאריך:',
            'blog_sort_newest': 'מהחדש לישן',
            'blog_sort_oldest': 'מהישן לחדש',
            'blog_total_posts': 'סה"כ מאמרים:',

            // blog-post.html
            'blog_post_by': 'מאת: {{POST_AUTHOR}}',

            // Legal Pages (Privacy, Cookies, Accessibility)
            'privacy_title': 'מדיניות פרטיות',
            'privacy_last_updated': '<em>תאריך עדכון אחרון: 29 באוגוסט 2025</em>',
            'privacy_intro_h2': 'מבוא',
            'privacy_intro_p': 'ברוכים הבאים ל-AG Technology. אנו מחויבים להגן על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, חושפים ומגנים על המידע שלך כאשר אתה מבקר באתר האינטרנט שלנו. אנא קרא מדיניות פרטיות זו בעיון. אם אינך מסכים לתנאי מדיניות פרטיות זו, אנא אל תיגש לאתר.',
            'privacy_collection_h2': 'איסוף המידע שלך',
            'privacy_collection_p': 'אנו עשויים לאסוף מידע אודותיך במגוון דרכים. המידע שאנו עשויים לאסוף באתר כולל:',
            'privacy_collection_li1_strong': 'מידע אישי:',
            'privacy_collection_li1_text': ' מידע המאפשר זיהוי אישי, כגון שמך, כתובת הדוא"ל ומספר הטלפון שלך, שאתה מספק לנו מרצונך בעת יצירת קשר דרך האתר.',
            'privacy_collection_li2_strong': 'נתוני שימוש:',
            'privacy_collection_li2_text': ' מידע שהדפדפן שלך שולח באופן אוטומטי בכל פעם שאתה מבקר באתר, כגון כתובת ה-IP שלך, סוג הדפדפן, ספק שירותי האינטרנט, דפי הפניה/יציאה, חותמות זמן ועוד.',
            'privacy_collection_li3_strong': 'נתוני עוגיות:',
            'privacy_collection_li3_text': ' אנו משתמשים בעוגיות כדי לעקוב אחר הפעילות באתר שלנו ולאחסן מידע מסוים. אתה יכול להורות לדפדפן שלך לסרב לכל העוגיות או לציין מתי נשלחת עוגייה. עם זאת, אם אינך מקבל עוגיות, ייתכן שלא תוכל להשתמש בחלקים מסוימים של השירות שלנו.',
            'privacy_usage_h2': 'שימוש במידע שלך',
            'privacy_usage_p': 'אנו משתמשים במידע שאנו אוספים כדי:',
            'privacy_usage_li1': 'לספק, לתפעל ולתחזק את האתר שלנו',
            'privacy_usage_li2': 'לשפר, להתאים אישית ולהרחיב את האתר שלנו',
            'privacy_usage_li3': 'להבין ולנתח כיצד אתה משתמש באתר שלנו',
            'privacy_usage_li4': 'לפתח מוצרים, שירותים, תכונות ופונקציונליות חדשים',
            'privacy_usage_li5': 'לתקשר איתך, בין אם ישירות ובין אם באמצעות אחד השותפים שלנו, כולל שירות לקוחות, כדי לספק לך עדכונים ומידע אחר הנוגע לאתר, ולמטרות שיווק וקידום מכירות',
            'privacy_usage_li6': 'לשלוח לך הודעות דוא"ל',
            'privacy_usage_li7': 'למצוא ולמנוע הונאות',
            'privacy_security_h2': 'אבטחת המידע שלך',
            'privacy_security_p': 'אנו משתמשים באמצעי אבטחה אדמיניסטרטיביים, טכניים ופיזיים כדי לסייע בהגנה על המידע האישי שלך. בעוד שנקטנו בצעדים סבירים לאבטחת המידע האישי שאתה מספק לנו, אנא שים לב כי למרות מאמצינו, שום אמצעי אבטחה אינו מושלם או בלתי חדיר, ושום שיטת העברת נתונים אינה יכולה להבטיח מפני כל יירוט או שימוש לרעה אחר.',
            'privacy_contact_h2': 'יצירת קשר',
            'privacy_contact_p': 'אם יש לך שאלות או הערות לגבי מדיניות פרטיות זו, אנא צור איתנו קשר בכתובת: info.about.help@gmail.com',

            'cookies_title': 'מדיניות עוגיות',
            'cookies_last_updated': '<em>תאריך עדכון אחרון: 29 באוגוסט 2025</em>',
            'cookies_what_h2': 'מהן עוגיות?',
            'cookies_what_p': 'עוגיות הן קבצי טקסט קטנים המאוחסנים בדפדפן שלך על ידי אתרי אינטרנט שבהם אתה מבקר. הם מכילים מידע על הגלישה שלך באתרים אלה. קובצי Cookie יכולים לשמש למגוון רחב של מטרות, כגון זיהויך בעת חזרתך לאתר, זכירת העדפותיך והצגת תוכן מותאם אישית.',
            'cookies_how_h2': 'כיצד אנו משתמשים בעוגיות',
            'cookies_how_p': 'אנו משתמשים בעוגיות כדי לשפר את חוויתך באתר שלנו. אנו משתמשים בסוגים הבאים של עוגיות:',
            'cookies_how_li1_strong': 'עוגיות חיוניות:',
            'cookies_how_li1_text': ' עוגיות אלה נחוצות לתפקודו התקין של האתר. הן מאפשרות לך לנווט באתר ולהשתמש בתכונותיו הבסיסיות. ללא עוגיות אלה, שירותים מסוימים לא יהיו זמינים.',
            'cookies_how_li2_strong': 'עוגיות ביצועים ואנליטיקה:',
            'cookies_how_li2_text': ' עוגיות אלה אוספות מידע על האופן שבו מבקרים משתמשים באתר שלנו, למשל, אילו דפים הם מבקרים בתדירות הגבוהה ביותר. מידע זה משמש אותנו לשיפור האתר והשירותים שלנו.',
            'cookies_how_li3_strong': 'עוגיות פונקציונליות:',
            'cookies_how_li3_text': ' עוגיות אלה מאפשרות לאתר לזכור את הבחירות שביצעת (כגון שם משתמש, שפה או אזור) ולספק תכונות משופרות ומותאמות אישית יותר.',
            'cookies_how_li4_strong': 'עוגיות פרסום:',
            'cookies_how_li4_text': ' עוגיות אלה משמשות להצגת מודעות רלוונטיות יותר עבורך ועבור תחומי העניין שלך. הן משמשות גם להגבלת מספר הפעמים שאתה רואה מודעה ולמדידת יעילות מסעות פרסום.',
            'cookies_choices_h2': 'הבחירות שלך לגבי עוגיות',
            'cookies_choices_p': 'בעת ביקורך הראשון באתר, תוצג בפניך האפשרות לקבל או לדחות את השימוש בעוגיות שאינן חיוניות. תוכל לשנות את העדפותיך בכל עת. בנוסף, רוב הדפדפנים מאפשרים לך לשלוט בעוגיות דרך הגדרות הדפדפן.',
            'cookies_contact_h2': 'יצירת קשר',
            'cookies_contact_p': 'אם יש לך שאלות או הערות לגבי מדיניות עוגיות זו, אנא צור איתנו קשר בכתובת: info.about.help@gmail.com.',

            'access_title': 'הצהרת נגישות',
            'access_last_updated': '<em>תאריך עדכון אחרון: 3 בספטמבר 2025</em>',
            'access_commitment_h2': 'התחייבותנו לנגישות',
            'access_commitment_p': 'אנו רואים חשיבות עליונה בהנגשת אתר האינטרנט שלנו לאנשים עם מוגבלויות, על מנת לאפשר לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, לגלוש באתר בקלות ובנוחות. האתר נבנה בהתאם להוראות חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998, והתקנות שהותקנו מכוחו.',
            'access_level_h2': 'רמת הנגישות באתר',
            'access_level_p': 'האתר הונגש לרמה AA על פי תקן WCAG 2.1. אנו משתמשים בטכנולוגיות המסייעות להנגשת האתר, ובין היתר בוצעו ההתאמות הבאות:',
            'access_level_li1_strong': 'ניווט:',
            'access_level_li1_text': ' האתר ניתן לניווט מלא באמצעות המקלדת.',
            'access_level_li2_strong': 'קוראי מסך:',
            'access_level_li2_text': ' האתר מותאם לשימוש עם תוכנות קוראות מסך.',
            'access_level_li3_strong': 'תצוגה:',
            'access_level_li3_text': ' האתר מאפשר שינוי גודל הגופן, והצבעים נבחרו בקפידה כדי להבטיח ניגודיות נאותה.',
            'access_level_li4_strong': 'מבנה:',
            'access_level_li4_text': ' האתר בעל מבנה סמנטי ברור עם כותרות, רשימות ופסקאות.',
            'access_contact_h2': 'יצירת קשר',
            'access_contact_p': 'אנו ממשיכים להשקיע מאמצים בשיפור נגישות האתר. אם נתקלתם בבעיית נגישות או יש לכם הצעה לשיפור, נשמח לשמוע מכם. ניתן ליצור קשר באמצעות דוא"ל: info.about.help@gmail.com.',

            // Accessibility Widget
            'acc_widget_title': 'תפריט נגישות',
            'acc_btn_label': 'פתח תפריט נגישות',
            'acc_group_content': 'תוכן',
            'acc_increase_text': 'הגדל טקסט',
            'acc_increase_text_label': 'הגדל טקסט',
            'acc_decrease_text': 'הקטן טקסט',
            'acc_decrease_text_label': 'הקטן טקסט',
            'acc_readable_font': 'פונט קריא',
            'acc_group_color': 'צבע וניגודיות',
            'acc_high_contrast': 'ניגודיות גבוהה',
            'acc_negative_contrast': 'צבעים הפוכים',
            'acc_grayscale': 'גווני אפור',
            'acc_group_nav': 'ניווט והדגשות',
            'acc_links_highlight': 'הדגשת קישורים',
            'acc_headings_highlight': 'הדגשת כותרות',
            'acc_keyboard_nav': 'ניווט מקלדת',
            'acc_reset': 'אפס את כל ההגדרות',
        }
    };

    const switcher = document.getElementById('language-toggle');
    const he_option = document.querySelector('.lang-option[data-lang="he"]');
    const en_option = document.querySelector('.lang-option[data-lang="en"]');

    window.translations = translations; // Make translations globally accessible

    const applyTranslations = (lang) => {
        // Assuming the site is always initially rendered in Hebrew.
        // This helps us understand the structure of the original text.
        const sourceLang = 'he';

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const attr = el.dataset.langAttr;

            if (translations[lang] && translations[lang][key]) {
                let translation = translations[lang][key];
                const sourceTranslation = translations[sourceLang]?.[key];

                // New logic to handle dynamic content (placeholders).
                // This checks if the original translation string (in Hebrew) contains a placeholder.
                if (sourceTranslation && sourceTranslation.includes('{{')) {
                    const placeholderMatch = sourceTranslation.match(/{{(.*?)}}/);
                    if (placeholderMatch) {
                        const placeholderWithBraces = placeholderMatch[0]; // e.g., '{{POST_AUTHOR}}'
                        const [prefix, suffix] = sourceTranslation.split(placeholderWithBraces);

                        // Extract the dynamic content from the current element's HTML.
                        // This works whether the content is already rendered (e.g., "Alon M.") or is still a placeholder.
                        let dynamicContent = el.innerHTML.trim();
                        if (dynamicContent.startsWith(prefix)) {
                            dynamicContent = dynamicContent.substring(prefix.length);
                        }
                        if (suffix && dynamicContent.endsWith(suffix)) {
                            dynamicContent = dynamicContent.substring(0, dynamicContent.length - suffix.length);
                        }

                        // Re-inject the dynamic content into the new translated string.
                        translation = translation.replace(placeholderWithBraces, dynamicContent.trim());
                    }
                }

                if (attr) {
                    el.setAttribute(attr, translation);
                } else {
                    el.innerHTML = translation;
                }
            }
        });

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

        // Update switcher UI
        if (switcher) {
            switcher.checked = lang === 'en';
        }
        if (he_option && en_option) {
            he_option.classList.toggle('active', lang === 'he');
            en_option.classList.toggle('active', lang === 'en');
        }
    };

    const setLanguage = (lang) => {
        localStorage.setItem('language', lang);
        applyTranslations(lang);
    };

    if (switcher && he_option && en_option) {
        switcher.addEventListener('change', (e) => {
            setLanguage(e.target.checked ? 'en' : 'he');
        });

        he_option.addEventListener('click', () => setLanguage('he'));
        en_option.addEventListener('click', () => setLanguage('en'));
    }


    const currentLang = localStorage.getItem('language') || 'he';
    setLanguage(currentLang);

    // Re-apply translations after a short delay to catch any dynamic content (like the accessibility widget)
    setTimeout(() => applyTranslations(localStorage.getItem('language') || 'he'), 100);
});