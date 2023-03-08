export default function Navbar() {
  return (
    <div className="navbar bg-black bg-base-100 image-full max-h-fit">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl"><strong style={{color:'white'}}>SANCTUM </strong>Games</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="px-6">
            <a>Characters</a>
          </li>
          <li>
            <a>Log in</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
