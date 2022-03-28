class PippoTag extends HTMLElement{

    styleTemplate = `.par{color: green;}`
    styleURL = "./work-style.css";
    htmlTemplate = `
        <h2>#username</h2>
        <h2>#mail</h2>
        `

    // user = {
    //     name: 'Andrea',
    //     mail: 'pippo@grr.la'
    // }

    constructor(){
        super();

        this.attachShadow({mode: 'open'}); //questo è un DOM (document) al quale il web component si renderizza --> senza questo seguirà ciò che accade nel DOM principale
        this.getAttributes();
        this.initStyle();
        this.initTagWithTemplate();
        // this.initTag();

    }



    attributeChangedCallback(){
        this.getAttributes();
        this.initTagWithTemplate();
    }

    static get observedAttributes(){
        return ['pippo-user', 'has-button'];
    }

    getAttributes(){
        if (this.getAttribute('pippo-user')) {
            this.user = JSON.parse(this.getAttribute('pippo-user')) //questa è una stringa ma che nell'html è in realtà un json (per come è scritta)
        }

        if (this.getAttribute('has-button')) {
            this.hasButton = this.getAttribute('has-button') === 'true';
        }


        console.log("Get attributes", this.user);
    }




    initStyle(){
        const style = document.createElement('style');
        style.innerText = this.styleTemplate;
        this.shadowRoot.appendChild(style);
    }

    initStylewithURL(){
        fetch(this.styleURL)
        .then(resp => resp.text)
        .then(myStyle => {
            const style = document.createElement('style');
            style.innerText = myStyle;
            this.shadowRoot.appendChild(style);
        })
    }




    initTag(){
        const node = document.createTextNode('pippo');
        const p = document.createElement('p');
        p.className = 'par' //par è una classe utlizzata nell'index e dando del css a quella classe, anche 'pippo' prenderà quel css
        p.appendChild(node);
        //this.appendChild(p); //così scritto il par prenderà il css del DOM principale
        this.shadowRoot.appendChild(p); //così scitto il par prenderà la PROPRIA classe nel PROPRIO DOM
    }


    initTagWithTemplate(){
        if (this.user) {
            this.htmlTemplate = this.htmlTemplate.replace('#username', this.user.name);
            this.htmlTemplate = this.htmlTemplate.replace('#mail', this.user.mail);
            this.shadowRoot.innerHTML = this.htmlTemplate;
        }

        if (this.hasButton) {
          //qui non utilizzo il template ma creo un bottone normale:
          const button = document.createElement("button");
          const node = document.createTextNode("Select User");
          button.appendChild(node);
          button.onclick = () => this.buttonClicked(); //senza lambda non funzionava perchè lo user gli arriva dopo --> con la lambda se lo gestisce lui
          this.shadowRoot.appendChild(button);
        }
    
    }


    buttonClicked(){
        //EVENT EMITTER IN JS SI CHIAMA DISPATCH ma ho bisogno di un custom event prima:
        const event = new CustomEvent('user-selected', {
            bubbles: true, //vuol dire che l'evento custom deve passare attraverso tutti i DOM per arrivare al designato --> BUBBLES è ciò che lo fa funzionare 
            detail: this.user
        });
        this.dispatchEvent(event) //LANCIO QUESTO EVENTO A CHIUNQUE VOGLIA ASCOLTARLO (chiunque abbia un event listener)
    }

}



window.customElements.define('pippo-tag', PippoTag);