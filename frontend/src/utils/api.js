const BASE_URL = 'http://localhost:8080'; // Adjust if needed

// ----------------- USERS -----------------
export async function registerUser(email, password) {
  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Registration request failed');
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login request failed');
  return res.json();
}

// ----------------- PETS ------------------
export async function getPets() {
  const res = await fetch(`${BASE_URL}/api/pets`);
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
}

export async function getPetById(id) {
  const res = await fetch(`${BASE_URL}/api/pets/${id}`);
  if (!res.ok) throw new Error('Failed to fetch pet');
  return res.json();
}

export async function createPet({ name, species, age }) {
  const res = await fetch(`${BASE_URL}/api/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, species, age })
  });
  if (!res.ok) throw new Error('Failed to create pet');
  return res.json();
}

// ----------------- REVIEWS ---------------
export async function getReviewsForPet(petId) {
  const res = await fetch(`${BASE_URL}/api/reviews/pet/${petId}`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function createReview({ userId, petId, rating, text }) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, petId, rating, text })
  });
  if (!res.ok) throw new Error('Failed to create review');
  return res.json();
}

// (Update or delete reviews could be added here if you want them in the UI)

// ----------------- COMMENTS --------------
export async function getCommentsForReview(reviewId) {
  const res = await fetch(`${BASE_URL}/api/comments/review/${reviewId}`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function createComment({ userId, reviewId, text }) {
  const res = await fetch(`${BASE_URL}/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, reviewId, text })
  });
  if (!res.ok) throw new Error('Failed to create comment');
  return res.json();
}

export async function updateComment(commentId, newText) {
  const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  });
  if (!res.ok) throw new Error('Failed to update comment');
  return res.json();
}

export async function deleteComment(commentId) {
  const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete comment');
  return res.json();
}
