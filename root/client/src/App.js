import Header from './components/Header';
import Timeline from './components/Timeline';

const  App = () => {

  return (
    <div className='app'>
      <Header title="My timeline!" />
      <Timeline />
    </div>
  );
}

export default App;