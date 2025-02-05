# Auto Dice Roller

[My Notes](notes.md)

A small website where you can roll as many of the standard 7 Dungeons and Dragons dice as you want and your group can see the results.

## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Tired of dice rolling from your table onto the floor? Unsure if your players are fudging the dice they "rolled online"? Have trouble adding the 12 d6 of your rouge's sneak attack damage? Auto Dice Roller is here to solve all of these issues. Each user logs into a homeroom where they can roll as many dice as they need for their campaign. The website will automatically roll the specified number and type of dice and will share the results with the whole group, allowing the Dungeon Master to trust in the roll and preventing the slowdown that comes from players needing to count up each dice!

### Design

![Screenshot 2025-01-13 220358](https://github.com/user-attachments/assets/66fa9cab-b3be-403d-a70e-1de6c158a950)


Here's a brief mockup of what the login screen of the site will look like

### Key features

- Secure login into group rooms
- Ability to choose one of the 7 standard D&D Dice (d4, d6, d8, d10, d12, d20, d100)
- Ability to roll any number of the chosen dice
- Roll totals pushed out to every active user in a group
- Ability for admin to create new groups and manage which users are allowed in each group

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Two HTML pages, one for login and personal rolls and one for group rolls.
- **CSS** - Adaptive screen resolution that works for mobile and pc displays. Clear and consistent styling throughout the site emphasizing the fantasy feel.
- **React** - Provides login and room selection. Receives input for dice rolls to send to the backend.
- **Service** - Endpoints for:
  -Login
  -Rolling dice
  -Retrieving roll results
  -Display random excuses to leave work and play D&D using the https://excuser-three.vercel.app/v1/excuse/office service.

- **DB/Login** - Stores users and created groups in a database. Credentials all stored in a database. Users can only join groups they've been authorized for.
- **WebSocket** - Whenever a user rolls, broadcast their results to the users in their group.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I ~~completed~~.

- [x] **Server deployed and accessible with custom domain name** - [5e Dice](https://5edice.com).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I built three HTML pages that represent the ability to login, roll dice, and get info about the website.
- [x] **Proper HTML element usage** - I utlized HTML tags to seperate and organize the sections of my website.
- [x] **Links** - Pages are linked to eachother through the menu. Logging in also take you to the play page.
- [x] **Text** - Each subsection of the application has meaningful descriptors.
- [x] **3rd party API placeholder** - Index page has a button placeholder for the api request to generate excuses.
- [x] **Images** - Play page has a dice svg that will show the results of the roll. Also included a background image on all my pages
- [x] **Login placeholder** - Login placeholder and submit box is on the main page
- [x] **DB data placeholder** - Rolls in the room represent data pulled from DB. Will display most recent rolls for that room as saved in a DB
- [x] **WebSocket placeholder** - Websocket placeholder of rolls from the current room on the play page.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x]] **Header, footer, and main content body** - Added seperation of header, footer, and main content body using bootstrap styling.
- [x] **Navigation elements** - Put navigation elements in a flex element in my header and styled them with bootstrap.
- [x] **Responsive to window resizing** - Most of my elements are now responsive to window resizing including my SVG on the play page, the spacing of the text on my about page, and my header and footer changing to fit window sizes.
- [x] **Application elements** - Clear spacing of elements to access the info from the app you want. Also clear use of color for button elements to differentiate inputs from buttons that send information.
- [x] **Application text content** - Consistant fonts across the the different pages.
- [x] **Application images** - Got my SVG to scale with the window size! No more background image because I couldn't get it to look nice so a more plain background will be cleaner for now.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
