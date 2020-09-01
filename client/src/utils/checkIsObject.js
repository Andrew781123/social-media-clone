const checkIsObject = data => {
  return data && typeof data === "object" && data.constructor === Object;
};

export default checkIsObject;
