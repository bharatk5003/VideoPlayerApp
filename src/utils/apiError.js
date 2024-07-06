class APIError extends Error {
      constructor(
        statusCode,
        message= 'something went wrong',
        error =[],
        stack =''
      ){
        super(message)
      }

}