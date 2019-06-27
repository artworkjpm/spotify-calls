playTrack() {
    fetch("https://api.spotify.com/v1/me/player/play", {
      headers: { Authorization: "Bearer " + parsed },
      method: "PUT"
    })
      .then(response => response.json())
      .catch(error =>
        this.setState({
          log: console.error("Error:", error)
        })
      );
  }


  fakeClick() {
    var getButton = [...document.querySelectorAll("button[title=Play]")];
    console.log("button: " + getButton);
  }


  goBackError() {
    this.props.history.goBack();
  }