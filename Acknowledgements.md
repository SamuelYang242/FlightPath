### Photos:

logo.png from flaticon at: https://www.flaticon.com/free-icon/boarding-pass_701366
background.jpg from wallpaper cat at: https://wallpapercat.com/air-canada-wallpapers#modal

### Code: 
Most of my CSS learning came from: 
https://www.w3schools.com/css/
https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout

The majority of authentication code, namely usage of express.session middleware, is attributed to code in homework05, some of which was provided with the assignment and not written by myself. 

Any code taken from the above-mentioned or other sources are directly acknowledged in comments, and in the below list: 
- [auth.mjs](./src/auth.mjs) is largely taken and adapted from auth.mjs in homework05, of which some of the code was provided and not written by myself
- [app.post('/login')](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/a3160fed2d953eab3b5ab1c2215b4ed2116376ce/app.mjs#L50) is inspired by code from app.mjs in homework05
- [app.post('/register)](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/a3160fed2d953eab3b5ab1c2215b4ed2116376ce/app.mjs#L77) is inspired by code from app.mjs in homework05
- [background opacity css rule](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/a3160fed2d953eab3b5ab1c2215b4ed2116376ce/public/css/main.css#L144) is learned from https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
- [gradients in css](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/a3160fed2d953eab3b5ab1c2215b4ed2116376ce/public/css/main.css#L162) are learned from https://www.w3schools.com/css/css3_gradients.asp
- [background images in css](https://github.com/nyu-csci-ua-0467-001-002-spring-2025/final-project-deployment-SamuelYang24/blob/a3160fed2d953eab3b5ab1c2215b4ed2116376ce/public/css/main.css#L5) are learned from https://www.w3schools.com/html/html_images_background.asp 
- All code in [testing_leaflet.js](./testing/testing_leaflet.js) and [testing_leaflet.html](./testing/testing_leaflet.html) are taken from https://leafletjs.com/examples/quick-start/ and https://leafletjs.com/reference.html#map-example


### Others:
Website name is generated using chatGPT because I am not creative enough. I sure hope it's not copyrighted somewhere.

[Airline data](./src/public/data/airlines.json) adapted from : 
https://github.com/elmoallistair/datasets/blob/main/airlines.csv

[Airport data](./src/public/data/airports.json) adapted from : 
https://github.com/elmoallistair/datasets/blob/main/airports.csv

Used https://csvjson.com/csv2json to convert from csv to json, but data was cleaned and filtered myself using a [javascript program](./src/public/data/parser.mjs)
- Note: the program won't work anymore because the original CSV files have been deleted, but the program is there as a record and in case troubleshooting is needed