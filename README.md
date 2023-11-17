# ROBUST bnb
ROBUST bnb is a clone site inspired by [airbnb](airbnb.com)

## Technologies Used 

[![My Skills](https://skillicons.dev/icons?i=js,html,css,nodejs,express,sequelize,postgres,react,redux)](https://skillicons.dev)

## Preview 
![LogIn](/backend/Images/Robust_bnb_log_in.gif)
![HomePage](/backend/Images/Robust-bnb_home_page.png)



## Getting Started 

0. You will need to have Node.js installed 
    * `[How to Install Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)`
1. Clone this repo. <br>
     * `git clone https://github.com/AnthonyFebles/ROBUSTbnb.git`
2. Install all dependencies from the root folder <br>
    * `npm install`
3. CD into the backend <br>
    * `cd backend`
4. Create a copy of the environment example <br>
    * `cp .env.example .env`
5. From here you'll want to head into the new .env file that was created and change two things <br>
    * `where it says, 'JWT_SECRET' enter a strong secret code after the '=' `
    * `where it says, 'SCHEMA' name the schema however you'd like after the '='`
6. Build the backend database <br>
    * `npm run rebuild-db`
    * `You can use this same command to reset the database whenever you would like from the backend directory`
7. Now that the database is built, you can start up the backend! <br>
    * `npm start`
    * `if you ever want to stop running the backend, you can press ctrl + c in the terminal`
8. Open a new terminal in the root directory, do not close the terminal hosting the backend <br>
9. CD into the frontend <br>
    * `CD frontend`
10. Finally, start the frontend and go to 'http://localhost:3000/' in your browser <br>
    * `npm start`
11. You can log in as a demo user, or sign up with a new account using the profile button on the top-right.