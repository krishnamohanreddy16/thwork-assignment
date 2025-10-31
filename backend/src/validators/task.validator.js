function validateNewTask(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
    errors.push('title is required');
  }
  if (!body.due_date || !/^\d{4}-\d{2}-\d{2}$/.test(body.due_date)) {
    errors.push('due_date is required and must be YYYY-MM-DD');
  }
  const allowedPriorities = ['Low','Medium','High'];
  if (body.priority && !allowedPriorities.includes(body.priority)) {
    errors.push('priority must be Low, Medium, or High');
  }
  return errors;
}

module.exports = { validateNewTask };
