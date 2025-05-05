# Travel Tracker

## Deliverable 3
* [Deliverable 3 Document](Resume/deliverable3/CSC468_Deliverable3_Group5.pdf)
* [Deliverable 3 Document combined with Resumes](Resume/deliverable3/CSC468_Deliverable3_Group5_withResumes.pdf)
* [Project Poster PDF](Resume/deliverable3/TravelTrackerPoster.pdf)
* [Project Poster PNG](Resume/deliverable3/TravelTrackerPoster_img.png)

## Deliverable 2
* [Deliverable 2 Document combined with Resumes](Resume/deliverable2/CSC468_Deliverable2_Group5.pdf)
* [Presentation SINGLE Document](Resume/deliverable2/TravelTracker_Poster.pdf)
* [Previous Presentation Document (Mult-page)](Resume/deliverable2/TravelTracker_OriginalSlides.pdf)
## Deliverable 1
* [Deliverable 1 Document combined with Resumes](Resume/deliverable1/CSC468_Deliverable_1.pdf)


#### Seperate Docs
* [Deliverable 1 Document](https://docs.google.com/document/d/1nsGIeEfJcqjZ_Max3em2NcJI6Ekz9qwitJ5Ktx2cg3g/edit?usp=sharing)
* [The group's resumes](Resume/Group_resumes_combined.pdf)

--- 

## For the group

## Current Repo Instructions:
* Had to make a new venv (but functions the same as the old one from the requirements file)
* Had to delete node_modules from the folder as it messes with docker set up. If you're testing locally, you'll have to reinstall them from the package.json file, BUT do not push them into the repo.

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

* If using Docker
  ```
  docker compose down
  docker compose build frontend backend
  docker compose up
  
# Travel Tracker

Currently using flask to make UI // Used ExchangeRate-API for conversion // 

TravelTracker is a vacation planning web application. Users can manage the logistics of their trip(s) like budget, flight information, stay information, itinerary, and notes. For international travel, users can manage their budget with TravelTracker's currency converter. 

* [Project Notes](https://docs.google.com/document/d/1tlLTfswJN_oT1oBvBYVSixCLlUY5gRvoMqDTR7MBcOM/edit?usp=sharing)
  


backend/
│── app.py
│── config.py
│── models.py
│── routes.py
│── database.py
│── requirements.txt
│── Dockerfile
│── venv/ 

frontend/
│── src/
│   │── components/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── TransactionForm.js
│   │   ├── TransactionTable.js
│   │── services/
│   │   ├── api.js
│   │── App.js
│   │── index.js
│── public/
│── package.json
│── Dockerfile


