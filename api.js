async function api(link) {
  try {
    const res = await fetch(link);
    const data = await res.json();
    return data;
  }
  
  catch (e) {
    console.error(e.message);
  }
}

export default api;