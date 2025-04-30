Milestone 04 - Final Project Documentation
===

NetID
---
sy3638

Name
---
Samuel Yang

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24

URL for deployed site 
---
https://glowing-space-telegram-g4r656p76795hvjrg-3000.app.github.dev

URL for form 1 (from previous milestone) 
---
https://glowing-space-telegram-g4r656p76795hvjrg-3000.app.github.dev/login

Special Instructions for Form 1
---
Login using the provided credentials (username: username1234; password: password1234), or create your own account by pressing the register button. 

You will be taken to a pre-existing account page if you use the provided user, or an empty account page if you created a new one. 

URL for form 2 (for current milestone)
---
Form: https://glowing-space-telegram-g4r656p76795hvjrg-3000.app.github.dev/add
Result: https://glowing-space-telegram-g4r656p76795hvjrg-3000.app.github.dev/account

Special Instructions for Form 2
---
Under your account page (note that you must be signed in to access this, and is accessible on clicking the logo or your username in the header banner), scroll down and press the add a flight button. Then, enter the details required. Please ensure flight information, as well as airport information are accurate, as the website will not allow you to input invalid information. Examples are provided in the form. 

After pressing the add button, this new flight will show up in your account dashboard and on the map, and the visuals depicting your profile's data will be updated

URL for form 3 (from previous milestone) 
---
https://glowing-space-telegram-g4r656p76795hvjrg-3000.app.github.dev

It is accessible from any page on the website

Special Instructions for Form 3
---
In the header banner of the website, enter an airport's name to be redirected to a page that shows you the weather information for the airport you have inputted. Note again, the airport code must be correct or you will be shown an error page. 

First link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/7c29720cd05cd0d527099dbf520d7ad6327e1ea7/src/public/js/accountScripts.mjs#L135

Second link to github line number(s) for constructor, HOF, etc.
---
https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/7c29720cd05cd0d527099dbf520d7ad6327e1ea7/src/utils.mjs#L88

Short description for links above
---
The first link takes the user's array of flights and converts them each to HTML elements to add to the account dashboard, as well as adds them to the map

The second link takes the API response from aviationweather.gov, specifically a severe weather string, and generates a regular human readable string based on which severe weather codes it contains.  

Link to github line number(s) for schemas (db.js or models folder)
---
[db.mjs](./src/db.mjs)

Description of research topics above with points
---
4 points - Used leaflet and chartJS, client-side modules, to generate the visuals on the account dashboard. 

4 points - Used passportjs, a server-side module, for stronger authentication protection. 

3 points - Used aviationweather.gov API, an external API, to display weather information for different airports

Links to github line number(s) for research topics described above (one link per line)
---
leaflet and chartJS: 
- [account.hbs](./src/views/account.hbs)
- [accountScripts.mjs](./src/public/js/accountScripts.mjs)
- [testing folder](./testing/)

passportjs: 
- [auth.mjs](./src/auth.mjs)
- [app.mjs](./src/app.mjs)

aviationweather.gov API: 
- [app.get('weather/:airport')](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/7c29720cd05cd0d527099dbf520d7ad6327e1ea7/src/app.mjs#L172)

Optional project notes 
--- 
I did not have time to implement protections against API's being down. As a result, on the very rare chance this occurs, specifically the weather information functionality of this website may return an error message. 

Attributions
---
All attributions are listed in [acknowledgements.md](./Acknowledgements.md)