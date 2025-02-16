import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://192.168.1.5:8000/portfolio")
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.error("Axios Error:", error));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default App;
