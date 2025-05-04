import React from "react";
import { Button } from "../components/ui/button";

const Home = () => {

    const testConnection = async () => {
        const res = await fetch("http://localhost:5000/api/test");
        const data = await res.json();
        console.log("From Backend:", data.msg);
        alert(`Backend: ${data.msg}`);
      };
      
    return (
        <div className="home">
            <h2 className="page-header">Welcome to Travel Tracker</h2>

            <Button className="mt-4" onClick={() => window.location.href = "/login"}>
                Login or Sign up to Start Planning your Next Trip!
            </Button>

        </div>
    );
};

export default Home;
