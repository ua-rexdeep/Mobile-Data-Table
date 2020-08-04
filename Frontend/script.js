var global = {};
global.showLog = false;
global.databaseWorked = true;
global.consoleLog = [];
global.console = (msg) => {
	global.consoleLog.push(typeof(msg)=="string"?(msg+" // "+new Date().toLocaleTimeString()):{time: new Date().toLocaleTimeString(), data: msg});
	if(global.showLog) console.log(msg);
}
global.blockVisible = {
	1: true,
	2: true,
	3: true,
	4: true,
}
global.userInfo = {
	email: null,
	department: null,
	rank: null,
	sign: null,
	pedName: null,
	access: null,
	cadStatus: 0,
	status: "preLogin",
}
global.alerts_lisg = [];
global.loading_screen = false;
global.code4 = (id) => {
	global.alert("CAD Confirm", "Вы уверенны что хотите присводить вызову #"+id+" статус: <span style='color:red;'>Закрыт</span>?", {next: () => {global.sendSocket({type: "closeCall", id: id});}, bg: "success"});
	//global.sendSocket({type: "closeCall", id: id});
}

global.timeConv = (time) => {
	let t = {};
	time = new Date(time);
	t.day = time.getDate();
	t.month = time.getMonth()+1;
	t.year = time.getFullYear();
	t.hour = time.getHours();
	t.min = time.getMinutes();
	t.sec = time.getSeconds();

	t.day<10?t.day="0"+t.day:undefined;
	t.month<10?t.month="0"+t.month:undefined;
	t.hour<10?t.hour="0"+t.hour:undefined;
	t.min<10?t.min="0"+t.min:undefined;
	t.sec<10?t.sec="0"+t.sec:undefined;
	return `${t.day}/${t.month}/${t.year} ${t.hour}:${t.min}`;
}

global.updates = {
	actual: 6,
	0: {type: "update", v: "v1.60", date: new Date().getTime(), text: `sho?`},
	1: {type: "update", v: "v1.61", date: 1574623083100, text: `• Добавлена временная лицензия.<br>
	• Когда истекает лицензия на вождение/оружие, статус лицензии будет выделен красным.<br>
	• Исправлена ошибка с парными юнитами.<br>
	• Поменяны местами Время создания розыска и его удаление.<br>
	• Добавлено поле для заметок в профиле транспорта.`},
	2: {type: "update", v: "v1.62", date: 1574782410274, text: `• Упрощение управления юнитами диспетчером.<br>
	• Добавлена система запроса парного юнита.`},
	3: {type: "update", v: "v1.63", date: 1574783268568, text: `• Исправлено поле для заметок в профиле транспорта.<br><br>
	<b>Убедительная просьба делать фото людей при выдаче лицензии на вождение, и фото транспорта при регистрации!</b>`},
	5: {type: "update", v: "v1.64", date: 1574888414118, text: `• В профиль транспорта добавлен список, просьба использовать его.<br>
	• Были автоматизированы штрафы. 
	Для выдачи штрафа нажмите <b>Добавить выписку</b> и выберите <b>Нарушение дорожных законов</b>.
	<br>Чтобы указать выбранное нарушение как предупреждение - снимите галочку слева от нарушения.
	<br><b>Поинты</b> - система штрафов водителя, если у водителя равно или больше 11 поинтов - вод. лицензия изымается <b>Пояснение к Traffic Code. (3) (S.A)</b>.`},
	6: {type: "notification", date: 1574776567369, text: `Уведомление об прекращении работы системы CAD.<br><br>База прекратит свою работу 31.12.2019 в связи с отсутствием финансирования и прав на продукт.`},
}

global.miranda = `Миранда:
Вы имеете право хранить молчание.
Всё что вы скажете - будет использовано против Вас в суде.
Ваш адвокат может присутствовать на допросе.
Если Вы не можете оплатить услуги адвоката - он НЕ будет предоставлен Вам государством.
Если Вы не гражданин США, Вы можете связаться с консулом вашей страны, прежде чем отвечать на любые вопросы.
-----------------
Приговор:
Властью данной мне штатом Сан-Андреас, по решению (наименование суда и фамилии судьи)
Вы (имя фамилия) приговорены к заключению на (кол-во сроков) в соответствии со статьей Penal Code штата Сан-Андреас (перечисление статей)
Приговор вынесен окончательно и обжалованию не подлежит!`;

global.vehicles = [
	// CDL, C
	[1, "benson", "Benson", "CDL"],
	[1, "biff", "HVY Biff", "CDL"],
	[1, "hauler", "Jobuilt Hauler", "C"],
	[1, "mule", "Maibatsu Corporation Mule", "C"],
	[1, "packer", "MTL Packer", "CDL"],
	[1, "phantom", "Jobuilt Phantom", "C"],
	[0, "tractor", "Stanley Tractor", "C"],
	[1, "towtruck", "Vapid Towtruck", "C"],
	[1, "burrito", "Declasse Burrito", "C"],
	[1, "journey", "Zirconium Journey", "C"],
	[1, "pounder", "MTL Pounder", "CDL"],
	[1, "pony", "Brute Pony", "C"],
	[1, "rumpo", "Vapid Rumpo", "C"],
	[1, "speedo", "Vapid Speedo", "C"],
	[1, "youga", "Bravado Youga", "C"],
	//-----------------------------------------------
	// A
	//-----------------------------------------------
	[0, "akuma", "Dinka Akuma", "A"],
	[0, "avarus", "LCC Avarus", "A"],
	[1, "bagger", "WMC Bagger", "A"],
	[1, "bati", "Pegassi Bati 802", "A"],
	[0, "bati2", "Pegassi Bati RR", "A"],
	[0, "bf400", "Nagasaki BF-400", "A"],
	[1, "carbonrs", "Nagasaki Carbon RS", "A"],
	[1, "chimera", "Nagasaki Chimera", "A"],
	[0, "cliffhanger","WMC Cliffhanger",  "A"],
	[1, "daemon", "WMC Daemon", "A"],
	[1, "daemon2", "WMC Daemon Custom", "A"],
	[1, "defiler", "Shitzu Defiler", "A"],
	[1, "diablous", "Principe Diabolus", "A"],
	[0, "diablous2", "Principe Diabolus Custom", "A"],
	[0, "double", "Dinka Double T", "A"],
	[0, "enduro", "Dinka Enduro", "A"],
	[1, "esskey", "Pegassi Esskey", "A"],
	[1, "faggio", "Principe Faggio", "A"],
	[1, "faggio2", "Principe Faggio Sport", "A"],
	[1, "faggio3", "Principe Faggio Custom", "A"],
	[1, "fcr", "Pegassi FCR 1000", "A"],
	[1, "fcr2", "Pegassi FCR 1000 Custom", "A"],
	[0, "gargoyle", "WMC Gargoyle", "A"],
	[1, "hakuchou", "Shitzu Hakuchou", "A"],
	[0, "hakuchou2", "Shitzu Hakuchou Drag", "A"],
	[1, "hexer", "LCC Hexer", "A"],
	[0, "innovation", "LCC Innovation", "A"],
	[1, "lectro", "Principe Lectro", "A"],
	[0, "manchez", "Maibatsu Manchez", "A"],
	[1, "nemesis", "Principe Nemesis", "A"],
	[1, "nightblade", "WMC Nightblade", "A"],
	[1, "pcj", "Shitzu PCJ-600", "A"],
	[0, "ratbike", "WMC Rat Bike", "A"],
	[1, "ruffian", "Pegassi Ruffian", "A"],
	[0, "sanchez", "Maibatsu Sanchez", "A"],
	[0, "sanchez2", "Maibatsu Sanchez Livery", "A"],
	[1, "sanctus", "LCC Sanctus", "A"],
	[1, "sovereign", "WMC Sovereign", "A"],
	[1, "thrust", "Dinka Thrust", "A"],
	[0, "vader", "Shitzu Vader", "A"],
	[1, "vindicator", "Dinka Vindicator", "A"],
	[1, "vortex", "Pegassi Vortex", "A"],
	[0, "wolfsbane", "WMC Wolfsbane", "A"],
	[0, "zombiea", "WMC Zombie", "A"],
	[1, "blazer", "Nagasaki Blazer", "A"],
	//-----------------------------------------------
	// B
	//-----------------------------------------------
	[1, "minivan", "Vapid Minivan", "B"],
	[1, "blista", "Dinka Blista", "B"],
	[1, "brioso", "Grotti Brioso R/A", "B"],
	[1, "dilettante", "Karin Dilettante", "B"],
	[1, "dilettante2", "Karin Dilettante New", "B"],
	[1, "issi", "Weeny Issi", "B"],
	[1, "panto", "Benefactor Panto", "B"],
	[1, "prairie", "Bollokan Prairie", "B"],
	//-----------------------------------------------
	[1, "cogcabrio", "Enus Cognoscenti Cabrio", "B"],
	[1, "exemplar", "Dewbauchee Exemplar", "B"],
	[1, "f620", "Ocelot F620", "B"],
	[1, "felon", "Lampadati Felon", "B"],
	[1, "felon2", "Lampadati Felon GT", "B"],
	[1, "jackal", "Ocelot Jackal", "B"],
	[1, "oracle", "Übermacht Oracle", "B"],
	[1, "oracle2", "Übermacht Oracle XS", "B"],
	[1, "sentinel", "Übermacht Sentinel", "B"],
	[1, "sentinel2", "Übermacht Sentinel XS", "B"],
	[1, "windsor", "Enus Windsor", "B"],
	[1, "windsor2", "Enus Windsor Drop", "B"],
	[1, "zion", "Übermacht Zion", "B"],
	//-----------------------------------------------
	[1, "blade", "Vapid Blade", "B"],
	[1, "buccaneer", "Albany Buccaneer", "B"],
	[1, "buccaneer2", "Albany Buccaneer Custom", "B"],
	[1, "chino", "Vapid Chino", "B"],
	[1, "chino2", "Vapid Chino Custom", "B"],
	[1, "clique", "Vapid Clique", "B"],
	[1, "coquette3", "Invetero Coquette BlackFin", "B"],
	[1, "deviant", "Schyster Deviant", "B"],
	[1, "dominator", "Vapid Dominator", "B"],
	[1, "dukes", "Imponte Dukes", "B"],
	[1, "dukes2", "ImponteDuke O'Death", "B"],
	[1, "faction", "Willard Faction", "B"],
	[1, "faction2", "Willard Faction Custom", "B"],
	[1, "faction3", "Willard Faction Custom Donk", "B"],
	[1, "ellie", "Vapid Ellie", "B"],
	[1, "gauntlet", "Bravado Gauntlet", "B"],
	[1, "gauntlet2", "Bravado Gauntlet", "B"],
	[1, "gauntlet3", "Bravado Gauntlet", "B"],
	[1, "gauntlet4", "Bravado Gauntlet", "B"],
	[1, "hermes", "Albany Hermes", "B"],
	[1, "hotknife", "Vapid Hotknife", "B"],
	[1, "hustler", "Vapid Hustler", "B"], 
	[1, "impaler", "Declasse Impaler", "B"],
	[1, "impaler2", "Declasse Impaler", "B"],
	[1, "impaler3", "Declasse Impaler", "B"],
	[1, "imperator", "Vapid Imperator", "B"],
	[1, "lurcher", "Albany Lurcher", "B"],
	[1, "moonbeam", "Declasse Moonbean", "B"],
	[1, "nightshade", "Imponte Nightshade", "B"],
	[1, "peyote2", "Vapid Peyote", "B"],
	[1, "phoenix", "Imponte Phoenix", "B"],
	[1, "picador", "Cheval Picador", "B"],
	[1, "ratloader", "Bravado Rat-Loader", "B"],
	[1, "ratloader2", "Bravado Rat-Loader", "B"],
	[1, "ruiner", "Imponte Ruiner", "B"],
	[1, "sabregt", "Declasse SabreGT", "B"],
	[1, "sabregt2", "Declasse SabreGT", "B"],
	[1, "slamvan", "Vapid Slamvan", "B"],
	[1, "slamvan2", "Vapid Slamvan", "B"],
	[1, "slamvan3", "Vapid Slamvan", "B"],
	[1, "stalion", "Declasse Stallion", "B"],
	[1, "stalion2", "Declasse Stallion", "B"],
	[1, "tampa", "Declasse Tampa", "B"],
	[1, "tampa3", "Declasse Tampa", "B"],
	[1, "tulip", "Declasse Tulip", "B"],
	[1, "vamos", "Declasse Vamos", "B"],
	[1, "vigero", "Declasse Vigero", "B"],
	[1, "virgo", "Albany Virgo", "B"],
	[1, "virgo2", "Albany Virgo", "B"],
	[1, "virgo3", "Albany Virgo", "B"],
	[1, "voodoo", "Declasse Voodoo", "B"],
	[1, "voodoo2", "Declasse Voodoo", "B"],
	[1, "bfinjection", "BF Injection", "B"],
	[1, "bifta", "BF Bifta", "B"],
	[1, "bodhi2", "Canis Bodhi", "B"],
	[1, "brawler", "Coil Brawler", "B"],
	[1, "dloader", "Bravado Duneloader", "B"],
	[1, "dubsta3", "Benefactor Dubsta", "B"],
	[0, "dune", "MTL Dune", "B"],
	[1, "freecrawler", "Canis Freecrawler", "B"],
	[1, "kamacho", "Canis Kamacho", "B"],
	[1, "mesa3", "Canis Mesa", "B"],
	[1, "rancherxl", "Declasse Rancher XL", "B"],
	[0, "rebel", "Karin Rebel", "B"],
	[1, "riata", "Vapid Riata", "B"],
	[1, "sandking", "Vapid Sandking", "B"],
	[1, "baller", "Gallivanter Baller", "B"],
	[1, "baller2", "Gallivanter Baller", "B"],
	[1, "bjxl", "Karin BeeJay XL", "B"],
	[1, "cavalcade", "Albany Cavalcade", "B"],
	[1, "cavalcade2", "Albany Cavalcade", "B"],
	[1, "contender", "Vapid Contender", "B"],
	[1, "dubsta", "Benefactor Dubsta", "B"],
	[1, "dubsta2", "Benefactor Dubsta", "B"],
	[1, "fq2", "Fathom FQ 2", "B"],
	[1, "granger", "Declasse Granger", "B"],
	[1, "gresley", "Bravado Gresley", "B"],
	[1, "habanero", "Emperor Habanero", "B"],
	[1, "huntley", "Enus Huntley", "B"],
	[1, "landstalker", "Dundreary Landstalker", "B"],
	[1, "mesa", "Canis Mesa", "B"],
	[1, "patriot", "Mammoth Patriot", "B"],
	[1, "patriot2", "Mammoth Patriot", "B"],
	[1, "radi", "Vapid Radius", "B"],
	[1, "rocoto", "Obey Rocoto", "B"],
	[1, "seminole", "Canis Seminole", "B"],
	[1, "serrano", "Benefactor Serrano", "B"],
	[1, "xls", "Benefactor XLS", "B"],
	[1, "asea", "Declasse Asea", "B"],
	[1, "asea2", "Declasse Asea", "B"],
	[1, "asterope", "Karin Asterope", "B"],
	[1, "cog55", "Enus Cognoscenti 55", "B"],
	[1, "cog552", "Enus Cognoscenti 552", "B"],
	[1, "cognoscenti", "Enus Cognoscenti", "B"],
	[1, "cognoscenti2", "Enus Cognoscenti", "B"],
	[1, "emperor", "Albany Emperor", "B"],
	[1, "emperor2", "Albany Emperor", "B"],
	[1, "emperor3", "Albany Emperor", "B"],
	[1, "fugitive", "Cheval Fugitive", "B"],
	[1, "glendale", "Benefactor Glendale", "B"],
	[1, "ingot", "Vulcar Ingot", "B"],
	[1, "intruder", "Karin Intruder", "B"],
	[1, "premier", "Declasse Premier", "B"],
	[1, "primo", "Albany Primo", "B"],
	[1, "primo2", "Albany Primo", "B"],
	[1, "regina", "Dundreary Regina", "B"],
	[1, "romero", "Albany Romero Hearse", "B"],
	[1, "schafter2", "Benefactor Schafter", "B"],
	[1, "schafter5", "Benefactor Schafter", "B"],
	[1, "schafter6", "Benefactor Schafter", "B"],
	[1, "stafford", "Enus Stafford", "B"],
	[1, "stanier", "Vapid Stanier", "B"],
	[1, "stratum", "Zirconium Stratum", "B"],
	[1, "stretch", "Albany Stretch", "B"],
	[1, "superd", "Enus Super Diamond", "B"],
	[1, "surge", "Cheval Surge", "B"],
	[1, "tailgater", "Obey Tailgater", "B"],
	[1, "warrener", "Vulcar Warrener", "B"],
	[1, "taxi", "Vapid Taxi", "B"],
	[1, "alpha", "Albany Alpha", "B"],
	[1, "banshee", "Bravado Banshee", "B"],
	[1, "bestiagts", "Grotti Bestia GTS", "B"],
	[1, "blista2", "Dinka Blista", "B"],
	[1, "blista3", "Dinka Blista", "B"],
	[1, "buffalo", "Bravado Buffalo", "B"],
	[1, "buffalo2", "Bravado Buffalo", "B"],
	[1, "buffalo3", "Bravado Buffalo", "B"],
	[1, "carbonizzare", "Grotti Carbonizzare", "B"],
	[1, "comet2", "Pfister Comet", "B"],
	[1, "comet3", "Pfister Comet", "B"],
	[1, "comet4", "Pfister Comet", "B"],
	[1, "comet5", "Pfister Comet", "B"],
	[1, "coquette", "Invetero Coquette", "B"],
	[1, "drafter", "8F Drafter", "B"],
	[1, "deveste", "Principe Deveste Eight", "B"],
	[1, "elegy", "Annis Elegy", "B"],
	[1, "elegy2", "Annis Elegy", "B"],
	[1, "feltzer2", "Benefactor Feltzer", "B"],
	[1, "flashgt", "Vapid Flash GT", "B"],
	[1, "furoregt", "Lampadati Furore GT", "B"],
	[1, "fusilade", "Schyster Fusilade", "B"],
	[1, "futo", "Karin Futo", "B"],
	[1, "gb200", "Vapid GB200", "B"],
	[1, "issi7", "Weeny Issi", "B"],
	[1, "italigto", "Grotti Itali GTO", "B"],
	[1, "jugular", "Ocelot Jugular", "B"],
	[1, "jester", "Dinka Jester", "B"],
	[1, "jester2", "Dinka Jester", "B"],
	[1, "jester3", "Dinka Jester", "B"],
	[1, "khamelion", "Hijak Khamelion", "B"],
	[1, "kuruma", "Karin Kuruma", "B"],
	[1, "kuruma2", "Karin Kuruma", "B"],
	[1, "locust", "Ocelot Locust", "B"],
	[1, "lynx", "Ocelot Lynx", "B"],
	[1, "massacro", "Dewbauchee Massacro", "B"],
	[1, "massacro2", "Dewbauchee Massacro", "B"],
	[1, "neo", "Vysser Neo", "B"],
	[1, "neon", "Pfister Neon", "B"],
	[1, "ninef", "Obey 9F", "B"],
	[1, "ninef2", "Obey 9F", "B"],
	[1, "omnis", "Obey Omnis", "B"],
	[1, "paragon", "Enus Paragon", "B"],
	[1, "paragon2", "Enus Paragon", "B"],
	[1, "pariah", "Ocelot Pariah", "B"],
	[1, "penumbra", "Maibatsu Penumbra", "B"],
	[1, "raiden", "Coil Raiden", "B"],
	[1, "rapidgt", "Dewbauchee Rapid GT", "B"],
	[1, "rapidgt2", "Dewbauchee Rapid GT", "B"],
	[1, "raptor", "BF Raptor", "B"],
	[1, "revolter", "Übermacht Revolter", "B"],
	[1, "ruston", "Hijak Ruston", "B"],
	[1, "schafter3", "Benefactor Schafter", "B"],
	[1, "schafter4", "Benefactor Schafter", "B"],
	[1, "schafter5", "Benefactor Schafter", "B"],
	[1, "schafter6", "Benefactor Schafter", "B"],
	[1, "schlagen", "Benefactor Schlagen GT", "B"],
	[1, "schwarzer", "Benefactor Schwartzer", "B"],
	[1, "sentinel3", "Übermacht Sentinel", "B"],
	[1, "seven70", "Dewbauchee Seven-70", "B"],
	[1, "specter", "Dewbauchee Specter", "B"],
	[1, "specter2", "Dewbauchee Specter", "B"],
	[1, "streiter", "Benefactor Streiter", "B"],
	[1, "sultan", "Karin Sultan", "B"],
	[1, "surano", "Benefactor Surano", "B"],
	[1, "tampa2", "Declasse Tampa", "B"],
	[1, "tropos", "Lampadati Tropos Rallye", "B"],
	[1, "verlierer2", "Bravado Verlierer", "B"],
	[1, "zr380", "Annis ZR380", "B"],
	[1, "ardent", "Ocelot Ardent", "B"],
	[1, "btype", "Albany Fränken Stange", "B"],
	[1, "casco", "Lampadati Casco", "B"],
	[1, "cheetah2", "Grotti Cheetah", "B"],
	[1, "coquette2", "Invetero Coquette", "B"],
	[1, "dynasty", " Weeny Dynasty", "B"],
	[1, "fagaloa", "Vulcar Fagaloa", "B"],
	[1, "feltzer3", "Benefactor Feltzer", "B"],
	[1, "gt500", "Grotti GT500", "B"],
	[1, "infernus2", "Pegassi Infernus", "B"],
	[1, "jb700", "Dewbauchee JB 700", "B"],
	[1, "mamba", "Declasse Mamba", "B"],
	[1, "manana", "Albany Manana", "B"],
	[1, "michelli", "Lampadati Michelli GT", "B"],
	[1, "monroe", "Pegassi Monroe", "B"],
	[1, "nebula", "Vulcar Nebula", "B"],
	[1, "peyote", "Vapid Peyote", "B"],
	[1, "pigalle", "Lampadati Pigalle", "B"],
	[1, "rapidgt3", "Dewbauchee Rapid GT Classic", "B"],
	[1, "retinue", "Vapid Retinue", "B"],
	[1, "savestra", "Annis Savestra", "B"],
	[1, "stinger", "Grotti Stinger ", "B"],
	[1, "stingergt", "Grotti Stinger GT", "B"],
	[1, "stromberg", "Ocelot Stromberg", "B"],
	[1, "swinger", "Ocelot Swinger ", "B"],
	[1, "torero", "Pegassi Torero", "B"],
	[1, "tornado", "Declasse Tornado", "B"],
	[1, "turismo2", "Grotti Turismo Classic", "B"],
	[1, "viseris", "Lampadati Viseris", "B"],
	[1, "z190", "Karin 190z", "B"],
	[1, "ztype", "Truffade Z-Type", "B"],
	[1, "zion3", "Übermacht Zion Classic", "B"],
	[1, "cheburek", "Rune Cheburek", "B"],
	[1, "adder", "Truffade Adder", "B"],
	[1, "autarch", "Överflöd Autarch", "B"],
	[1, "banshee2", "Bravado Banshee 900R", "B"],
	[1, "bullet", "Vapid Bullet", "B"],
	[1, "cheetah", "Grotti Cheetah", "B"],
	[1, "cyclone", "Coil Cyclone", "B"],
	[1, "entity2", "Överflöd Entity", "B"],
	[1, "entityxf", "Överflöd Entity XXR", "B"],
	[1, "emerus", "Progen Emerus", "B"],
	[1, "fmj", "Vapid FMJ", "B"],
	[1, "gp1", "Progen GP1", "B"],
	[1, "infernus", "Pegassi Infernus", "B"],
	[1, "italigtb", "Progen Itali GTB", "B"],
	[1, "krieger", "Benefactor Krieger", "B"],
	[1, "le7b", "Annis RE-7B", "B"],
	[1, "nero", "Truffade Nero", "B"],
	[1, "osiris", "Pegassi Osiris", "B"],
	[1, "penetrator", "Ocelot Penetrator", "B"],
	[1, "pfister811", "Pfister 811 Week", "B"],
	[1, "prototipo", "Grotti X80 Proto", "B"],
	[1, "reaper", "Pegassi Reaper", "B"],
	[1, "s80", "Annis S80RR", "B"],
	[1, "sc1", "Übermacht SC1", "B"],
	[1, "scramjet", "Declasse Scramjet", "B"],
	[1, "sheava", "Emperor ETR1", "B"],
	[1, "sultanrs", "Karin Sultan RS", "B"],
	[1, "t20", "Progen T20", "B"],
	[1, "taipan", "Cheval Taipan", "B"],
	[1, "tempesta", "Pegassi Tempesta", "B"],
	[1, "tezeract", "Pegassi Tezeract", "B"],
	[1, "thrax", "Truffade Thrax", "B"],
	[1, "turismor", "Grotti Turismo R", "B"],
	[1, "tyrant", "Överflöd Tyrant", "B"],
	[1, "tyrus", "Progen Tyrus", "B"],
	[1, "vacca", "Pegassi Vacca", "B"],
	[1, "vagner", "Dewbauchee Vagner", "B"],
	[1, "vigilante", "Grotti Vigilante", "B"],
	[1, "visione", "Grotti Visione", "B"],
	[1, "voltic", "Coil Voltic", "B"],
	[1, "voltic2", "Coil Voltic", "B"],
	[1, "xa21", "Ocelot XA-21", "B"],
	[1, "zentorno", "Pegassi Zentorno", "B"],
	[1, "sadler", "Vapid Sadler", "B"],
	[1, "bison", "Bravado Bison", "B"],
]

global.createCall = () => {
	global.alert(`CAD New Callout`, `
			<div style="display: inline-block;margin-right: 1rem;width: 4vw;">Описание:</div>
			<input id="callout_desc" type="text" placeholder="10-50" style="width: 80%;padding: 0.5vh 0.3vw;display: inline-block;color: white;font-size: 1.3vh;margin-bottom: 1vh;border: 1px solid white;">
	    	<br>
			<div style="display: inline-block;margin-right: 1rem;width: 4vw;">Локация:</div>
			<input id="callout_loc" type="text" placeholder="Sandy Shores // 3038" style="width: 80%;padding: 0.5vh 0.3vw;display: inline-block;color: white;font-size: 1.3vh;margin-bottom: 1vh;border: 1px solid white;">
		`, {next:() => {
		global.sendSocket({
			"type":"newCallout", 
			"desc": $("#callout_desc").val().length>3?$("#callout_desc").val():"Нет описания", 
			"loc": $("#callout_loc").val().length>3?$("#callout_loc").val():"Нет локации"
		});
	}, bg: "success", showBG: false,width:30});
}

global.combine = () => {
	global.alert("CAD Combine Units", `
			<input id="combinedSign" type="text" placeholder="Укажите позывной парного юнита">
		`, {next:() => {
		if($("#combinedSign").val().length<2) return;
		global.sendSocket({type:"combineUnits", units: global.selected_units, sign: $("#combinedSign").val()});
		for(let i = 0; i < 255; i++) {
			$("#active_unit_"+i).css("background", "inherit");
		}
		global.selected_units=[];
	}, bg: "success", showBG:false, width:30})
}

global.selected_units = [];
global.selected_length = () => {
	let i = 0;
	for(let c in global.selected_units) {
		if(global.selected_units[c]!=null) i++;
	}
	return i;
};
global.select_unit = (id) => {
	let unit = global.units[id];
	if((global.userInfo.department!=1||global.userInfo.cadStatus!=2)&&global.userInfo.isAdmin!=true) {
		let comb;
		if(unit.department != global.userInfo.department) return global.notification.send("Офицер не из вашего департамента!")
		global.combined.forEach((e)=>{if(e.units.includes(unit.badge)) comb = e;});
		if(comb!=null) return global.alert(`CAD Error`, `Unit is already combined.`);
		global.alert(`CAD Request Combine`, `<input id="combinedSign" type="text" placeholder="Укажите позывной парного юнита">`, {
			next: () => {
				if($("#combinedSign").val().length<2) return;
				global.sendSocket({type:"requestCombine", unit: unit.badge, sign: $("#combinedSign").val()});
				global.notification.send(`Ожидайте подтверждения от ${unit.sign}.`);
			}, width:30,showBG:false
		})
		return;
	}
	unit = unit.badge;
	let selected = false;
	global.selected_units.includes(unit)?selected=true:"";
	if(selected) {
		let us = [];
		global.selected_units.forEach((e)=>{
			if(e!=unit&&e!=null) us.push(e);
		})
		global.selected_units=us;
	} else {
		global.selected_units.push(unit);
	}
	///////////////////
	if(global.selected_length()==0) $("#selected_unit_info").hide();
	else $("#selected_unit_info").show();

	if(global.selected_length()==1) {
		$(".otherActions").show();
		$("#selected_warn").show();
		$(".selected_status").show();
		$("#selected_decomb").show();
		$("#selected_comb").hide();
	} else if(global.selected_length()==2) {
		$(".otherActions").show();
		$(".selected_status").show();
		$("#selected_warn").hide();
		$("#selected_decomb").hide();
		$("#selected_comb").show();
	} else if(global.selected_length()==0) {
		$(".otherActions").hide();
		$(".selected_status").hide();
		$("#selected_warn").hide();
		$("#selected_decomb").hide();
		$("#selected_comb").hide();
	} else {
		$(".otherActions").show();
		$(".selected_status").show();
		$("#selected_warn").hide();
		$("#selected_decomb").hide();
		$("#selected_comb").hide();
	}
	global.query(JSON.stringify({type:"unitsInfo",list:global.units,staff:global.staff,combined:global.combined}));
}

global.alert_next = null;
global.alert_close = null;

global.alert = (title, content, data = {}) => {
	if(global.alert_type!=null) return;
	let bgError = "#da4646";
	let bgSuccess = "#3db741";
	$("#alert_window").css("border", 0);
	$("#alert_window").css("width", data.width+"vw"||"25vw");
	$("#alert_window").css("left", ((100-(data.width||25))*0.5)+"vw");
	$("#alert_window").css("top", "10vh");
	$("#alert_title").css("background", (data.bg=="error"?bgError:bgSuccess));
	$("#alert_title").text(title);
	$("#alert_content").html(content);
	if(data.next != null) {
		global.alert_next = typeof(data.next)=="function"?data.next:(next = data.next)=>{eval(next);};
		$("#alert_next").show();
		$("#alert_next").text(data.nextText);
	} else $("#alert_next").hide();
	$("#alert_close").show();
	if(data.close == "hide") $("#alert_close").hide();
	else if(data.close != null) global.alert_close = typeof(data.close) == "string"?() => {eval(data.close);}:data.close;
	else global.alert_close = () => {}
	if(data.showBG==null||data.showBG==true) {
		$("#alert_bg").show();
		$("#alert_bg").css("z-index","1");
		setTimeout(() => {$("#alert_bg").css("opacity", "1");}, 100);
		global.alert_type == "def";
	} else global.alert_type = "draggble";
	$("#alert_window").show();
	$("#alert_window").css("z-index","2");
	$(window)[0].scrollTo(0,0)
}

global.sys_a_close = () => {
	$("#alert_window").hide();
	$("#alert_bg").hide();
	$("#alert_bg").css("opacity", "0");
	global.alert_type = null;
}

global.timer = {
	play: () => {
		if(global.timer.status) {
			global.timer.status = false;
			$("#control_time").css("background", "#545454");
			$("#control_time").removeAttr("disabled");
		return;}
		let t = $("#control_time").val();
		let next = t.search(/^[0-9]{2}:[0-9]{2}$/);
		if(next==0) {
			let vals = t.split(":");
			vals[0] = parseInt(vals[0]);
			vals[1] = parseInt(vals[1]);
			let time = vals[0]*60+vals[1];
			if(time>10&&time<900) {
				global.timer.time = time;
				global.timer.status = true;
				$("#control_time").css("background", "#c11b1b");
				$("#control_time").attr("disabled", "");
				let v = global.timer.time;
				let min = parseInt(v/60);
				let sec = v-(parseInt(v/60)*60);
				$("#control_time").val(`${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`);
				global.timer.time--;
			}
		}
	},
	stop: () => {
		global.timer.time = 300;
		let v = global.timer.time;
		let min = parseInt(v/60);
		let sec = v-(parseInt(v/60)*60);
		$("#control_time").val(`${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`);
	}
}

global.siren = {
	toggle: () => {
		global.sendSocket({type:"toggleSignal100"});
	},
	play: () => {
		$("#siren100")[0].play();
	}
}

global.panic = {
	toggle: () => {
		global.sendSocket({type:"togglePanic"});
	},
	play: () => {
		$("#panicSiren")[0].play();
	}
}

global.connect = (call) => {
	if(global.selected_length()==0) return;
	for(let i = 0; i < 255; i++) {
		$("#active_unit_"+i).css("background", "inherit");
	}
	global.sendSocket({type:"connectToCall",callID:call-1,units:global.selected_units});
	global.selected_units=[];
	$(".otherActions").hide();
}

global.activeDispatch = () => {
	if(global.getDepartment(global.userInfo.department)=="control"&&global.userInfo.access=="control") {
		global.sendSocket({type:"unitChangeStatus", val: global.userInfo.cadStatus==0?2:0})
	}
}

global.giveWarn = (reason = null) => {
	let unit = global.selected_units[0];
	let i = 0;
	if(unit != null) {
		let curr = global.units.find((u)=>{return u.badge==unit});
		if(reason == null) {
			global.alert("CAD Give Warn", `
				Предупреждений у ${curr.pedName}: ${curr.warns.length}<br>
				<input type="text" placeholder="Укажите причину" id="warn_reason">
			`, {next: () => {
				global.giveWarn($("#warn_reason").val());
				global.selected_units = [];
			}, bg:"error", width:30});
		} else {
			global.sendSocket({type:"giveWarn", unit: unit, reason: reason});
		}
	}
}

global.rmWanted = (id) => {
	global.sendSocket({type:"rmWanted", id:id});
}

global.updateBC1 = (signal, panic, users) => {
	if(global.userInfo.department==1&&global.userInfo.cadStatus==2) {
		$("#panic").hide();
		$("#signal100").show();
		$("#signal100").css("width","100%");
	}
	else {
		$("#signal100").hide();
		$("#panic").show();
		$("#panic").css("width","100%");
	}
	if($("#panic").is(":visible")) {
		if(panic) {
			$("#panic").text("АКТИВНА КНОПКА ПАНИКИ: "+users.join(", "));
		} else if(signal) {
			$("#panic").text("АКТИВЕН СИГНАЛ 100! ТОЛЬКО ПРИОРИТЕТНЫЕ РАДИОПЕРЕДАЧИ.");
		} else {
			$("#panic").text("Активируйте в случае прямой угрозы вашей жизни.");
		}
	}
	if($("#signal100").is(":visible")) {
		if(panic) {
			$("#signal100").text("АКТИВНА КНОПКА ПАНИКИ: "+users.join(", "));
		} else if(signal) {
			$("#signal100").text("АКТИВЕН СИГНАЛ 100! ТОЛЬКО ПРИОРИТЕТНЫЕ РАДИОПЕРЕДАЧИ.");
		} else {
			$("#signal100").text("Активируйте в случае экстренной ситуации.");
		}
	}
}

global.updateBC2 = (signal, panic, users) => {
	let sV = $("#signal100").is(":visible");
	let pV = $("#panic").is(":visible");
	let s = $("#signal100");
	let p = $("#panic");
	if(signal) {
		s.css("background","#c52818");
		p.css("background","");
		p.text("КНОПКА ПАНИКИ");
	} else if(panic) {
		s.css("background","");
		p.css("background","#c52818");
		p.text("КНОПКА ПАНИКИ: "+users.join(", "));
	} else {
		s.css("background","");
		p.css("background","");
		p.text("КНОПКА ПАНИКИ");
	}
	s.show();
	p.show();
	$("#panic").css("width","70%");
	$("#signal100").css("width","30%");
}

global.departments = [0, "Emergency Control Department", "Blaine County Sheriff`s Office", "San Andreas Highway Patrol", "Los Santos Police Department", "American Medical Response, Inc."]//, "DPS San Andreas State Police", "American Medical Response, Inc."]

global.currentTab = 0;

global.query = (msg) => {
	msg=JSON.parse(msg);
	global.console(msg);
	if(msg.type == "sessionData" && msg.token.length > 5) {
		global.setCookie("userToken", msg.token);
	} else if(msg.type == "userStatus" && msg.status != null) {
		global.userInfo.status = msg.status;
		if(msg.status == "preLogin" || msg.status == "connected") {

			for(let i = 0; i < 99;i++){
				if([0,1].includes(i)) {if($(".tab")[i]!=null) $(".tab")[i].style.display = "inline-block";}
				else {if($(".tab")[i]!=null) $(".tab")[i].style.display = "none";}
			}

			if(global.currentTab != 0 && global.currentTab != 1) {
				changeTab(0);
			}
		} else if(msg.status == "authed") {
			global.userInfo.department = msg.department||0;
			global.userInfo.rank = msg.rank;
			global.userInfo.sign = msg.sign;
			global.userInfo.pedName = msg.pedName;
			global.userInfo.access = msg.access;
			global.userInfo.cadStatus = msg.cadStatus;
			global.userInfo.badge = msg.badge;
			global.userInfo.meta = msg.meta;
			let tabs = [];
			let dept = global.getDepartment(msg.department||0);
			if(dept == "police"||dept == "medic") {
				tabs = [2,3,4,6,9];
				changeTab(2);
			} else if(dept == "control") {
				tabs = [2,3,4,6];
				changeTab(2);
			} else if(dept == "admin") {
				tabs = [4,6,8,9];
				changeTab(4);
			} else if(dept == "civ") {
				tabs = [8];
				changeTab(8);
			}

			for(let i = 0; i < 99;i++){
				if(tabs.includes(i)) {if($(".tab")[i]!=null) $(".tab")[i].style.display = "inline-block";}
				else {if($(".tab")[i]!=null) $(".tab")[i].style.display = "none";}
			}

			if(global.getCookie("update")==null) global.setCookie("update",0);
			if(global.updates.actual>global.getCookie("update")){
				if(global.updates[global.updates.actual].type == "update") 
					global.alert(`CAD Update ${global.updates[global.updates.actual].v}`, `<b>Обновление от ${global.timeConv(global.updates[global.updates.actual].date)}</b><br><br>${global.updates[global.updates.actual].text}`, {width:40,showBG:true});
				else global.alert(`CAD Notification`, global.updates[global.updates.actual].text, {width:40,showBG:true});
				global.setCookie("update", global.updates.actual);
			}

			if(dept!="medic") {
				$("#callReport").hide();
			} else {
				$(".noForMedic").hide();
				$("#bd_2").hide();
				$("#bd_1").css("width","98%");
				$(".my-custom-scrollbar").css("height", "89%");
			}
			if(global.getDepartment(msg.department)=="control") { //control
				$("#signal100").show();
				//$("#control_panel").show();
				$("#unitStatus").hide();
				$("#controlAsActive").show();
				$("#panic").hide();
			} else if(global.getDepartment(msg.department)=="police"||global.getDepartment(msg.department)=="medic") { //BCSO
				$("#signal100").show();
				$("#control_panel").hide();
				$("#unitStatus").show();
				$("#controlAsActive").hide();
				$("#panic").show();
				for(let ic = 0; ic < $("#unitStatus")[0].children.length; ic++){
					if($("#unitStatus")[0].children[ic].value==msg.cadStatus) $("#unitStatus")[0].children[ic].selected="yes";
					else $("#unitStatus")[0].children[ic].selected = "";
				};
			}
			//$(".bottonTabBlock").show();
		}
	} else if(msg.type == "connectedToCall") {
		$("#connected")[0].play();
	} else if(msg.type == "unitsInfo" && msg.list != null) {
		let staff = [];
		global.units = msg.list;
		global.staff = msg.staff;
		global.combined = msg.combined;
		if(global.units&&global.units.find((e)=>{return e.department==1&&e.status==2})==null) global.updateBC2(msg.signal, msg.panic, msg.panic_units);
		else global.updateBC1(msg.signal, msg.panic, msg.panic_units)
		let _llist = [];
		for(let i in msg.list){
			let unit = msg.list[i];
			if(_llist.includes(unit.sign)||global.getDepartment(unit.department)=="civ"||unit.department==null) continue;
			_llist.push(unit.sign);
			if(unit.badge==global.userInfo.badge) {
				global.userInfo.sign = unit.sign;
				if(!(document.activeElement.id=="notepad"&&global.currentTab == 2)) $("#notepad").val()!=unit.note?$("#notepad").val(unit.note):"";
				switch(global.getDepartment(global.userInfo.department)) {
					case 'control': 
						$("#notepad")[0].placeholder = "Сохраняйте спокойствие.";
					case 'medic': 
						$("#notepad")[0].placeholder = "Сохраняйте спокойствие.";

						break;
					case 'police': 
						$("#notepad")[0].placeholder = global.miranda;
						break;
				}
				global.userInfo.isAdmin = unit.isAdmin;
				if(!unit.isAdmin) {$("#adminList").hide();$("#forAdmin").hide();}
				global.userInfo.cadStatus = unit.status;
				global.userInfo.discord = unit.discord;
				if(unit.status==3) {
					$("#unitStatus")[0].disabled = "true";
				} else $("#unitStatus")[0].disabled = "";
				if(global.userInfo.access=="control"&&global.getDepartment(global.userInfo.department)=="control"){
					if(unit.status==0){
						$("#controlAsActive").css("background", "#888888");
						$("#controlAsActive").text("НАЧАТЬ СМЕНУ | АКТИВНЫЙ ДИСПЕТЧЕР");
					} else {
						$("#controlAsActive").css("background", "#359c35");
						$("#controlAsActive").text("10-8 | АКТИВНЫЙ ДИСПЕТЧЕР");
					}
				}
			}
			//////////////////
			if((unit.sign == global.userInfo.sign)&& unit.department==1) {
				global.console("Show for ctrl")
				unit.status==2?$(".ctrlView").show():$(".ctrlView").hide();
			}
		}
		for(let i in msg.staff) {
			let unit = msg.staff[i];
			if(unit.department!=99&&unit.department!=0&&unit.access!="banned"){
				let status;
				global.units.forEach((_e)=>{
					if(unit.sign==_e.sign) status = _e.status==0?"Недоступен":_e.status==1?"Перерыв":_e.status==2?"Доступен":"На вызове";
				});
				if(status==null) status="Отсутствует";
				let rep = "";
				if(unit.reputation>0) rep="#34a757";
				else if(unit.reputation<0) rep="red";
				else rep = "orange";
				//${global.userInfo.isAdmin?"":"display:none;"}
				staff.push(`<tr class="link signH" onclick="global.changeUnitData(${unit.ID}, '${unit.sign}')">
							    <td>${unit.ID||"null"}</td>
							    <td>${global.departments[unit.department]||"null"}</td>
							    <td>${unit.pedName}</span></td>
							    <td style="color: ${rep};">${unit.reputation}</td>
							    <td>${unit.sign}</td>
							    <td>${unit.rank}</td>
							    <td>${unit.phone}</td>
							    <td>${unit.badge}</td>
							    <td>${unit.discord||"null"}</td>
							    <td onclick="${global.userInfo.isAdmin?'global.banUser('+unit.badge+');':''}">${status||"null"}</td>
							</tr>`);
			}
		}
		//////////////////// SORT
		let sort = global.sort();
		let sorted = [];
		_llist = [];
		for(let i in msg.list) {
			let unit = msg.list[i];
			let comb = null;
			msg.combined.forEach((e)=>{if(e.units.includes(unit.badge)) comb = e;});
			if(comb!=null) unit.status = comb.status;
			if(_llist.includes(unit.sign)||global.getDepartment(unit.department)=="civ"||unit.department==null) continue;
			_llist.push(unit.sign);
			//////////////////
			let bg = unit.status==0?"#353a40":unit.status==1?"rgb(255, 187, 63)":unit.status==2?"#34a757":"#4a86e8";
			let text = unit.status==0?"НЕДОСТУПЕН":unit.status==1?"ПЕРЕРЫВ":unit.status==2?"ДОСТУПЕН":"НА ВЫЗОВЕ";
			let selected = '';
			if(unit.status==2&&unit.department==1) {
				bg = "#34a757";text="АКТИВНЫЙ ДИСПЕТЧЕР";
			}
			//////////////////
			if(global.selected_units.includes(unit.badge)) selected = "background: ghostwhite;color:black;";
			let onclick = `onclick="global.select_unit(${i});"`;
			let content = `<div class="active_unit" ${onclick} id="active_unit_${i}" style="background: ${bg};display: flex;${selected}text-align: center;">
					    <div style="width: 64%;padding: 1% 0;font-size: 1.4vh;">${text}</div>
					    <div style="width: 25%;padding: 1% 0;font-weight: bold;color: ${unit.department==1?"black":unit.department==2?"#c54900":unit.department==3?"#d09d43":unit.department==4?"#0069d6":"red"};background: #d7d7d7;">${comb!=null?(comb.sign+"(D)"):unit.sign}</div>
					    <div style="width: 12%;padding: 1% 0;font-weight: bold;color: black;background: #d7d7d7;">${unit.gameID||0}</div>
					</div>`;
			if(unit.department==1) {
				onclick = "";
				content = `<div class="active_unit" ${onclick} id="active_unit_${i}" style="background: ${bg};display: flex;${selected}text-align: center;">
					    <div style="width: 64%;padding: 1% 0;font-size: 1.4vh;">${text}</div>
					    <div style="width: 37%;padding: 1% 0;font-weight: bold;color: ${unit.department==1?"black":unit.department==2?"#c54900":unit.department==3?"#d09d43":unit.department==4?"#0069d6":"red"};background: #d7d7d7;">${comb!=null?(comb.sign+"(D)"):unit.sign}</div>
					</div>`;
			} 
			if(unit.department!=0) sorted.push({u:unit,c:content});
		}
		let temp = []
		sorted.forEach((e)=>{
			let _c = global.combined.find((c)=>{return c.units.includes(e.u.sign)})
			if(_c!=null) {
				e.u.comb = 1;
			} else e.u.comb = 0;
			temp.push(e)
		})
		sorted = temp;
		sorted.sort((a,b)=>{return b.u.comb-a.u.comb})
		sorted.sort((a,b)=>{return a.u.department-b.u.department})
		sorted.sort((a,b)=>{return b.u.status-a.u.status})
		sorted.sort((a,b)=>{return a.u.department==1?-1:0})
		let _s = [];
		sorted.forEach((e)=>{
			_s.push(e.c)
		})
		/////////////////////////
		$("#active_units").html(_s.join(""));
		if(global.acceptStage==0) $("#staff_table").html(staff.join(''));
		global.query(JSON.stringify({type:"wanted",data:global.warrentH}));
	} else if(msg.type == "notification"){
		if(msg.t == null || msg.t == 0) global.alert(msg.title, msg.msg, {next: msg.next, close: msg.close, nextText: msg.nextText, bg: msg.bg||"error"});
		else if(msg.t == 1) global.notification.send(msg.msg);
	} else if(msg.type == "100BC") {
		if(msg.signal) global.siren.play();
		else if(msg.panic) global.panic.play();
		if(global.units&&global.units.find((e)=>{return e.department==1&&e.status==2})==null) global.updateBC2(msg.signal, msg.panic, msg.panic_units)
		else global.updateBC1(msg.signal, msg.panic, msg.panic_units)
	} else if(msg.type == "adminLog") {
		if(!global.userInfo.isAdmin) return;
		if(msg.log!=null) $("#blockVisible_4").text(msg.log.join(`
`));
		$("#adminList").show();
	} else if(msg.type == "calloutsInfo") {
		global.callouts = msg.list;
		global.console(msg.list);
		let res = "";
		let log = "";
		let id = 0;
		msg.list.forEach((call) => {
			if(call.status) {
				res+=`<tr>
				    <td><span onclick="global.editCall(${id+1})" style="cursor:pointer">${id+1}</span></td>
				    <td>${call.desc}</td>
				    <td>${call.units.length!=0?call.units.join(", "):"Нет юнитов"}</td>
				    <td>${call.loc}</td>
				    <td id="callTimer${id}">00:00</td>
				    <td><span style="color: #white;cursor: pointer;" onclick="global.code4(${id+1});">активен</span></td>
				    <td class="otherActions"><span style="color: #22b922;cursor: pointer;" onclick="global.connect(${id+1})">Прикрепить</span></td>
				</tr>`;
			} else {
				log+=`<tr onclick="global.showCalloutLog(${id})" style="cursor:pointer;">
						<td>${id+1}</td>
						<td>${call.desc}</td>
						<td>${call.loc}</td>
						<td>${fancyTimeFormat((call.closeTime-call.time)/1000)}</td>
						<td>${new Date(call.time).toLocaleTimeString()}</td>
						<td>${new Date(call.closeTime).toLocaleTimeString()}</td>
						<td>${call.sender}</td>
					</tr>`;
			}
			id++;
		});
		$("#calloutsLogList").html(log);
		if(res != "") {
			$("#callouts_list").html(res);
			$("#callouts_list").show();
			$("#no_callouts").hide();
			global.blockVisible[1]?null:$("#visible_calls").click();
			let id = 0;
			global.callouts!=null?global.callouts.forEach((call)=>{
				let t = parseInt((new Date()-call.time)/1000);
				let min = parseInt(t/60);
				let sec = t-(parseInt(t/60)*60);
				$("#callTimer"+id).text(`${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`)
				id++;
			}):null;
		} else {
			$("#callouts_list").html("");
			$("#callouts_list").hide();
			$("#no_callouts").show();
			$("#visible_calls").click();
			global.blockVisible[1]?$("#visible_calls").click():null;
		}
		if(global.selected_length()==0) $("#selected_unit_info").hide();
	} else if(msg.type == "wanted") {
		if(msg.data==null) return;
		let peds = "";
		let vehs = "";
		global.warrentH = msg.data;
		msg.data.forEach((e)=>{
			let _e = e;
			let rm = "";
			e=e.Data;
			/*if(global.userInfo.department==1&&global.userInfo.cadStatus==2)*/ rm = `<td style="display:table-cell;"><span style="cursor:pointer;">${e.time?`${global.timeConv(e.time)}`:'00/00/00 00:00:00'}</span></td>`;
			if(_e.Type){//veh
				vehs+=`
					<tr style="cursor:pointer;">
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.vin}</td>
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.model}</td>
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.desc.length>70?(e.desc.substring(0,70)+" .."):e.desc}</td>
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.reason.length>70?(e.reason.substring(0,50)+" .."):e.reason}</td>
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.loc.length>40?(e.loc.substring(0,40)+" .."):e.loc}</td>
					    <td onclick="global.viewDB(0, 'veh', ${_e.ID});">${e.sender}</td>
					    ${rm}
					</tr>
				`;
			} else {
				peds+=`
					<tr style="cursor:pointer;">
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.rn||e.realid||"-"}</td>
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.name||"-"}</td>
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.desc.length>70?(e.desc.substring(0,70)+" .."):e.desc}</td>
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.reason.length>70?(e.reason.substring(0,50)+" .."):e.reason}</td>
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.loc.length>40?(e.loc.substring(0,40)+" .."):e.loc}</td>
					    <td onclick="global.viewDB(0, 'ped', ${_e.ID});">${e.sender}</td>
					    ${rm}
					</tr>
				`;
			}
		})
		$("#wanted_peds").html(peds);
		$("#wanted_vehs").html(vehs);
	} else if(msg.type == "dbInfo") {
		global.dbTable = __d(msg.data, 0);
		if(global.getDepartment(global.userInfo.department)=="civ") global.onCivLoaded(); 
		let peds = "";
		let vehs = "";
		msg.data.forEach((e)=>{
			if(e.Type==0){
				peds+=`<tr>
					    <td>${e.Data.realid==null||e.Data.realid=="null"?"-":e.Data.realid}</td>
					    <td>${e.Data.firstname}</td>
					    <td>${e.Data.lastname}</td>
					    <td>${e.Data.phone}</td>
					    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">выбрать</span></td>
					</tr>`;
			} else {
				let owner;
				msg.data.forEach((_d)=>{
					if(_d.Type==0&&_d.ID==e.Data.owner){
						owner=_d.Data.realid+" / "+_d.Data.firstname+" "+_d.Data.lastname;
					}
				})
				let model = e.Data.model;
				model = global.vehicles.find((e)=>{return e[1] == ((model||"").toLocaleLowerCase())});
				if(model) model = model[2]
				else model = e.Data.model;
				if(model=="NAME") model = e.Data.model;
				vehs+=`<tr>
					    <td>${e.Data.vin}</td>
					    <td>${model}</td>
					    <td>${e.Data.status==0?"На трафике":e.Data.status==1?"Арестован":e.Data.status==2?"В розыске":e.Data.status==3?"Снят с регистрации":"Временная регистрация"}</td>
					    <td>${owner}</td>
					    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">${e.Data.status==4?("До "+e.Data.time):"выбрать"}</span></td>
					</tr>`;
			}
		});
		$("#search_ped").html(peds);
		$("#search_veh").html(vehs);
	} else if(msg.type == "restartAlert") {
		$("#restart")[0].loop = true;
		$("#restart")[0].play();
		$("#restart")[0].volume = 0.04;
		var restart = 20;
		setInterval(()=>{
			if(restart > 0) global.alert("CAD NOTIFICATION",">> ПЕРЕЗАПУСК БАЗЫ ЧЕРЕЗ "+restart+" СЕК <<",{close:()=>{restart = 0;},width:20})
			restart--;
		},1000)
	} else if(msg.type == "requestCombine") {
		global.alert(`CAD Request Combine`, `Офицер ${msg.unit} запрашивает комбинированный юнит, далее доступный как ${msg.sign}. <b>Подтвердить?</b>`, {
			next:() =>{
				global.sendSocket({type: "requestCombineOkay", sign: msg.sign});
			},
			close: () => {
				global.sendSocket({type: "requestCombineFailed"});
			} , width: 30, showBG:false,
		})
	} else global.console("Undefined data: "+JSON.stringify(msg));
}

global.srt = [null,false,false];
global.sort = (type) => {
	if(type==0) return global.srt;
	global.srt[type]=!global.srt[type];
}

global.keyEvent = (obj, e) => {
	if(e.keyCode==13) login();
	return true;
}

global.changeUnitData = (id,sign) => {
	if(!global.userInfo.isAdmin&&sign!=global.userInfo.sign) return;
	let us = global.staff.find((e)=>{return e.ID == id});
	global.alert(`CAD Change Unit Sign`,`
		<span style="color:red;" id="unitError"></span>
		<select ${global.userInfo.isAdmin?"":"disabled"} style="width:100%;" id="newDept">
			${global.departments.join("</option><option>").substring(10)}</option>
		</select>
		<input type="text" value="${us.pedName}" placeholder="Имя Фамилия" id="newName" style="">
		<input type="text" value="${sign}" placeholder="Новый позывной" id="newSign" style="">
		<input type="text" value="${us.rank}" placeholder="Новое звание" ${global.userInfo.isAdmin?"":"disabled"} id="newRank" style="">
		<input type="text" value="${us.discord}" placeholder="Discord" id="newDiscord" style="">
		<input type="text" value="${us.phone}" placeholder="Phone" id="newPhone" style="">
		<input type="text" value="${us.gameID}" placeholder="In Game ID" id="newID" style="">
	`,{
		next: (b=us.badge)=>{
			let nN = $("#newName").val();
			let nS = $("#newSign").val();
			let nR = $("#newRank").val();
			let nD = $("#newDiscord").val();
			let nDe = $("#newDept")[0].selectedIndex+1;
			let nP = $("#newPhone").val();
			let newID = $("#newID").val();
			let next = true;
			if(nS=="-"||nS==null||nS=="") next="<позывной>";
			else if(global.staff.find((e)=>e.sign == nS&&us.sign != nS)) next="<~позывной>"
			else if(nR.search(/^[A-Za-z\s]{3,20}$/)!=0) next="<ранг>";
			else if(nD.search(/^.{2,64}#[0-9]{4}$/)!=0) next="<Discord>";
			else if(nP.search(/^[0-9]{3}-[0-9]{4}$/)!=0) next="<номер телефона>";
			else next = true;
			if(next == true){
				global.sendSocket({type:"changeUnitData",badge: b, sign: nS, rank: nR, discord: nD, phone: nP, dept: nDe,name: nN, newID: newID});
			} else {$("#unitError").text(`* Ошибка поля ${next}`);return 1;}
		},showBG:false,width:30
	});
	$("#newDept")[0].selectedIndex = us.department-1;
}

global.banUser = (badge) => {
	let c = global.staff.find((e)=>{return e.badge==badge});
	global.sendSocket({type:"banUserPre",user:c.sign});
	global.alert(`CAD Ban User`,`
		<span>Вы уверенны что хотите забанить [${c.sign}] ${c.pedName}?</span>
		<input type="text" placeholder="Введите код подтверждения" id="confirmCode">`,{next:(sign=c.sign)=>{
			global.sendSocket({type:"banUser",user:sign,confirmCode: $("#confirmCode").val()});
	}})
}

global.searchPed = (value) => {
	if(value.search(/^[a-zA-Zа-яА-Я0-9\s]{0,52}$/)==-1) return;
	global.console(`Searching ped with value: ${value}`);
	if(value.length==0){
		let result = "";
		global.dbTable.forEach((e)=>{
			if(e.Type==0){
				result+=`<tr>
				    <td>${(e.Data.realid==null||e.Data.realid=="null")?"-":e.Data.realid}</td>
				    <td>${e.Data.firstname}</td>
				    <td>${e.Data.lastname}</td>
				    <td>${e.Data.phone}</td>
				    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">выбрать</span></td>
				</tr>`;
			}
		});
		$("#search_ped").html(result);
	} else {
		let result = "";
		global.dbTable.forEach((e)=>{
			if(e.Type==0&&e.Data!=null){
				let found = false;
				if(e.Data.realid&&e.Data.realid.search(value)!=-1) found = true;
				if(((e.Data.firstname+" "+e.Data.lastname).toLocaleLowerCase()).search(value.toLocaleLowerCase())!=-1) found = true;
				if(e.Data.phone.search(value)!=-1) found = true;
				if(found) {
					result+=`<tr>
					    <td>${(e.Data.realid==null||e.Data.realid=="null")?"-":e.Data.realid}</td>
					    <td>${e.Data.firstname}</td>
					    <td>${e.Data.lastname}</td>
					    <td>${e.Data.phone}</td>
					    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">выбрать</span></td>
					</tr>`;
				}
			}
		});
		$("#search_ped").html(result);
	}
}

global.saveNote = (value) => {
	global.sendSocket({type:"saveNote",val:value});
}

global.callReport = () => {
	if(global.getDepartment(global.userInfo.department)=="medic"){
		let calls = [];
		global.callouts.forEach((e)=>{
			calls.push(`<option>${e.desc} / ${e.loc}</option>`);
		})
		global.alert(`CAD Scene Report`, `
			<div style="display:inline-block;">Выберите вызов:</div>
			<select style="width: 15vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;margin-bottom: 1vh;" id="report_call">
		    	${calls.join("")}
			</select>
			<div style="display:inline-block;">Введите рег.номер:</div>
			<input type="text" placeholder="0YYY000" id="report_realid" style="width: 67%;padding: 0.7vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 1%;border: 1px solid white;">
			<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
				<div class="separator" style="background: black;"></div>
				<div style="z-index: 3;margin-top: -1.2vh;background: #ffffff;width: fit-content;margin-left: 1vw;text-align: center;padding: 0 1vw;">Краткая информация</div>
			</div>
			<input type="text" placeholder="..." id="report1" style="width: 98%;padding: 0.7vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 1%;border: 1px solid white;">
			<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
				<div class="separator" style="background: black;"></div>
				<div style="z-index: 3;margin-top: -1.2vh;background: #ffffff;width: fit-content;margin-left: 1vw;text-align: center;padding: 0 1vw;">Детальная информация</div>
			</div>
			<textarea id="report2" style="height: 15vh;color: #b5b5b5;background: #3e3e3e;padding: 1%;resize: none;width: auto;width: 98%;margin: 1vh 0 1vh;"></textarea>
		`, {next:()=>{
			let callID = $("#report_call")[0].selectedIndex;
			let realID = $("#report_realid").val();
			let report1 = $("#report1").val();
			let report2 = $("#report2").val();
			let i = global.dbTable.find((e)=>{return e.Type==0&&e.Data.realid==realID});
			let next = true;
			if(i==null) {next=false;alert("Неверно указан Real ID!");}
			if(report1.length<5&&report1.length>215) {next=false;alert("Не указана краткая информация!");}
			if(report2.length<5&&report2.length>2048) {next=false;alert("Не указана детальная информация!");}
			report1=report1.replaceAll('`','%1'); report1=report1.replaceAll('"','%2'); report1=report1.replaceAll("'",'%3'); report1=report1.replaceAll("\\",'%4'); report1=report1.replaceAll(`
`, "▼")
			report2=report2.replaceAll('`','%1'); report2=report2.replaceAll('"','%2'); report2=report2.replaceAll("'",'%3'); report2=report2.replaceAll("\\",'%4'); report2=report2.replaceAll(`
`, "▼")
			global.sendSocket({type:"callReport",callID:callID,ped:i.ID,report1:report1,report2:report2});
			return !next;
		}, showBG:false,bg:"success",width:30});
	}
}

global.searchVeh = (value) => {
	if(value.search(/^[a-zA-Zа-яА-Я0-9\s]{0,52}$/)==-1) return;
	global.console(`Searching veh with value: ${value}`);
	if(value.length==0){
		let result = "";
		global.dbTable.forEach((e)=>{
			if(e.Type==1){

				let owner;
				global.dbTable.forEach((_d)=>{
					if(_d.Type==0&&_d.ID==e.Data.owner){
						owner=_d.Data.realid+" / "+_d.Data.firstname+" "+_d.Data.lastname;
					}
				})
				result+=`<tr>
					    <td>${e.Data.vin}</td>
					    <td>${e.Data.model}</td>
					    <td>${e.Data.status==0?"На трафике":e.Data.status==1?"Арестован":e.Data.status==2?"В розыске":e.Data.status==3?"Снят с регистрации":"Временная регистрация"}</td>
					    <td>${owner}</td>
				    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">${e.Data.status==4?("До "+e.Data.time):"выбрать"}</span></td>
				</tr>`;
			}
		});
		$("#search_veh").html(result);
	} else {
		let result = "";
		global.dbTable.forEach((e)=>{
			if(e.Type==1){
				let found = false;

				let owner;
				global.dbTable.forEach((_d)=>{
					if(_d.Type==0&&_d.ID==e.Data.owner){
						owner=_d.Data.realid+" / "+_d.Data.firstname+" "+_d.Data.lastname;
					}
				})

				if(e.Data.vin.search(value)!=-1) found = true;
				if(owner&&owner.search(value)!=-1) found = true;
				if((e.Data.model.toLocaleLowerCase()).search(value.toLocaleLowerCase())!=-1) found = true;
				if(found) {
					result+=`<tr>
					    <td>${e.Data.vin}</td>
					    <td>${e.Data.model}</td>
					    <td>${e.Data.status==0?"На трафике":e.Data.status==1?"Арестован":e.Data.status==2?"В розыске":e.Data.status==3?"Снят с регистрации":"Временная регистрация"}</td>
					    <td>${owner}</td>
					    <td><span style="color:#white;cursor:pointer;border-bottom: 1px solid;" onclick="global.viewDB(${e.ID})">${e.Data.status==4?("До "+e.Data.time):"выбрать"}</span></td>
					</tr>`;
				}
			}
		});
		$("#search_veh").html(result);
	}
}

global.fileUpdate = () => {
	global.console(global.image);
	$.ajax({
		url: "upload.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData($("#formDS")[0]), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
			$("#"+global.stage).css("background", "center / cover no-repeat url(images/"+global.image+".png)");
			let id;
			if(global.userInfo.department==0) id = parseInt(global.userInfo.meta);
			else id = global.stageID;
			if(id==null||typeof(id)!="number"||id==0||global.dbTable.find((e)=>{return e.ID==id})==null) return global.alert(`CAD Error`, `ERROR: Что-то пошло не так... ${id}`)
			if(global.view == "db"||global.getDepartment(global.userInfo.department)) global.sendSocket({"type":"updateTable", "id": id, "image": global.image, "decl": global.stage});
			global.image = null;
		}
	});
}

global.checkRegOwner = (owner) => {
	let found = false;
	let own = ['UNDEFINED',0];
	global.dbTable.forEach((e)=>{
		if(e.Type==0&&e.Data.realid==owner) {
			$("#checkRegOwner").css("color","#34a757");
			$("#checkRegOwner").text(`Владелец: ${e.Data.firstname} ${e.Data.lastname}`);
			own = [`${e.Data.firstname} ${e.Data.lastname}`,e.ID];
			found = true;
		}
	});
	if(!found){
		$("#checkRegOwner").css("color","red");
		$("#checkRegOwner").text(`Не найдено человека с Real ID: ${owner}`);
	}
	return own;
}

global.regCarConfirm = () => {
	let type = $("#reg_se_type")[0].selectedIndex;
	let plate = $("#reg_se_plate")[0].selectedIndex;
	let engine = $("#reg_se_engine")[0].selectedIndex-1;
	let susp = $("#reg_se_susp")[0].selectedIndex-1;
	let trans = $("#reg_se_trans")[0].selectedIndex-1;
	let turbo = $("#reg_se_turbo")[0].selectedIndex-1;
	let vCount = $("#regVeh_count").val();
	let vin = $("#regVeh_vin").val();
	let model = $("#regVeh_model").val();
	let color = $("#regVeh_color").val();
	let owner = $("#regVeh_owner").val();

	let count = 0;

	if(type==1||type==2) {
		if(vCount > 4) {
			count+=1000;
		} else count+=250*vCount;
		count+=7;
	} else if(type==3) {
		if(vCount > 4) {
			count+=2200;
		} else count+=575*vCount;
		count+=14;
	} else if(type==4) {
		if(vCount > 4) {
			count+=4700;
		} else count+=1175*vCount;
		count+=28;
	}
	plate==3?count+=75:0;
	plate==4?count+=125:0;
	count+=275*engine;
	count+=275*susp;
	count+=275*trans;
	count+=275*turbo;

	let t = {};
	let time = new Date();
	t.day = time.getDate();
	t.month = time.getMonth()+1;
	t.year = time.getFullYear();
	t.day<10?t.day="0"+t.day:undefined;
	t.month<10?t.month="0"+t.month:undefined;
	t.hour<10?t.hour="0"+t.hour:undefined;
	let isTimed = $("#regVeh_timed")[0].checked;
	if(!isTimed) {
		if(false) global.alert(`CAD Confirm Registration Vehicle`, `
								Стоимость регистрации: $${count}.<br>
								VN: ${vin}<br>
								Владелец: ${global.checkRegOwner(owner)[0]}<br>
								Модель: ${model}
								<textarea disabled id="notepad" style="height: 8vh;">ДАТ: ${t.day}/${t.month}/${t.year}
								INF: VR
									СУММ: $${count}</textarea>
			`, {next: (pl = plate, en = engine, su = susp, tr = trans, tu = turbo, vn = vin, md = model, own = owner)=> {
				global.sendSocket({type:"regNewVehicle", plate: pl, engine: en, susp: su, trans: tr, turbo: tu, vin: vn, model: md, owner: global.checkRegOwner(own)[1], img: global.image, color: color});
			}, bg: "success",width:30}); 
		else global.sendSocket({type:"regNewVehicle", plate: 0, engine: 0, susp: 0, trans: 0, turbo: 0, vin: vin, model: model, owner: global.checkRegOwner(owner)[1], img: global.image, color: color});
	} else global.sendSocket({type:"regNewVehicle", vin: vin, model: model, owner: global.checkRegOwner(owner)[1], img: global.image, timed: isTimed, color: color, time: $("#regVeh_timeObj").val()});
	changeTab(3);
}

global.changeTimeReg = (obj) => {
	obj.checked?$("#timeReg").show():$("#timeReg").hide();
}

global.changeVehicleModel = (model) => {
	model = global.vehicles.find((e)=>{return e[1] == $("#regVeh_m")[0].children[model].innerHTML});
	modelAvailable = model[0];
	model = model[1];
	$("#regVeh_model").val(model);
	if(!modelAvailable) global.notification.send(`Модель ${model} не разрешена для регистрации!`);
}

global.changeVehicleModelInput = (model) => {
	model = model.toLocaleLowerCase();
	let vehs = "";
	global.vehicles.forEach((e)=>{
		if(e[1].includes(model)) vehs+=`<option ${e[0]==0?'style="color:red;"':""}>${e[1]}</option>`
	});
	$("#regVeh_m")[0].innerHTML = vehs;
}

global.regCar = () => {
	global.view = null;
	global.image = null;
	$(".tab")[7].style.display = "inline-block";
	$(".tab")[7].click();
	let d = new Date(new Date().getTime()+260000000);
	let day = d.getDate()<10?('0'+d.getDate()):d.getDate();
	let vehs = "";
	global.vehicles.forEach((e)=>{
		vehs+=`<option ${e[0]==0?'style="color:red;"':""}>${e[1]}</option>`
	})
	$("#tab_7").html(`
	<div style="display: inline-flex;width: 100%;">
		<div style="display: inline-block;width: 100%;border-left: 2px solid gray;padding-left: 1vw;">
			<input type="checkbox" onchange="global.changeTimeReg(this)" id="regVeh_timed"> Отметьте в случае, если это временная регистрация.
			<div id="timeReg" style="display:none;">
				Временная регистрация заканчивается: <input type="date" id="regVeh_timeObj" value="${d.getFullYear()+"-"+(d.getMonth()+1)+'-'+(day)}" style="padding: 0.5% 1%;width: 16%;margin: 1%;">
			</div>
			<input type="text" placeholder="VN *X000XXX*" id="regVeh_vin" onchange="global.checkRNExists(this.value,0)">
			<input type="text" placeholder="Модель *Vapid Dominator*" oninput="global.changeVehicleModelInput(this.value)" id="regVeh_model">
			<select multiple="multiple" id="regVeh_m" onchange="global.changeVehicleModel(this.selectedIndex)" style="width: 20%;height: 45%;">
			    ${vehs}
			</select>
			<input type="text" placeholder="Цвет *Красный*" id="regVeh_color">
			<input type="text" placeholder="Real ID владельца *Y000YYY*" id="regVeh_owner" oninput="global.checkRegOwner(this.value)">
			<div id="checkRegOwner"></div>
			<input type="number" min=1 max=20 placeholder="Кол-во транспорта у владельца этого типа" id="regVeh_count" value="1" style="display:none;">
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_type">
		    	<option disabled="" selected>Выберите тип транспорта</option>
				<option>Мотоцикл</option>
				<option>Автомобиль</option>
				<option>Коммерческий</option>
				<option>Комбинированный</option>
			</select>
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_plate">
		    	<option disabled selected>Модификация / Номерной знак</option>
				<option>Белый Тип 1</option>
				<option>Белый Тип 2</option>
				<option>Синий Тип 3</option>
				<option>Чёрный Тип 4</option>
			</select>
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_engine">
		    	<option disabled selected>Модификация / Двигатель</option>
				<option>Стандарт</option>
				<option>Class 2</option>
				<option>Class 3</option>
				<option>Class 4</option>
				<option>Class 5</option>
			</select>
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_susp">
		    	<option disabled selected>Модификация / Подвеска</option>
				<option>Стандарт</option>
				<option>Class 2</option>
				<option>Class 3</option>
				<option>Class 4</option>
				<option>Class 5</option>
			</select>
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_trans">
		    	<option disabled selected>Модификация / Трансмиссия</option>
				<option>Стандарт</option>
				<option>Class 2</option>
				<option>Class 3</option>
				<option>Class 4</option>
				<option>Class 5</option>
			</select>
			<select style="display:none;width: 14vw;" class="regVehiclePerms" id="reg_se_turbo">
		    	<option disabled selected>Модификация / Турбонадув</option>
				<option>Стандарт</option>
				<option>Class 2</option>
				<option>Class 3</option>
				<option>Class 4</option>
				<option>Class 5</option>
			</select>
			<div class="button" id="button" onclick="global.regCarConfirm()" style="width: 100%;margin-bottom: 2vh;">Подтвердить</div>
		</div>
	</div>`);
}

global.checkRNExists = (id,tp) => {
	if(global.dbTable.find((e)=>{return (e.Data.realid==id&&tp==1)||(e.Data.vin==id&&tp==0)})!=null) global.alert(`CAD Copy Check`, `В БД уже имеется запись со следующим ${tp?'RN':'VN'}: ${id}`,{bg:"error"});
}

global.regPed = () => {
	global.view = null;
	global.image = null;
	$(".tab")[7].style.display = "inline-block";
	$(".tab")[7].click();
	$("#tab_7").html(`
	<div style="display: inline-flex;width: 100%;">
		<div style="display: inline-block;width: 100%;border-left: 2px solid gray;padding-left: 1vw;">
			<div style="margin-top: 1vh;">
				<div class="separator"></div>
				<div class="separator_text">Основная информация</div>
			</div>
			<form style="margin-bottom: 0;"><div style="font-size: 1.3vh;margin: 0.5vh 0.2vw;">Пол:</div>
			    <div><input type="radio" name="inlineRadioOptions" id="regPed_isFemale"><div style="display: inline-block;margin-left: 5;position: relative;top: -2px;">Женский</div></div>
			    <div><input type="radio" name="inlineRadioOptions" id="regPed_isMale"><div style="display: inline-block;margin-left: 5;position: relative;top: -2px;">Мужской</div></div>
			</form>
			<input type="text" placeholder="Имя *Ray*" id="regPed_firstname" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<input type="text" placeholder="Фамилия *Dalma*" id="regPed_lastname" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<input type="text" placeholder="Дата рождения *01.01.1970* / Возраст *23*" id="regPed_dateofbirth" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<input type="text" placeholder="Real ID *Y000YYY*" id="regPed_realid" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;" onchange="global.checkRNExists(this.value, 1)">
			<div style="margin-top: 1vh;">
				<div class="separator"></div>
				<div class="separator_text">Контактные данные</div>
			</div>
			<input type="text" placeholder="Номер телефона *000-0000*" id="regPed_phone" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<input type="text" placeholder="Место проживания(Адрес) *1, Mirror Park 1, Los Santos, San Andreas, USA*" id="regPed_residence" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<input type="text" placeholder="Место работы" id="regPed_workplace" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<div style="margin-top: 1vh;">
				<div class="separator"></div>
				<div class="separator_text">Личная информация</div>
			</div>
			<div>
				<select style="width: 20vw;" id="regPed_race">
			   		<option selected="" disabled="">Раса</option>
			   		<option>Белый/европеоид</option>
			   		<option>Афроамериканец</option>
			   		<option>Латиноамериканец</option>
			   		<option>Представитель среднего Востока</option>
			   		<option>Азиат</option>
			   		<option>Другое</option>
			    </select>
			    <select style="width: 20vw;" id="regPed_familyStatus">
			   		<option selected="" disabled="">Семейное положение</option>
			   		<option>Не женат(а)</option>
			   		<option>Женат/Замужем</option>
			   		<option>Разведен(а)</option>
			   		<option>Вдов(а)</option>
			    </select>
			</div>
			<input type="text" placeholder="Место рождения *Los Santos, San Andreas, USA*" id="regPed_birthPlace" style="width: 100%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 1% 0;border: 1px solid white;">
			<form style="margin-bottom: 0;margin: 1vh 0;">
			    <input type="checkbox" name="inlineRadioOptions" id="regPed_prints"> Отметьте в случае, если человек имеет криминальную историю или проходил в полицейских или судебных сводках, служил в войсках или любых правоохранительных ведомствах США, эмигрировал и получал право на жительство, имел право на выезд за границу или имел лицензию на оружие
			</form>
			<textarea class="ped" id="notepad" style="height:20vh" placeholder="Криминальные заметки (можно оставить пустым)"></textarea>
			<textarea class="ped" id="notepad" style="height:20vh" placeholder="Родственники, дети, их номера и место проживания (можно оставить пустым)" style="margin-right: 0!important;"></textarea>
			<textarea class="ped" id="notepad" style="height:20vh" placeholder="Медицинский заметки (можно оставить пустым)"></textarea>
			<div class="button" id="button" onclick="global.regPedConfirm()" style="width: 100%;margin-bottom: 2vh;">Подтвердить</div>
		</div>
	</div>`);
}

global.regPedConfirm = () => {
	let rules = [
		["firstname", 2, 64, "имя", false],
		["lastname", 2, 64, "фамилия", false],
		["dateofbirth", 1, 10, "дата рождения", false],
		["realid", 7, 7, "Real ID", false],
		["phone", 8, 8, "номер телефона", false],
		["residence", 5, 64, "место проживания", false],
		["workplace", 5, 64, "место работы", false],
		["birthPlace", 5, 64, "место рождения", false],
		["criminal", 0, 2048, "Превышен размер поля криминальные заметки.", true],		
		["medical", 0, 2048, "Превышен размер поля медицинские заметки.", true],		
		["family", 0, 2048, "Превышен размер поля родственников.", true],		
	];
	let data = {};
	data.isFemale = $("#regPed_isFemale")[0].checked;//
	data.isMale = $("#regPed_isMale")[0].checked;//
	data.sex = data.isFemale?1:0;//
	data.firstname = $("#regPed_firstname").val();//
	data.lastname = $("#regPed_lastname").val();//
	data.dateofbirth = $("#regPed_dateofbirth").val();//
	data.realid = $("#regPed_realid").val();//
	data.phone = $("#regPed_phone").val();//
	data.residence = $("#regPed_residence").val();//
	data.workplace = $("#regPed_workplace").val();//
	data.race = $("#regPed_race")[0].selectedIndex;
	data.familyStatus = $("#regPed_familyStatus")[0].selectedIndex;
	data.birthPlace = $("#regPed_birthPlace").val();//
	data.prints = $("#regPed_prints")[0].checked?1:0;
	data.img = global.image||"BGregPed";
	data.criminal = $(`.ped`)[0].value;//
	data.medical = $(`.ped`)[2].value;//
	data.family = $(`.ped`)[1].value;//
	data.workplace=data.workplace.replaceAll('`','%1'); data.workplace=data.workplace.replaceAll('"','%2'); data.workplace=data.workplace.replaceAll("'",'%3'); data.workplace=data.workplace.replaceAll("\\",'%4'); 
	data.criminal=data.criminal.replaceAll('`','%1'); data.criminal=data.criminal.replaceAll('"','%2'); data.criminal=data.criminal.replaceAll("'",'%3'); data.criminal=data.criminal.replaceAll("\\",'%4'); data.criminal=data.criminal.replaceAll(`
`, "▼")
	data.medical=data.medical.replaceAll('`','%1'); data.medical=data.medical.replaceAll('"','%2'); data.medical=data.medical.replaceAll("'",'%3'); data.medical=data.medical.replaceAll("\\",'%4'); data.medical=data.medical.replaceAll(`
`, "▼")
	data.family=data.family.replaceAll('`','%1'); data.family=data.family.replaceAll('"','%2'); data.family=data.family.replaceAll("'",'%3'); data.family=data.family.replaceAll("\\",'%4'); data.family=data.family.replaceAll(`
`, "▼")
	//////////////////////////
	let next = true;
	rules.forEach((e)=>{
		global.console(`${e[0]}: ${data[e[0]].length}`)
		if(next&&!(data[e[0]]!=null&&data[e[0]].length >= e[1] && data[e[0]].length <= e[2])) {
			next = false;
			global.alert(`CAD Error`, e[4]?e[3]:`Ошибка в поле ${e[3]}. Исправьте ошибку и повторите попытку!`,{bg:"error"});
		}
	});
	//if(data.dateofbirth.search(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)!=0)return global.alert(`CAD Error`, `Ошибка в поле дата рождения. Исправьте ошибку и повторите попытку!`,{bg:"error"});
	if(next&&(data.isFemale||data.isMale)&&data.race!=0&&data.familyStatus!=0) {
		global.sendSocket({type: "regRealID", data: data});
		changeTab(2);
		global.viewHide();
	} else if(next) {
		global.alert(`CAD Reg ID Error`,`Ошибка в одном из полей! Проверьте написание и повторите попытку.`);
	}
}

global.changeVehStatus = (val) => {
	val==1?$("#vehStatus1").show():$("#vehStatus1").hide();
	val==3?$("#vehStatus3").show():$("#vehStatus3").hide();
	val==4?$("#vehStatus4").show():$("#vehStatus4").hide();
	val==5?$("#vehStatus5").show():$("#vehStatus5").hide();
}

global.changeOwner = (id) => {
	global.alert(`CAD Change Vehicle Owner`, `
		<input type="text" placeholder="Real ID владельца" id="regVeh_owner" oninput="global.checkRegOwner(this.value)">
		<div id="checkRegOwner"></div>`, {next:()=>{
			let c = global.checkRegOwner($("#regVeh_owner").val());
			global.sendSocket({"type":"changeVehicleInfo", "veh":id, "owner":c[1], "ownerI": c[0]});
			changeTab(3);
	}, bg: "success"});
}

global.onVRTimed = (obj) => {
	if(obj.checked) {
		$('#edit_types').hide();
		$('#VRtime').text(global.timeConv(new Date().getTime()+259200000))
		global.pedDate = 259200000;
	} else {
		$('#edit_types').show();
		$('#VRtime').text(global.timeConv(new Date().getTime()+2592000000))
		global.pedDate = 2592000000;
	}
}

global.editVRLicense = (id, newDate = false) => {
	let c = global.dbTable.find((e)=>{return e.ID==id}).Data.driver.status;
	let content = ``;
	let status = c==0?1:c==1?3:1;
	let dept = global.departments[global.userInfo.department];
	global.pedDate = 2592000000;
	if(status==1||newDate) {
		//выдача
		content = `
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${global.timeConv(new Date().getTime())}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> <span id="VRtime">${global.timeConv(new Date().getTime()+global.pedDate)}</span></div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> [${global.userInfo.sign}] ${global.userInfo.pedName}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${dept}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Временная лицензия</span> <input type="checkbox" style="position: relative;top: 0.2vh;" id="edit_timedVR" onchange="global.onVRTimed(this)"></div>
			<div style="margin: 1vh;" id="edit_types"><span style="color:#194bdc;">Тип:</span> 
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_m"> <span>[A]</span> 
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_a"> <span>[B]</span>
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_b"> <span>[C]</span>
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_cdl"> <span>[CDL]</span>
			</div>
		`;
	} else if(status==3) {
		//изъять
		content = `
			<div style="margin: 1vh;"><span style="color:#194bdc;">Причина изъятия:</span> <input type="text" placeholder="" id="reason_3" style="width: 60%;padding: 0.8vh 1vw;color: white;background: #5a5a5a;margin-left: 0.4vw;font-size: 1.3vh;border: 1px solid white;"></div>
		`;
	}
	global.alert(`CAD License`,content,{next: (i=id,st=status,nd = newDate,dates = [new Date().getTime(), new Date().getTime()+global.pedDate]) => {
		let data = {type:"changePedInfo", ped: i, object: "driver"};
		if(nd||st==1) {
			let tp = [];
			if($("#edit_m")[0].checked) tp.push("A");
			if($("#edit_a")[0].checked) tp.push("B");
			if($("#edit_b")[0].checked) tp.push("C");
			if($("#edit_cdl")[0].checked) tp.push("CDL");
			data.driver = {"gived": [dates[0],dates[1],`[${global.userInfo.rank}] ${global.userInfo.pedName}`], "types": tp, "status": 1, "authority": global.departments[global.userInfo.department]};
		} else if(st==3) {
			data.driver = {"status": 3};
			data.reason = $("#reason_3").val();
		}
		global.sendSocket(data);
		setTimeout((_i=i)=>{
			global.viewDB(_i);
		}, 500);
	}, bg: "success", showBG: false,width:30})
}

global.editWRLicense = (id, newDate = false) => {
	let c = global.dbTable.find((e)=>{return e.ID==id}).Data.weapon.status;
	let content = ``;
	let status = c==0?1:c==1?3:1;
	let dept = global.departments[global.userInfo.department];
	if(newDate||status==1) {
		//выдача
		content = `
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${global.timeConv(new Date().getTime())}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> ${global.timeConv(new Date().getTime()+2592000000)}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> [${global.userInfo.sign}] ${global.userInfo.pedName}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${dept}</div>
			<div style="display:none;margin: 1vh;"><span style="color:#194bdc;">Уровень:
				<select style="width: 10vw;" id="edit_lvl">
			   		<option>BEGGINER</option>
			   		<option>EXPERIENCED</option>
			   		<option>PROFESSIONAL</option>
			    </select>
			</div>
			<div style="display:none;margin: 1vh;"><span style="color:#194bdc;">Тип:</span> 
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_paf"> <span>[PAF]</span> 
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_scf"> <span>[SCF]</span>
				<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_lcf"> <span>[LCF]</span>
			</div>
			<input type="checkbox" style="position: relative;top: 0.2vh;margin-left: 1vw;" id="edit_hunter"> <span>Имеется разрешение на охоту</span>
		`;
	} else if(status==3) {
		//изъять
		content = `
			<div style="margin: 1vh;"><span style="color:#194bdc;">Причина изъятия:</span> <input type="text" placeholder="" id="reason_3" style="width: 60%;padding: 0.8vh 1vw;color: white;background: #5a5a5a;margin-left: 0.4vw;font-size: 1.3vh;border: 1px solid white;"></div>
		`;
	}
	global.alert(`CAD License`,content,{next: (i=id,st=status,nd = newDate,dates = [new Date().getTime(), new Date().getTime()+2592000000]) => {
		let data = {type:"changePedInfo", ped: i, object: "weapon"};
		if(nd||st==1) {
			//let tp = [];
			//if($("#edit_paf")[0].checked) tp.push("PAF");
			//if($("#edit_scf")[0].checked) tp.push("SCF");
			//if($("#edit_lcf")[0].checked) tp.push("LCF");
			data.weapon = {"gived": [dates[0],dates[1],`[${global.userInfo.rank}] ${global.userInfo.pedName}`], "types": [], "status": 1, "lvl": 0, "authority": global.departments[global.userInfo.department], "hunter": $("#edit_hunter")[0].checked};
			//data.weapon = {"gived": [dates[0],dates[1],`[${global.userInfo.rank}] ${global.userInfo.pedName}`], "types": tp, "status": 1, "lvl": $("#edit_lvl").val(), "authority": global.departments[global.userInfo.department], "hunter": $("#edit_hunter")[0].checked};
		} else if(st==3) {
			data.weapon = {"status": 3};
			data.reason = $("#reason_3").val();
		}
		global.sendSocket(data);
		setTimeout((_i=i)=>{
			global.viewDB(_i);
		}, 500);
	}, bg: "success", showBG: false})
}

global.changeCrime = (type,value,id=null) => {
	if(type=="changeType") {
		if(value==1) {
			$("#ticket").show(); 
			$("#crimeResult").show();
		} else {
			$("#ticket").hide();
			$("#crimeResult").hide();
		}
		if(value==2) $("#law").show(); else $("#law").hide();
		//$("#addType")[0].disabled = true;
		global.crimeType = value;
	} else if(type=="changeTicket"){
		let sID = id!=null?(id.split("_")[1])-1:0;
		if(id.split("_")[0]=="Ticket"&&global.crimeType==1) {
			if(value==2||value==4||value==6||value==9) {
				let addon = '';
				if(value==2) addon=`<option>(3)15.1 С легкими повреждениями</option>
					    			<option>(3)15.2 С тяжелыми повреждениями</option>`;

				if(value==4) addon=`<option>(3)17.1 Езда представляющая опасность для окружающих</option>
					    			<option>(3)17.1.1 Нарушние принесшее ущерб имуществу лиц их домашних животных</option>
					    			<option>(3)17.2 Нарушения правил остановки перед/за автобусом во время посадки/высадки</option>
					    			<option>(3)17.3 Нарушение правил минимальной дистанции между транспортными средствами</option>
					    			<option>(3)17.4 Неадекватное торможение</option>
					    			<option>(3)17.5 Неадекватное торможение на служебном транспорте</option>
					    			<option>(3)17.6 Нарушение проезда на нерегулируемом перекрестке</option>
					    			<option>(3)17.7 Нарушение правил проезда на знак STOP или YIELD</option>
					    			<option>(3)17.8 нарушение правил перестрояния из ряда в ряд</option>
					    			<option>(3)17.9 Нарушение правил проезда на железной дороге</option>`;

				if(value==6) addon=`<option>(3)19 Превышение скоростного лимита от 1 до 10 миль в час</option>
									<option>(3)19.1 Превышение скоростного лимита от 11 до 20 миль в час</option>
					    			<option>(3)19.2 Превышение скоростного лимита от 21 до 30 миль в час</option>
					    			<option>(3)19.3 Превышение скоростного лимита от 31 до 40 миль в час</option>
					    			<option>(3)19.4 Превышение скоростного лимита свыше 41 миль в час</option>`;

				if(value==9) addon=`<option>(3)22.1 Парковка и остановка на бардюрах окрашенных всеми цветами</option>
									<option>(3)22.2 Парковка и остановка где установлен знак "No Parking"</option>
									<option>(3)22.3 Парковка и остановка на пешеходных переходах </option>
									<option>(3)22.4 Парковка и остановка в тонелле или на мосту</option>
									<option>(3)22.5 Парковка и остановка на рельсах или на расстоянии 2 метров от них</option>
									<option>(3)22.6 Парковка и остановка на противоположной стороне улицы против движения</option>`;
				$("#sTicket_"+(sID+1)).html(`<option selected="" disabled="">Выберите под.пункт к выбранной статье дорожного закона.</option>${addon}`);
				$("#sTicket_"+(sID+1)).show();
			} else {
				$("#sTicket_"+(sID+1)).hide();
				$("#sTicket_"+(sID+1))[0].selectedIndex = 0;
			}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////
		let results = ``;
		let res = [
			['Управление транспортным средством с приостановленой, отозваной или отсутствующей вод.лицензией', [1500,"e"]],
			[
				['Управление транспортным средством с легкими повреждениями', [450]],
				['Управление транспортным средством с тяжелыми повреждениями', [720]],
			],
			['Управление транспортным средством с выключенными фарами', [200]],
			[
				['Езда представляющая опасность для окружающих', [1000,"5 points"]],
				['Нарушние принесшее ущерб имуществу лиц их домашних животных', [1500,"5 points"]],
				['Нарушения правил остановки перед/за автобусом во время посадки/высадки', [110,"5 points"]],
				['Нарушение правил минимальной дистанции между транспортными средствами', [110,"2 points"]],
				['Неадекватное торможение', [110,"4 points"]],
				['Неадекватное торможение на служебном транспорте', [410,"2 points"]],
				['Нарушение проезда на нерегулируемом перекрестке', [280,"3 points"]],
				['Нарушение правил проезда на знак STOP или YIELD', [320,"3 points"]],
				['нарушение правил перестрояния из ряда в ряд', [320,"3 points"]],
				['Нарушение правил проезда на железной дороге', [720,"3 points"]],
			],
			['Помеха на пешеходном переходе', [210]],
			[
				['Превышение скоростного лимита до 10 миль в час', [200]],
				['Превышение скоростного лимита от 11 до 20 миль в час', [400,"4 points"]],
				['Превышение скоростного лимита от 21 до 30 миль в час', [600,"6 points"]],
				['Превышение скоростного лимита от 31 до 40 миль в час', [800,"8 points"]],
				['Превышение скоростного лимита свыше 41 миль в час', [1000,"11 points"]],
			],
			['Опасное вождение под воздействием алкоголя/наркотиков', [2000,"приостановление вод. лицензии"]],
			['Езда по встречному ряду движения', [450]],
			[
				['Парковка и остановка на бардюрах окрашенных всеми цветами', [240]],
				['Парковка и остановка где установлен знак "No Parking"', [110]],
				['Парковка и остановка на пешеходных переходах', [110]],
				['Парковка и остановка в тонелле или на мосту', [240]],
				['Парковка и остановка на рельсах или на расстоянии 2 метров от них', [320]],
				['Парковка и остановка на противоположной стороне улицы против движения', [200]],
			],
			['Создание аварийной ситуации', [270]],
			['Дорожное происшествие - транспортная авария', [500,"выплата морального ущерба"]],
			['Игнорирование специальных сирен', [1500]],
			['Проезд на запрещающий сигнал светофора', [450]],
			['Невыполнение требования уступить дорогу транспортному средству', [120]],
			['Непредоставление преимущества движения транспорту экстренных служб с включенными стробоскопами и сиренами', [1000]],
			['Невыполнение требования уступить дорогу переходам', [130]],
			['Управление транспортным средством с недопустимым уровнем тонирования', [1000]],
		]
		let ticket = 0;
		let points = 0;
		global.crimeRes = [];
		for(let i = 1; i < global.crimeValue+1;i++){
			let r = [$("#Ticket_"+i)[0].selectedIndex, $("#sTicket_"+i)[0].selectedIndex]; // 1, 2
			let name = r[0];
			let value = r[1];
			if(value==0&&(name!=2&&name!=4&&name!=6&&name!=9)) { //signle
				let less = [];
				let obj = res[name-1];
				if(obj==null) return;
				if($("#isWarning_"+i)[0].checked) if(typeof(obj[1][0])=="number") ticket+=obj[1][0];
				if($("#isWarning_"+i)[0].checked) if(obj[1][1]!=null&&obj[1][1].split(" ")[1]=="points") points+=parseInt(obj[1][1].split(" ")[0]);
				for(let c = 0; c < 5; c++){
					if(obj[1][c]!=null) less.push((obj[1][c]=="e"?"эвакуация":typeof(obj[1][c])=="number"?"$"+obj[1][c]:obj[1][c]));
				}
				global.crimeRes.push(obj);
				if(!$("#isWarning_"+i)[0].checked) obj.push("warning");
				if($("#isWarning_"+i)[0].checked) results+=`(${i}) ${obj[0]}: ${less.join(", ")}
`;
			} else if(value!=0) { //multi
				let less = [];
				let obj = res[name-1][value-1];
				if(obj==null) return;
				if($("#isWarning_"+i)[0].checked) if(typeof(obj[1][0])=="number") ticket+=obj[1][0];
				if($("#isWarning_"+i)[0].checked) if(obj[1][1]!=null&&obj[1][1].split(" ")[1]=="points") points+=parseInt(obj[1][1].split(" ")[0]);
				for(let c = 0; c < 5; c++){
					if(obj[1][c]!=null) less.push((obj[1][c]=="e"?"эвакуация":typeof(obj[1][c])=="number"?"$"+obj[1][c]:obj[1][c]));
				}
				global.crimeRes.push(obj);
				if(!$("#isWarning_"+i)[0].checked) obj.push("warning");
				if($("#isWarning_"+i)[0].checked) results+=`(${i}) ${obj[0]}: ${less.join(", ")}
`;
			}		
		}
		global.lastCC = [ticket,points];
		let curr = global.dbTable.find((e)=>{return e.ID==global.stageID}).Data.points
		global.console(points+"/"+curr);
		let takeit = (points+curr>=11)?"===> Превышение 11-ти поинтов! Изымите лицензию на вождение!":"";
		crimeResult1.value = results+`
--------------------------
Итого: $${ticket} и ${points} points.
${takeit}
`;
	} else if(type=="addTicket"){
		global.crimeValue++;
		let addon = `<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
					<div class="separator" style="background: black;"></div>
					<div style="z-index: 3;margin-top: -1.2vh;background: #ffffff;width: fit-content;margin-left: 1vw;text-align: center;padding: 0 1vw;">Штраф(${global.crimeValue})</div>
				</div>
				<div class="ticketCode">
				<input type="checkbox" id="isWarning_${global.crimeValue}" checked onchange="global.changeCrime('changeTicket','','');">
					<select style="width: 55%;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-bottom: 1vh;" onchange="global.changeCrime('changeTicket',this.selectedIndex,this.id);" id="Ticket_${global.crimeValue}">
				    	<option selected="" disabled="">Выберите статью дорожного закона</option>
				    	<option>(3)14 Управление транспортным средством с приостановленой, отозваной или отсутствующей вод.лицензией.</option>
				    	<option>(3)15 Управление транспортным средством с повреждениями.</option>
				    	<option>(3)16 Управление транспортным средством с выключенными фарами.</option>
				    	<option>(3)17 Движение не соответствующее дорожному закону.</option>
				    	<option>(3)18 Помеха на пешеходном переходе.</option>
				    	<option>(3)19 Превышение скоростного лимита.</option>
				    	<option>(3)20 Опасное вождение под воздействием алкоголя/наркотиков.</option>
				    	<option>(3)21 Езда по встречному ряду движения.</option>
				    	<option>(3)22 Парковка в неположеном месте.</option>
				    	<option>(3)23 Создание аварийной ситуации.</option>
				    	<option>(3)24 Дорожное происшествие - транспортная авария.</option>
				    	<option>(3)25 Игнорирование специальных сирен.</option>
				    	<option>(3)26 Проезд на запрещающий сигнал светофора.</option>
				    	<option>(3)27 Невыполнение требования уступить дорогу транспортному средству.</option>
				    	<option>(3)28 Непредоставление преимущества движения транспорту экстренных служб с включенными стробоскопами и сиренами.</option>
				    	<option>(3)29 Невыполнение требования уступить дорогу переходам.</option>
				    	<option>(3)30 Управление транспортным средством с недопустимым уровнем тонирования.</option>
					</select>
					<select style="width: 39%;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;margin-bottom: 1vh;display:none;" onchange="global.changeCrime('changeTicket',this.selectedIndex, this.id);" id="sTicket_${global.crimeValue}">
						<option selected="" disabled="">Выберите под.пункт к выбранной статье дорожного закона.</option>
					</select>
				</div>`;
		$("#ticket").append(addon);
	}
}
//15,17,19,22,
global.addCrime = () => {
	let id = global.stageID;
	global.crimeValue = 0;
	global.alert(`CAD Add Crime/Ticket`,`
			<div style="margin: 1vh;"><span style="color:#194bdc;">Тип:</span>
		    	<select style="width: 85%;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="addType" onchange="global.changeCrime('changeType',this.selectedIndex);">
			    	<option selected="" disabled="">Выберите тип</option>
			    	<option>Нарушение дорожный законов</option>
			    	<option>Нарушение законов штата</option>
				</select>
			</div>
			<div id="ticket" style="display:none">
			</div>
			<div id="law" style="display:none">
				<a href="https://docs.google.com/document/d/1GVnPrmwPddh1nO0fx96eQQDkMipzVg5n6iETlFSxb-w" target="_blank"><span class="link" onclick="">Открыть <b>старый</b> кодекс штата</span></a> 
				<a href="https://docs.google.com/document/d/1PY2dxB_vEWUM8IZWJCQqvmyd8znCnER2RNnh4wyYfwM" target="_blank"><span class="link" onclick="">Открыть кодекс штата</span></a><br>
				<textarea id="crimeEnteredList" style="margin-top:1vh;border: 2px solid lightgray;font-size: 1.3vh;margin-bottom: 0;line-height: 16px;resize: none;width: 95%;height: 20vh;color: white;padding: 1vh 0.5vw;outline: none;background: #3e3e3e;" placeholder="Выписки из действующего законодательства штата, и взыскания по ним."></textarea>
				<form style="margin-bottom: 0;margin: 1vh 0;">
			    <input type="checkbox" name="inlineRadioOptions" id="crimePrints"> Отметьте в случае, если у человека снимались отпечатки пальцев.
			</form>
			</div>
			<div id="crimeResult" style="display:none;">
				<div class="button" id="button" onclick="global.changeCrime('addTicket');" style="width: 100%;margin-bottom: 2vh;">Добавить пункт</div>
				<textarea id="crimeResult1" disabled="" style="border: 2px solid lightgray;font-size: 1.3vh;margin-bottom: 0;line-height: 16px;resize: none;width: 100%;height: 20vh;color: #bdbdbd;padding: 1vh 0.5vw;outline: none;background: #3e3e3e;"></textarea>
			</div>
		`,{
		next: (i=id)=>{
			if(global.crimeType == 1){
				if(global.crimeRes.length==0) {
					alert("Вы не заполнили одно из полей.");
					return 1;
				}
				global.sendSocket({type: `addCrime`, id: global.stageID, result: global.crimeRes, sType: "ticket", points: global.lastCC[1]});
			} else {
				let res = $("#crimeEnteredList").val().split("\n").join("▼");
				if(res.length==0) {
					alert("Вы не заполнили одно из полей.");
					return 1;
				}
				res=res.replaceAll('`','%1'); res=res.replaceAll('"','%2'); res=res.replaceAll("'",'%3'); res=res.replaceAll("\\",'%4'); res = res.replaceAll('▼',`
`);
				global.sendSocket({type: `addCrime`, id: global.stageID, result: res, sType: "law", prints: $("#crimePrints")[0].checked});
			}
			setTimeout(()=>{
				global.viewDB(global.stageID);
			},500);
		}, showBG:false, width: 50
	});
	global.changeCrime('addTicket');
}

global.editContact = (id) => {
	let info = global.dbTable.find((e)=>{return e.ID==id}).Data;
	global.alert(`CAD Edit Contact Info`,`
			<input type="text" placeholder="PhoneNumber" id="edit_phone" value="${info.phone}">
			<input type="text" placeholder="Место жительства" id="edit_address" value="${info.residence}">
			<input type="text" placeholder="Место работы" id="edit_work" value="${info.workplace}">
		`,{
		next: (i=id)=>{
			let work = $("#edit_work").val();
			let residence = $("#edit_address").val();
			let phone = $("#edit_phone").val();
			if(phone.search(/^[0-9]{3}-[0-9]{4}$/)!=0){alert("Ошибка в поле Номер телефона!");return 1;}
			if(work.length<5||work.length>64){alert("Ошибка в поле Место работы!");return 1;}
			if(residence.length<5||residence.length>64){alert("Ошибка в поле Место жительства!");return 1;}
			global.sendSocket({type:"editContact",phone:phone,residence:residence,work:work,id:i});
			setTimeout(()=>{
				global.viewDB(global.stageID);
			},500);
		}, width:40,showBG:false,bg:"success"
	});
} 

global.addWeapon = (id) => {
	global.alert(`CAD Weapon Registration`,`
			<div id="weaponReg_number" style="margin-bottom:1vh;">Номер оружия: #${global.getFreeInt("weapon")}</div>
			<select style="display:none;width: 100%;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;" id="weaponReg_type">
		    	<option disabled="" selected="">Выберите категорию</option>
				<option>PAF</option>
				<option>SCF</option>
				<option>LCF</option>
			</select>
			<input type="text" placeholder="Производитель и модель" id="weaponReg_model">
			<div>Дата регистрации: ${global.timeConv(new Date().getTime())}</div>
		`,{
		next: (i=id) => {
			let number = $("#weaponReg_number").text().split("#")[1];
			let t = 1;//$("#weaponReg_type")[0].selectedIndex;
			let model = $("#weaponReg_model").val();
			global.sendSocket({type:"weaponRegistration",number:number,wT:t,model:model,id:i});
			setTimeout(()=>{
				global.viewDB(global.stageID);
			},500);
		},bg:"success",showBG:false,width:30
	});
}

global.getFreeInt = (type,int) => {
	if(type=="weapon") {
		let find = false;
		int = global.generator(5,'1234567890');
		global.dbTable.forEach((e)=>{
			if(e.Data.weapon&&e.Data.weapon.guns) e.Data.weapon.guns.forEach((c)=>{
				if(c.number==int) find = true;
			});
		})
		if(find==true) global.getFreeInt("weapon");
		else return int;
	}
}

global.removeWeapon = (p, i, n,s) => {
	if(s) return;
	global.alert(`CAD Confirm`,`Вы действительно хотите снять с регистрации оружие #${n}?`,{next: (ped=p,id=i)=>{
		global.sendSocket({type:"removeWeapon",ped:ped,id:id});
		setTimeout(()=>{
			global.viewDB(global.stageID);
		},500);
	},width:30,bg:"success"});
}

global.setRealID = (id) => {
	global.alert(`CAD Change Info`, `<input id="setRealID" type="text" placeholder="Укажите RealID | Это действие необратимо!">`, {next:()=>{
		if($("#setRealID").val().length==7) global.sendSocket({type:"setRealID",ped: id, value: $("#setRealID").val()});
	}, width: 30, showBG:false})
}

global.viewDB = (id, tp, tID) => {
	if(id==0) {
		if(global.getDepartment(global.userInfo.department)=="medic") return;
		let content;
		let data = global.warrentH.find((e)=>{return e.ID == tID}).Data;
		if(tp == "ped") content = `
			<input id="edit_realid" type="text" value="${data.rn}" placeholder="Y000YYY">
			<input id="edit_name" type="text" value="${data.name}" placeholder="Ray Dalma">
			<input id="edit_desc" type="text" value="${data.desc}" placeholder="Описание">
			<input id="edit_reason" type="text" value="${data.reason}" placeholder="Причина">
			<input id="edit_loc" type="text" value="${data.loc}" placeholder="Локация">
			<div class="button" onclick="global.rmWanted(${tID});global.sys_a_close();" style="width: 100%;background: gainsboro;">Удалить запись</div>`; 
			else content = `
			<input id="edit_vin" type="text" value="${data.vin}" placeholder="Y000YYY">
			<input id="edit_model" type="text" value="${data.model}" placeholder="Ray Dalma">
			<${data.desc.length>70?`textarea class="notepad" style="color: white;background: #717171;"`:"input"} id="edit_desc" type="text" value="${data.desc}" placeholder="Описание">${data.desc.length>70?data.desc:""}${data.desc.length>70?"</textarea>":""}
			<${data.reason.length>70?`textarea class="notepad" style="color: white;background: #717171;"`:"input"} id="edit_reason" type="text" value="${data.reason}" placeholder="Причина">${data.reason.length>70?data.reason:""}${data.reason.length>70?"</textarea>":""}
			<input id="edit_loc" type="text" value="${data.loc}" placeholder="Локация">
			<div class="button" onclick="global.rmWanted(${tID});global.sys_a_close();" style="width: 100%;background: gainsboro;">Удалить запись</div>`;
		global.alert(`CAD Edit Wanted`,content, {width:40, showBG: false, next: ()=>{
			let rn = $("#edit_realid").val()||null;
			let name = $("#edit_name").val()||null;
			let vin = $("#edit_vin").val()||null;
			let model = $("#edit_model").val()||null;
			let desc = $("#edit_desc").val();
			let reason = $("#edit_reason").val();
			let loc = $("#edit_loc").val();
			global.sendSocket({type:"editWanted", tp: tp, tID: tID, rn: rn, name: name, vin: vin, model: model, desc: desc, reason: reason, loc: loc});
		}});
		return;
	}
	let info = global.dbTable.find((e)=>{return e.ID==id})||null;
	if(info==null&&global.currentTab!=8) return global.alert(`CAD Error`,"Запись в БД с ID "+id+" не найден!");
	if(info.Type==1&&global.getDepartment(global.userInfo.department)=="medic") return;
	$(".tab")[7].style.display = "inline-block";
	global.view = "db";
	$(".tab")[7].click();
	global.stageID = id;
	let owner = global.dbTable.find((e)=>{return e.Type==0&&e.ID==info.Data.owner})||null;
	if(owner!=null){
		owner=`<span class="link" onclick="global.viewDB(${owner.ID})">${owner.Data.realid} / ${owner.Data.firstname} ${owner.Data.lastname}</span>`;
	} else owner = "---";

	let driverChange = `<span class="link" onclick="global.editVRLicense(${id});">`+(info.Data.driver&&info.Data.driver.status==0?"Выдать":info.Data.driver&&info.Data.driver.status==1?"Изъять":"Восстановить")+"</span>";
	let weaponChange = `<span class="link" onclick="global.editWRLicense(${id});">`+(info.Data.weapon&&info.Data.weapon.status==0?"Выдать":info.Data.weapon&&info.Data.weapon.status==1?"Изъять":"Восстановить")+"</span>";
	let isM = global.getDepartment(global.userInfo.department)=="medic";
	if(isM) {
		driverChange="";
		weaponChange="";
	}
	let uLog = [];
	info.Data.log.forEach((e)=>{
		let _u = e.split("▼");
		if(_u.length==1) uLog.push(e);
		else _u.forEach((_e)=>uLog.push(_e));
	});
	uLog.reverse();
	if(info.Data.driver&&info.Data.driver.status==2)driverChange="";
	if(info.Data.weapon&&info.Data.weapon.status==2)weaponChange="";

	let userWeapons="<br>отсутствует";
	if(info.Type==0&&info.Data.weapon.guns) {
		if(userWeapons=="<br>отсутствует") userWeapons="";
		let ic = 0;
		info.Data.weapon.guns.forEach((e)=>{
			ic++;
			userWeapons+=`<br><span class="link" style="color:inherit;" onclick="global.removeWeapon(${info.ID}, ${ic-1}, ${e.number}, ${e.taked})">(${ic}) ${e.model} | #${e.number} | Выдал: ${e.gived} ${e.taked==true?" - снято с регистрации":""}</span>`;
			// [${e.type==1?"PAF":e.type==2?"SCF":"LCF"}]
		})
	}
	let age;
	if(info.Data.dateofbirth&&info.Data.dateofbirth.length>=5) {
		let mas = info.Data.dateofbirth.split(".");
		age = parseInt((new Date()-new Date(mas[2]+"-"+mas[1]+"-"+mas[0]))/1000/60/60/24/365);
		if(isNaN(age)) age = parseInt((new Date()-new Date(mas[2]+"-"+mas[0]+"-"+mas[1]))/1000/60/60/24/365);
		let s = age.toString().substr(1);
		s=(s==1?'год':s==2||s==3||s==4?'года':'лет');
		if(isNaN(age)) age=""; else age = ` (${age} ${s})`;
	}
	let vehicles = "отсутсвует";
	if(info.Type==0) {
		let int = 0;
		let vh = "";
		global.dbTable.forEach((e)=>{
			if(e.Data.owner==id) {
				let st = e.Data.status==0?'На трафике':
						e.Data.status==1?'Арестован':
						e.Data.status==2?'В розыск':
						e.Data.status==3?'Снят с регистрации':
						e.Data.status==4?`Временная регистрация до ${e.Data.time}`:'Unkown';
				vh+=`<div onclick="global.viewDB(${e.ID})" style="width: 100%;margin-left: 1vw;"><span class="link">${e.Data.vin} - ${e.Data.model} - ${st}</span></div>`;
				int++;
			}
		});
		if(int!=0)vehicles=`(${int})<br>${vh}`;
	}
	let fonetic = "";
	if(info.Type==1) {
		fonetic = `| `;
		let sc = {
        	"A": "ADAM",
        	"B": "BOY",
        	"C": "CHARLES",
        	"D": "DAVID",
        	"E": "EDWARD",
        	"F": "FRANK",
        	"G": "GEORGE",
        	"H": "HENRY",
        	"I": "IDA",
        	"J": "JOHN",
        	"K": "KING",
        	"L": "LINCOLN",
        	"M": "MARY",
        	"N": "NORA",
        	"O": "OCEAN",
        	"P": "PAUL",
        	"Q": "QUEEN",
        	"R": "ROBERT",
        	"S": "SAM",
        	"T": "TOM",
        	"U": "UNION",
        	"V": "VICTOR",
        	"W": "WILLIAM",
        	"X": "XRAY",
        	"Y": "YELLOW",
        	"Z": "ZEBRA",
		}
		info.Data.vin.split("").forEach((e)=>{
			fonetic+=(sc[e]||e)+" ";
		})
	}
	let after = [];
	let preModel = "";
	if(info.Type==0) {
		if(info.Data.driver.status==1&&info.Data.driver.gived[1]<new Date().getTime()) {
			let lc = new Date().getTime()-info.Data.driver.gived[1];
			if(lc<3600000) lc = "";
			else if(lc<86400000) lc = "на "+parseInt(lc/3600000)+"ч.";
			else lc = "на "+parseInt(lc/86400000)+"дн.";
			after[1] = `<span style="color: #d23838;font-weight: 700;">Прострочено `+lc+"</span>";
		} else after[1] = info.Data.driver.status==0?"Отсутствует":info.Data.driver.status==1?"Активна":info.Data.driver.status==2?"Истекла":"Изъята";
		if(info.Data.weapon.status==1&&info.Data.weapon.gived[1]<new Date().getTime()) {
			let lc = new Date().getTime()-info.Data.weapon.gived[1];
			if(lc<3600000) lc = "";
			else if(lc<86400000) lc = "на "+parseInt(lc/3600000)+"ч.";
			else lc = "на "+parseInt(lc/86400000)+"дн.";
			after[2] = `<span style="color: #d23838;font-weight: 700;">Прострочено `+lc+"</span>";
		} else after[2] = info.Data.weapon.status==0?"Отсутствует":info.Data.weapon.status==1?"Активна":info.Data.weapon.status==2?"Истекла":"Изъята";
	} else if(info.Type==1&&info.Data.notes!=null) {
		info.Data.notes = info.Data.notes.replaceAll('%1','`'); info.Data.notes = info.Data.notes.replaceAll('%2','"'); info.Data.notes = info.Data.notes.replaceAll('%3',"'"); info.Data.notes = info.Data.notes.replaceAll('%4',"\\"); info.Data.notes = info.Data.notes.replaceAll('▼',`
`);
	} else {
		preModel = global.vehicles.find((e)=>{return e[1] == (info.Data.model.toLocaleLowerCase())});
		if(preModel != null && typeof(preModel[2])=="string") preModel = preModel[2]+" | ";
		else preModel = "";
	}
	if(info.Type==0) $("#tab_7").html(`
		<div style="display: inline-flex;width: 100%;">

		<div style="width: 20%;">
			<div id="regImage" style="background: url(images/${(info.Data.img==null||info.Data.img=="none")?"BGregPed":info.Data.img}.png) center center / cover no-repeat;width: 90%;height: 27vh;border: 2px solid gray;margin-right: 1vw;cursor: pointer;margin-bottom: 2vh;" onclick="global.stage='regImage';$('#uploadFile').click();"></div>
		    <div id="regImage1" style="background: url(images/${(info.Data.img1==null||info.Data.img1=="none")?"BGregPed":info.Data.img1}.png) center center / cover no-repeat;width: 90%;height: 27vh;border: 2px solid gray;margin-right: 1vw;display: inline-block;cursor: pointer;display: inline-flex;" onclick="global.stage='regImage1';$('#uploadFile').click();"></div>
		</div>

		<div style="display: inline-block;width: 28vw;border-left: 2px solid gray;padding-left: 1vw;">
			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Основная информация</div>
			</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Real ID:</span> ${(info.Data.realid==null||info.Data.realid=="")?`<span class="link" onclick="global.setRealID(${id});">установить</span>`:info.Data.realid}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Имя Фамилия:</span> ${(info.Data.firstname+" "+info.Data.lastname)||"-"}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Пол:</span> ${info.Data.sex==1?"Женщина":info.Data.sex==0?"Мужчина":"Трансгендер"}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">${info.Data.dateofbirth.length<5?`Возраст:</span> ${info.Data.dateofbirth}`:(`Дата рождения:</span> ${info.Data.dateofbirth}${age}`)}</div>
		    <div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span>
		    	<select class="unitStatus" ${isM?"disabled":""} style="outline: none;width: 20vw;padding: 0.7vh 0.4vw;color: white;margin-left: 1vw;" id="pedStatus" onchange="global.changeVehStatus(this.selectedIndex);">
			    	<option ${info.Data.status==0?"selected":""}>Свободен</option>
					<option ${info.Data.status==1?"selected":""}>Арестован</option>
					<option ${info.Data.status==2?"selected":""}>В розыске</option>
					<option ${info.Data.status==3?"selected":""}>Условно-досрочное освобождение</option>
					<option ${info.Data.status==4?"selected":""}>Подписка о невыезде</option>
					<option ${info.Data.status==5?"selected":""}>Мертв</option>
				</select>
			</div>
			<div id="vehStatus1" style="display: none;">
				<input type="text" placeholder="Причина ареста" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status1_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>
			<div id="vehStatus2" style="display: none;">
				<input type="text" placeholder="Причина розыска" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status2_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
				<input type="text" placeholder="Последнее 10-20" value="${info.Data.sData&&info.Data.sData.loc||""}" id="status2_loc" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
				<input type="text" placeholder="Описание человека" value="${info.Data.sData&&info.Data.sData.desc||""}" id="status2_desc" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>
			<div id="vehStatus4" style="display: none;">
				<input type="checkbox" ${info.Data.sData&&info.Data.sData.homeSet==true?'checked':''} id="pedHomeSet"> Отметьте в случае, если человек под <b>домашним арестом</b>.
			</div>
			<div id="vehStatus5" style="display: none;">
				<input type="text" placeholder="Заключение о смерти" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status5_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>

			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Контактная информация${isM?"":` <span class="link" onclick="global.editContact(${info.ID});">Изменить</span>`}</div>
			</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Номер телефона:</span> ${info.Data.phone}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Место жительства:</span> ${info.Data.residence}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Место работы:</span> ${info.Data.workplace==null||info.Data.workplace==""?"Не указано":info.Data.workplace}</div>

			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Личная информация</div>
			</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Расовый признак:</span> ${info.Data.race==1?"Белый/европеоид":info.Data.race==2?"Афроамериканец":info.Data.race==3?"Латиноамериканец":info.Data.race==4?"Представитель среднего Востока":info.Data.race==5?"Азиат":"Другое"}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Место рождения:</span> ${info.Data.birthPlace}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Семейное положение: </span>
			    <select class="unitStatus" ${isM?"disabled":""} style="outline: none;width: 10vw;" id="familyStatus">
			   		<option ${(info.Data.familyStatus-1)==0?"selected":""}>Не женат(а)</option>
			   		<option ${(info.Data.familyStatus-1)==1?"selected":""}>Женат/Замужем</option>
			   		<option ${(info.Data.familyStatus-1)==2?"selected":""}>Разведен(а)</option>
			   		<option ${(info.Data.familyStatus-1)==3?"selected":""}>Вдов(а)</option>
			    </select>
			</div>
			<textarea id="familyList" ${isM?"disabled":""} class="notepad" style="color: ${isM?"#848484":"black"};" placeholder="Родственники, дети, их номера и адреса">${info.Data.family.split("▼").join(`
`)}</textarea>
			<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
				<div class="separator"></div>
				<div class="separator_text">Штрафы и криминальная участь${isM?"":` | <span class="link" onclick="global.addCrime();">Добавить выписку</span>`}</div>
			</div>
			${info.Data.personalInfo!=null&&!isM?`<span class='link' onclick='global.openPersonalInfo(${info.ID})'>Открыть личное дело</span>`:''}
			<div style="margin: 1vh";>Сняты ли отпечатки пальцев: ${info.Data.prints?"Да":"Нет"}</div>
			<div style="margin: 1vh";>Штрафных поинтов: ${info.Data.points||0}</div>
			<textarea id="crimeList" disabled="" class="notepad">${info.Data.criminal.split("▼").join(`
`)}</textarea>
		</div>
		<div style="display: inline-block;width: 28vw;border-left: 2px solid gray;padding-left: 1vw;height: fit-content;">
			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Водительская лицензия</div>
			</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span> ${after[1]} ${driverChange}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${info.Data.driver.gived[0]==0?"-":global.timeConv(info.Data.driver.gived[0])}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> ${info.Data.driver.gived[1]==0?"-":global.timeConv(info.Data.driver.gived[1])+(info.Data.driver.status==3||isM?"":` <span class="link" onclick="global.editVRLicense(${id}, true);">Обновить на новый срок</span>`)}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> ${info.Data.driver.gived[2]==null?"-":info.Data.driver.gived[2]}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${info.Data.driver.authority==null?"-":info.Data.driver.authority}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Тип:</span> ${info.Data.driver.types.length==0?("-"):("["+info.Data.driver.types.join("], [")+"]")}</div>
			${isM?'':`<div style="margin: 1vh;"><span style="color:#194bdc;">Реестр авто:</span> ${vehicles}</div>`}
			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Лицензия на оружие</div>
			</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span> ${after[2]} ${weaponChange}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${info.Data.weapon.gived[0]==0?"-":global.timeConv(info.Data.weapon.gived[0])}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> ${info.Data.weapon.gived[1]==0?"-":global.timeConv(info.Data.weapon.gived[1])+(info.Data.weapon.status==3||isM?"":` <span class="link" onclick="global.editWRLicense(${id}, true);">Обновить на новый срок</span>`)}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> ${info.Data.weapon.gived[2]==null?"-":info.Data.weapon.gived[2]}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${info.Data.weapon.authority==null?"-":info.Data.weapon.authority}</div>
			<div style="margin: 1vh;display:none;"><span style="color:#194bdc;">Тип:</span> ${info.Data.weapon.types.length==0?("-"):("["+info.Data.weapon.types.join("], [")+"] | "+info.Data.weapon.lvl)}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Разрешение на охоту:</span> ${info.Data.weapon.hunter&&info.Data.weapon.hunter==true?"Да":"Нет"}</div>
			<div style="margin: 1vh;"><span style="color:#194bdc;">Зарегистрированное оружие: ${isM?(info.Data.weapon.guns.length==0?"Нет":"Да"):`<span class="link" style="${info.Data.weapon.status!=1?'display:none;':''}" onclick="global.addWeapon(${info.ID})">добавить</span>${userWeapons}`}</div>
			<div style="margin-top: 2vh;width: 96%;">
				<div class="separator"></div>
				<div class="separator_text">Выписка из мед.архива</div>
			</div>
			<textarea id="medList" disabled class="notepad">${info.Data.medical.split("▼").join(`
`)}</textarea>
			<div class="button" id="button" onclick="global.changePed(${id})" style="width: 95%;margin-bottom: 2vh;margin-top: 1vh;">Сохранить изменения</div>
			<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
				<div class="separator"></div>
				<div class="separator_text">История действий</div>
			</div>
			<textarea disabled="" class="notepad">${uLog.join(`
`)}</textarea>
		</div>
	</div>
	`); else $("#tab_7").html(`
	<div style="display: inline-flex;width: 100%;">
		<div style="width: 25%;">
	    	<div id="regImage" style="background: url(images/${(info.Data.img=="null"||info.Data.img==''||info.Data.img==null)?"BGreg":info.Data.img}.png);width: 95%;height: 20vh;background-size: cover;border: 2px solid gray;margin-bottom: 1vh;display: inline-block;" onclick="global.stage='regImage';$('#uploadFile').click();"></div>
	    	<div id="regImage1" style="background: url(images/${(info.Data.img1=="null"||info.Data.img1==''||info.Data.img1==null)?"BGreg":info.Data.img1}.png);width: 95%;height: 20vh;background-size: cover;border: 2px solid gray;margin-right: 1vw;display: inline-block;" onclick="global.stage='regImage1';$('#uploadFile').click();"></div>
	    </div>
		<div style="display: inline-block;width: 50vw;border-left: 2px solid gray;padding-left: 1vw;">
			<div style="margin: 1vh;">Модель: ${preModel}${info.Data.model||"---"}</div>
	    	<div style="margin: 1vh;">VN: ${info.Data.vin||"---"} ${fonetic} <span style="color: #da3939;font-weight: bold;margin-left: 1vw;cursor:pointer;" onclick="global.changeVIN(${id})">Изменить VN</span></div>
	    	<div style="margin: 1vh;">Цвет: ${info.Data.color||"---"} <span style="color: #da3939;font-weight: bold;margin-left: 1vw;cursor:pointer;" onclick="global.changeColor(${id})">Изменить цвет</span></div>
	    	<div style="margin: 1vh;">Владелец: ${owner} <span style="color: #da3939;font-weight: bold;margin-left: 1vw;cursor:pointer;" onclick="global.changeOwner(${id})">Изменить владельца</span></div>
		    <div style="margin: 1vh;">Статус: 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehStatus" onchange="global.changeVehStatus(this.selectedIndex);">
			    	<option ${info.Data.status==0?"selected":""}>На трафике</option>
					<option ${info.Data.status==1?"selected":""}>Арестован</option>
					<option ${info.Data.status==2?"selected":""}>В розыске</option>
					<option ${info.Data.status==3?"selected":""}>Снят с регистрации</option>
					<option disabled ${info.Data.status==4?"selected":""}>Временная регистрация</option>
				</select>
			</div>
			<div id="vehStatus1" style="display: none;">
				<input type="text" placeholder="Причина ареста" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status1_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>
			<div id="vehStatus2" style="display: none;">
				<input type="text" placeholder="Причина розыска" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status2_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
				<input type="text" placeholder="Последнее 10-20" value="${info.Data.sData&&info.Data.sData.loc||""}" id="status2_loc" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>
			<div id="vehStatus3" style="display: none;">
				<input type="text" placeholder="Причина снятия с учёта" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status3_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			</div>
			<div style="margin: 1vh;">История транспорта:</div>
			<textarea disabled="" class="notepad" style="width:48%;">${info.Data.log.join(`
`)}</textarea>
			<textarea id="vehNotes" class="notepad" style="width: 48%;margin-left: 2%;" placeholder="Поле для заметок.">${info.Data.vehNotes?info.Data.vehNotes:""}</textarea>
			<div class="button" id="button" onclick="global.changeVeh(${id})" style="width: 100%;margin-bottom: 2vh;margin-top: 1vh;">Сохранить изменения</div>
		</div>
		<div style="display: none;width: 25vw;border-left: 2px solid gray;padding-left: 1vw;">
			<div style="margin: 1vh;"><div style="width: 20%;display: inline-block;">Номерной знак:</div> 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehicle_plate">
					<option ${info.Data.plate==1?"selected":""}>Белый Тип 1</option>
					<option ${info.Data.plate==2?"selected":""}>Белый Тип 2</option>
					<option ${info.Data.plate==3?"selected":""}>Синий Тип 3</option>
					<option ${info.Data.plate==4?"selected":""}>Чёрный Тип 4</option>
				</select>
			</div>
		    <div style="margin: 1vh;"><div style="width: 20%;display: inline-block;">Двигатель:</div> 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehicle_engine">
			    	<option ${info.Data.engine==0?"selected":""}>Стандарт</option>
					<option ${info.Data.engine==1?"selected":""}>Class 2</option>
					<option ${info.Data.engine==2?"selected":""}>Class 3</option>
					<option ${info.Data.engine==3?"selected":""}>Class 4</option>
					<option ${info.Data.engine==4?"selected":""}>Class 5</option>
				</select>
			</div>
			<div style="margin: 1vh;"><div style="width: 20%;display: inline-block;">Подвеска:</div> 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehicle_susp">
			    	<option ${info.Data.susp==0?"selected":""}>Стандарт</option>
					<option ${info.Data.susp==1?"selected":""}>Class 2</option>
					<option ${info.Data.susp==2?"selected":""}>Class 3</option>
					<option ${info.Data.susp==3?"selected":""}>Class 4</option>
					<option ${info.Data.susp==4?"selected":""}>Class 5</option>
				</select>
			</div>
			<div style="margin: 1vh;"><div style="width: 20%;display: inline-block;">Трансмиссия:</div> 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehicle_trans">
			    	<option ${info.Data.trans==0?"selected":""}>Стандарт</option>
					<option ${info.Data.trans==1?"selected":""}>Class 2</option>
					<option ${info.Data.trans==2?"selected":""}>Class 3</option>
					<option ${info.Data.trans==3?"selected":""}>Class 4</option>
					<option ${info.Data.trans==4?"selected":""}>Class 5</option>
				</select>
			</div>
			<div style="margin: 1vh;"><div style="width: 20%;display: inline-block;">Турбонадув:</div> 
		    	<select style="width: 10vw;padding: 0.7vh 0.4vw;background: #5a5a5a;color: white;margin-left: 1vw;" id="vehicle_turbo">
			    	<option ${info.Data.turbo==0?"selected":""}>Стандарт</option>
					<option ${info.Data.turbo==1?"selected":""}>Class 2</option>
					<option ${info.Data.turbo==2?"selected":""}>Class 3</option>
					<option ${info.Data.turbo==3?"selected":""}>Class 4</option>
					<option ${info.Data.turbo==4?"selected":""}>Class 5</option>
				</select>
			</div>
		</div>
	</div>`);
	global.changeVehStatus(info.Data.status);
}

global.changeColor = (id) => {
	global.alert(`CAD Change Vehicle Color`, `<input type="text" placeholder="Новый цвет" placeholder="Чёрный" id="veh_color" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">`,
		{next:()=>{
			global.sendSocket({type:"changeVehicleColor",color:$("#veh_color").val(),id:id});
		},width:40,showBG:false});
}

global.changeVIN = (id) => {
	global.alert(`CAD Change Vehicle Plate`, `<input type="text" placeholder="Новый номер" placeholder="X000XXX" id="veh_vin" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">`,
		{next:()=>{
			global.sendSocket({type:"changeVehicleNumber",vin:$("#veh_vin").val(),id:id});
		},width:40,showBG:false});
}

global.openPersonalInfo = (id) => {
	let text = global.dbTable.find((e)=>{return e.ID==id}).Data.personalInfo;
	text = text.replaceAll('%1','`'); text = text.replaceAll('%2','"'); text = text.replaceAll('%3',"'"); text = text.replaceAll('%4',"\\"); text = text.replaceAll('▼',`
`);
	global.alert(`CAD Personal Info`, `
		<textarea disabled class="notepad">${text}</textarea>
	`, {width:40, showBG:false});
}

global.changeVeh = (id) => {
	let i = global.dbTable.find((e)=>{return e.Type==1&&e.ID==id});
	let engine = $("#vehicle_engine")[0].selectedIndex;
	let susp = $("#vehicle_susp")[0].selectedIndex;
	let trans = $("#vehicle_trans")[0].selectedIndex;
	let turbo = $("#vehicle_turbo")[0].selectedIndex;
	let plate = $("#vehicle_plate")[0].selectedIndex;
	let vehStatus = $("#vehStatus")[0].selectedIndex;
	let vehNotes = $("#vehNotes").val();
	vehNotes=vehNotes.replaceAll('`','%1'); vehNotes=vehNotes.replaceAll('"','%2'); vehNotes=vehNotes.replaceAll("'",'%3'); vehNotes=vehNotes.replaceAll("\\",'%4'); vehNotes = vehNotes.replaceAll(`
`, "▼")
	let status = {};
	if(vehStatus!=i.Data.status){
		if(vehStatus==0){}
		else if(vehStatus==2){
			global.addWanted(1, i.Data.vin, i.Data.model)
		} else {
			status.reason = $("#status"+vehStatus+"_reason").val();
		}
	}
	global.sendSocket({type:"changeVehicleInfo", veh:id, engine: engine, susp: susp, trans: trans, turbo: turbo, plate: plate, changeStatus: vehStatus!=i.Data.status, status: vehStatus, sData: status, vehNotes: vehNotes});
}

global.changePed = (id) => {
	let i = global.dbTable.find((e)=>{return e.Type==0&&e.ID==id});
	let pedStatus = $("#pedStatus")[0].selectedIndex;
	let familyStatus = $("#familyStatus")[0].selectedIndex+1;
	let familyList = $("#familyList").val();
	let crimeList = $("#crimeList").val();
	let medList = $("#medList").val();

	let changes = {};
	if(i.Data.status!=pedStatus) changes.status = pedStatus;
	if(i.Data.familyStatus!=familyStatus) changes.familyStatus = familyStatus;
	if(i.Data.family!=familyList) changes.family = familyList;
	if(i.Data.medical!=medList) changes.medical = medList;
	if(i.Data.criminal!=crimeList) changes.criminal = crimeList;
	let homeSet = $("#pedHomeSet")[0]!=null?$("#pedHomeSet")[0].checked:false;
	let c = $("#status"+pedStatus+"_reason").val();
	let d = $("#status"+pedStatus+"_loc").val();
	let dc = $("#status"+pedStatus+"_desc").val();
	if(changes.status==2) global.addWanted(0, i.Data.realid, i.Data.firstname+" "+i.Data.lastname)
	changes.sData = {reason: c, loc: d, homeSet: homeSet, desc: dc};
	changes.type = "changePedInfo";
	changes.ped = id;
	global.console(changes);
	global.sendSocket(changes);
}

global.addWanted = (type, vin = null, model = null) => {
	let inform = type?`
	<input type="text" placeholder="VN" value="${vin?vin:""}" id="wanted_vin">
	<input type="text" placeholder="Модель" value="${model?model:""}" id="wanted_model">
	<input type="text" placeholder="Описание" id="wanted_desc">
	<input type="text" placeholder="Причина" id="wanted_reason">
	<input type="text" placeholder="Последнее 10-20" id="wanted_loc">
	<input type="text" placeholder="Объявитель" value="${global.userInfo.sign}" id="wanted_sender">
	`:`
	<input type="text" placeholder="Real ID" value="${vin?vin:""}" id="wanted_rn">
	<input type="text" placeholder="Имя & Фамилия" value="${model?model:""}" id="wanted_name">
	<input type="text" placeholder="Описание" id="wanted_desc">
	<input type="text" placeholder="Причина" id="wanted_reason">
	<input type="text" placeholder="Последнее 10-20" id="wanted_loc">
	<input type="text" placeholder="Объявитель" value="${global.userInfo.sign}" id="wanted_sender">`
	global.alert("CAD Add Wanted", `
		Укажите следующий данные:<br>
		${inform}
	`, {next:() => {
		let data = null;
		let type = 0;
		if($("#wanted_model")[0]!=null) { //veh
			type = 1;
			data = {vin: $("#wanted_vin").val(), model: $("#wanted_model").val(), desc: $("#wanted_desc").val(), reason: $("#wanted_reason").val(), loc: $("#wanted_loc").val(), sender: $("#wanted_sender").val(), time: new Date().getTime()};
			for(let key in data) {
				let d = data[key];
				if(typeof(data[key])=="string") {data[key]=data[key].replaceAll('`','%1'); data[key]=data[key].replaceAll('"','%2'); data[key]=data[key].replaceAll("'",'%3'); data[key]=data[key].replaceAll("\\",'%4'); }
			}
		} else {
			type = 0;
			data = {rn: $("#wanted_rn").val(), name: $("#wanted_name").val(), desc: $("#wanted_desc").val(), reason: $("#wanted_reason").val(), loc: $("#wanted_loc").val(), sender: $("#wanted_sender").val(), time: new Date().getTime()};
			for(let key in data) {
				let d = data[key];
				if(typeof(data[key])=="string") {data[key]=data[key].replaceAll('`','%1'); data[key]=data[key].replaceAll('"','%2'); data[key]=data[key].replaceAll("'",'%3'); data[key]=data[key].replaceAll("\\",'%4'); }
			}
		}
		global.sendSocket({type:"addWanted", obj: type, data: data});
	}, bg: "success", showBG: false, width: 40});
}

global.showCalloutLog = (id) => {
	$("#calloutLog").val(global.callouts[id].log.join(`
`))
}

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + (mins<10?"0"+mins:mins) + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

global.unitChangeStatus = (val, isOther = false) => {
	if(isOther) {
		global.selected_units.forEach((e)=>{
			if(e!=null) {
				global.sendSocket({type:"unitChangeStatus", val: val, isOther: isOther, unit: e})
			}
		}) 
	} else global.sendSocket({type:"unitChangeStatus", val: val, isOther: isOther, unit: global.userInfo.badge})
}

global.editCall = (id) => {
	if(global.userInfo.department == 1 && global.userInfo.cadStatus == 2 && global.userInfo.access == "control"){
		let call = new Date(global.callouts[id-1].time);
		call = `${call.getHours()<10?"0"+call.getHours():call.getHours()}:${call.getMinutes()<10?"0"+call.getMinutes():call.getMinutes()}:${call.getSeconds()<10?"0"+call.getSeconds():call.getSeconds()}`;
		global.alert("CAD Callout Edit", `
			<span>Номер вызова: ${id} / Время создания вызова: ${call}</span>
			<input type="text" placeholder="${global.callouts[id-1].desc||"No description"}" onclick="if(this.value.length==0)this.value=this.placeholder;" id="clEd_desc">
			<input type="text" disabled placeholder="No units" value="${global.callouts[id-1].units.join(", ")}" id="clEd_units">
			<input type="text" placeholder="${global.callouts[id-1].loc||"No location"}" onclick="if(this.value.length==0)this.value=this.placeholder;" id="clEd_loc">
			<textarea id="clEd_note" placeholder="${global.callouts[id-1].log.length==0?"Опишите изменения на вызовые":global.callouts[id-1].log.join(`
`)}"></textarea>
		`, {next:(i=id) => {
			global.sendSocket({"type":"setCallData", "id": i, "desc": $("#clEd_desc")[0].value.length==0?null:$("#clEd_desc")[0].value, "loc": $("#clEd_loc")[0].value.length==0?null:$("#clEd_loc")[0].value, "note":$("#clEd_note").val()});
		}, bg:"success"});
	} else return;
}

global.sendSocket = (info) => {
	global.info = info;
	if(typeof(info)=="string") info = JSON.parse(info);
	if(info.Data!=null) for(let key in info.data) {
		let i = info.data[key];
    	if(i&&typeof(i)=="string"&&i.length!=0&&i!=null) {info.data[key]=info.data[key].replaceAll('`','%1'); info.data[key]=info.data[key].replaceAll('"','%2'); info.data[key]=info.data[key].replaceAll("'",'%3'); info.data[key]=info.data[key].replaceAll("\\",'%4'); info.data[key]=info.data[key].replaceAll(`
`, "▼")}
		global.console(info.data[key]);
		//if((i&&typeof(i)=="string"&&i.length!=0&&i!=null)&&(i.search("'")!=-1||i.search('"')!=-1||i.search("`")!=-1||i.search(/[\\]/)!=-1)) {alert('В тексте имеется запрещённый символ!');return;}
	} else for(let key in info) {
		let i = info[key];
    	if(i&&typeof(i)=="string"&&i.length!=0&&i!=null) {info[key]=info[key].replaceAll('`','%1'); info[key]=info[key].replaceAll('"','%2'); info[key]=info[key].replaceAll("'",'%3'); info[key]=info[key].replaceAll("\\",'%4'); info[key]=info[key].replaceAll(`
`, "▼")}
		global.console(info[key]);
		//if((i&&typeof(i)=="string"&&i.length!=0&&i!=null)&&(i.search("'")!=-1||i.search('"')!=-1||i.search("`")!=-1||i.search(/[\\]/)!=-1)) {alert('В тексте имеется запрещённый символ!');return;}
	}
	global.lastQuery = new Date();
	info = JSON.stringify(info);
	global.console(info);
    if(global.socket.readyState == 1) global.socket.send(info)
    else setTimeout("global.sendSocket('"+info+"')", 1000);
}

global.getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

global.setCookie = (name, value) => {
	document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

global.getDepartment = (dept) => {
	if(dept==null) return null;
	return dept==1?"control":dept>1&&dept<5?"police":dept==5?"medic":dept==99?"admin":"civ";
}

let login = () => {
	let e = $("#log_email").val();
	let p = $("#log_pasword").val();
	global.userInfo.email = e;
	global.sendSocket({type: "authLogin", email: e, pass: p});
}
var req_data = {
	_e: null,
	_p: null,
}
global.req_stage = 1;
let request = (stage, _d = null) => {
	if(stage==1){
		let email = $("#reg_email").val();
		let pass = $("#reg_pasword").val();
		if(email.length < 5 || pass.length < 5) return global.alert("CAD Error", "Ошибка: Не указана почта или пароль!<br>Убедитесь в точности указаной почты и пароля.");
		req_data._e = email;
		req_data._p = pass;
		////////////////
		$("#reg_email").hide();
		$("#reg_pasword").hide();
		$("#reg_fn").show();
		$("#reg_ln").show();
		$("#reg_pn").show();
		$("#reg_rid").show();
		$("#reg_dp").show();
		$("#reg_bg").show();
		$("#reg_dis").show();
		global.req_stage = 2;
	} else if(stage==2) {
		let fn = $("#reg_fn").val();
		let ln = $("#reg_ln").val();
		let pn = $("#reg_pn").val();
		let rid = $("#reg_rid").val();
		let dp = $("#reg_dp")[0].selectedIndex;
		let dis = $("#reg_dis").val();
		let bg = dis.split("#")[1];
		if(dp==0) return global.alert("CAD Error", "Ошибка: Не выбран департамент.");
		else dp = $("#reg_dp")[0].children[$("#reg_dp")[0].selectedIndex].value;
		if(fn.length<3||ln.length<3||pn.length!=8||rid.length!=7||bg.length!=4) {
			let er = fn.length<3?"First Name":ln.length<3?"Last Name":pn.length!=8?"Phone Number":rid.length!=7?"Real ID":bg.length!=4?"Badge Number":dis.length<2||dis.length>64?"Discord":null;
			return global.alert("CAD Error", "Ошибка: Неверное значение в поле: "+er);
		} else {
			global.alert("CAD Success", `Проверьте правильность указанных данных!<br> Имя: ${fn}<br>Фамилия: ${ln} | Номер телефона: ${pn}<br>Real ID: ${rid}<br>Департамент: ${dp} | Badge: ${bg} | Discord: ${dis}`, 
				{next: () => {
					global.alert("CAD Success", "Загрузка, ожидайте...", {close: "hide", bg: "success"});
					request(3, [req_data._e, req_data._p, fn,ln,pn, rid, dp, bg, dis]);
				}, bg: "success"});
		}
	} else {
		global.console(_d)
		global.sendSocket({type: "requestAccess", email: _d[0], pass: _d[1], firstname: _d[2], lastname: _d[3], phone: _d[4], realid: _d[5], dp: _d[6], badge: _d[7], discord: _d[8]});
	}
}
global.viewHide = () => {
	$('.tab')[7].style.display='none';
	setTimeout(()=>{changeTab(3);},10)
}

let logout = () => {
	global.sendSocket({type: "logout"})
	location.reload();
}

let changeTab = (id) => {
	global.sys_a_close();
	let tabs = [];
	let dept = global.getDepartment(global.userInfo.department)||null;
	if(dept == "police"||dept == "medic") {
		tabs = [2,3,4,6,9,77];
	} else if(dept == "control") {
		tabs = [2,3,4,6,77];
	} else if(dept == "admin") {
		tabs = [4,6,8,9,77];
	} else if(dept == "civ") {
		tabs = [8,77];
	}
	if(id==9&&global.userInfo.isAdmin==false) {return alert('Упс, у вас нет прав чтобы участвовать в квесте!');}
	let next = false;
	if(id==99) next = true;
	if(id==7&&global.userInfo.status=="authed") next = true;
	if((id==0||id==1)&&(global.userInfo.status=="prelogin"||global.userInfo.status=="connected")) next=true;
	if(id==2) $(".bottonTabBlock").show(); else $(".bottonTabBlock").hide();
	if(global.userInfo.status=="authed"&&tabs.includes(id)) next=true;
	if(!next) return;
	$(`#tab_${global.currentTab}`).hide();
	$(`#tab_${id}`).show();
	if(id==6||id==3||id==8||id==9||id==4) $("#tab_"+id)[0].style.display="block";
	global.currentTab = id;
	for(let i = 0; i < 100; i++){
		if($(`.tab`)[i]!=null) {
			if(i==id){
				$(`.tab`)[i].style["background"] = "#353a40";
				$(`.tab`)[i].style["color"] = "white";
			} else {
				$(`.tab`)[i].style["background"] = "";
				$(`.tab`)[i].style["color"] = "black";
			}
		}
	}
}

global.changeCiv = (obj) => {
	if(global.getDepartment(global.userInfo.department)!="civ") return;
	global.userInfo.meta = obj.children[obj.selectedIndex].value;
	global.onCivLoaded();
}

global.onCivLoaded = () => {
	let info = global.dbTable.find((e)=>{return e.ID==global.userInfo.meta});
	let userWeapons="<br>отсутствует";
	if(info.Type==0&&info.Data.weapon.guns) {
		if(userWeapons=="<br>отсутствует") userWeapons="";
		let ic = 0;
		info.Data.weapon.guns.forEach((e)=>{
			ic++;
			userWeapons+=`<br><span style="color:inherit;cursor:pointer;" onclick="global.removeWeapon(${info.ID}, ${ic-1}, ${e.number}, ${e.taked})">(${ic}) ${e.model} | #${e.number} | Выдал: ${e.gived} ${e.taked==true?" - снято с регистрации":""}</span>`
		})
	}

	let vehicles = "отсутсвует";
	if(info.Type==0) {
		let int = 0;
		let vh = "";
		global.dbTable.forEach((e)=>{
			if(e.Data.owner==info.ID) {
				let st = e.Data.status==0?'На трафике':
						e.Data.status==1?'Арестован':
						e.Data.status==2?'В розыск':
						e.Data.status==3?'Снят с регистрации':
						e.Data.status==4?`Временная регистрация до ${e.Data.time}`:'Unkown';
				if(global.userInfo.badge=="0397") vh+=`<div onclick="global.viewDB(${e.ID})" style="width: 100%;margin-left: 1vw;"><span class="link">${e.Data.vin} - ${e.Data.model} - ${st}</span></div>`;
				else vh+=`<div style="width: 100%;margin-left: 1vw;">${e.Data.vin} - ${e.Data.model} - ${st}</div>`;
				int++;
			}
		});
		if(int!=0)vehicles=`(${int})<br>${vh}`;
	}
	let table = '';
	global.dbTable.forEach((e)=>{if(e.Type==0) table+=`<option value="${e.ID}">${e.Data.firstname+' '+e.Data.lastname}</option>`})
	$("#tab_8").html(`
	<select style="display: inline-flex;width: 100%;margin-bottom:1vh;" onchange="global.changeCiv(this)">
		<option>Выберите человека</option>
		${table}
	</select>
	<div style="display: inline-flex;width: 100%;">

	<div style="width: 20%;">
		<div id="regImage" style="background: url(images/${(info.Data.img==null||info.Data.img=="none")?"BGregPed":info.Data.img}.png) center center / cover no-repeat;width: 90%;height: 27vh;border: 2px solid gray;margin-right: 1vw;cursor: pointer;margin-bottom: 2vh;"></div>
	    <div id="regImage1" style="background: url(images/${(info.Data.img1==null||info.Data.img1=="none")?"BGregPed":info.Data.img1}.png) center center / cover no-repeat;width: 90%;height: 27vh;border: 2px solid gray;margin-right: 1vw;display: inline-block;cursor: pointer;display: inline-flex;"></div>
	</div>

	<div style="display: inline-block;width: 28vw;border-left: 2px solid gray;padding-left: 1vw;">
		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Основная информация</div>
		</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Real ID:</span> ${info.Data.realid||`<span class="link" onclick="global.setRealID(${info.ID});">установить</span>`}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Имя Фамилия:</span> ${(info.Data.firstname+" "+info.Data.lastname)||"-"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Пол:</span> ${info.Data.sex?"Женщина":"Мужчина"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">${info.Data.dateofbirth.length<5?info.Data.dateofbirth:(`Дата рождения:</span> ${info.Data.dateofbirth}`)}</div>
	    <div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span>
	    	<select class="unitStatus" disabled style="outline: none;width: 20vw;padding: 0.7vh 0.4vw;color: white;margin-left: 1vw;" id="pedStatus" onchange="global.changeVehStatus(this.selectedIndex);">
		    	<option ${info.Data.status==0?"selected":""}>Свободен</option>
				<option ${info.Data.status==1?"selected":""}>Арестован</option>
				<option ${info.Data.status==2?"selected":""}>В розыске</option>
				<option ${info.Data.status==3?"selected":""}>Условно-досрочное освобождение</option>
				<option ${info.Data.status==4?"selected":""}>Подписка о невыезде</option>
				<option ${info.Data.status==5?"selected":""}>Мертв</option>
			</select>
		</div>
		<div id="vehStatus1" style="display: none;">
			<input type="text" placeholder="Причина ареста" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status1_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
		</div>
		<div id="vehStatus2" style="display: none;">
			<input type="text" placeholder="Причина розыска" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status2_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
			<input type="text" placeholder="Последнее 10-20" value="${info.Data.sData&&info.Data.sData.loc||""}" id="status2_loc" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
		</div>
		<div id="vehStatus4" style="display: none;">
			<input type="checkbox" ${info.Data.sData&&info.Data.sData.homeSet==true?'checked':''} id="pedHomeSet"> Отметьте в случае, если человек под <b>домашним арестом</b>.
		</div>
		<div id="vehStatus5" style="display: none;">
			<input type="text" placeholder="Заключение о смерти" value="${info.Data.sData&&info.Data.sData.reason||""}" id="status5_reason" style="width: 80%;padding: 1vh 1vw;color: white;background: #5a5a5a;font-size: 1.3vh;margin: 2% 0;margin-bottom: 1vh;border: 1px solid white;">
		</div>

		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Контактная информация</div>
		</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Номер телефона:</span> ${info.Data.phone}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Место жительства:</span> ${info.Data.residence}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Место работы:</span> ${info.Data.workplace==null||info.Data.workplace==""?"Не указано":info.Data.workplace}</div>

		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Личная информация</div>
		</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Расовый признак:</span> ${info.Data.race==1?"Белый/европеоид":info.Data.race==2?"Афроамериканец":info.Data.race==3?"Латиноамериканец":info.Data.race==4?"Представитель среднего Востока":info.Data.race==5?"Азиат":"Другое"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Место рождения:</span> ${info.Data.birthPlace}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Семейное положение: </span>
		    <select class="unitStatus" disabled style="outline: none;width: 10vw;" id="familyStatus">
		   		<option ${(info.Data.familyStatus-1)==0?"selected":""}>Не женат(а)</option>
		   		<option ${(info.Data.familyStatus-1)==1?"selected":""}>Женат/Замужем</option>
		   		<option ${(info.Data.familyStatus-1)==2?"selected":""}>Разведен(а)</option>
		   		<option ${(info.Data.familyStatus-1)==3?"selected":""}>Вдов(а)</option>
		    </select>
		</div>
		<textarea id="familyList" disabled class="notepad" style="color: #848484;" placeholder="Родственники, дети, их номера и адреса">${info.Data.family.split("▼").join(`
`)}</textarea>
		<div style="margin-top: 2vh;width: 96%;margin-bottom: 1vh;">
			<div class="separator"></div>
			<div class="separator_text">Штрафы и криминальная участь</div>
		</div>
		<div style="margin: 1vh";>Сняты ли отпечатки пальцев: ${info.Data.prints?"Да":"Нет"}</div>
		<div style="margin: 1vh";>Штрафных поинтов: ${info.Data.points||0}</div>
		<textarea id="crimeList" disabled="" class="notepad">${info.Data.criminal.split("▼").join(`
`)}</textarea>
	</div>
	<div style="display: inline-block;width: 28vw;border-left: 2px solid gray;padding-left: 1vw;height: fit-content;">
		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Водительская лицензия</div>
		</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span> ${info.Data.driver.status==0?"Отсутствует":info.Data.driver.status==1?"Активна":info.Data.driver.status==2?"Истекла":"Изъята"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${info.Data.driver.gived[0]==0?"-":global.timeConv(info.Data.driver.gived[0])}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> ${info.Data.driver.gived[1]==0?"-":global.timeConv(info.Data.driver.gived[1])+(info.Data.driver.status==3||"")}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> ${info.Data.driver.gived[2]==null?"-":info.Data.driver.gived[2]}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${info.Data.driver.authority==null?"-":info.Data.driver.authority}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Тип:</span> ${info.Data.driver.types.length==0?("-"):("["+info.Data.driver.types.join("], [")+"]")}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Реестр авто:</span> ${vehicles}</div>
		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Лицензия на оружие</div>
		</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Статус:</span> ${info.Data.weapon.status==0?"Отсутствует":info.Data.weapon.status==1?"Активна":info.Data.weapon.status==2?"Истекла":"Изъята"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Дата выдачи:</span> ${info.Data.weapon.gived[0]==0?"-":global.timeConv(info.Data.weapon.gived[0])}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Дата окончания:</span> ${info.Data.weapon.gived[1]==0?"-":global.timeConv(info.Data.weapon.gived[1])}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Выдал:</span> ${info.Data.weapon.gived[2]==null?"-":info.Data.weapon.gived[2]}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Орган выдачи:</span> ${info.Data.weapon.authority==null?"-":info.Data.weapon.authority}</div>
		<div style="margin: 1vh;display:none;"><span style="color:#194bdc;">Тип:</span> ${info.Data.weapon.types.length==0?("-"):("["+info.Data.weapon.types.join("], [")+"] | "+info.Data.weapon.lvl)}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Разрешение на охоту:</span> ${info.Data.weapon.hunter&&info.Data.weapon.hunter==true?"Да":"Нет"}</div>
		<div style="margin: 1vh;"><span style="color:#194bdc;">Зарегистрированное оружие:<span class="link" style="${info.Data.weapon.status!=1?'display:none;':""}" onclick="global.addWeapon(${info.ID})">добавить</span>${userWeapons}</div>
		<div style="margin-top: 2vh;width: 96%;">
			<div class="separator"></div>
			<div class="separator_text">Выписка из мед.архива</div>
		</div>
		<textarea id="medList" disabled class="notepad">${info.Data.medical}</textarea>
		<div class="button" id="button" onclick="global.changePersonal(${info.ID})" style="display:none;width: 95%;margin-bottom: 2vh;margin-top: 1vh;">Изменить личное дело</div>
	</div>
</div>
`);
}

global.changePersonal = (_i) => {
	let info = global.dbTable.find((e)=>{return e.ID==_i}).Data.personalInfo;
	info = info.replaceAll('%1','`'); info = info.replaceAll('%2','"'); info = info.replaceAll('%3',"'"); info = info.replaceAll('%4',"\\"); info = info.replaceAll('▼',`
`);
	global.alert(`CAD Edit Personal Info`, `<textarea id="personalList" placeholder="Укажите подробности вашего личного дела и дополняйте в ходе жизни." class="notepad">${info!='null'?info:""}</textarea>`,{
		next: (id=_i) => {
			let dtbase = $("#personalList").val();
			dtbase=dtbase.replaceAll('`','%1'); dtbase=dtbase.replaceAll('"','%2'); dtbase=dtbase.replaceAll("'",'%3'); dtbase=dtbase.replaceAll("\\",'%4'); dtbase=dtbase.replaceAll(`
`, "▼")
			global.sendSocket({type:"changePersonalInfo", info: dtbase, id: _i});
		}
	,showBG:true,width:40})
}

let blockVisible = (obj, id) => {
	global.blockVisible[id] = !global.blockVisible[id];
	obj.innerHTML = global.blockVisible[id]?"HIDE":"SHOW";
	global.blockVisible[id]?$(`#blockVisible_${id}`).show():$(`#blockVisible_${id}`).hide();
}

global.generator = (len, c = null) => {
	let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if(c!=null) charSet = c;
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
} 

global.changeTheme = (el) => {
	global.getCookie("siteTheme")=="light"?global.setCookie("siteTheme", "dark"):global.setCookie("siteTheme", "light");
	location.reload();
}

global.onSecondBlockChange = (name, el) => {
	if(name=="ad") $("#adw").show();
	else $("#adw").hide();
	if(name=="notepad") $("#notepad").show();
	else $("#notepad").hide();
	if(name=="chat") $("#chatBlock").css("display","block");
	else $("#chatBlock").hide();
	for(key in $(".bottonTabBlock")[0].children) if(!isNaN(key)) $(".bottonTabBlock")[0].children[key].classList.remove("bottomTab_selected");
	el.classList.add("bottomTab_selected");
}

let sysWidth;

$(()=>{
	$("#adw").html(`BRIEFING<br><br>Law Enforcement, PD - проводит брифинг с целью предоставления информации о предстоящей рабочей смены.
	<br>Брифинг проводится ежедневно после 20:00!
	<br>Если на следующий день не проводится брифинг, то действуют установленные положения прошлого брифинга.`);

	global.getCookie("siteTheme")==null?global.setCookie("siteTheme", "light"):"";
	$(".micro_button")[2].innerHTML = global.getCookie("siteTheme")=="light"?"☀":"🌑"
	setInterval(() => {
		let u = global.userInfo;
		let t = {};
		let time = new Date();
		t.day = time.getDate();
		t.month = time.getMonth()+1;
		t.year = time.getFullYear();
		t.hour = time.getHours();
		t.min = time.getMinutes();
		t.sec = time.getSeconds();

		t.day<10?t.day="0"+t.day:undefined;
		t.month<10?t.month="0"+t.month:undefined;
		t.hour<10?t.hour="0"+t.hour:undefined;
		t.min<10?t.min="0"+t.min:undefined;
		t.sec<10?t.sec="0"+t.sec:undefined;
		let dept = global.departments[global.userInfo.department]||"null";
		time = `${t.day}.${t.month}.${t.year} ${t.hour}:${t.min}:${t.sec}`;

		if(global.staff) $("#unit_info").html(`<span class="link" style="color:inherit!important;text-align:center;" onclick="global.changeUnitData(${global.staff.find((e)=>{return e.sign == u.sign}).ID}, '${u.sign}')"><div style="text-align:center;">${u.rank} ${u.pedName} | ${u.sign}</div><div style="font-size: 1.3vh;font-weight: lighter;text-align: center;">${dept}</div></span>`);
		let resize = true;
		if(sysWidth==null) sysWidth = $(window).width();
		if(resize) {
			if(false&&$(window).width()<805) {
				if(!global.loading_screen) {
					global.alert("CAD Screen Error", "CAD не поддерживается на этом устройстве.", {close: "hide"});
					global.loading_screen = true;
				}
			}
			else if($(window).width()<=1440) {
				if(global.loading_screen) {
					global.loading_screen = false;
					global.sys_a_close();
				}
				$("#main_window").css("width", "75%");
			} else if($(window).width()>2000) {
				if(global.loading_screen) {
					global.loading_screen = false;
					global.sys_a_close();
				}
				$("#main_window").css("width", "75%");
			} else {
				if(global.loading_screen) {
					global.loading_screen = false;
					global.sys_a_close();
				}
				$("#main_window").css("width", "70%");
			}
		}
		if(sysWidth!=null){
			if(sysWidth>$(window).width()) {
				$("#main_window").css("margin","");
				$("#main_window").css("width", "100%");
				$(".tab_content").css("height", "90%");
			}
			else {
				$("#main_window").css("margin","5vh auto");
				$(".tab_content").css("height", "82vh");
				sysWidth = $(window).width();
			}
		}

		if(global.socket.readyState==3&&new Date()-global.lastQuery>2) {
	        global.console("%c[DeadStorySocket] %cDatabase connection is now terminate. Reconnect...", "color:purple;", "color:lime;");
	       	global.userInfo.status="prelogin"
	        changeTab(77);
			global.conn();
		}

		if(global.timer.status) {
			let v = global.timer.time;
			let min = parseInt(v/60);
			let sec = v-(parseInt(v/60)*60);
			$("#control_time").val(`${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`);
			global.timer.time--;
		}

		if(global.userInfo.status == "authed" && global.combined && global.combined.find((e)=>{return e.units.includes(global.userInfo.badge)}) != null) {
			$("#decombineMe").show();
		} else $("#decombineMe").hide();

		let id = 0;
		global.callouts!=null?global.callouts.forEach((call)=>{
			let t = parseInt((new Date()-call.time)/1000);
			let min = parseInt(t/60);
			let sec = t-(parseInt(t/60)*60);
			$("#callTimer"+id).text(`${min<10?"0"+min:min}:${sec<10?"0"+sec:sec}`)
			id++;
		}):null;
		if($("#center_panel").height()>$("#_left_content").height()) $("#_left_content").css("min-height",$("#center_panel").height())
	},1000);
	//=========GAMES==========//
	if(global.player==null) setTimeout(()=>{global.player = global.quest.new(0, 0);global.quest.render();}, 2000);
	if(global.miner.data==null) global.miner.init(144);
	//=========SOCKET=========//
 	window.WebSocket = window.WebSocket || window.MozWebSocket;

    global.conn = () => {
   	 	if(global.databaseWorked) global.socket = new WebSocket('wss://deadstory.ru:39177');
    	global.socket.onopen = function () {
    		$("#tabsList").css("display","inline-block");
	        global.console("%c[DeadStorySocket] %cDatabase is now ready.", "color:purple;", "color:lime;");
	        global.sendSocket({
	        	type: "preAuth",
	        	token: global.getCookie("userToken")||null,
	        });
	        if(global._cs) location.reload();
	        global._cs = true;
	    };
		global.socket.onclose = function (e) {
			$("#tabsList").css("display","none");
			changeTab(77)
	    };
    }
    global.conn();

    global.socket.onmessage = function (message) {
	    global.query(message.data);
	};
	global.socket.onclose = function (e) {
		$("#tabsList").css("display","none");
		changeTab(77)
    };

	// window move
	$("body")[0].onmousedown = (e) => {
		if(e.toElement.id=="alert_title") {
			global.w_move = true;
			global.w_moveS = [e.pageX-$('#alert_title').offset().left, e.pageY-$('#alert_title').offset().top];
		}
	}
	$("body")[0].onmouseup = (e) => {
		global.w_move = false;
	}
	$("body")[0].onmousemove = (e) => {
		if(global.w_move == true&&global.alert_type == "draggble") {
			$("#alert_window").css("left", e.pageX-global.w_moveS[0]);
			$("#alert_window").css("top", e.pageY-global.w_moveS[1]);
		}
	}
});
global.accept = (id) => {
	let us = global.staff.find((e)=>{return e.ID==id});
	global.alert(`CAD Admin Accept`, `Вы действительно хотите подтвердить аккаунт <span style="color:red;">${us.discord}</span>?
			<input type="number" placeholder="Укажите игровой ID" id="gID" style="padding: .375rem .75rem;">
			<select id="selectDept" class="form-control unitStatus" style="margin: 0;user-select: none;">
				<option ${us.preDept=="DOT"?"selected":""} value="0">Департамент транспорта</option>
				<option ${us.preDept=="ECD"?"selected":""} value="1">Департамент контроля экстренных ситуаций</option>
				<option ${us.preDept=="BCSO"?"selected":""} value="2">Офис Шерифа Округа Блэйн</option>
				<option ${us.preDept=="SAHP"?"selected":""} value="3">Дорожный Патруль Сан Андреас</option>
				<option ${us.preDept=="LSPD"?"selected":""} value="4">Полицейский Департамент Лос-Сантос</option>
				<option ${us.preDept=="AMR"?"selected":""} value="5">American Medical Responce Inc.</option>
		    </select>
		`, {
		next: ()=>{
			global.toggleAccept();
			global.sendSocket({type:"acceptUnit", id: id, dept: $("#selectDept").val(), gid: $("#gID").val()});
		}, width:40,showBG:true
	})
}
global.acceptStage = 0;
global.toggleAccept = () => {
	//if(!(global.userInfo.rank=="Sheriff"||global.userInfo.sign=="CTRL")) return global.notification.send("ВЫ НЕ ПУЛЬМАН!");
	if(global.userInfo.isAdmin) {
		global.acceptStage = !global.acceptStage;
		if(global.acceptStage) {
			let staff = [];
			for(let i in global.staff) {
				let unit = global.staff[i];
				if(unit.access=="new"){
					let rep = "";
					if(unit.reputation>0) rep="#34a757";
					else if(unit.reputation<0) rep="red";
					else rep = "orange";
					//${global.userInfo.isAdmin?"":"display:none;"}
					staff.push(`<tr class="link signH")">
								    <td>${unit.ID||"null"}</td>
								    <td>${unit.preDept||"-"}</td>
								    <td>${unit.pedName}</span></td>
								    <td>${unit.badge}</td>
								    <td>${unit.discord||"null"}</td>
								    <td><span class="link" onclick="global.accept(${unit.ID})">Подтвердить</span></td>
								</tr>`);
				}
			}
			$("#staff_head").html(`
				<th scope="col">ID</th>
				<th scope="col">Департамент</th>
				<th scope="col">Имя Фамилия</th>
				<th scope="col">Badge</th>
				<th scope="col">Discord</th>
				<th scope="col">Действия</th>`);
			$("#staff_table").html(staff.join(""));
			$(".toggleAccept").text("Назад")
		} else {
			let staff = [];
			for(let i in global.staff) {
				let unit = global.staff[i];
				if(unit.department!=99&&unit.department!=0&&unit.access!="banned"&&unit.department!=1){
					let status;
					global.units.forEach((_e)=>{
						if(unit.sign==_e.sign) status = _e.status==0?"Недоступен":_e.status==1?"Перерыв":_e.status==2?"Доступен":"На вызове";
					});
					if(status==null) status="Отсутствует";
					let rep = "";
					if(unit.reputation>0) rep="#34a757";
					else if(unit.reputation<0) rep="red";
					else rep = "orange";
					//${global.userInfo.isAdmin?"":"display:none;"}
					staff.push(`<tr class="link signH" onclick="global.changeUnitData(${unit.ID}, '${unit.sign}')">
								    <td>${unit.ID||"null"}</td>
								    <td>${global.departments[unit.department]||"null"}</td>
								    <td>${unit.pedName}</span></td>
								    <td style="color: ${rep};">${unit.reputation}</td>
								    <td>${unit.sign}</td>
								    <td>${unit.rank}</td>
								    <td>${unit.phone}</td>
								    <td>${unit.badge}</td>
								    <td>${unit.discord||"null"}</td>
								    <td onclick="${global.userInfo.isAdmin?'global.banUser('+unit.badge+');':''}">${status||"null"}</td>
								</tr>`);
				}
			}
			$("#staff_head").html(`
				<th scope="col">ID</th>
				<th scope="col">Департамент</th>
				<th scope="col">Имя Фамилия</th>
				<th scope="col">Рейтинг сотрудников</th>
				<th scope="col">Позывной</th>
				<th scope="col">Ранг</th>
				<th scope="col">Номер телефона</th>
				<th scope="col">Badge</th>
				<th scope="col">Discord</th>
				<th scope="col">Статус</th>`);
			$("#staff_table").html(staff.join(""));
			$(".toggleAccept").text("Открыть заявки в CAD")
		}
	}
}

global._cs = false;

__d = (str, is) => {
	if(is==0) {
		for(let i in str) {
			let e = str[i];
			for(let k in e.Data) {
				let str1 = e.Data[k];
				if(str1&&typeof(str1)=="string") {str1 = str1.replaceAll('%1','`');str1 = str1.replaceAll('%2','"');str1 = str1.replaceAll('%3',"'");str1 = str1.replaceAll('%4',"\\");}
				str[i].Data[k] = str1;
			}
		}
	} else {
		if(str&&typeof(str)=="string"&&str.length!=0&&str!=null) {str = str.replaceAll('%1','`'); str = str.replaceAll('%2','"'); str = str.replaceAll('%3',"'"); str = str.replaceAll('%4',"\\");str = str.replaceAll('▼',`
`);}
	}	
	return str;
}

let __east = () => {
	for(let i = 0; i < 99; i++) {
		if($(".tab")[i]!=null) $(".tab")[i].style.display="none";
	}
	$("#east").show();
	changeTab(99);
	$("video")[0].play();
	$("video")[0].volume = 0.1;
	$("video")[0].currentTime = 120;
}

//--------------------

global.quest = {
	_player: [],
	steps: 100,
	balance: 1000000,
	slotList: [
		[0,"T0"],
		[1,"T1", 	{label:"Flight School",						level: 0, owner: null, price: 0, img: "", group: 0}],
		[2,"T2", 	{label:"Filling Stations",					level: 0, owner: null, price: 0, img: "", group: 0}],
		[3,"T3", 	{label:"Arcadius Business Center",			level: 0, owner: null, price: 0, img: "", group: 0}],
		[4,"T4", 	{label:"GoPostal",							level: 0, owner: null, price: 0, img: "", group: 0}],
		[5,"T5", 	{label:"Grand Banks Steel Foundry",			level: 0, owner: null, price: 0, img: "", group: 0}],
		[6,"T6", 	{label:"Humane Labs and Research",			level: 0, owner: null, price: 0, img: "", group: 0}],
		[7,"T7", 	{label:"Lombank Tower",						level: 0, owner: null, price: 0, img: "", group: 0}],
		
		[8,"T8", 	{label:"Braddock Farm", 					level: 0, owner: null, price: 4000, img: "", group: 1}],
		[9,"T9", 	{label:"Grapeseed Cow Farm", 				level: 0, owner: null, price: 5300, img: "", group: 1}],
		[10,"T10", 	{label:"Clucking Bell Farms", 				level: 0, owner: null, price: 6100, img: "", group: 1}],
		[11,"T11", 	{label:"Cherry Pie Farm", 					level: 0, owner: null, price: 3900, img: "", group: 1}],
		[12,"T12"],
		
		[13,"R0", 	{label:"Escalera Rent-A-Car",				level: 0, owner: null, price: 6950, img: "", group: 2}],
		[14,"R1", 	{label:"Vanilla Unicorn", 					level: 0, owner: null, price: 10500,img: "", group: 2}],
		[15,"R2", 	{label:"Ammu-Nation", 						level: 0, owner: null, price: 9200, img: "", group: 2}],
		[16,"R3", 	{label:"Lifeinvader", 						level: 0, owner: null, price: 6500, img: "", group: 2}],
		[17,"R4", 	{label:"Bahama Mamas", 						level: 0, owner: null, price: 9900, img: "", group: 2}],
		
		[18,"B12"],
		[19,"B11", {label: "Sandy Shores Sheriff's Station",	level: 0, owner: null, price: 0, img: "", group: 3}],
		[20,"B10", {label: "Mission Row Police Station", 		level: 0, owner: null, price: 0, img: "", group: 3}],
		[21,"B9", {label: "Vinewood Police Station", 			level: 0, owner: null, price: 0, img: "", group: 3}],
		[22,"B8", {label: "Davis Sheriff's Station", 			level: 0, owner: null, price: 0, img: "", group: 3}],
		[23,"B7", {label: "Beaver Bush Ranger Station", 		level: 0, owner: null, price: 0, img: "", group: 3}],
		[24,"B6", {label: "Vespucci Police Station", 			level: 0, owner: null, price: 0, img: "", group: 3}],
		[25,"B5", {label: "Paleto Bay Sheriff's Office", 		level: 0, owner: null, price: 0, img: "", group: 4}],

		[26,"B4", {label: "Los Santos Golf Club",				level: 0, owner: null, price: 0, img: "", group: 4}],
		[27,"B3", {label: "Los Santos International Airport",	level: 0, owner: null, price: 0, img: "", group: 4}],
		[28,"B2", {label: "Derelict Motel",						level: 0, owner: null, price: 0, img: "", group: 4}],
		[29,"B1", {label: "Central Los Santos Medical Center",	level: 0, owner: null, price: 0, img: "", group: 4}],
		[30,"B0"],

		[31,"L4", {label:"-", 									level: 0, owner: null, price: 0, img: "", group: 5}],
		[32,"L3", {label:"-", 									level: 0, owner: null, price: 0, img: "", group: 5}],
		[33,"L2", {label:"-", 									level: 0, owner: null, price: 0, img: "", group: 5}],
		[34,"L1", {label:"-", 									level: 0, owner: null, price: 0, img: "", group: 5}],
		[35,"L0", {label:"-", 									level: 0, owner: null, price: 0, img: "", group: 5}],
	],									
	new: (badge, slot) => {
		let meta = {};
		meta.user = badge;
		meta._slot = slot;
		meta.getSlot = () => {return meta._slot};
		meta.scroll = (time = 1000) => {
			if(meta.scr!=null&&meta.scr[0]!=0) return;
			$("#quest_scroll").css("display","inherit");
			meta.scr = [setInterval(()=>meta.scrollACT(), time), 1];
			meta.scrollACT();
		};
		meta.scrollACT = (m=meta) => {
			if(m.scr[2]) clearInterval(m.scr[2]);
			m.scr[1]++;
			let speed = 10;
			if(m.scr[1] < 5) speed = 10; 
			else if(m.scr[1]>=5&&m.scr[1]<7) speed = 100;
			else if(m.scr[1]>=7&&m.scr[1]<9) speed = 500;
			else m.scr[1] = 0;

			if(m.scr[1]!=0) {
				m.scr[2] = setInterval((meta=m)=>{
					let r1 = Math.floor(Math.random() * Math.floor(6))+1;
					let r2 = Math.floor(Math.random() * Math.floor(6))+1;
					meta.scr[4] = [r1,r2]
					let tx1 = r1==1?`one`:r1==2?"two":r1==3?"three":r1==4?"four":r1==5?"five":"six";
					let tx2 = r2==1?`one`:r2==2?"two":r2==3?"three":r2==4?"four":r2==5?"five":"six";
					$("#quest_scroll_1").html(`<i class="fas fa-dice-${tx1}"></i>`);
					$("#quest_scroll_2").html(`<i class="fas fa-dice-${tx2}"></i>`);
				},speed)
			} else {
				clearInterval(m.scr[0]);
				m.scr[0] = 0;
				$("#quest_scroll").hide();
				m.move(m._slot+(m.scr[4][0]+m.scr[4][1]));
				global.quest.steps--;
				global.quest.upd();
				global.quest.log(`выбивает числа: ${m.scr[4][0]} и ${m.scr[4][1]}.`)
			}
		};
		meta.move = (slot, skip = false) => {
			let next = slot;
			if(next>35) next = next-34;
			meta._slot = next;
			global.quest.slotList.forEach((e)=>{
				if(e[0]==next) {
					let id = `quest_slot_`;
					if(e[1][0]=="T") id+=`top_${e[1].substring(1)}`;
					if(e[1][0]=="L") id+=`left_${e[1].substring(1)}`;
					if(e[1][0]=="R") id+=`right_${e[1].substring(1)}`;
					if(e[1][0]=="B") id+=`bottom_${e[1].substring(1)}`;
					let p = $(`#${id}`)[0].getBoundingClientRect();
					//$(`#${id}`)[0].style.background = "yellow";
					$("#player1").css("top", p.y+20);
					$("#player1").css("left", p.x+10);
					if(!skip) setTimeout((m=meta)=>{
						let alert = true;
						if(e[1]=="T0") {
							alert = false;
							global.quest.balance+=15000;
							global.quest.upd();
							global.quest.log(`попадает на стартап и получает $15.000!`);
							meta.move(meta._slot+(Math.floor(Math.random() * Math.floor(6))));
						} else if(e[1]=="T12") {
							alert = false;
							global.quest.log(`посещает кафетерий и ходит ещё раз.`);
							//meta.move(meta._slot+(Math.floor(Math.random() * Math.floor(6))));
							global.quest.scroll()
						} else if(e[1]=="B12") {
							alert = false;
							global.quest.balance+=2000;
							global.quest.upd();
							global.quest.log(`находит $2.000 у двери в казино!`);
						} else if(e[1]=="B0") {
							alert = false;
							global.quest.balance-=Math.floor(Math.random() * Math.floor(1000))+1;
							global.quest.upd();
							global.quest.log(`находит $2.000 у двери в казино!`);
						} else global.quest.log(`задумывает о покупке ${e[2].label} за ${e[2].price}...`);
						if(alert) global.alert(`QUEST`, `Купить ${e[2].label} за ${e[2].price}? | Баланс: $${global.quest.balance}`, {next: () => {
							global.quest.log(`покупает ${e[2].label}!`);
							global.quest.balance-=e[2].price;
							$(`#${id}`)[0].style.background = "yellow";
						}, close: () => {
							global.quest.log(`отказывается от покупки.`);
						}, showBG:true,width:40})
					}, 1500);
				}
			});
		};
		global.quest.upd();
		meta.move(slot, true);
		return meta;
	},
	log: (msg) => {
		$("#quest_log").html(`<div style="width:100%;font-size: 1.5vh;padding: 1vh 0.5vw;color:white;border-top:1px solid gray;""><span style="color: #294bc7;font-weight: bold;">${global.userInfo.sign}</span> ${msg}</div>`+$("#quest_log").html())
	},
	upd: () => {
		$("#quest_info").text(`Доступно ходов: ${global.quest.steps} | Баланс: $${global.quest.balance}`);
	},
	render: () => {
		let colors = [`rgba(255, 0, 0, 0.48)`, `rgba(86, 0, 255, 0.48)`, `rgba(0, 29, 232, 0.48)`, `rgba(232, 0, 118, 0.48)`, `rgba(232, 96, 0, 0.48)`,`rgba(0, 255, 137, 0.48)`];
		global.quest.slotList.forEach((e)=>{
			if(e[2]!=null) {
				let id = `quest_slot_`;
				if(e[1][0]=="T") id+=`top_${e[1].substring(1)}`;
				if(e[1][0]=="L") id+=`left_${e[1].substring(1)}`;
				if(e[1][0]=="R") id+=`right_${e[1].substring(1)}`;
				if(e[1][0]=="B") id+=`bottom_${e[1].substring(1)}`;
				$(`#${id}`).css("background", colors[e[2].group]);
			}
		});
	}
}

global.miner = {
	status: 0,
	init: (slots = 0) => {
		global.miner.data = [];
		let content = ``;
		let place = [];
		for(let i = 0; i < slots; i++) {
			let r = global.generator(1, '1234567890');
			let slot = 0;
			if(r==7) {slot = 1;}
			content+=`<div class="miner" id="miner_slot${i}" onclick="global.miner.click(${i})"></div>`;
			global.miner.data.push(slot);
		}
		$("#chatBlock").html(content);
		global.miner.status = 0;
	},
	click: (index) => {
		if(global.miner.status==1) return;
		if(global.miner.data[index]==0) {
			$("#miner_slot"+index).css("box-shadow","none");
			global.miner.data[index] = 2;
			//////////////////////////////////
			let bombs = 0;
			let list = [-13, -12, -11, -1, 1, 11, 12, 13].forEach((e)=>{
				if((e==13||e==1||e==-11)&&(index+e)%12==0) {}
				else if((e==-13||e==-1||e==11)&&(index+e)%12==11) {}
				else {
					if(global.miner.data[index+e]!=null&&global.miner.data[index+e]==1) bombs++;
				}
			});
			if(bombs == 0) $("#miner_slot"+index).css("background","#9494948c");
			else {
				$("#miner_slot"+index).css("background","url(quest/"+bombs+".png) rgba(148, 148, 148, 0.55)");
				$("#miner_slot"+index).css("background-size","cover");
			}
			let close = true;
			for(let i = 0; i < global.miner.data.length;i++) if(global.miner.data[i]==0) close = false;
			if(close) {
				alert("WIN :)");
				global.miner.init(global.miner.data.length);
			}
		} else if(global.miner.data[index]==1) {
			global.miner.status = 1;
			for(let i = 0; i < global.miner.data.length;i++){
				let e = global.miner.data[i];
				if(e==1) {
					$("#miner_slot"+i).css("box-shadow","none");
					$("#miner_slot"+i).css("background","url(quest/bomb.png) rgba(148, 148, 148, 0.55)");
					$("#miner_slot"+i).css("background-size","cover");
				}
			}
			setTimeout(()=>{
				global.miner.init(global.miner.data.length);
			},5000)
		}
	}
}

global.restartAlert = (msg = null, desc = null) => {
	if(global.userInfo.isAdmin == false) return;
	global.sendSocket({type:"restartAlert", msg: msg, desc: desc})
}

global.notification = {
	query: [],
	activeMSG: null,
	timer: null,
	activeMSGRemoved: false,
	send: function(msg = null, desc = null, time = 5){
		if(msg == null || msg.length < 5){
			log(2, "Error: msg is null or length < 5");
			return;
		}
		if(desc == null || desc.length < 5) $("#flash_notif")[0].children[1].style["line-height"] = "5vh";
		else $("#flash_notif")[0].children[1].style["line-height"] = "2.3vh";
		if(this.activeMSG != null) {
			this.query.push({
				msg: msg,
				desc: desc,
				time: time*10,
				_time: time*10,
			});
			return;
		} else this.activeMSG = {
			msg: msg,
			desc: desc,
			time: time*10,
			_time: time*10,
		}
		$("#flash_notif").show();
		$("#flash_msg").text(msg);
		$("#flash_desc").text(desc);
		$(".under_line")[0].style.width = "100%";
		$("#flash_notif")[0].classList.add('animated', 'pulse')
		setTimeout(function(){
			if(global.notification.timer != null) clearInterval(global.notification.timer);
			global.notification.timer = setInterval(function(){
				global.notification.activeMSG.time--;
				$(".under_line")[0].style.width = (global.notification.activeMSG.time/global.notification.activeMSG._time*100)+"%";
			}, 50)
		},300);
	},
	removeActiveMessage: function(){
		activeMSGRemoved = true;
	},
	removeMessage: function(index = 0){

	}
}

$(function(){
	// INIT
	setInterval(function(){
		if(global.notification.activeMSG != null && (global.notification.activeMSGRemoved || global.notification.activeMSG!=null&&global.notification.activeMSG.time <= 0)){
			global.notification.activeMSGRemoved = false;
			global.notification.activeMSG = null;
			$("#flash_notif")[0].classList.add('animated', 'fadeOutRight')
			setTimeout(function(){
				$("#flash_notif").hide();
				$("#flash_notif")[0].classList.remove("animated", "pulse", "fadeOutRight");
				if(global.notification.query.length > 0 && $("#flash_notif")[0].style.display == "none"){
					let data = global.notification.query[0];
					global.notification.send(data.msg, data.desc, data.time/10);
					global.notification.query.splice(0,1);
				}
			},300)
			clearInterval(global.notification.timer);
		}
	},50)
})