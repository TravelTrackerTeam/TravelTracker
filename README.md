# Travel Tracker

## Current Repo Instructions:
* Had to make a new venv (but functions the same as the old one from the requirements file)
* Had to delete node_modules from the folder as it messes with docker set up. If you're testing locally, you'll have to reinstall them from the package.json file, BUT do not push them into the repo.


## Deliverable 2
* [Deliverable 2 Document combined with Resumes](Resume/deliverable2/CSC468_Deliverable2_Group5.pdf)
* [Presentation SINGLE Document](Resume/deliverable2/TravelTracker_Poster.pdf)
* [Previous Presentation Document (Mult-page)](Resume/deliverable2/TravelTracker_OriginalSlides.pdf)
## Deliverable 1
* [Deliverable 1 Document combined with Resumes](Resume/deliverable1/CSC468_Deliverable_1.pdf)


#### Seperate Docs
* [Deliverable 1 Document](https://docs.google.com/document/d/1nsGIeEfJcqjZ_Max3em2NcJI6Ekz9qwitJ5Ktx2cg3g/edit?usp=sharing)
* [The group's resumes](Resume/Group_resumes_combined.pdf)







## For the group

### Curr Commands to Run
* First Terminal
  ```
  python3 -m venv traveltracker_env
  traveltracker_env\Scripts\activate
  python backend\app.py
* Second Terminal
  ```
  cd frontend
  npm run dev

* [Project Notes](https://docs.google.com/document/d/1tlLTfswJN_oT1oBvBYVSixCLlUY5gRvoMqDTR7MBcOM/edit?usp=sharing)
  
* If using Docker
  docker compose down
  docker compose build frontend backend
  docker compose up
  
# Travel Tracker

Currently using flask to make UI // Used ExchangeRate-API for conversion // 

TravelTracker is a vacation planning web application. Users can manage the logistics of their trip(s) like budget, flight information, stay information, itinerary, and notes. For international travel, users can manage their budget with TravelTracker's currency converter. 

backend/
│── node_modules/
│── .env
│── app.py
│── Dockerfile
│── requirements.txt


frontend/
│── node_modules/
│── src/
│   │── components/
│   │   ├── AddExpenseForm.jsx
│   │   ├── AddTripModal.jsx
│   │   ├── authFetch.js
│   │   ├── CurrencyConverter.jsx
│   │   ├── CurrencySwitcher.jsx
│   │   ├── Navbar.jsx
│   │   ├── TripCard.jsx
│   │── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SignupPage.jsx
│   │── services/
│   │   ├── api.js
│   │── styles/
│   │   ├── theme.css
│   │── App.jsx
│   │── main.jsx
│── public/
│── .env
│── .gitignore
│── eslint.config.js
│── index.html
│── package-lock.json
│── package.json
│── README.md
│── vite.config.js
│── Dockerfile

.dockerignore
demo.pdf
docker-compose.yml
init.js
README.md

