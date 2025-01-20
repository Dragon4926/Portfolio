const themeToggle = document.getElementById('theme-toggle');
const themeText = themeToggle.querySelector('.theme-text');
const root = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update button text
    if (theme === 'dark') {
        themeText.innerHTML = '☀️ Light';
    } else {
        themeText.innerHTML = '🌙 Dark';
    }
    
    // Update Three.js snow color if it exists
    if (typeof particles !== 'undefined') {
        particles.material.color.setHex(theme === 'dark' ? 0xffffff : 0x333333);
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});