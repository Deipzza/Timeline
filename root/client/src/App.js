import './App.css';
// import './assets/tailwind.css';
import Header from './components/Header';
import Timeline from './components/Timeline';

const  App = () => {

  

  return (
    <div className="App">
      <Header title="My timeline!"/>
      <Timeline />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  );
}

export default App;