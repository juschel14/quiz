export const fetchWrapper = {   
    fetchData<T>(resourceUrl: string): Promise<T> {
        return fetch(resourceUrl).then(response => {
            // fetching the reponse body data
            return response.json().then(data => data as T);
          })
      }
};


