# Mercado-Libre-Server

> Version 1.0.0.

Server developed with Node & Express. 

## Installation

Clone Repository:

```sh
git clone https://github.com/bonett/mercado-libre-server.git
```

Enter to root folder:

```sh
cd mercado-libre-server
```

Install the dependencies:

With npm

```sh
npm install
```

## Usage - IMPORTANT install globally => npm install -g nodemon) to run server

With npm: 

```sh
nodemon server.js
```


And it should be running on http://localhost:7000/.


## API 

```sh
GET http://localhost:7000/items?q=queryString
```

```sh
GET http://localhost:7000/items/:id
```
