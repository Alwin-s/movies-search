
import './App.css';
import Row from './Components/Row';
import Search from './Search';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import requests from "./Components/request"
import Footer from "../src/Components/Footer"


function App() {
  return (
    <div className="App">
    
  <Search isPoster={true}  fetchUrl={requests.fetchNetflixOriginals}/>
 {/* <Row isPoster={true}  fetchUrl={requests.fetchTrending} /> */}
 <Footer/>
    </div>
  );
}

export default App;
