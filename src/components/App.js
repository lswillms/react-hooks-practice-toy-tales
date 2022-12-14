import React, { useState, useEffect} from "react";
import ToyCard from "./ToyCard"
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";


function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const [updateComplete, setUpdateComplete] = useState(0)


  function addNewToy(newToy) {
    setToys([...toys, newToy])
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("  http://localhost:3001/toys")
    .then((resp) => resp.json())
    .then((data) => setToys(data))
  }, [updateComplete])

  function handleLikeButton(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1})
    })
      .then((resp) => resp.json())
      .then(() => setUpdateComplete(updateComplete + 1))
    }


  const toysToDisplay = toys.map((toy)=> (
    <ToyCard
      key = {toy.id}
      toy = {toy}
      handleDeleteList= {handleDeleteList}
      handleLikeButton = {handleLikeButton}
      ></ToyCard>
  ))

function handleDeleteList(deletedToy) {
  const listAfterDelete = toys.filter((toy) => toy.id !== deletedToy.id )
  setToys(listAfterDelete)
}



  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer  toysToDisplay = {toysToDisplay}/>
      <ToyForm addNewToy = {addNewToy}/>
    </>
  );
}

export default App;
