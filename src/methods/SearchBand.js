export const onSearchBands = name => {
  let parsed = new URLSearchParams(window.location.search).get("access_token");
  parsed = { token: parsed };
  console.log(parsed.token);
  let searchName = this.state.searchName === "" ? "The Cure" : name;
  let headersAPI = {
    headers: { Authorization: "Bearer " + parsed.token }
  };

  //search band
  fetch(
    `https://api.spotify.com/v1/search?q=${searchName}&type=artist`,
    headersAPI
  )
    .then(response => response.json())
    .then(data =>
      this.setState({
        artistName: data.artists.items[0],
        log: console.log(data),
        image: data.artists.items[0].images[0].url
      })
    )
    .catch(error =>
      this.setState({
        log: console.error("Error:", error),
        errorApi: true
      })
    );
};
