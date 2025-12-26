const liste_players=[{
    nom:"Raïssa",
    genre:"F",
    positions:["AG","AD"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Paul",
    genre:"H",
    positions:["P"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Jordan",
    genre:"H",
    positions:["AG","ARG","ARD"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"P.A.",
    genre:"H",
    positions:["ARG","D.C","ARD"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Félicien",
    genre:"H",
    positions:["ARG","ARD","P"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Cédric",
    genre:"H",
    positions:["ARD","P","ARG"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Justine",
    genre:"F",
    positions:["ARG","ARD","D.C"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Céline",
    genre:"F",
    positions:["D.C","ARD","ARG"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"François",
    genre:"H",
    positions:["AG","AD","P"],
    isGoalKeeper:false,
    onField:false,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
},
{
    nom:"Eglantine",
    genre:"F",
    positions:["G"],
    isGoalKeeper:true,
    onField:true,
    timePlayed:0,
    tps_dep_derniere_entree:0,
    tps_banc:0
}];

liste_tampon=[]
players=[]
liste_joueur=[]
liste_jo_terrain=[]
liste_jo_banc=[]
div_depart=document.getElementById("depart")

liste_players.forEach(j=>{

    let bouton=document.createElement("button");
    bouton.textContent=j.nom;
    bouton.classList.add("btn-player");
    div_depart.appendChild(bouton);
    bouton.addEventListener("click",()=>{
        if(liste_tampon.includes(j)){
            alert("Le joueur est déjà dans la liste des joueurs présents")
        }else{liste_tampon.push(j);
        bouton.style.backgroundColor="red"}
        
    });
})
valid=document.getElementById("valid_joueur")
valid.addEventListener("click", () => {

    if(players.length!=0){
        alert("Vous avez déjà validé les joueurs présent")
    }else{
        players=liste_tampon
        players.forEach(joueur => {

        liste_joueur.push(joueur.nom);

        const element = document.createElement("button");
        element.id = joueur.nom;
        element.classList.add("ajout_joueur_terrain")
        element.textContent = joueur.nom;

        element.addEventListener("click", () => {

            if (liste_jo_terrain.length >= 7) {
                alert("Il y a déjà sept joueurs sur le terrain");
                return;
            }

            if (joueur.onField && joueur.nom !== "Eglantine") {
                alert("Ce joueur est déjà sur le terrain");
                return;
            }

            joueur.onField = true;
            liste_jo_terrain.push(joueur);

            const index = liste_joueur.indexOf(joueur.nom);
            if (index !== -1) liste_joueur.splice(index, 1);

            // Mise à jour affichage
            const div_affichage = document.getElementById("liste_terrain");
            const sup = document.getElementById("joueur_terrain");
            if (sup) sup.remove();

            const div_texte = document.createElement("div");
            div_texte.id = "joueur_terrain";
            div_texte.textContent = liste_jo_terrain.map(j => j.nom).join(", ");

            div_affichage.appendChild(div_texte);
        });

        document.getElementById("container").appendChild(element);
    });}
    
});




chrono=document.getElementById("chrono");
resetBtn=document.getElementById("reset");
stopBtn=document.getElementById("stop");
startBtn=document.getElementById("start");

heures=0;
minutes=0;
secondes=0;

var timeout;
var intervalTempsJeu = null;
estArrete = true;


function demarrer(){
    if(estArrete){
        estArrete=false;
        defilerTemps();
        afficherJoueurs();
        affich_temps();
         }
    intervalTempsJeu = setInterval(() => {
            players.forEach(joueur => {
                if(joueur.onField){
                    joueur.timePlayed=joueur.timePlayed+=1/60;
                joueur.tps_dep_derniere_entree+=1/60
                }else{
                    joueur.tps_banc+=1/60
                }});},1000);
    }


function arreter(){
    if(!estArrete){
        estArrete=true;
        clearTimeout(timeout)
        clearInterval(intervalTempsJeu);
       /* clearTimeout(timeoutPremiereProposition);
        clearInterval(intervalProposition);*/
    }
}
function defilerTemps(){
    if(estArrete) return;
    secondes=parseInt(secondes);
    minutes=parseInt(minutes);
    heures=parseInt(heures);
    secondes++;
    if(secondes==60){
        minutes++;
        secondes=0;
    }
    if(minutes==60){
        heures++;
        minutes=0;
    }
    if(secondes<10){
        secondes="0"+secondes;
    }
    if(minutes<10){
        minutes="0"+minutes
    }
    if(minutes==30&&secondes==0){arreter()}
    chrono.textContent=`${heures}:${minutes}:${secondes}`;
    timeout=setTimeout(defilerTemps,1000);
}



startBtn.addEventListener("click",demarrer)
stopBtn.addEventListener("click",arreter)
//resetBtn.addEventListener("click",reset)
joueurSortant = null;
joueurEntrant = null;

function clicJoueur(joueur){
    if (joueur.onField) {
        joueurSortant = joueur;
        
    } else {
        joueurEntrant = joueur;
        
    }

    verifierChangement();
}

function verifierChangement(){
    if (joueurSortant && joueurEntrant) {
        effectuerChangement(joueurSortant, joueurEntrant);
        joueurSortant = null;
        joueurEntrant = null;
    }
}

function selectionJoueur(joueur){
    if(joueur.onField){
        joueurSortant = joueur;
        console.log("Sortant :", joueur.nom);
    } else {
        joueurEntrant = joueur;
        console.log("Entrant :", joueur.nom);
    }

    if(joueurSortant && joueurEntrant){
        effectuerChangement(joueurSortant, joueurEntrant);
        joueurSortant = null;
        joueurEntrant = null;
    }
}

function effectuerChangement(sortant, entrant){
    sortant.onField = false;
    sortant.tps_dep_derniere_entree=0;
    entrant.onField = true;
    entrant.tps_banc=0;

    liste_jo_terrain = liste_jo_terrain.filter(j => j !== sortant);
    liste_jo_terrain.push(entrant);

    liste_jo_banc = liste_jo_banc.filter(j => j !== entrant);
    liste_jo_banc.push(sortant);

    // 🔹 Mise à jour de l’affichage sans ré-appeler clicJoueur
    afficherJoueurs();
}

function afficherJoueurs(){
    const terrainDiv = document.getElementById("liste_joueur_terrain");
    const bancDiv = document.getElementById("liste_banc");

    terrainDiv.innerHTML = "";
    bancDiv.innerHTML = "";
    const terrain = players.filter(j => j.onField && !j.isGoalKeeper);
    const maxTerrain = Math.max(...terrain.map(j => j.tps_dep_derniere_entree));
    const joueur_max_temps = terrain.filter(
        j => j.tps_dep_derniere_entree === maxTerrain
    );
     

    players.forEach(joueur => {

        let btn = document.createElement("button");
        btn.textContent = joueur.nom;
        const bloc=document.createElement("div");
        bloc.id="bloc_"+joueur.nom
        const temps=document.createElement("div");
        temps.id="temps_"+joueur.nom;
        temps.textContent="Temps: 0";

        bloc.appendChild(btn);
        bloc.appendChild(temps);
         
        if(joueur.onField){
           
            terrainDiv.appendChild(bloc);
             if(joueur_max_temps.includes(joueur)){btn.style.backgroundColor = "red";}else{btn.style.backgroundColor = "green";}
            btn.style.color="white";
            
        } else {
            bancDiv.appendChild(bloc);
            btn.style.backgroundColor = "blue";
            btn.style.color="white";
            
        }

        btn.addEventListener("click", () =>{
            selectionJoueur(joueur);
            btn.style.backgroundColor="yellow"
            btn.style.color="black"
        })
    });
    
}

function affich_temps(){
     
    setInterval(()=>{
        players.forEach(j => {

            let tps;
            let label;

            if(j.onField){
                tps = j.tps_dep_derniere_entree;
                label = "Terrain";
            } else {
                tps = j.tps_banc;
                label = "Banc";
            }

            const tps_tot = j.timePlayed;

            const divTemps = document.getElementById("temps_" + j.nom);
            if (!divTemps) return;

            divTemps.textContent =
                `${label} : ${tps.toFixed(2)} min | Temps total joué : ${tps_tot.toFixed(2)} min`;
     })  },1000);
    }
var zero=document.getElementById("zero")
zero.addEventListener("click",()=>{
    chrono.textContent="00:00:00";
    
    heures=0;
    minutes=0;
    secondes=0;
    liste_players.forEach(joueur=>{
        if(joueur.nom!=="Eglantine"){
            joueur.onField=false
        }
        joueur.timePlayed=0;
        joueur.tps_dep_derniere_entree=0;
        joueur.tps_banc=0;
        
    })
    afficherJoueurs();
    arreter();
    document.querySelectorAll("#depart .btn-player").forEach(btn => {
    btn.style.backgroundColor = "white";
   
});

    document.getElementById("container").innerHTML = "";
    document.getElementById("liste_joueur_terrain").innerHTML = "";
    document.getElementById("liste_banc").innerHTML = "";
    const sup = document.getElementById("joueur_terrain");
            if (sup) sup.remove();
    liste_tampon=[];
    players=[];
    liste_jo_terrain=[];
    liste_jo_banc=[];
    liste_joueur=[];

})
        

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => console.log("Service Worker OK"))
    .catch(err => console.error("SW erreur", err));
}

