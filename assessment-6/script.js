// Define available routes and travel durations
const routes = [
  ['Tirunelveli','Madurai',2],
  ['Madurai','Tirunelveli',2],
  ['Madurai','Trichy',2],
  ['Trichy','Chennai',3],
  ['Madurai','Coimbatore',3],
  ['Coimbatore','Chennai',3],
  ['Madurai','Salem',3],
  ['Salem','Bangalore',2],
  ['Chennai','Bangalore',2],
  ['Bangalore','Mumbai',3],
  ['Chennai','Mumbai',5],
  ['Coimbatore','Bangalore',3]
];

// Calculate route and display result
function calculateDate() {
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;

  const result = findRoute(start, end);

  if (!result) {
    document.getElementById('output').innerText = "⚠️ Route not found!";
    return;
  }

  const route = result.path.join(' → ');
  const totalDays = result.days;
  const arrival = addBusinessDays(new Date(), totalDays);

  document.getElementById('output').innerText = 
    `📍 Route: ${route}\n🕒 Total Days: ${totalDays}\n📅 Estimated Arrival: ${arrival.toDateString()}`;
}

// Find the shortest route using BFS approach
function findRoute(start, end) {
  let queue = [{ node: start, path: [start], days: 0 }];
  let shortest = null;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.node === end) {
      if (!shortest || current.days < shortest.days) shortest = current;
      continue;
    }

    for (const r of routes) {
      if (r[0] === current.node && !current.path.includes(r[1])) {
        queue.push({
          node: r[1],
          path: [...current.path, r[1]],
          days: current.days + r[2]
        });
      }
    }
  }

  return shortest;
}

// Skip weekends when calculating arrival
function addBusinessDays(date, days) {
  let d = new Date(date);
  while (days > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days--;
  }
  return d;
}
