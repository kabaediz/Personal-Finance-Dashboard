/**
 * Theme Module
 * Handles dark mode toggle and persistence
 */

/**
 * Initialize theme based on user preference or saved setting
 */
export function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Set up theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    // Update charts if they exist
    const chartsModule = document.querySelector('script[src*="charts.js"]');
    if (chartsModule) {
        // Dispatch custom event to update chart themes
        window.dispatchEvent(new Event('themechange'));
    }
}

/**
 * Get current theme
 * @returns {string} 'dark' or 'light'
 */
export function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
