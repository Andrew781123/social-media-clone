const getRelativePath = url => {
  const matchIndex = /public/.exec(url).index;

  return url.slice(matchIndex);
};

module.exports = getRelativePath;
