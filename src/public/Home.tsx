import Hero from "./Hero";
import NavigationBar from "./NavigationBar";

const Home = () => {
  return (
    <div className="p-4">
      <NavigationBar />
      <Hero onEnter={() => alert('Entering...')} />
      <main>
        <h1 className="text-2xl font-bold text-center mt-6">
          Welcome to the Home Page!
        </h1>
      </main>
    </div>
  );
};

export default Home;
