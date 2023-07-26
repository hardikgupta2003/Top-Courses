import React, { useEffect, useRef, useState } from "react";
import Spinner from "./components/Spinner"
import Navi from "./components/Navi";
import Cards from "./components/Cards"
import Filt from "./components/Filt"
import { apiUrl, filterData } from "./data"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [loading, setloading] = useState(true);
  const [courses, setcourses] = useState([]);
  const [category, setCategory] = useState(filterData[0].title);


  async function fetchData() {
    setloading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      setcourses(output.data);
    }
    catch (error) {
      toast.error("network connection issue");
    }
    setloading(false);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (

    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>

        <Navi></Navi>

      </div>
      <div className="bg-bgDark2">
        <div>
          <Filt filterData={filterData}
            category={category} setCategory={setCategory}>

          </Filt>

        </div>

        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">

          {
            loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)
          }

        </div>
      </div>
    </div>
  )
};

export default App;
