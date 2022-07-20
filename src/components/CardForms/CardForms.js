import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"

function CardForms({deck, cardActions, id="",front="", back=""}) {

  const initialFormState = {
    front: front,
    back: back,
    id: id, 
    deckId: deck
  };
  const [ formData, setFormData ] = useState({ ...initialFormState });
  const history = useHistory();
  //needs a submit handler
  const submitHandler = async(event) => {
    event.preventDefault(); 
    try {
      cardActions(formData); 
      setFormData({ ...initialFormState });
    } catch (error) {
      console.log(error.message)
    }
  };


  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  useEffect(()=> {
    setFormData({front: front, back: back, id: id, deckId: deck})
  }, [front, back, id, deck])

  function handleCancel(){
    history.push(`/decks/${deck}`)
  }
 
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            onChange={handleChange}
            className="form-control"
            name="front"
            value={formData.front}
            placeholder="Front side of card"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            onChange={handleChange}
            className="form-control"
            name="back"
            value={formData.back}
            placeholder="Back side of card"
            rows="3"
          />
        </div>
        <div className="row">
          <div className="col">
            <button onClick={handleCancel} className="btn btn-secondary mr-2" type="button">
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForms;
