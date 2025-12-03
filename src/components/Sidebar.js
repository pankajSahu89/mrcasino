import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaGamepad, 
  FaBlog, 
  FaCog,
  FaSignOutAlt,
  FaExpand,
  FaCompress,
  FaPaintBrush
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

 const handleLogout = async () => {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen(); // Exit fullscreen
      setIsFullscreen(false);          // Update state
    } catch (err) {
      console.error("Failed to exit fullscreen:", err);
    }
  }
  navigate("/"); // Redirect after fullscreen is exited
};


  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Handle browser's native fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="sticky top-0 h-[100dvh] bg-gray-900 text-white p-5 overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button 
          onClick={toggleFullscreen}
          className="p-3 hover:text-blue-400 transition-colors"
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
      
      <ul className="space-y-4">
        {/* Existing menu items */}
        <li>
          <Link 
            to="/dashboard" 
            className={`flex items-center space-x-2 p-2 rounded ${
              location.pathname === "/dashboard" ? "bg-blue-500 text-white" : "hover:text-blue-400"
            }`}
          >
            <FaTachometerAlt /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/casinos-admin" 
            className={`flex items-center space-x-2 p-2 rounded ${
              location.pathname === "/casinos-admin" ? "bg-blue-500 text-white" : "hover:text-blue-400"
            }`}
          >
            <FaGamepad /> <span>Casinos</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/blogs-admin" 
            className={`flex items-center space-x-2 p-2 rounded ${
              location.pathname === "/blogs-admin" ? "bg-blue-500 text-white" : "hover:text-blue-400"
            }`}
          >
            <FaBlog /> <span>Blogs</span>
          </Link>
        </li>

        <li>
          <Link 
            to="/ThemePage" 
            className={`flex items-center space-x-2 p-2 rounded ${
              location.pathname === "/ThemePage" ? "bg-blue-500 text-white" : "hover:text-blue-400"
            }`}
          >
          <FaPaintBrush /> <span>Theme</span>
          </Link>
        </li>

        <li>
          <Link 
            to="/settings-admin" 
            className={`flex items-center space-x-2 p-2 rounded ${
              location.pathname === "/settings-admin" ? "bg-blue-500 text-white" : "hover:text-blue-400"
            }`}
          >
            <FaCog /> <span>Settings</span>
          </Link>
        </li>
        
        {/* Logout Button */}
        <li>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded w-full hover:text-blue-400"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>


      </ul>
    </div>
  );
};

export default Sidebar;