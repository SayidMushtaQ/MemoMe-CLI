import { ErrorNotify, SuccessNotify } from "../util/notify";
import {useAuth} from '../hook/useAuth'
export default function Delete({ noteID,setNotes }) {
  const {authToken} = useAuth()
  const handleDelete = async (noteID) => {
    try {
     const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ noteID }),
      });
      if(res.ok){
        setNotes((preNotes)=>preNotes.filter((item)=>item._id!=noteID))
        return SuccessNotify("Note deleted successfully😊");
      }
    } catch (err) {
      return ErrorNotify(
        "An error occurred while creating the note. Please try again 🫡🫠"
      );
    }
  };
  return (
    <button aria-labelledby="Delete" onClick={() => handleDelete(noteID)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 72 72"
        fill="#e74c3c"
      >
        <path d="M 32 13 C 30.895 13 30 13.895 30 15 L 30 16 L 17 16 C 14.791 16 13 17.791 13 20 C 13 21.973645 14.432361 23.602634 16.3125 23.929688 L 18.707031 52.664062 C 19.053031 56.811062 22.520641 60 26.681641 60 L 45.318359 60 C 49.479359 60 52.945969 56.811062 53.292969 52.664062 L 55.6875 23.929688 C 57.567639 23.602634 59 21.973645 59 20 C 59 17.791 57.209 16 55 16 L 42 16 L 42 15 C 42 13.895 41.105 13 40 13 L 32 13 z M 24.347656 24 L 47.652344 24 L 45.396484 51.082031 C 45.352484 51.600031 44.918438 52 44.398438 52 L 27.601562 52 C 27.081562 52 26.647469 51.600031 26.605469 51.082031 L 24.347656 24 z"></path>
      </svg>
    </button>
  );
}
