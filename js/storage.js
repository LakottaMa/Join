const STORAGE_TOKEN = 'Q9WOOSU9Y423XH6NT7LTTFAFDNZ3EXH9ZNOH5V44';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [
    { 'user': 'Guest', 'email': 'guest@guest.de', 'password': '12345', 'tasks': [] }
  ];
  
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


/** lösch function */
async function deleteItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    const payload = { key, token: STORAGE_TOKEN };
    return fetch(url, { method: 'DELETE', body: JSON.stringify(payload) })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Delete failed with status: ${res.status}`);
        }
      })
      .then(response => {
        console.log(`Item with key "${key}" deleted successfully.`);
        return response;
      });
}
