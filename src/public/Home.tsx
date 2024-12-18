import React from "react";
import NavigationBar from "./NavigationBar";

const Home = () => {
  return (
    <div className="">
      <NavigationBar />
      <main>
        <h1 className="text-2xl font-bold text-center mt-6">
          Welcome to the Home Page!
        </h1>
      </main>
    </div>
  );
};

export default Home;
