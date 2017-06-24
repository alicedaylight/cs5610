/**
 * Created by xoxoumop3pisdn on 6/23/17.
 */
Get by parameter or get by query (getting value from a request)

req.query
req.body
- when we're sending a post or pull request we pass object in a json body/request body

  post(url, object)
   the object (second param) will be put into the request body

   in order to parse the body

   we need to

   npm install body-parser


   ----------

   response
   - we can send response back to client
   - request.send()
    -- we can send status or data

    res.sendStatus()
    - 200 = okay
    - 403 = forbidden

    res.send(websiteSite obj as json body)

    -------------------

