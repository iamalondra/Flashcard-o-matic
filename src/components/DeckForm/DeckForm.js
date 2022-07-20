import React, { useEffect, useState } from "react";
import { createDeck } from "../../utils/api";
import { useHistory } from "react-router-dom";


function DeckForm({deck, handleSubmit, id, name = "", description = "" }) {
  const initialFormState = {
    id: id,
    name: name,
    description: description,
  };
  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const submitHandler = async(event) => {
    event.preventDefault();
    try {
      handleSubmit(formData); 
      setFormData({ ...initialFormState });
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleChange = ({ target }) => {
    const value = target.type === "checkBox" ? target.checked : target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  useEffect(()=> {
    setFormData({name: name, description: description, id: id})
  }, [name, description, id])

  function handleCancel(){
    history.push(`/decks/${deck.id}`)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={handleChange}
            className="form-control"
            name="name"
            value={formData.name}
            placeholder="Deck Name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            onChange={handleChange}
            className="form-control"
            name="description"
            value={formData.description}
            placeholder="Brief description of the deck"
            rows="3"
          />
        </div>
        <div className="row">
          <div className="col">
            <button onClick={handleCancel} className="btn btn-secondary mr-2" type="button">
              cancel
            </button>
            <button className="btn btn-primary" type="submit">
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;
