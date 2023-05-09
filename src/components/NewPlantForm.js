import React, {useState} from "react";

function NewPlantForm({onNew}) {
const template = {name: "", image: "", price: 0}
const [form, setForm] = useState(template) 

function handleChange(e) {
  setForm({...form, [e.target.name]:e.target.value})
}

function handleSubmit(e) {
  e.preventDefault()
  fetch('http://localhost:6001/plants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then(resp => resp.json())
  .then(newPlant => {
    onNew(newPlant)
  })
}

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={form.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={form.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
