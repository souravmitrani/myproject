
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import 'remixicon/fonts/remixicon.css'
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import "chart.js/auto"

function App() {
  return (
    <>
     <AppRoutes/>
     <Toaster/>
    </>
   
  );
}

export default App;
