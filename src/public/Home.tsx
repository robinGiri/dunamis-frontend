import Hero from "./Hero";
import NavigationBar from "./NavigationBar";
import Degree from "./Degree";
import ScheduleVisit from "./ScheduleVisit";
import Bottom from "./Bottom";

const Home = () => {
  return (
    <div>
      <div className="p-4">
        <NavigationBar />
        <main>
          <Hero onEnter={() => alert("Entering...")} />
          <Degree />
          <ScheduleVisit />
        </main>
      </div>
      <Bottom />
    </div>
  );
};

export default Home;
