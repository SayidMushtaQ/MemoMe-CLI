import "../styles/Home.css";
import { validate } from "../helper/homeValidate";
import { useState, useEffect } from "react";
import { ErrorNotify, SuccessNotify } from "../util/notify";
import Edit from "../components/cardEdit";
import Delete from "../components/cardDelete";
import Profile from "../components/userProfile";
import { useAuth } from "../hook/useAuth";
const getColor = (createdAt) => {
  const currentHour = new Date(createdAt).getHours()
  if (currentHour >= 5 && currentHour < 12) {
    return "red";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "yellow";
  } else if(currentHour >= 18 && currentHour < 21){
    return "blue";
  }
};
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { user, authToken } = useAuth();
  const [notes, setNotes] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(formData);
    if (!Object.keys(validationError).length) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/note/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
            credentials: "include",
          }
        );
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
    setCardLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/note/notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setCardLoading(false);
        setNotes(
          data.notes.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      });
  }, [setNotes, authToken]);
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
              <Profile email={user.email} userName={user.userName} />
            </ul>
          </div>
        </div>

        <div className="home-wrapper">
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
        </div>
        <div></div>
      </div>

      <section className="all-notes">
        <div className="notes-grid">
          {notes.length !== 0 ? (
            notes.map((item, index) => (
              <div key={item._id} className={`note-card ${getColor(item.createdAt)}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="timestamp">
                  {frmatingDate(item.createdAt)}
                </span>
                <div className="card-action">
                  <Delete noteID={item._id} setNotes={setNotes} />
                  <Edit
                    title={item.title}
                    description={item.description}
                    noteID={item._id}
                    setNotes={setNotes}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              {cardLoading ? (
                <p>Loading your notes ...</p>
              ) : (
                <span>
                  Oops, it looks like you don&apos;t have any notes . . .
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
