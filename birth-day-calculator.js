// 1. Cache the DOM elements once when the page loads
const dayInputEl = document.getElementById('day');
const monthInputEl = document.getElementById('month');
const yearInputEl = document.getElementById('year');
const errorMsg = document.getElementById('error-msg');
const resultContainer = document.getElementById('result-container');
const resultDay = document.getElementById('result-day');
const calculateBtn = document.getElementById('calculate-btn');

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// 2. The calculation function
function calculateDay() {
    // Read the current values from the cached elements
    const day = parseInt(dayInputEl.value, 10);
    const month = parseInt(monthInputEl.value, 10);
    const year = parseInt(yearInputEl.value, 10);

    // Reset UI
    errorMsg.classList.add('hidden');
    resultContainer.classList.add('hidden');
    resultContainer.classList.remove('animate-pop');

    // Basic validation
    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12) {
        showError("Please enter valid numbers for Day, Month, and Year.");
        return;
    }

    // JS Date calculation
    const dateObj = new Date(year, month - 1, day);

    // Strict validation (prevents Feb 30th rolling over to March)
    if (dateObj.getDate() !== day || dateObj.getMonth() !== (month - 1) || dateObj.getFullYear() !== year) {
        showError("That date doesn't exist on the calendar.");
        return;
    }

    // Update UI with result
    const dayIndex = dateObj.getDay();
    resultDay.textContent = daysOfWeek[dayIndex];
    
    void resultContainer.offsetWidth; // Trigger reflow for animation
    
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('animate-pop');
}

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
}

// 3. Attach the event listener to the button (modern approach)
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateDay);
}