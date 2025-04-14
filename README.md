# Travel Tracker

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
  

# Travel Tracker

VERY ROUGH SKETCH // Currently using flask to make UI // Used ExchangeRate-API for conversion // 

This is a application framework that the user can sign in and track their banking statements ( monthly income, bills, current savings ext.) and be able to convert all into a currency of their choosing. 


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


