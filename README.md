# url-shortener-api
url-shortener-api is a tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share


endpoints (auth):

POST /auth/register -> register a new user
POST /auth/login -> generate a user token

endpoints (url): 

GET /url -> reuturn all user logged url
GET /url/:code -> redirect to a specific url
POST /url -> create a new shortened url
PUT /url/:code -> edit a created url
DELETE /url/:code -> applies soft delete in a specific urls