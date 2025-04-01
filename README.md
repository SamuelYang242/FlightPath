# Flight Dashboard 

## Overview

The Aviation Dashboard is a web application that allows users to log and track their flight hours, places they've flown, and record time spent with different airlines and aircraft types.

Furthermore, users will be able to find current and future weather information at airports. 



## Data Model

The application will store Users and Flight lists

* users each contain a list of referenced flights


An example User with referenced list of flights:

```javascript
{
  username: "SamuelYang",
  password: //hashed password
  flights: //Array of referenced flight documents
  favourite_airports: ["CYYZ", "KLGA", "EDDF"] // list of strings
  flight_time: "40H22M" //String, will be converted to time IF ever needed
}
```

An example Flight

```javascript
{
  user: // reference to user
  flight: "ACA1",
  airline: "ACA",
  origin: "CYYZ",
  destination: "RJTT",
  duration: "13H30M" //String, will convert to time separately when needed
  date: "2024-11-15" //Type Date
  type: "B789"
}
```

## [Link to Commented First Draft Schema](./src/db.mjs) 

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/home - home page before logging in

![home](documentation/home.jpeg)

/register - register and login as new user

![register](documentation/register.jpeg)

/account - display account information

![account](documentation/account.jpeg)

/airport - display airport weather

![airport](documentation/airport.jpeg)

/add - add a flight

![add](documentation/add.jpeg)

## Site map

![site map](documentation/wire_map.jpeg)

## User Stories

1. As a non-registered user, I want to search up airports so that I can see current weather information
2. As a user, I want log in to the site so that I can see my information
3. As a user, I want to add a flight to my account so that I can record my flight information
4. As a user, I want to view my past flight history and statistics so that I can see my travels in an interactive way
5. As a user, I want to favourite airports so that I can have easy access to weather information I need frequently

## Research Topics

* Unit Testing

  * What is it? Unit tests ensure specific, isolated parts of code are running s they should.

  * Why use it? It allows for efficient and thorough testing, making sure everything works as it is supposed to, even under abnormal circumstances.

  * Possible Candidates: Jasmine, Mocha

  * Points: 3

* External API Integration

  * What is it? APIs provide the ability to integrate third-party resources into an application.

  * Why use it? Allows users to view live airport weather information as well as see flight history on a map

  * Possible Candidates: aviationweater.gov API, leafletjs API.

  * Points: 6 (leaflet API specifically seems to involve a solid amount of code that I don't understand yet)


9 points total out of 8 required points 

## [Link to Initial Main Project File](./src/app.mjs) 

## Annotations / References Used
* [Leaflet API](https://leafletjs.com)
* [Aviationweather.gov API](https://aviationweather.gov/data/api/#/)