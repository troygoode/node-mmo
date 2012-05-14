module.exports = createSandbox = function(){
  return {
      console: {log: console.log}
    , module: {exports: null}
  };
};
