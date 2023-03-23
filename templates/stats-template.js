// Template for events stats
function defineEventsStatisticsTable(stats) {
  return `
		<table>
			<thead>
				<tr>
					<th>Event with the highest percentage of attendance</th>
					<th>Event with the lowest percentage of attendance</th>
					<th>Event with larger capacity</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div class="d-flex flex-column flex-wrap">
							<span class="event-name">${stats.highestPctAttendanceEvent.name}</span>
							<span class="event-people">${stats.highestPctAttendanceEvent.assistance.toLocaleString("en-US")} people </span>
							<span> ${stats.highestPctAttendanceEvent.pctAttendance} %</span>
						</div>
					</td>
					<td>
						<div class="d-flex flex-column">
							<span class="event-name">${stats.lowestPctAttendanceEvent.name}</span>
							<span class="event-people">${stats.lowestPctAttendanceEvent.assistance.toLocaleString("en-US")} people </span>
							<span> ${stats.lowestPctAttendanceEvent.pctAttendance} %</span>
						</div>
					</td>
					<td>
						<div class="d-flex flex-column">
							<span class="event-name">${stats.largerCapacityEvent.name}</span>
							<span class="event-people">${stats.largerCapacityEvent.capacity.toLocaleString("en-US")} people</span>
							<span>&nbsp;</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	`;
}

function defineEventsStatsByCategory(stats) {
  let template = `
		<table>
			<thead>
				<tr>
					<th>Categories</th>
					<th>Revenues</th>
					<th>Percentage of attendance</th>
				</tr>
			</thead>
			<tbody>
		`;

  for (let categoryData of stats) {
    template += `
				<tr>
					<td>${categoryData.category}</td>
					<td>$ ${categoryData.revenue.toLocaleString("en-US")}</td>  
					<td>${categoryData.attendancePct} %</td>
				</tr>
		`;
  }

  template += `
			</tbody>
		</table>
		`;
  return template;
}
