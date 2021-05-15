import Card from "./components/Card";
import "./index.css";

function App() {
  return (
    <div
      className="bg-cover bg-center h-screen w-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg)",
      }}
    >
      <Card />
    </div>
  );
}

export default App;
