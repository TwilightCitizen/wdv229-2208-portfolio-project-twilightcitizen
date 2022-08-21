
# 💻 Project & Portfolio II

# Project Name: WDP2 Portfolio Project

### David A. Clark, Jr.

🆔 &nbsp; #0004796375

📪 &nbsp; daclark1@student.fullsail.edu


![Degree Program](https://img.shields.io/badge/Degree-Web%20Development-orange?logo=gnometerminal)
<br>
![Class Name](https://img.shields.io/badge/Class-Project%20and%20Portfolio%20II-orange?logo=react)

<br>

## Running the Application

### Launching

The client and server can be launched simultaneously in a single terminal with a single command:

```
npm start
```

Alternatively, the client and server can be launched separately in their own terminals with separate commands:

```
npm run start-client
npm run start-server
```

### Using the Application

Once launched, the client should automatically open in the default browser for you.  If it does not, navigate to [http://localhost:3000/](http://localhost:3000/), which should redirect you to the dashboard page.

The dashboard page should display a list of links to group and private chats to which the Kik bot is party, and a search box at the top right of the page.  Clicking the links to group and private chats will navigate to the details page which shows details about the chat.  Typing a search term in the search box and clicking its button will navigate to the search page that shows Kik groups matching the search term, if any.  Note that search terms can only contain numbers and letters.  Spaces and other characters are not permitted.

The detail page will almost certainly display a message that there are no chat events recorded for the chat you selected.  This is because when you run the application on your machine for the first time, the database to which the Kik bot records chat events will be empty.  There is currently no way to request previous chat history from Kik.  You will have to log into [Kik](https://www.kik.com) on iOS or Android with any of the test accounts and chat with the bot--in one of the groups, or privately--to generate chat events that it can record to the database.  Then, details of those chat events will display for that chat.

From the detail page, clicking on any of the username links will navigate to the user page.  The user page will display the user's profile picture, if any, username, and display name.  Days on Kik is presently hard-coded to display 123.  In the app's next update, it will either show the user's actual number of days on Kik, or it will be removed from the page.  (Getting that information requires an additional Kik Node API call, and it is unclear how performant it will be due to throttling.)

From any page other than the dashboard, a link to return to the previous page appears in the top right of the page.  Clicking it will navigate to the previous page.  It is important to understand that refreshing any page other than the dashboard or attempting to navigate directly to it from the address bar will redirect to an Error 404 page.  This was a deliberate design decision to avoid erroneous requests to the server, and ultimately to Kik's servers.

### Test Users and Groups

#### Test Users

The password for all test users is `wdv229-2208-portfolio-project`.

| Username             | Email Address                 | Display Name  |
|----------------------|-------------------------------|---------------|
| wdv229_coffee_cup    | deviant.larceny-0h@icloud.com | Coffee Cup    |
| wdv229_shaker_bottle | roofer.0browser@icloud.com    | Shaker Bottle |
| wdv229_leather_chair | leopard.fuchsia.0q@icloud.com | Leather Chair |
| wdv229_got_no_pic    | mugger.panic.0z@icloud.com    | Got No Pic    |

#### Test Groups

| Group Name         | User in Group w/ Bot |
|--------------------|----------------------|
| Can't See Me       | Got No Pic           |
| Coffee Chat        | Coffee Cup           |
| Fine Leather Goods | Leather Chair        |
| Pre-workout Talk   | Shaker Bottle        |

Note that all the groups in which the Kik bot is party are private groups.  Public groups can be created, and the bot could be put in them, but doing this would be very bad for many reasons.  Public groups on Kik are often plagued by other bots that share suggestive content not suitable for a school project.  Also, because the Kik bot currently echos back most user chat events, this would annoy users who would report the bot and get the account banned.

Because the Kik bot is not in any public groups, it is unlikely that join and leave events will be recorded.  It is possible, however.  To generate some join and leave events, you must:

- Start a private chat from one of the test user accounts to another one of the test users.
- Send a message to the other test user.
- From the other test user account, reply to the first test user.  Now, these test users are friends.
- From either of these test user accounts, add the other to the group it is in.  That should generate a join event.
- From either of these test user accounts, leave the group chat with the Kik bot.  That should generate a leave event.

Also note that the test user accounts may receive private messages from the aforementioned bot accounts.  Please disregard these private messages when logging into and using a test user account.

### Troubleshooting: Be Careful with the Bot Account!

| Username      | Email Address             | Display Name    |
|---------------|---------------------------|-----------------|
| wdv229_bot    | bobbles00longs@icloud.com | Botty McBotface |

The Kik bot account can be logged into via the Kik app on iOS or Android, _but doing so will cause problems with the Kik bot server process_.  Kik uses a modified version of the XMPP protocol under the hood.  It checks to see that account activity is coming from the Kik app on iOS or Android, and when an account is logged into, other sessions are logged out on other devices.  The Kik Node API pretends that it is a Samsung phone running Kik on Android 19, but it seems not to properly handle a session log out when the account it uses is logged into from the Kik app on iOS or Android.  

This may also happen if two instances of the Kik bot are running at the same time, such as if you are testing my app for grading while I also have it running while further developing it.  **Please, before testing, let me know, so I can stop the server process on my machine first.**

In these instances, the Kik bot will disconnect right after authentication.  It appears in the console output like this:

```
INFO: Connected to kik
INFO: Sending auth request
ERROR: Server ended
```

If this happens, the Kik bot's authentication in `server.js`, line 69, needs to be changed temporarily:

```
kikBot.authenticate(process.env.KIK_BOT_EMAIL, kikBotPassword);
```

Then, when the application is started, the server will cycle through restarts, with console output repeating:

```
MongoDB connected to mongodb://localhost:27017/kik-bot
Server is up on port 3001.
[h:mm] INFO: Connected to kik
[h:mm] INFO: Requesting kik node
[h:mm] INFO: Sending anonymous auth request
[h:mm] INFO: Disconnecting due to node received
[h:mm] INFO: Reconnecting with node value
[h:mm] INFO: Connected to kik
[h:mm] INFO: Sending auth request
[nodemon] restarting due to changes...
[nodemon] starting `node ./src/server/server/server.js`
```

After a handful of restart cycles, manually stop the process and change the Kik bot's authentication in `server.js`, line 69, back:

```
kikBot.authenticate(kikBotUsername, kikBotPassword);
```

The Kik bot should be back up and running.  It is unclear at this juncture what change Nodemon detects to cause a restart when authenticating with the email address versus the username.  This is why authenticating is done with the username instead of the email address, but authenticating with the email address seems to reset the account's authorization with Kik's servers.

### Clear Logs Periodically

Ordinarily, a back-end process would take care of rotating logs.  In addition to console logging, the Kik Node API generates _a lot_ of log data that it writes to `/logs/_ANON_.txt` and/or `/logs/wdv229bot.txt`.  If you run this application for a while and a lot of testing, periodically clear out these files to prevent overfilling your disk.

<br>

## 📢 &nbsp; Milestone Check-Ins

Each week I will summarize my milestone activity and progress by writing a stand-up. A stand-up is meant to be a succinct update on how things are going. Use these prompts as a guide on what to write about:

⚙️ Overview - What I worked on this past week
<br>
🌵 Challenges - What problems did I have & how I'm addressing them
<br>
🏆 Accomplishments - What is something I "leveled up" on this week
<br>
🔮 Next Steps - What I plan to prioritize and do next

<br>

### Milestone 1

For this milestone you will have created a wireframe prototype in Figma.  Post your link here, so you have easy access to it.

[Figma Prototype](https://www.figma.com/file/P3NPaVkSrDhnaswTjLOySg/Prototype?node-id=10%3A100)

### Milestone 2

⚙️ Overview - What I worked on this past week

Feature Development:

- Required Pages with Routing (Dashboard, Detail, User, and Search)
- Additional Error404 Page for Unhandled Routing Requests
- Necessary Components (Header, Footer, ChatList, ChatDetail, SearchBox, IconButton, and IconNavLink)
- Thematic Layout and Color Styling consistent with Prototype
- Context-Dependent Routing to Prevent Navigation Not Initiated within the App
- Mock Data to Support Demonstrating Functionality

Other Preparations:

- Hosted an edited fork of [Yassien's Kik Node API](https://github.com/YassienW/kik-node-api) on GitHub
- Double-checked basic Kik Bot functionality previously developed in spare time to help format mock data (above).

<br>
🌵 Challenges - What problems did I have & how I'm addressing them

- Establishing a working GitHub Kanban Project in the ePortfolio organization and associating it with my code repository proved challenging.  Lab Tech and Instructor involvement was necessary to overcome the issue.

<br>
🏆 Accomplishments - What is something I "leveled up" on this week

- Emulated the prototype in the React front-end relatively faithfully
- Applied arguably better color theme than in previous Web Dev projects
- Most sophisticated React front-end developed in a single week

<br>
🔮 Next Steps - What I plan to prioritize and do next

- Express back-end with RESTful API to serve Kik chat data payloads to front-end
- MongoDB database to persistently store chat history
- Kik Node API bot to aggregate chat history and/or fulfill requests not served from the database
- Refactor front-end to use useFetch to request chat data payloads from back-end rather than using mock data
- Use Concurrently for concurrently starting back-end and front-end servers

<br>

### Milestone 3

⚙️ Overview - What I worked on this past week

Feature Development:

- MongoDB Database for Data Persistence on the Back-end
- Kik Bot to Capture and Persist User, Group, and Chat Information
- Node/Express Server Responding to Chat, Details, Profile Pics, and Search Requests
- Refactored React Front-End to Fetch Data from Back-end Server

Other Preparations:

- Created Test Users and Groups on Kik
- Initiated Group and Private Chats with Kik Bot
- Documentation on Launching, Using/Testing, and Troubleshooting the App

API Used:

- YassienW's [Kik Node API](https://github.com/YassienW/kik-node-api), forked [here](https://github.com/TwilightCitizen/kik-node-api) with edits to overcome some issues that would otherwise cause crashes due to it not properly handling GIFs and videos.

Libraries Used:

- [axios](https://axios-http.com/docs/intro)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com/en/4x/api.html)
- [kik-node-api](https://github.com/YassienW/kik-node-api)
- [mongoose](https://mongoosejs.com/docs/guide.html)
- [morgan](https://www.npmjs.com/package/morgan)
- [react](https://reactjs.org/docs/getting-started.html)
- [react-async](https://docs.react-async.com)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-router-dom](https://reactrouter.com/docs/en/v6)
- [react-scripts](https://create-react-app.dev/docs/getting-started/)
- [web-vitals](https://www.npmjs.com/package/web-vitals) (Implicitly Embedded via create-react-app)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [nodemon](https://github.com/remy/nodemon#nodemon)

Links to Concurrently Tutorial:

- [Tutorial Video](https://web.microsoftstream.com/video/7b0e3c42-f725-4544-ae4c-993503eba69e)
- [Demonstration App Repository](https://web.microsoftstream.com/video/7b0e3c42-f725-4544-ae4c-993503eba69e)

Data Persistence Chosen and Why:

- [MongoDB](https://www.mongodb.com/docs/manual/)

- Local Storage is ill-suited for persisting large amounts of complex data.
- Local Storage limits availability of stored data to the client machine in which it is stored.
- Relational databases like MySQL present an impedance mismatch because these model data as relations.  This model requires SQL, and SQL queries must be manipulated as strings or constructed with unwieldy libraries unless the language supports LINQ.
- Document databases like MongoDB model data as documents in JSON, which JavaScript natively supports.
- Mongoose further simplifies MongoDB queries with schemas and models based on them.
- MongoDB tends to offer higher availability and scalability than relational databases.

- Dr. Lance Gutteridge offers plenty of reasons to avoid relational databases in his book, [Avoiding IT Disasters](https://www.amazon.com/Avoiding-Disasters-Fallacies-enterprise-systems/dp/1775357503)

<br>
🌵 Challenges - What problems did I have & how I'm addressing them

- Getting profile pictures to display on the user page proved challenging.  The URL provided to the Kik bot from Kik does not return an image unless the get request also has an auth header supplied with an API key.  To overcome this, a new route was added to the Express app that requests a user's profile picture from another public Kik API that only requires the user's username.  The React app requests this from the Express app instead of requesting it directly because the public Kik API's CORS policy prevents it.
- Because the Chat Event model uses discriminators for Group and Private Chat Events, it took some time to find a way to properly filter Chat Events in the Details Route.

<br>
🏆 Accomplishments - What is something I "leveled up" on this week

- Established a better understanding of when and why Kik chat events occur
- Used discriminated models for Chat Events so both Group and Private Chat Events are stored in the same collection, but are validated against different schema
- App is fairly feature complete, leaving ample time for adding visual flourishes

<br>
🔮 Next Steps - What I plan to prioritize and do next

- Modify User Page to Show Actual Days on Kik or Remove the Field
- Modify Chat Detail Component to Display Images or GIFs/Videos in Place
- Add Additional Graphics to Pages Having Much White Space
- Showcase Presentation Video

### Milestone 4

My final stand up...

<br>
<br>
<hr/>

# Project Overview

### Your project will use the MERN Tech Stack and must include the following:

-   A Git Repo, with a master, dev, and milestone branches
-   Readme File that explains your project and tracks your milestones
-   A React Front End
-   React Routing with  _at least_  4 different views/pages
    -   Dashboard/Main
    -   User/Settings
    -   Search
    -   Detail Page
-   Node/Express Backend
-   A Mongo DB Element OR Local Storage for persistent data
-   Connect to at least 1 free API
-   The project must use at least 2 different libraries, not including React itself
    -   One of these libraries you will create a tutorial for in Exercise 01
-   It should look visually appealing and must be easy for the end-user to use and understand. You may use Tailwind or any other front-end library/framework.

**Milestone #1 (Due: Monday of Week 2)**

-   Decide on your topic and theme for your project.
    -   Check out the Free API sites for some ideas of an API that you can utilize
        -   [Apipheny](https://apipheny.io/free-api/)  
            
        -   [Mixed Analytics](https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/)  
            
        -   [I Am Sajan](https://iamsajan.com/free-api-without-an-api-key/)  
            
-   Functional Spec that explains the scope of the work and the deadlines that must be met.  
    
-   Create a Wireframe Prototype in Figma that will help non-tech people understand your idea.
    -   Keep in mind that a lot of your bosses will need only high-level concepts and will not be concerned with the actual code. The code is your job.

**Milestone #2 **(Due: Monday of Week 3)****

-   Create your Git Repo using the provided link, which will clone over a blank repo.
-   Start to code your project.
    -   I will not give you a step-by-step guide for this.
    -   At this point, you must use your skills and build it out yourself.
-   Along the way, if you get stuck, you may reach out to the lab assistants, but remember this is YOUR portfolio project, and troubleshooting your own code is a part of this process.
-   By Milestone #2, I am going to be checking that you have a React app that can compile without error and that you have your navigation up and running.

**Milestone #3 **(Due: Monday of Week 4)****

-   By this point, you should have a functional prototype of your project. It might not look pretty yet, but that is what the final week is for.
-   Your Git Repo should have a number of significant commits pushed to it.

**Milestone #4 **(Due: Sunday of Week 4)****

-   Your completed project will be due.
-   You must create a (3 to 10) minute long video that goes through your project, what you did this month, and the technologies that you used to get it working.
    -   Remember it is your job to sell your work and really show it off.
