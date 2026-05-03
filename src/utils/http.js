export const sendData = (res, data, status = 200) => {
  return res.status(status).json({ data });
};

export const sendCreated = (res, data) => {
  return sendData(res, data, 201);
};

export const createHttpError = (message, status = 500) => {
  return Object.assign(new Error(message), { status });
};
