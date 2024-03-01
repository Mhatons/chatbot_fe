import './App.css';
import { LogoImg, sampleBg, sampleBgTwo } from './assets/images';
import ChatBox from './components/chartBox';

function App() {
  return (
    <div className="App relative">
      <div>
        <div className='w-[12em]'>
          <img src={LogoImg} alt='' className='w-full object-cover' />
        </div>
        <div className='h-screen top-0 -z-10 absolute w-full'>
          <img src={sampleBgTwo} alt='' className='w-full h-full object-cover' />
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
