function calculateAge1() {
  const resultContainer = document.getElementById("result-container");
  const yearAgeResult = document.getElementById("yearResult");
  const monthAgeResult = document.getElementById("monthResult");
  const dayAgeResult = document.getElementById("dayResult");
  const birthdayToday = document.getElementById("birthdayToday");
  const wrongDate = document.getElementById("wrongDate");
  // Get user input
  const year = parseInt(document.getElementById("year").value);
  const month = parseInt(document.getElementById("month").value);
  const day = parseInt(document.getElementById("day").value);

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Check for invalid input
  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    year < 1950 ||
    year > currentYear ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    wrongDate.innerHTML = "Please enter a valid date of birth.";
    wrongDate.classList.remove("d-none");
    resultContainer.classList.add("d-none");
    birthdayToday.classList.add("d-none");

    return;
  } else {
    wrongDate.classList.add("d-none");
    resultContainer.classList.remove("d-none");
  }

  // Calculate age in years
  let ageYears = currentYear - year;

  // Calculate remaining months and days considering leap years
  let ageMonths = currentMonth - month;
  let ageDays = currentDay - day;

  if (ageDays < 0) {
    ageMonths--; // Adjust months if days are negative
    ageDays += new Date(currentYear, currentMonth, 0).getDate(); // Add days of the previous month
  }

  if (ageMonths < 0) {
    ageYears--; // Adjust years if months are negative
    ageMonths += 12; // Add 12 months to adjust
  }

  // Display the result

  function knowTheNumbers(number, unit) {
    return number > 1 ? `${unit}s` : unit;
  }
  if (currentMonth === month && currentDay === day) {
    yearAgeResult.innerHTML = `${ageYears} <span>${knowTheNumbers(
      ageYears,
      "Year"
    )}</span>`;
    monthAgeResult.innerHTML = `${ageMonths} <span> ${knowTheNumbers(
      ageMonths,
      "Month"
    )}</span>`;
    dayAgeResult.innerHTML = `${ageDays} <span>${knowTheNumbers(
      ageDays,
      "Day"
    )}</span>`;
    birthdayToday.classList.remove("d-none");

    birthdayToday.innerHTML = `Your birthday is today<br> Happy birthday to you!`;
    confetti({
      particleCount: 950, // Number of confetti particles
      spread: 280, // Spread of the confetti
      origin: { y: 0.5 }, // Origin of the confetti (0.6 = from the top)
      sizes: [60, 80], // Sizes of the confetti particles
    });
  } else {
    birthdayToday.classList.add("d-none");
    yearAgeResult.innerHTML = `${ageYears} <span>${knowTheNumbers(
      ageYears,
      "Year"
    )}</span>`;
    monthAgeResult.innerHTML = `${ageMonths} <span> ${knowTheNumbers(
      ageMonths,
      "Month"
    )}</span>`;
    dayAgeResult.innerHTML = `${ageDays} <span>${knowTheNumbers(
      ageDays,
      "Day"
    )}</span>`;
  }
}
