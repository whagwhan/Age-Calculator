function calculateAge() {
  const dobInput = document.getElementById('dobInput').value;
  const dob = parseDateFromInput(dobInput);

  if (dob !== null) {
    const now = new Date();
    const ageInMilliseconds = now - dob;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    const ageYears = Math.floor(ageInYears);
    const ageMonths = Math.floor((ageInYears - ageYears) * 12);

    document.getElementById('result').innerText = `Your age is ${ageYears} years and ${ageMonths} months.`;
  } else {
    document.getElementById('result').innerText = "Invalid date format. Please enter in the format ddmmyyyy or dd(mmm)yyyy or use the 'Paste from Clipboard' button.";
  }
}

function parseDateFromInput(input) {
  let dob = null;

  // Try parsing with ddmmyyyy format
  if (/^\d{8}$/.test(input)) {
    const day = parseInt(input.substr(0, 2), 10);
    const month = parseInt(input.substr(2, 2)) - 1;
    const year = parseInt(input.substr(4, 4), 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      dob = new Date(year, month, day);
    }
  }

  // Try parsing with dd-mmm-yyyy format
  if (!dob) {
    const dateRegex = /^(\d{2})-([a-zA-Z]{3})-(\d{4})$/;
    const matches = input.match(dateRegex);

    if (matches) {
      const monthNames = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
        "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
      };

      const day = parseInt(matches[1], 10);
      const month = monthNames[matches[2]];
      const year = parseInt(matches[3], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        dob = new Date(year, month, day);
      }
    }
  }

  return dob;
}

function checkEnterKey(event) {
  if (event.keyCode === 13) {
    calculateAge();
  }
}

function pasteFromClipboard() {
  navigator.clipboard.readText().then(text => {
    document.getElementById('dobInput').value = text;
    calculateAge();
  }).catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
}
