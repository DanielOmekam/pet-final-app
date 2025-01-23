const BASE_URL = 'http://localhost:8080'; // Adjust if needed

// Helper function to add Authorization headers for authenticated requests
function getAuthHeaders() {
  const token = localStorage.getItem('jwt_token');
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
}

// ----------------- USERS -----------------
export async function registerUser(email, password) {
  const res = await fetch(`${BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ----------------- PETS ------------------
export async function getPets() {
  const res = await fetch(`${BASE_URL}/api/pets`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getPetById(id) {
  const res = await fetch(`${BASE_URL}/api/pets/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createPet({ name, species, age }) {
  const res = await fetch(`${BASE_URL}/api/pets`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, species, age }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ----------------- REVIEWS ---------------
export async function getReviewsForPet(petId) {
  const res = await fetch(`${BASE_URL}/api/reviews/pet/${petId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createReview({ userId, petId, rating, text }) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, petId, rating, text }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ----------------- COMMENTS --------------
export async function getCommentsForReview(reviewId) {
  const res = await fetch(`${BASE_URL}/api/comments/review/${reviewId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createComment({ userId, reviewId, text }) {
  const res = await fetch(`${BASE_URL}/api/comments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, reviewId, text }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateComment(commentId, newText) {
  const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ text: newText }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteComment(commentId) {
  const res = await fetch(`${BASE_URL}/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
