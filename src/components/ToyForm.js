import React, {useState} from "react";



function ToyForm( {addNewToy}) {
    const [ name, setName]  = useState("")
    const [ image, setImage] = useState("")

  function handleSubmit(e) {
   e.preventDefault()

   const formData = {
    name:  name,
    image: image,
   }

  fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
  },
      body: JSON.stringify(formData)
  })
     .then((resp) => resp.json())
     .then((newToy) => addNewToy(newToy))

     setName("")
     setImage("")
}




  return (
    <div className="container">
      <form onSubmit = {handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value = {image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
