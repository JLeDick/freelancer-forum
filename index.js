/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function generateFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

const freelancers = Array.from({ length: NUM_FREELANCERS }, generateFreelancer);

function calculateAverageRate(freelancers) {
  if (freelancers.length === 0) return 0;
  const total = freelancers.reduce(
    (sum, freelancer) => sum + freelancer.rate,
    0,
  );
  return total / freelancers.length;
}

const averageRate = calculateAverageRate(freelancers);

function FreelancerRow(freelancer) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>$${freelancer.rate}</td>
  `;
  return tr;
}

function FreelancerRows(freelancers) {
  const tbody = document.createElement("tbody");
  freelancers.forEach((freelancer) => {
    tbody.appendChild(FreelancerRow(freelancer));
  });
  return tbody;
}

function AverageRate(average) {
  const h2 = document.createElement("h2");
  h2.textContent = `Average Hourly Rate: $${average.toFixed(2)}`;
  return h2;
}

function render() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <div id="average"></div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Hourly Rate</th>
        </tr>
      </thead>
      <tbody id="freelancerRows"></tbody>
    </table>
  `;

  app.querySelector("#average").replaceWith(AverageRate(averageRate));

  app.querySelector("#freelancerRows").replaceWith(FreelancerRows(freelancers));
}

render();
