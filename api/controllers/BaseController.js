class BaseController {
  constructor(model, service) {
    this.model = model;
    this.service = service;
  }

  // example of what you could be doing;;
  badRequest(res, errorMessage) {
    res.status(401).json({
      statusCode: 401,
      data: {
        errorMessage
      }
    })
  }
}

module.exports = BaseController;

/*
app.post("/", (req,res)=> {
    res.status(401).send()
    sendStatus(401)//just sends status
}) */