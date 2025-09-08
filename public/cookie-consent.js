document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    const consent = localStorage.getItem('cookie_consent');

    if (!consent) {
        consentBanner.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        consentBanner.style.display = 'none';
        // Add any analytics/tracking script initialization here
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        consentBanner.style.display = 'none';
        // Disable any non-essential cookies here
    });
});