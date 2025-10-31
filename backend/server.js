const express = require('express');
const cors = require('cors');
const tasksRouter = require('./src/routes/tasks.router');
const { getInsightsHandler } = require('./src/services/insight.service');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/tasks', tasksRouter);
app.get('/insights', getInsightsHandler);

app.get('/', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
