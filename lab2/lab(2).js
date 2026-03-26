var city = "Kathmandu";
let latitude = 27.7017;
let longitude = 85.3206;
const timezone = "Asia/Singapore";

const params = {
  latitude,
  longitude,
  daily: ["temperature_2m_max", "temperature_2m_min", "rain_sum", "snowfall_sum", "windspeed_10m_max", "precipitation_hours"],
  timezone
};

const queryString = new URLSearchParams(params).toString();
const url = `https://api.open-meteo.com/v1/forecast?${queryString}`;

const fetchWeather = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const { daily } = await response.json();
    const { time, temperature_2m_max, temperature_2m_min, rain_sum, snowfall_sum, windspeed_10m_max } = daily;
    return { time, maxTemp: temperature_2m_max, minTemp: temperature_2m_min, rain: rain_sum, snow: snowfall_sum, wind: windspeed_10m_max };
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const getWeekday = dateString => new Date(dateString).toLocaleDateString("en-US", { weekday: "long" });

const getWeatherCondition = (rain, snow, wind) => (rain > 0 ? "Rainy" : snow > 0 ? "Snowy" : wind > 15 ? "Windy" : "Sunny");

const generateWeeklySummary = async () => {
  const dailyData = await fetchWeather();
  if (!dailyData) return;

  const { time, maxTemp, minTemp, rain, snow, wind } = dailyData;

  const weeklySummary = time.map((date, index) => {
    const [max, min, r, s, w] = [Math.round(maxTemp[index]), Math.round(minTemp[index]), rain[index], snow[index], wind[index]];
    return `${getWeekday(date)}: ${max}°C / ${min}°C (${getWeatherCondition(r, s, w)})`;
  });

  console.log("Weekly Weather Summary:");
  console.log(weeklySummary);
};

generateWeeklySummary();

var name = "Ram";
let age = 22;
const country = "Nepal";

console.log("Name:", name);
console.log("Age:", age);
console.log("Country:", country);

age = 23;
console.log("Updated Age:", age);

function greetPerson(personName) {
  return `Hello, ${personName}!`;
}

const multiply = (a, b) => a * b;
const double = x => x * 2;

console.log(greetPerson("Sita"));
console.log("3 * 4 =", multiply(3, 4));
console.log("double(5) =", double(5));

const student = {
  name: "Hari",
  age: 20,
  city: "Kathmandu",
  greet: function() { return `Hi, I am ${this.name}`; }
};

console.log(student.greet());

const scores = [55, 72, 88, 91, 66];
const passed = scores.filter(score => score >= 70);
const increasedScores = scores.map(score => score + 5);
const moreScores = [...scores, 75, 80];

console.log("Original scores:", scores);
console.log("Passed scores:", passed);
console.log("Increased scores:", increasedScores);
console.log("More scores:", moreScores);