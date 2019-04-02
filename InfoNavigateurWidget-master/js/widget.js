class InfoNavigateurWidget extends Widget {
	
	constructor(id, app) {
		super(id, InfoNavigateurModel, InfoNavigateurView, InfoNavigateurController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		
		this.sizeX = 3;
		this.sizeY = 1;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		
		this.controller.load();
	}
	
}

class InfoNavigateurModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class InfoNavigateurView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		
		var Resolution = HH.create("p");
		Resolution.innerHTML = "Résolution = "+ screen.width + " x " + screen.height + ".";
		this.stage.appendChild(Resolution);
		
		var Langue = HH.create("p");
		Langue.innerHTML ="Language = "+ window.navigator.language + ".";
		this.stage.appendChild(Langue);

		var NomNavigateur = HH.create("p");
		NomNavigateur.innerHTML ="NomNavigateur = "+ window.navigator.appCodeName + ".";
		this.stage.appendChild(NomNavigateur);
	}
	
	

	
	
	
}

class InfoNavigateurController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	valider() {
		this.tableauLangue = ["francais","anglais"]; //liste contenant les langues.
		this.mot = document.getElementById("ChampTexte").value; // variable contenant la valeur contenue dans le champ texte.
      	       // this.mot = "prenom";
		console.log(this.mot);
		this.base = document.getElementById("langueBase").selectIndex; 
        	this.baseChoix = langueBase.selectedIndex;  // variable qui contient le choix de la langue du mot
        	this.trad = document.getElementById("langueTrad").selectIndex;
        	this.tradChoix = langueTrad.selectedIndex; // variable qui contient le choix de langue dans lequel sera traduit le mot.
        	//alert("[" + this.mot + "]" + " " + this.tableauLangue[this.baseChoix] + " -->" + " " + this.tableauLangue[this.tradChoix] + " " );
		this.lien = "https://www.linguee.fr/" + this.tableauLangue[this.baseChoix] + "-" + this.tableauLangue[this.tradChoix] + "/search?source=auto&query=" + this.mot;
		//return this.lien;
		console.log(this.lien);
	}
		
	async load() {
		let link = await this.click;
		let result = await this.mvc.main.dom(link); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		this.article = new xph().doc(dom).ctx(dom).craft('//*[@id="dictionary"]/div[1]/div[1]/div[1]/div/div/div/div/div[1]/h3/span[1]/a[1]').firstResult; // find interesting things
		this.mvc.view.update(this.article.textContent);
		//alert(article.textContent);
		}
		
		
		
	
		

	
	
    
	
	
	
	
	
}
