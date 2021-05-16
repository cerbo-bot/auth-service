export const modifyMessage = (req, res, next) => {
  req.body.message = `SAYS: ${req.params.message}`;
  next();
};
