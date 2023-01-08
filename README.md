# Nodepop
Nodepop is a final project for the module "Backend with NodeJS, ExpressJS and MongoDB", from the Bootcamp Mujeres in Tech - Web Development, delivered by KeepCoding and sponsored by Glovo.

This API returns ads for selling and buying diverse items, and contains CRUD methods that allow searching, creating, updating, filtering amd deleting items.

## Install dependencies: 

```sh
npm install
```

## Start the application:

```sh
npm run dev
```

## Load initial data to database
```sh
npm run init-db
```
or
```sh
npx nodemon init-db.js
```

## API documentation
### Get list of ads:
```sh
GET api/advertisements
```
```sh
{
"results":[
        {
        "_id":"63bac1587404281218d050a5",
        "name":"iPhone 3GB",
        "forSale":false,
        "price":50,
        "photo":"./public/images/iphone.jpg",
        "tags":["lifestyle","mobile"]
        }
    ]
}
```
```sh
 GET api/advertisements?name=i

 GET api/advertisements?skip=1&limit=2

 GET api/advertisements?fields=tags

 GET api/advertisements?tags=work

 GET api/advertisements?forSale=true
 
 GET api/advertisements?price=300&price=1000
 
 GET api/advertisements?tags=mobile&forSale=false&name=i&price=40&price=100&skip=0&limit=2
```
### Get list of tags:
```sh
 GET api/advertisements/tags
```
### Create a new ad:
```sh
POST api/advertisements
```
### Update an ad:
```sh
PUT api/advertisements/:id
```
### Delete an ad:
```sh
DELETE api/advertisements/:id
```
### Get an image:

```sh
GET images/tablet.jpg
```
