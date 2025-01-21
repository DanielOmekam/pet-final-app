import React, { useEffect, useState } from 'react';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div>
      <h2>All Pets</h2>
      {pets.length === 0 && <p>No pets found.</p>}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <strong>{pet.name}</strong> ({pet.species}), {pet.age || 'N/A'} yrs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
