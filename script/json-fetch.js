const fetchData = async () => {
    return fetch('./script/produtos.json')
      .then(async response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        return fetchedData
      })
       .then(data => {
        return { data };
      })
      .catch(error => {
        return { error };
      });
  };

export { fetchData } 