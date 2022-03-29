/* eslint-disable max-len */
/*
come per angular è possibile compartimentare i componenti anche in plain javascript --> grazie all'utilizzo dei WEB COMPONENTS
1- NON sempre utilizzare un framework è la cosa più furba per un sito semplice in quanto ci sono dipendenze da librerie e dal framework stesso
2- I web components possono avere tag personalizzati <pippo-tag></pippo-tag> oppure <nome-qualcosa></nome-qualcosa> e vengono renderizzati come SPAN:
    --> quindi hanno display inline e occupano solo lo spazio necessario al testo
    --> non possono avere w e h perchè sono inline anziche inline-block
    --> devo cambirare il display per renderizzarlo
    --> NB è BUONA NORMA UTILIZZARE IL NOME DEL TAG CON UNA LINEA "-" dopo il nome per evitare che venga in futuro utilizzato il nome del nostro custom tag e che cambi la struttura della nostra applicazione!!
3- creo un file .js che si chiama (ma non è indispensabile) come il custom tag in cui vado a definirne le proprietà
    --> class 'nome tag' extends HTMLelement{}
    --> definisco il constructor() + il super(){} --> obbligatoriamente
    --> faccio: window.customElements.define('pippo-tag', PippoTag) --> nome del tag, nome della classe del tag
    --> definisco uno shadow DOM (non obbligatorio ma utile a tenerlo separato dal resto del DOM) --> evita che si prenda stili o funzioni che vengono dati ad altri oggetti (che potrebbero avere la stessa classe)
4- getAttributes() --> custom attributes (anche loro separati da - per evitare che vengano utilizzati da HTML base)
    -->
*/
// console.log('pippo');

const users = [
    { name: 'andrea', mail: 'pippo@grr.la' },
    { name: 'francesca', mail: 'paperina@grr.la' },
    { name: 'simone', mail: 'pluto@grr.la' },
    { name: 'marco', mail: 'topolino@grr.la' },
];

users.forEach((user) => {
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    pippoTag.setAttribute('has-button', true);
    document.body.appendChild(pippoTag);
});

function replaceSelected(user) {
    const selectedContainer = document.getElementById('selected-user');
    selectedContainer.innerHTML = '';
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    selectedContainer.appendChild(pippoTag);
}

// document.addEventListener('user-selected', (event) => console.log(event));
// document.addEventListener('user-selected', (event) => console.log(event.detail));
document.addEventListener('user-selected', (event) => replaceSelected(event.detail)); /* Listening to the event `user-selected` and then calling the function `replaceSelected` with the parameter `event.detail`. */

document.getElementById('main-title').setAttribute('user-count', `${users.length} `);
