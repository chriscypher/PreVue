$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMusic(searchText);
      e.preventDefault();
   });
});

function getMusic(searchText) {
    axios.get('https://itunes.apple.com/search?term='+searchText)
        .then((response) => {
            console.log(response);
            let music = response.data.results;
            let output = '';
            $.each(music, (index, album) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${album.artworkUrl100}">
                        <h5>${album.trackName}</h5>
                        <audio controls><source src="${album.previewUrl}"></audio>
                        <br>
                        <a onclick="musicSelected('${album.artistId}')" class="btn btn-primary" href="#">Artist Details</a>
                    </div>
                </div>
                `;
            });

            $('#music').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function musicSelected(id) {
    sessionStorage.setItem('artistId', id);
    window.location = 'music.html';
    return false;
}

function getTrack() {
    let artistId = sessionStorage.getItem('artistId');

    axios.get('https://itunes.apple.com/lookup?id='+artistId)
        .then((response) => {
            console.log(response);
           /* let music = response.data.results;
            let output = '';
            $.each(music, (index, album) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${album.artworkUrl100}">
                        <h5>${album.trackName}</h5>
                        <audio controls><source src="${album.previewUrl}"></audio>
                        <br>
                        <a onclick="musicSelected('${album.trackId}')" class="btn btn-primary" href="#">Album Details</a>
                    </div>
                </div>
                `;
            });

            $('#music').html(output); */
           let artist = response.data;
           console.log($(artist.artistLinkUrl));

        })
        .catch((err) => {
            console.log(err);
        });

    // }
}
