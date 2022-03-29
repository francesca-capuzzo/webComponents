class SuperHeader extends HTMLHeadingElement{ //in questo caso estendo la famiglia degli H (h1, h2, h3...) e non un qualunque elemento HTML


    constructor(){
        super()
        
        this.style.background = 'green';
    }


    attributeChangedCallback(){
        this.getAttributes();
        this.initTag();
    }

    static get observedAttributes(){ return ['user-count']; }

    getAttributes(){
        if (this.getAttribute('user-count')) {
            this.userCount = parseInt(this.getAttribute('user-count'))
        }
    }



    initTag(){
        
        let container;

        if (document.getElementById('additional-content')) {
            container = document.getElementById('additional-content')
            container.innerHTML = ""; //se c'è già lo ripulisco 
        }
        else {
            container = document.createElement('div'); 
            container.id = 'additional-content' //se non c'è, lo creo 
        }
        const span = document.createElement('span');
        const node = document.createTextNode('count: ' + this.userCount);
        span.appendChild(node);

        container.appendChild(span);

        this.appendChild(container);
    }

}


window.customElements.define('super-header', SuperHeader, {extends: 'h1'}); //a differenza dell'elemento HTML generico devo sggiungere la parte di {extends: 'tag che estende'} (in questo caso h1)

/*

per dire all'elemento nell'index (in questo caso H1 users) aggiungo la dicitura is = "nome del tag"
--> <h1 is="super-header"> Users </h1> 

this.attachShadow({mode: 'open'}) andrebbe nel costruttore ma in questo caso la shadow è evitabile perchè l'h1 non prende più le regole di default del browser 
--> scompare dalla pagina finchè non gli do altre regole

la creazione di un tag HTML generico (come pippo-tag) non permette di essere renderizzato su browser vecchi (si vede come uno span probabilmente vuoto)
--> la modifica di un tag HTML già esistente (quindi potenziando un H1 come in questo caso), permette ai browser vecchi di renderizzare comunque il tag, semplicemente seguendo le regole HTML/CSS generalmente associate ad esso

*/