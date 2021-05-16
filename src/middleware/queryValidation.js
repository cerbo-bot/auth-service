/**
 * Validates queries for empty strings or other string sanitations
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
export const queryValidator = (req, res, next) => {
  if (req.params.q.trim()) next();
  else res.status(400).send({ message: '📭 Did you send an empty query?' });
};
