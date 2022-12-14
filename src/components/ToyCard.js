import React from "react";

function ToyCard( {toy, handleDeleteList, handleLikeButton}) {

  function handleDeleteToy() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE"
    })
    .then((resp) => resp.json())
    .then(() => handleDeleteList(toy))
  }

  
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button onClick  = {() => handleLikeButton(toy)} className="like-btn">Like {"<3"}</button>
      <button onClick={handleDeleteToy} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
