db = db.getSiblingDB("traveltracker");

db.createCollection("users");
db.createCollection("trips");

db.users.insertOne({
    email: "of994933@wcupa.edu",
    password: "testpass"
});

db.trips.insertOne({
    user_id: "user id string",
    tripName: "Greece",
    budget: 2000,
    expenses: [
        { item: "Flight", amount: 1000 },
        { item: "Hotel", amount: 300 }
    ],
    itinerary: [
        { day: "Day 1", activity: "Check in and dinner" }
    ],
    notes: "insert notes here!"
});
