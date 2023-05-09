import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")
  let searchedPlant = plants.filter((plant) => plant.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then((plant) => {
      setPlants(plant)
    })
  }, [])

  function handleNewPlant(newPlant) {
    setPlants([...plants, newPlant])
  }

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function handleDelete(deletedPlant) {
    const updatedPlants = plants.filter((plant) => plant.id !== deletedPlant.id)
    setPlants(updatedPlants)
  }

  function handleUpdate(updatedPlant) {
    const updatedPrice = plants.map((plant) => plant.id === updatedPlant.id ? updatedPlant : plant)
    setPlants(updatedPrice)
  }

  return (
    <main>
      <NewPlantForm onNew={handleNewPlant}/>
      <Search onSearch={handleSearch}/>
      <PlantList plants={searchedPlant} onDelete={handleDelete} onUpdate={handleUpdate}/>
    </main>
  );
}

export default PlantPage;
