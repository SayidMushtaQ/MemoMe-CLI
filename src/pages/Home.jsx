import { Link } from "react-router-dom";
import "../styles/Home.css";
import { validate } from "../helper/homeValidate";
import { useState, useEffect } from "react";
import { ErrorNotify, SuccessNotify } from "../util/notify";
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
          console.log(data);
          setNotes(preNote=>[data.data,...preNote])
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
      .then(({ data }) => setNotes(data.notes));
  }, [setNotes]);
  const frmatingDate = (timestamp)=>{
    const date = new Date(timestamp);
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
    const time = date.toLocaleTimeString('en-GB', optionsTime); // '09:38'
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate).toUpperCase();

    return `${time} | ${formattedDate}`
  }
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
          {notes.length !== 0 ? notes.map((item) => (
              <div key={item._id} className="note-card red">
                <h3>{item.title}</h3>
                <p>
                 {item.description}
                </p>
                <span className="timestamp">{frmatingDate(item.createdAt)}</span>
              </div>
          )):(
            <div>
              <span>Oops, it looks like you don&apos;t have any notes . . .</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
