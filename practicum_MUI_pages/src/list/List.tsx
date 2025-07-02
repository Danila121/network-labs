import Navbar from "../components/Navbar";
import BuildingsGrid from "./components/BuildingsGrid"
import Footer from "../components/Footer";
export default function List() {
  return (
    <div>
        <Navbar active="2"/>
        <BuildingsGrid/>
        <Footer/>
    </div>
  );
}