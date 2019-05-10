class InfoNavigateurWidget extends Widget {
	
	constructor(id, app) {
		super(id, InfoNavigateurModel, InfoNavigateurView, InfoNavigateurController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		
		this.sizeX = 2;
		this.sizeY = 1.25;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();

		
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
		this.try.mvc.controller.getIp();


		var Resolution = HH.create("p");
		Resolution.innerHTML = "Résolution = "+ screen.width + " x " + screen.height + ".";
		this.stage.appendChild(Resolution);
		

		var Langue = HH.create("p");
		Langue.innerHTML ="Language = "+ window.navigator.language + ".";
		this.stage.appendChild(Langue);


		var NomNavigateur_OS = HH.create("p");
		NomNavigateur_OS.innerHTML =  window.os;
		this.stage.appendChild(NomNavigateur_OS);


		var IpNavigateur = HH.create("p");
		IpNavigateur.innerHTML ="Votre IP est = 0.0.0.0"		
		this.stage.appendChild(IpNavigateur);
		Events.on(IpNavigateur, "load",function(event) {   this.try.mvc.controller.getIp(); });


	}
	
	

	
	
	
}

class InfoNavigateurController extends WidgetController {
	// j'ai essayer de renvoyer l'ip localement
	loadJSON(path, success, error)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	}

	async getIp(){
		/* methode par serveur mais ca renvoie l'ip du serveur
		let jsonParsed = JSON.parse(atob(json.response.dom));
		  let ip = jsonParsed[8];
		  this.try.mvc.view.IpNavigateur.InnerHTML = ip;
		*/
		loadJSON('http://ip-api.com/json/',
         function(data) { console.log(data); },
         function(xhr) { console.error(xhr); });
		console.log(ip);

	}


	 
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}	
	
	/*GetNameNav(){
			var ua = navigator.userAgent,
		index,
		navigateur,
		version;
	if((index = ua.indexOf('Firefox'))>=0) {
		navigateur = 'Firefox';
		version = ua.match(/Firefox\/([0-9]+(?:\.[0-9]+)*)/)[1];
	} else if((index = ua.indexOf('MSIE'))>=0) {
		navigateur = 'Internet Explorer';
		version = ua.match(/MSIE ([0-9]+(?:\.[0-9]+)*)/)[1];
	} else if((index = ua.indexOf('Chrome'))>=0) {
		navigateur = 'Google Chrome';
		version = ua.match(/Chrome\/([0-9]+(?:\.[0-9]+)*)/)[1];
	} else if((index = ua.indexOf('Opera'))>=0) {
		navigateur = 'Opera';
		version = ua.match(/Version\/([0-9]+(?:\.[0-9]+)*)/)[1] || ua.match(/Opera\/([0-9]+(?:\.[0-9]+)*)/)[1];
	} else if((index = ua.indexOf('Safari'))>=0) {
		navigateur = 'Safari';
		version = ua.match(/Version\/([0-9]+(?:\.[0-9]+)*)/)[1] || ua.match(/Safari\/([0-9]+(?:\.[0-9]+)*)/)[1];
	}
	console.log(navigateur+' '+version);
	var r = navigateur+' '+version;
	return r;
	}*/

		


	
}

(function () {
	'use strict';
	
	var module = {
		options: [],
		header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
		dataos: [
			{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
			{ name: 'Windows', value: 'Win', version: 'NT' },
			{ name: 'iPhone', value: 'iPhone', version: 'OS' },
			{ name: 'iPad', value: 'iPad', version: 'OS' },
			{ name: 'Kindle', value: 'Silk', version: 'Silk' },
			{ name: 'Android', value: 'Android', version: 'Android' },
			{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
			{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
			{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
			{ name: 'Linux', value: 'Linux', version: 'rv' },
			{ name: 'Palm', value: 'Palm', version: 'PalmOS' }
		],
		databrowser: [
			{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
			{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
			{ name: 'Safari', value: 'Safari', version: 'Version' },
			{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
			{ name: 'Opera', value: 'Opera', version: 'Opera' },
			{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
			{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
		],
		init: function () {
			var agent = this.header.join(' '),
				os = this.matchItem(agent, this.dataos),
				browser = this.matchItem(agent, this.databrowser);
			
			return { os: os, browser: browser };
		},
		matchItem: function (string, data) {
			var i = 0,
				j = 0,
				html = '',
				regex,
				regexv,
				match,
				matches,
				version;
			
			for (i = 0; i < data.length; i += 1) {
				regex = new RegExp(data[i].value, 'i');
				match = regex.test(string);
				if (match) {
					regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
					matches = string.match(regexv);
					version = '';
					if (matches) { if (matches[1]) { matches = matches[1]; } }
					if (matches) {
						matches = matches.split(/[._]+/);
						for (j = 0; j < matches.length; j += 1) {
							if (j === 0) {
								version += matches[j] + '.';
							} else {
								version += matches[j];
							}
						}
					} else {
						version = '0';
					}
					return {
						name: data[i].name,
						version: parseFloat(version)
					};
				}
			}
			return { name: 'unknown', version: 0 };
		}
	};
	
	var e = module.init(),
		debug = '';
	
	window.os = 'OS = ' + e.os.name + e.os.version + "." + "<p>" +
	'Navigateur utilisé = ' + e.browser.name + ' ' + e.browser.version + "." +'<p>';

}());
