import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import Main from "./components/Main";
import SearchBar from "./components/SearchBar";

function MainPage(){
  return(
    <div>
      <SearchBar/>
      <Navbar active="1"/>
      <Gallery/>
      <Main/>
      <Footer/>
    </div>
  )
}
export default MainPage;