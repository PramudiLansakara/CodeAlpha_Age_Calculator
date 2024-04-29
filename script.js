const ageCalculateUptoToday = () => {

    document.getElementById("GeneratedTxt1").textContent = "";
    const today = new Date();
    const inputDate = new Date(document.getElementById("date1-input1").value);
  
    const birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
  
    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
      document.getElementById("GeneratedTxt1").textContent =
        "Birthdate can not be a future date";
      displayResult1("-", "-", "-");
      return;
    }
  
    if (isNaN(inputDate.getTime())) {
      document.getElementById("GeneratedTxt1").textContent =
        "Please enter a date.";
      displayResult1("-", "-", "-");
      return;
    }
  
    const { years, months, days } = calculateAgeUptoToday(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
    );
  
    displayResult1(days, months, years);
};

const ageCalculateBetweenGivenDays = () => {
  document.getElementById("GeneratedTxt2").textContent = "";
  document.getElementById("GeneratedTxt3").textContent = "";

  const startDate = new Date(document.getElementById("date1-input2").value);
  const endDate = new Date(document.getElementById("date2-input2").value);

  if(isNaN(startDate.getTime()) && isNaN(endDate.getTime())){
    document.getElementById("GeneratedTxt2").textContent = "Please enter a valid date.";
    document.getElementById("GeneratedTxt3").textContent = "Please enter a valid date.";
    displayResult2("-", "-", "-");
    return;
  }else if(isNaN(startDate.getTime())){
    document.getElementById("GeneratedTxt2").textContent = "Please enter a date.";
    displayResult2("-", "-", "-");
    return;
  }else if(isNaN(endDate.getTime())){
    document.getElementById("GeneratedTxt3").textContent = "Please enter a date.";
    displayResult2("-", "-", "-");
    return;
  }

  if (startDate > endDate) {
      document.getElementById("GeneratedTxt2").textContent = "Start date cannot be greater than end date";
      displayResult2("-", "-", "-");
      return;
  }

  const { years, months, days } = calculateAgeBetweenGivenDates(startDate, endDate);

  displayResult2(days, months, years);
};
  
const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDate)))
  );
};
  
const calculateAgeUptoToday = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months, days;
  
  if (currentMonth < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDetails.month;
  }
  
  if (currentDate < birthDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
    days = daysInLastMonth - (birthDetails.date - currentDate);
  } else {
    days = currentDate - birthDetails.date;
  }
  return { years, months, days };
};

const calculateAgeBetweenGivenDates = (startDate, endDate) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += (months < 0 ? 12 : 0);
  }

  if (days < 0) {
      const prevMonthLastDay = getDaysInMonth(endMonth, endYear);
      days = prevMonthLastDay - startDay + endDay;
      months--;
  }

  if (startMonth <= 1 && endMonth > 1 && isLeapYear(startYear)) {
      days++;
  }

  return { years, months, days };
};


const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
  
const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return getDaysInMonth[month - 1];
};
  
const displayResult1 = (bdate, bMonth, bYear) => {
  document.getElementById("years-output1").textContent = bYear;
  document.getElementById("months-output1").textContent = bMonth;
  document.getElementById("days-output1").textContent = bdate;
};

const displayResult2 = (bdate, bMonth, bYear) => {
  document.getElementById("years-output2").textContent = bYear;
  document.getElementById("months-output2").textContent = bMonth;
  document.getElementById("days-output2").textContent = bdate;
};

const resetFields1 = () => {
  document.getElementById("date1-input1").value = "";
  document.getElementById("GeneratedTxt1").textContent = "";
  displayResult1("-", "-", "-");
};

const resetFields2 = () => {
  document.getElementById("date1-input2").value = "";
  document.getElementById("date2-input2").value = "";
  document.getElementById("GeneratedTxt2").textContent = "";
  document.getElementById("GeneratedTxt3").textContent = "";
  displayResult2("-", "-", "-");
};

document.getElementById("reset-btn1").addEventListener("click", resetFields1);
document.getElementById("reset-btn2").addEventListener("click", resetFields2);
  
  
document.getElementById("calc-age-btn1").addEventListener("click", ageCalculateUptoToday);
document.getElementById("calc-age-btn2").addEventListener("click", ageCalculateBetweenGivenDays);


