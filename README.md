# [Sorting List](https://sortinglist.jonathanpunzalan.com/)

This is a simple website that handles sorting a list of Posts title.

It utilises the LexoRank, a lexical (alphanumerical) ranking system for sorting by drag and drop.

It also renders 500 post title items using react-window to reduce render loads.


https://github.com/hjpunzalan/sorting-list/assets/47600145/a3754390-8420-40b6-892b-ac20d98aed7c

## Table of contents
* [Explanation](#explanation)
* [Technologies](#technologies)
* [Development](#development)

## Explanation

Traditional numerical ranking system are limited by insufficient space allocations. The challenge in drag and drop is the probability of reaching these limits are high.

A lexical ranking system solves this issue by having an abundant of space allocations where in production should be accomodated with rebalancing to prevent performance drawbacks.

## Development
- Node v20 is required.
- Docker and Makefile is also being used.

### Initial Setup

Run the following when setting up the project for the first time:
```
make init
```

- This will create a mongoDB container using docker ``` make db-init```.
- Install server npm packages ``` cd server && npm install ```.
- Seed database with posts title in Posts collection. ``` make db-seed ```.

Start server in development mode:
``` make server```

Install dependencies in client:
``` cd client && npm run install ```

Start client in development mode:
- This will also automatically generate the query typings for graphql ``` make client-generate ```.

``` make client ```

## Technologies
- Node.js v20
- MongoDB v6
- Express v4
- Mongoose v8
- React v18
- Vite v5
- Graphql v18
- LexoRank v1
- Material UI v5
- React-Window
- @hello-pangea/dnd
