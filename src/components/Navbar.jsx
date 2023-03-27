import { useNavigate } from "react-router-dom";
import '../styles/Styles.css';

export default function Navbar() {
  const navigate = useNavigate();
  const toCharacterList= () => navigate('/my-characters');
  const toLogin= () => navigate('/login');
  const toHome= () => navigate('/');

  return (
    <div className="navbar bg-black bg-base-100 image-full max-h-fit">
      <div className="flex-1">
        <button onClick={toHome}  className="btn btn-ghost normal-case text-xl"><strong className="sanctum">SANCTUM </strong>Games</button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="px-6">
            <button className="btn btn-ghost normal-case text-lg" onClick={toCharacterList}>Characters</button>
          </li>
          <li>
            <button className="btn btn-ghost normal-case text-lg" onClick={toLogin}>Log in</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
