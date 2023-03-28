import { useNavigate } from 'react-router-dom';
import '../styles/Styles.css'

export default function CharacterList () {   
    const navigate = useNavigate();
    //* Loading character list from local storage
    const json = localStorage.getItem("characters");
    const characters= JSON.parse(json);
  
    const toCharacterCreation = () =>navigate('/new-char');

    return(
        <div>
            <p>Character List</p>
            {characters &&
                characters.map((characters) => {
                    return(
                    <button key={characters.name} className="characters-btn">
                        <p>
                            <strong>{characters.charName}</strong>
                        </p>
                        <p>
                            {characters.class}
                        </p>
                        <p>Level: {characters.level}</p>
                    </button>
                )})
            }
            <button onClick={toCharacterCreation}>
                Create a new Character
            </button>
        </div>
    )
}
