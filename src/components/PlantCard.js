import React, {useState} from "react";

function PlantCard({plant, onDelete, onUpdate}) {

  const [inStock, setInStock] = useState(true)
  const [newPrice, setNewPrice] = useState(0)

  function handleStock(){
    setInStock(prevInStock => !prevInStock)
  }

  function handleDelete(){
    fetch(`http://localhost:6001/plants/${plant.id}`,{
      'method':"DELETE"
    })
    .then((response) => response.json())
    .then((deletedToy) => {
      onDelete(deletedToy)
    })
  }

  function changePrice(e){
    setNewPrice(e.target.value)
  }

  function handlePriceChange(){
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'price': newPrice
      })
    })
    .then(response => response.json())
    .then((price) => {
      onUpdate(price)
    })
    setNewPrice(0)
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <label>Edit Price:</label><input type="number" step="0.01" name="price" value={newPrice} onChange={changePrice} onBlur={handlePriceChange}></input>
        <button className={inStock ? "primary" : ""} onClick={handleStock}>{inStock ? "In Stock" : "Sold Out"}</button>
        <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
