const clientId = "f4bb030ea8b747d08c3252c35c2e143f";
const redirectUri = "http://localhost:3000/";
let accessToken = "";

const Spotify = {
    getAccessToken(){
        //1er check: l'access token est defini?
        if(accessToken) return accessToken;

        // Si accessToken non défini: Récupération du token + temps d'expiration dans l'URL
        const tokenInUrl = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        //2eme check: access token + expiration présents dans l'url?
        if(tokenInUrl && expiryTime){

            //Definir les variables token et expiration
            accessToken = tokenInUrl[1];
            const expiresIn = Number(expiryTime[1]);

            //Definir l'expiration du token
            window.setTimeout(() => accessToken='', expiresIn*1000);

            //Reset les paramètres de l'URL
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        //3eme check: recupération du token via connexion si 1er et 2eme check sont faux. 
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = redirect;
    },

    search(term){
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(!jsonResponse){
                console.error("Response error");
            } 
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                albumImg: track.album.images[0].url,
                uri: track.uri,
            }))
        })
    },

    save(playlistName, arrayUri){
        if(!playlistName || !arrayUri) return ;
        const aToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${aToken}`} ;
        let userId;

        return fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: header,
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(!jsonResponse){
                console.error("Request for User ID: error");
            }
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: "POST",
                headers: header,
                body: JSON.stringify({"name": playlistName}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
                    method:"POST",
                    headers: header,
                    body: JSON.stringify({"uris": arrayUri })
                });
            })
        });
    }
};



export default Spotify
