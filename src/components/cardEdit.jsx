import { useState } from "react";
import { validate } from "../helper/homeValidate";
import { ErrorNotify, SuccessNotify } from "../util/notify";
export default function Edit({ title, description, noteID, setNotes }) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(formData);
    if (!Object.keys(validationError).length) {
      try {
        const res = await fetch("/api/note/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, noteID }),
        });
        const data = await res.json();
        
        if (data.success) {
          setNotes((preNotes) => {
            const updatedNotes = preNotes
              .filter((item) => item._id !== noteID)
              .concat(data.data)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return updatedNotes;
          });
          setEdit(false);
          return SuccessNotify("Note updated successfully 🥳");
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
  if (edit) {
    document.body.classList.add("active-model");
  } else {
    document.body.classList.remove("active-model");
  }
  return (
    <>
      <button aria-labelledby="Edit" onClick={() => setEdit(true)}>
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
      {edit && (
        <div className="edit-container">
          <div
            className="edit-sub-container"
            onSubmit={(e) => e.preventDefault()}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1" className="leb">
                  Add New Title
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
                  Add New Note
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  placeholder="Write something"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  value={formData.description}
                ></textarea>
              </div>
              <div className="edit-buttons">
                <button onClick={() => setEdit(false)}>Cancel</button>
                <button type="submit">Edit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
