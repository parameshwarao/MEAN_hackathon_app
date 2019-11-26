const response = require('./../libs/responseLib');

let examlemiddleware = (req,res,next) => {
    req.user = {};
    next();

}

let errorHandler = (err,req,res,next) =>{
console.log("application error handler called:");
console.log(err);
let apiResponse = response.generate(true, 'Some error occured at global level',500, null);
res.send(apiResponse);

}

let notFoundHandler = (req,res,next)=>{
console.log("global not found handler called");

let apiResponse = response.generate(true, 'Route not found in the application',404, null);
res.status(404).send(apiResponse);

}


module.exports = {
  _examlemiddleware : examlemiddleware,
  _errorHandler : errorHandler,
    _notFoundHandler: notFoundHandler
};