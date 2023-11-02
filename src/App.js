import Home from "./pages/Home/Home.js";
import TaskDetailsContextProvider from "./context/TaskDetailsContextProvider.jsx";
import Alert from "./components/Alert/Alert.js";

function App() {
  return (
    <>
      <TaskDetailsContextProvider>
        <div className="App">
          <Alert />
          <Home />
        </div>
      </TaskDetailsContextProvider>
    </>
  );
}

export default App;
