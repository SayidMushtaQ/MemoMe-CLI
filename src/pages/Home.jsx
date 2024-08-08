import { Link } from "react-router-dom";
import "../styles/Home.css";
import { validate } from "../helper/homeValidate";
import { useState, useEffect } from "react";
import { ErrorNotify, SuccessNotify } from "../util/notify";
const getColor = (index) => {
  if (index % 3 === 0) {
    //0,3,6,9,12
    return "red";
  } else if (index % 3 === 1) {
    //1,4,,7,10
    return "yellow";
  } else {
    return "blue";
  }
};
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [notes, setNotes] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(formData);
    if (!Object.keys(validationError).length) {
      try {
        const res = await fetch("/api/note/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        });
        const data = await res.json();
        if (data.success) {
          setNotes((preNotes) => {
            const updateNotes = [data.data, ...preNotes];
            return updateNotes.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          });
          setFormData({ title: "", description: "" });
          return SuccessNotify("Note created successfully🥳");
        }
      } catch (err) {
        return ErrorNotify(
          "An error occurred while creating the note. Please try again 🫡🫠"
        );
      }
    } else {
      Object.values(validationError).forEach((error) => ErrorNotify(error));
    }
  };
  useEffect(() => {
    fetch("/api/note/notes")
      .then((res) => res.json())
      .then(({ data }) => {
        setNotes(
          data.notes.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      });
  }, [setNotes]);
  const frmatingDate = (timestamp) => {
    const date = new Date(timestamp);
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const time = date.toLocaleTimeString("en-GB", optionsTime); // '09:38'
    const formattedDate = date
      .toLocaleDateString("en-GB", optionsDate)
      .toUpperCase();

    return `${time} | ${formattedDate}`;
  };
  return (
    <>
      <div className="container-fuit nav">
        <div className="container-fluid row">
          <div className="col-12 col-xl-12 col-l-12 col-md-12 col-sm-12">
            <h1>THE NOTES TAKER</h1>
            <ul className="u">
              {/* <li><Link to={'/'} id="user">User</Link></li>&nbsp;&nbsp; */}
              <li className="use">
                <Link to={"/"} id="Signin">
                  User
                </Link>
              </li>
              &nbsp;&nbsp;
              <li className="icon">
                <i className="fa-solid fa-circle-user"></i>
              </li>
            </ul>
          </div>
        </div>

        <div className="h2">
          <h1>TAKE YOUR NOTES</h1>
        </div>

        <div className="container add">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1" className="leb">
                Add a Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="exampleFormControlInput1"
                placeholder="Add title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                value={formData.title}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1" className="leb">
                Add a Note
              </label>
              <textarea
                className="form-control"
                name="description"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Write something"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              ></textarea>
            </div>
            <button className="btn btn-success">Add Note</button>
          </form>
        </div>

        <div className="container all">
          <h2>All Your Notes</h2>
        </div>
        <div></div>
      </div>

      <section className="all-notes">
        <div className="notes-grid">
          {notes.length !== 0 ? (
            notes.map((item, index) => (
              <div key={item._id} className={`note-card ${getColor(index)}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="timestamp">
                  {frmatingDate(item.createdAt)}
                </span>
                <div className="card-action">
                  <button aria-labelledby="Delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 72 72"
                      fill="#e74c3c"
                    >
                      <path  d="M 32 13 C 30.895 13 30 13.895 30 15 L 30 16 L 17 16 C 14.791 16 13 17.791 13 20 C 13 21.973645 14.432361 23.602634 16.3125 23.929688 L 18.707031 52.664062 C 19.053031 56.811062 22.520641 60 26.681641 60 L 45.318359 60 C 49.479359 60 52.945969 56.811062 53.292969 52.664062 L 55.6875 23.929688 C 57.567639 23.602634 59 21.973645 59 20 C 59 17.791 57.209 16 55 16 L 42 16 L 42 15 C 42 13.895 41.105 13 40 13 L 32 13 z M 24.347656 24 L 47.652344 24 L 45.396484 51.082031 C 45.352484 51.600031 44.918438 52 44.398438 52 L 27.601562 52 C 27.081562 52 26.647469 51.600031 26.605469 51.082031 L 24.347656 24 z"></path>
                    </svg>
                  </button>
                  <button aria-labelledby="Edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      fill="#3498db"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.4,4.4l1.2,1.2L6.2,19H5v-1.2L18.4,4.4 M18.4,2c-0.3,0-0.5,0.1-0.7,0.3L3,17v4h4L21.7,6.3c0.4-0.4,0.4-1,0-1.4l-2.6-2.6 C18.9,2.1,18.7,2,18.4,2L18.4,2z"></path>
                      <path
                        d="M15.8 4.3H17.8V9.2H15.8z"
                        transform="rotate(-45.001 16.75 6.75)"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <span>
                Oops, it looks like you don&apos;t have any notes . . .
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
