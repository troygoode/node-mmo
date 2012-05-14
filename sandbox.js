var sandbox = module.exports = function(){
  return {
      console: {log: console.log}
    , module: {exports: null}
  };
};
