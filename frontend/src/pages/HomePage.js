import { useNavigate } from "react-router-dom";

import "./HomePage.css";
function HomePage() {
  const navigate = useNavigate(); 

  const handleWebSearchRedirect = () => {
      navigate("/WebSearch"); 
  };
  const handleLocalSongSearchRedirect = () => {
    navigate("/LocalSongSearch"); 
  };
  return (
    
    <div className = "HomePage">
      <header className = "HomePage-header">
        <h1>Hello!</h1>
        <button
            className="HomePage-button"
            onClick={handleWebSearchRedirect}
          >
          Want To Search The Web?
        </button>
        <button
            className="HomePage-button"
            onClick={handleLocalSongSearchRedirect}
          >
          Want To Search For a Song?
        </button>
      </header>
    </div>
  );
}

export default HomePage;