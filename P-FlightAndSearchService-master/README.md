# Welcome to Flights Service

## Project Group

- clone the project on your local
- Execute `npm install` on the same path as of your root directory of the downloaded project
- Create a `.env` file in the root directory and add the following environment variables
- `PORT=3000`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json.

```
  {
      "development": {
          "username": <YOUR_DB_LOGIN_NAME>,
          "password": <YOUR_DB_PASSWORD>,
          "database": "Flights_Search_DB_DEV",
          "host": "127.0.0.1",
          "dialect": "mysql"
      },
  }
```

- Once you've added your db config as listed above, go to the src folder from your terminal and execute
  `npx sequelize db:create` and then execute `npx sequelize db:migrate`

## DB Design

- Airplane Table
- Flight
- Airport
- City

- A Flight belongs to an airplane but one Airplane can be used in multiple Flights.
- A City has many Airports but one Airport belongs to a City.
- One Airpot has many Flights but a Flight belongs to one Airport.

## Tables

### City -> id, name, created_at, updated_at

### Airport -> id, name, address, city_id, created_at, updated_at

Relationship -> City has many airports and Airport belongs to a city (one to many)

```
npx sequelize model:generate --name Airport --attributes name:String,address:String,cityId:integer
```
