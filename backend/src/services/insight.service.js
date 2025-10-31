const db = require('../db');

function getRawAggregates() {
  const totalOpen = db.prepare(`SELECT COUNT(*) AS cnt FROM tasks WHERE status = 'Open'`).get().cnt;
  const byPriority = db.prepare(`
    SELECT priority, COUNT(*) AS cnt
    FROM tasks
    GROUP BY priority
  `).all();
  const dueSoonCount = db.prepare(`
    SELECT COUNT(*) AS cnt FROM tasks
    WHERE date(due_date) <= date('now', '+3 day') AND status != 'Done'
  `).get().cnt;

  const priorityDistribution = { Low: 0, Medium: 0, High: 0 };
  byPriority.forEach(r => { priorityDistribution[r.priority] = r.cnt; });

  return { totalOpen, priorityDistribution, dueSoonCount };
}

function generateInsightString({ totalOpen, priorityDistribution, dueSoonCount }) {
  const total = totalOpen;
  const totalPriority = priorityDistribution.Low + priorityDistribution.Medium + priorityDistribution.High;
  
  let dominant = 'Medium';
  const priorities = Object.entries(priorityDistribution);
  const maxPair = priorities.reduce((a,b) => (b[1] > a[1] ? b : a), ['Medium', priorityDistribution.Medium]);
  if (maxPair[1] > 0) dominant = maxPair[0];

  let s = `You have ${total} open task${total !== 1 ? 's' : ''}.`;
  if (dueSoonCount > 0) s += ` ${dueSoonCount} ${dueSoonCount === 1 ? 'is' : 'are'} due within 3 days.`;
  if (total > 0) s += ` Most tasks are ${dominant} priority.`;
  if (total > 10) s += ` Workload looks heavy — consider prioritizing or delegating.`;
  return s;
}

function getInsightsHandler(req, res) {
  try {
    const aggregates = getRawAggregates();
    const summary = generateInsightString(aggregates);
    return res.json({ aggregates, summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to compute insights' });
  }
}

module.exports = { getInsightsHandler, getRawAggregates, generateInsightString };
