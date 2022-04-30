
const image_checked_url ='./images/checked.png'
const image_uncheched_url='./images/unchecked.png'

const risposte = document.querySelectorAll('.choice-grid div');
for(const risp of risposte){
    risp.addEventListener('click',check);
}
function check(event){
    const item = event.currentTarget;
    let img = item.querySelector('.checkbox');
    img.src = image_checked_url;
    item.classList.remove("opaco");
    item.classList.add("selezionato");



    for(const risp of risposte){

        if(risp.dataset.questionId===item.dataset.questionId && risp.dataset.choiceId !== item.dataset.choiceId){
            risp.classList.remove("selezionato");
            risp.classList.add("opaco");
            risp.querySelector(".checkbox").src=image_uncheched_url;
            TakenBoxes[item.dataset.questionId] = item.dataset.choiceId;

        }
        
        
    }
    controllaRisposte();
}

function controllaRisposte(){
    if(TakenBoxes["one"] && TakenBoxes["two"] &&TakenBoxes["three"]){
       
        mostraRisultato();
        for(const risp of risposte){
            risp.removeEventListener('click',check);
        }
    }

    

}


function mostraRisultato(){
    const risultato=document.querySelector("#risultato");
    risultato.classList.remove("nascosto");
    if(TakenBoxes["one"]===TakenBoxes["two"]||TakenBoxes["one"]===TakenBoxes["three"]){
        risultato.querySelector("span").textContent=RESULTS_MAP[TakenBoxes["one"]].title;
        risultato.querySelector("p").textContent=RESULTS_MAP[TakenBoxes["one"]].contents;

    }
    else if( TakenBoxes["two"]===TakenBoxes["three"]){
        risultato.querySelector("span").textContent=RESULTS_MAP[TakenBoxes["two"]].title;
        risultato.querySelector("p").textContent=RESULTS_MAP[TakenBoxes["two"]].contents;


    }
    else {  
         risultato.querySelector("span").textContent=RESULTS_MAP[TakenBoxes["one"]].title;
    risultato.querySelector("p").textContent=RESULTS_MAP[TakenBoxes["one"]].contents;



    }

}
function reimpostaQuiz(){
    delete TakenBoxes.one;
    delete TakenBoxes.two;
    delete TakenBoxes.three;
    for(const risp of risposte){
        risp.addEventListener('click',check);
        risp.classList.remove("opaco");
        risp.classList.remove("selezionato");
        risp.querySelector(".checkbox").src=image_uncheched_url;

    }
    const risultato=document.querySelector("#risultato");
    risultato.classList.add("nascosto");
    


}

const TakenBoxes={};
const restart=document.querySelector("#risultato button");
restart.addEventListener("click",reimpostaQuiz);

 const form=document.querySelector('#ricerca');

 form.addEventListener('submit',search);

 function search(event){
     event.preventDefault();
     const title_input=document.querySelector('#title');
     const title_value=encodeURIComponent(title_input.value);
     console.log('Ricerca in corso: ' + title_value);
     rest_url='https://api.tvmaze.com/search/shows?q=' + title_value;
     console.log('URL:' + rest_url);
     fetch(rest_url).then(onResponse).then(onJson);
}

 function onJson(json){
     const info=document.querySelector('#information');
     info.innerHTML='';
     console.log(json.length);
     
    const serie=document.createElement('div');
    
    serie.classList.add('serie');
    const result=json;
    const titolo=document.createElement('span');
    const nome=result[0].show.name;
    
    titolo.textContent=nome;
    serie.appendChild(titolo);
    const img = document.createElement('img');
    img.src=result[0].show.image.original;
    serie.appendChild(img);
    let gener=document.createElement('span');
    const gen=result[0].show.genres;
    gener.textContent=gen;
    serie.appendChild(gen);
    const riassunto=document.createElement('span');
    riass=result[0].show.summary;
    riassunto.textContent=riass;
    serie.appendChild(riassunto);
    info.appendChild(serie);
    
       
       

    }



function onResponse(response){
    return response.json();
}

function onError(error){
    console.log("error: " + error)
}

