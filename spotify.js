function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);
    
    const finale = document.querySelector('#music');
    finale.innerHTML = '';
    
    const tracks = json.tracks.items;
    
      
      const title = tracks[0].name;
      const immagine = tracks[0].album.images[0].url;
      const artisti = tracks[0].artists[0].name;
      const art = document.createElement('span');
      art.textContent = "Autori: " + artisti  ;
      const Traccia = document.createElement('div');
      Traccia.classList.add('canzone');
      const img = document.createElement('img');
      img.src = immagine;
      const titolo = document.createElement('span');
      titolo.textContent = title;
      Traccia.appendChild(img);
      Traccia.appendChild(titolo);
      Traccia.appendChild(art);
      finale.appendChild(Traccia);
    
  }
  
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search2(event)
  {
    
    event.preventDefault();
    
    const music_input = document.querySelector('#canzone');
    const music_value = encodeURIComponent(music_input.value);
    console.log('Eseguo ricerca: ' + music_value);
    // Esegui la richiesta
    fetch("https://api.spotify.com/v1/search?type=track&q=" + music_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
  }
  
  function onTokenJson(json)
  {
    console.log(json)
    
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  
  const client_id = '025acd206c1b43d7836083b49337964a';
  const client_secret = '1b01c79a1e8b471f8bcdda025876e61f';
  
  let token;
  
  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  // Aggiungi event listener al form
  const form2 = document.querySelector('#spotify');
  form2.addEventListener('submit', search2)