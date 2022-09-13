const baseUrl = "http://127.0.0.1:4000";
const headers = { 
  "Content-Type": "application/json", 
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function register({ email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  })
  .then((res) => checkResponse(res));
}

export function authorize({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res));
}
 