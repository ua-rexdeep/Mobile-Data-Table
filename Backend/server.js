const fivem  =  require("fivem-api");
const Discord = require("discord.js");
const bot = new Discord.Client();
const path = require('path');
const fs = require('fs');
const Https = require('https');
const WebSocketServer = require('ws').Server;

const socket = Https.createServer({
    cert: fs.readFileSync('/etc/apache2/ssl/certificate.crt'),
    key: fs.readFileSync('/etc/apache2/ssl/private.key')
});
const wss = new WebSocketServer({
  server: socket
});
socket.listen(39177);

var users = [];
var preUsers = [];
var mysql = null;

var global = {};

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

global.getUserBySign = (sign, onlyOnline = false) => {
    let rd;
    for(let uID in users) {
        let user = users[uID];
        if(user&&user.sign() == sign) rd=user;
    }
    if(!onlyOnline) mysql.query(`select pedName from accounts where sign = '${sign}';`,(_,r)=>{
        rd=r[0].pedName;
    })
    return rd;
}

global.getUserByBadge = (badge, onlyOnline = false) => {
    let rd;
    for(let uID in users) {
        let user = users[uID];
        if(user&&user._badge == badge) rd=user;
    }
    if(!onlyOnline) mysql.query(`select pedName from accounts where badge = '${badge}';`,(_,r)=>{
        rd=r[0].pedName;
    })
    return rd;
}

setTimeout(function() {
    fs.readdir('/var/www/html/unity/images', function (err, files) {
        let list = [];
        mysql.query(`select * from dbTable;`, (__e,r)=>{console.log(__e);
            r.forEach((e)=>{
                list.push(e.Data.img+".png");
                if(e.Data.img1!=null) list.push(e.Data.img1+".png");
            });
            files.forEach(function (file) {
                if(file!="BGreg.png"&&file!="BGregPed.png"&&!list.includes(file)) fs.unlinkSync("/var/www/html/unity/images/"+file);
            });
        });
    });
    fs.readFile("callouts.json", "utf8", function(err, data) {global.callouts.list = JSON.parse(data).list});
}, 10);

global.wanted = {
    peds: [],
    vehs: [],
    add: (sender, obj, data) => {
        if(typeof(data)=="object"&&(obj==1 || obj==0)) {
            data.sender = data.sender==sender.sign()?data.sender:`${data.sender} // ${sender.sign()}`;
            global.log(`${sender.sign()}: added warrent for ${data.name||data.model} / ${data.rn||data.vin}`);
            mysql.query(`insert into wanted (Type,Data) values (${obj}, '${JSON.stringify(data)}');`);
            global.updateWanted(null,true);
        }
    },
    rm: (sender, id) => {
        mysql.query(`update wanted set Status = 0 where \`ID\` = ${id};`);
        global.log(`${sender.sign()}: remove from warrent ID: ${id}`);
        global.updateWanted(null,true);
    }
}

global.combinedUnits = [];

global.updateWanted = (sender, isBC = true) => {
    mysql.query(`select * from wanted where Status = 1;`,(err,res)=>{
        if(isBC) global.broadcast({type:"wanted", data: res});
        else sender.send({type:"wanted", data: res});
    });
}

global.updateDataBase = () => {
    mysql.query(`select * from dbTable;`,(_e,res)=>{
        users.forEach((e)=>{
            if(e!=null&&e.isOnline()&&e.status()=="authed"){
                e.send({"type":"dbInfo","data":res});
            }
        })
    });
}

global.callouts = {
    list: [],
    create: (sender, desc, loc, realLoc) => {
        if(sender=="syscode1922"||sender.status() == "authed"){
            global.callouts.list.push({"desc":desc, "units": [], "loc": loc, "realLoc": realLoc, "time": new Date().getTime(), "status": 1, "closer": null, "sender": sender.sign(), "closeTime": 0, "log": []})
            global.log(`${sender.sign()||"SYSTEM"}: created callout #${global.callouts.list.length}.`)
            global.callouts.update();
        } else sender.send({type: "notification", msg: "Ошибка идентификации.", title: "CAD Error"});
    },
    close: (sender, id) => {
        if(sender.status() != "authed") return sender.send({type: "notification", msg: "Ошибка идентификации.", title: "CAD Error"});
        if(global.callouts.list[id-1] != null) {
            if(global.callouts.list[id-1].status == 0) {
                return sender.send({type: "notification", msg: `Вызов #${id} уже имеет статус Code 4.`, title: "CAD Error"});
            }
            global.callouts.list[id-1].status = 0;
            global.callouts.list[id-1].closer = sender.sign();
            global.callouts.list[id-1].closeTime = new Date().getTime();
            global.callouts.list[id-1].units.forEach((u)=>{
                users.forEach((_u)=>{
                    if(_u) {
                        console.log(_u.sign()+" / "+u+" / "+_u.cadStatus())

                        let comb = null;
                        let c_id = 0;
                        global.combinedUnits.forEach((e)=>{
                            if(e.units.includes(_u._badge)) {
                                comb = e;
                            } else if(comb==null) {
                                c_id++;
                            }
                        })

                        if(comb!=null){
                            global.combinedUnits[c_id].status = 2;
                            global.updateUnits();
                        } else if(_u!=null&&_u._badge==u&&_u.cadStatus()==3) {
                            _u.reputation(0.2);
                            _u.cadStatus(2);
                        }
                    }
                })
            })
            //sender.send({type: "notification", msg: `Вызову #${id} установлен статус закрыт.`, title: "CAD Callout status changed", bg: "success"});
            global.log(`${sender.sign()||"SYSTEM"}: close callout #${id}.`)
            global.callouts.log(id-1,`${sender.sign()} вызов закрыт.`);
            fs.writeFile("callouts.json",JSON.stringify(global.callouts),(e)=>{
                if(e) console.log(e)
            });
        } else return sender.send({type: "notification", msg: `Вызов #${id} не найден.`, title: "CAD Error"});
    },
    update: (unit) => {
        if(unit==null) global.broadcast({"type": "calloutsInfo", list: global.callouts.list});
        else {
            unit.send({"type": "calloutsInfo", list: global.callouts.list});
        }
    },
    log: (id, msg) => {
        console.log(`>>> ${id}: ${msg}`)
        let _t = new Date();
        _t = `${_t.getHours()<10?"0"+_t.getHours():_t.getHours()}:${_t.getMinutes()<10?"0"+_t.getMinutes():_t.getMinutes()}:${_t.getSeconds()<10?"0"+_t.getSeconds():_t.getSeconds()}`;
        global.callouts.list[id].log.push(`[${_t}] ${msg}`);
        global.callouts.update();
    }
}

// bot.on('ready', () => {
//     bot.user.setActivity("LimbRP", { type: 'PLAYING' });
// });
// bot.login('NTg0MDY4MjgxNzg3MjE5OTc4.XPqs6g.rMxyxmUbFh4HQQMvC6nx4D8R6ZY');
// bot.on('message', message => {
//     let sender = message.author.username+"#"+message.author.discriminator;
//     let args = message.content.split(" ");
//     console.log("MESSAGE: "+message)
//     if(args[0][0] == "."){
//         if(args[0] == ".accept"){
//             //!accept ID ACCESS DEPT
//             mysql.query(`select * from accounts where ID=${args[1]};`, (err,res)=>{
//                 let sign = "B-"+(res[0].discord.split("#")[1]);
//                 mysql.query(`update accounts set access = "${args[2]}", department = ${args[3]}, sign = "${sign}" where ID = ${args[1]};`)
//             });
//         } else if(args[0] == ".ban"){
//             if (!message.guild) return;
//             mysql.query(`update accounts set access = 'banned' where ID = ${args[1]};`);
//             users.forEach((u)=>{
//                 if(u!=null&&u.status()=="authed") {
//                     if(u.cadID == parseInt(args[1])) {u.status("connected");u.send({type: "notification", title: "CAD Banned", msg: `Ваш аккаунт заблокирован в CAD.<br>Причину уточните у Администратора.`});}
//                     else console.log('error '+u._id);
//                 }
//             });
//         }
//     }
// });

global._log = [];
global.log = (set) => {
    let _log = [];
    global._log.forEach((e)=>{_log.push(e)});
    if(set!=null) {
        let t = new Date();
        let h = t.getHours();
        let m = t.getMinutes();
        global._log.push(`${h<10?"0"+h:h}:${m<10?"0"+m:m} | `+set);
        global.broadcast({type:"adminLog"});
    } else return _log.reverse();
};

global.broadcast = (data) => {
    let us = [];
    for(let uID in users) {
        let user = users[uID];
        if(user&&user.status()=="authed"&&user.isOnline()) us.push(user);
    }
    if(us.length!=0) for(let i in us) {
        let user = us[i];
        if(data.type == "100BC") {
            data.signal = global.siren.active();
            data.panic = global.panic.isActive();
            data.panic_units = global.panic._users;
            data.panicLocation = global.panic.location||"Ожидание локации..";
            //console.log(`[LOG] Panic: ${data.panic?('Yes('+global.panic._users.join(", ")+')'):"No"} / Siren: ${data.signal?"Yes":"No"}`);
        }
        else if(data.type=="adminLog") {
            console.log("LOG: "+user.isAdmin()+" / "+user.sign())
            if(user.isAdmin()) data.log = global.log();
            else data.log = [];
            //console.log(`[BROADCASTx${user.sign()}] ${JSON.stringify(data)}`);
        }
        //else console.log(`[BROADCASTx${user.sign()}] ${JSON.stringify(data)}`);
        user.send(data);
    }
}

global.updateUnits = () => {
    let list = [];
    for(let uID in users) {
        let user = users[uID];
        if(user&&user.status()=="authed"&&user.isOnline()) 
            list.push({status: user.cadStatus(), sign: user.sign(), pedName: user.pedName(), id: user._id, department: user.department(), warns: user.getWarns(), note: user._note,isAdmin:user.isAdmin(),badge: user._badge,reputation: user.reputation(),gameID: user._gameID||0, meta: user.meta});
    }
    if(list.length>0) {
        mysql.query(`select ID, department, badge, rank, phone, sign, pedName, discord, access, reputation, gameID, preDept from accounts;`, (_,res)=>{
            global.broadcast({type:"unitsInfo", staff: res, list: list, signal: global.siren.active(), panic: global.panic.isActive(), panic_units: global.panic._users, combined: global.combinedUnits});
        })
    }
}

global.bc = setInterval(()=>{
    global.broadcast({type:"100BC"})
}, 15*1000);

global.siren = {
    _active: false,
    _int: null,
    active: (set) => {
        if(set!=null) {
            if(set) {
                clearInterval(global.bc);
                global.bc = setInterval(()=>{global.broadcast({type:"100BC"})}, 15*1000);
            }
            global.siren._active = set;
            console.log("[LOG] Toggled signal 100 to "+global.siren._active.toString())
            global.broadcast({type:"100BC"})
        } else return global.siren._active;
    }
}

global.panic = {
    _active: false,
    _users: [],
    _int: null,
    isActive: () => {return global.panic._active},
    sys: (unit) => {
        let find = false;
        let fi = -1;
        for(let i in global.panic._users) {
            if(global.panic._users[i] == unit.sign()) {find = true;fi=i;};
        }
        if(find) {
            if(global.panic._users.length==1){
                global.panic._users = [];
                global.panic._active = false;
                global.panic.location = null;
                global.broadcast({type:"100BC"});
            } else global.panic._users.splice(fi);
        } else {
            clearInterval(global.bc);
            global.bc = setInterval(()=>{global.broadcast({type:"100BC"})}, 15*1000);
            global.siren._active = false;
            global.panic._active = true;
            global.panic._users.push(unit.sign());
            global.broadcast({type:"100BC"})
        }
        global.broadcast({type:"100BC"})
        global.updateUnits();
    }
}

let rConn = () => {
    mysql = require("mysql2").createConnection({
        host: "localhost",
        user: "root",
        database: "limb",
        password: "шо?"
    });
    mysql.connect(function(err){
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else{
            console.log("MYSQL connected.");
            mysql.on('error', function(err) {
                console.log(">> "+err.code); // 'ER_BAD_DB_ERROR'
                mysql.destroy();
                rConn(mysql);
            });
        }
     });
}

rConn();

let createUser = (connection, id, bot = false) => {
    let meta = {
        _conn: connection,
        _id: id,
        _department: null,
        _rank: null,
        _sign: null,
        _pedName: null,
        _access: null,
        _token: null,
        _status: "preLogin",
        _cad_status: 0,
        _connected: true,
        _warns: [],
        _isAdmin: false,
        _reputation: 0,
        _bot: bot,
        _gameID: 0,
    };
    meta.send = (data) => {
        if(meta._connected&&!meta._bot) {
            if(meta._conn.readyState==1) meta._conn.send(JSON.stringify(data));
        }
    };
    meta.department = (set) => {
        if(set) meta._department=set;
        else return meta._department;
    };
    meta.deptInfo = (set) => {
        if(set!=null) {
             return set=="control"&&meta._department==1 ||
                set=="police"&&meta._department>1&&meta._department<5 ||
                set=="medic"&&meta._department==5;
        }
        return meta._department==1?"control":meta._department>1&&meta._department<5?"police":meta._department==5?"medic":"civ";
    };
    meta.rank = (set) => {
        if(set) meta._rank=set;
        else return meta._rank;
    };
    meta.sign = (set) => {
        if(set) meta._sign=set;
        else return meta._sign;
    };
    meta.pedName = (set) => {
        if(set) meta._pedName=set;
        else return meta._pedName;
    };
    meta.reputation = (set) => {
        if(set!=null) meta._reputation==null?meta._reputation=set:meta._reputation+=set;
        else return meta._reputation;
        console.log(`update accounts set reputation = ${meta._reputation} where sign = '${meta._sign}';`);
        mysql.query(`update accounts set reputation = ${meta._reputation} where sign = '${meta._sign}';`);
        global.updateUnits();
    };
    meta.access = (set) => {
        if(set!=null) meta._access=set;
        else return meta._access;
    };
    meta.token = (set) => {
        if(set!=null) meta._token=set;
        else return meta._token;
    };
    meta.status = (set) => {
        if(set) {
            meta._status=set;
            meta.send({
                type: "userStatus", 
                status: set, 
                department: meta.department(), 
                rank: meta.rank(), 
                sign: meta.sign(), 
                pedName: meta.pedName(), 
                access: meta.access(),
                cadStatus: meta.cadStatus(),
                cadID: meta.cadID,
                badge: meta._badge,
                meta: meta.meta,
            });
            if(set=="authed") global.callouts.update(meta);
        }
        else return meta._status;
    };
    meta.cadStatus = (set) => {
        if(set!=null) {
            meta._cad_status = set;
            global.updateUnits();
        } else return meta._cad_status;
    }
    meta.getWarns = () => {
        return meta._warns;
    }
    meta.isAdmin = () => {
        return meta._isAdmin;
    }
    meta.giveWarn = (sender, reason) => {
        if(sender.isOnline()==false) return sender.send({type: "notification", msg: "Ошибка идентификации.", title: "CAD Error"});
        if(typeof(reason) == "string" && reason.length >= 5 && reason.length < 255) {
            meta._warns.push({"sender":sender.sign(), "reason": reason, "date": new Date().getTime()});
            sender.send({type: "notification", msg: `Успешно выдано предупреждение ${meta.sign()} за ${reason}.`, title: "CAD Give Warning", bg: "success"});
            meta.send({type: "notification", msg: `${sender.sign()} выдал Вам предупреждение за ${reason}.<br>Обратитесь к Супервайзеру своего департамента.`, title: "CAD Give Warning"});
            mysql.query(`update accounts set warns = '${JSON.stringify(meta.getWarns())}' where sign = '${meta.sign()}';`);
            meta.reputation(-2);
            global.log(`${sender.sign()}: gived warning for ${meta.sign()}: ${reason};`);
            global.updateUnits();
        } else sender.send({type: "notification", msg: "Причина указана не верно. Убедитесь, что строка имеет длину от 5 до 255 символов.", title: "CAD Error"});
    }
    meta.isOnline = (set) => {
        //console.log(meta.sign()+": "+(set!=null?set:meta._connected))
        if(set!=null) meta._connected=set;
        else return meta._connected;
    }
    return meta;
}

wss.on('connection', (connection, _a, _b) => {
    connection.send(JSON.stringify({type: "userStatus", status: "preLogin"}));
    let id = 0;
    for(id;id < 1000; id++){
        if(users[id] == null) break;
    }
    users[id] = createUser(connection, id);
    users[id].ip = connection._socket.address().address;
    users[id].ip = users[id].ip.substr(users[id].ip.search('[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}'));
    //////////////////////////////////////////////////////////
    connection.on('message', function(message){
        try { JSON.parse(message) } catch(e) {console.log(e.message);return;}
        let info = onMessage(JSON.parse(message), id);
        if(info==null) return;
        if(info.type == "setUser"){
            console.log("set user to "+info.asID)
            let preID = id;
            id = info.asID;
            users[id]._conn = connection;
            users[preID] = null;
            users[id].isOnline(true);
            users[id].status(users[id].status());
            mysql.query(`select * from dbTable;`,(_e,res)=>{
                users[id].send({"type":"dbInfo","data":res});
            });
            global.updateWanted(users[id]);
            global.updateUnits();
            global.broadcast({type:"adminLog"});
        }
    });
    //////////////////////////////////////////////////////////
    connection.on('close', function() {
        console.log("User with id "+id+" disconnected.");
        users[id].isOnline(false);
        global.updateUnits();
    });
});

var onMessage = (message, id) => {
    let user = users[id];
    console.log(`[REQUEST] Client_${user.sign()||user._id}: ${JSON.stringify(message)} // ${user.deptInfo()}`);
    
    if(user.status()=="authed" && user.isOnline()) {
        mysql.query(`select ID,actions from accounts where badge = '${user._badge}';`, (e,r)=>{
            if(r!=null&&r[0]!=null) {
                // let logs = typeof(r[0].actions||[])=="string"?JSON.parse(r[0].actions||[]):r[0].actions||[];
                // let userInfo = {
                //     department: user._department,
                //     rank: user._rank,
                //     sign: user._sign,
                //     pedName: user._pedName,
                //     access: user._access,
                //     token: user._token,
                //     status: user._status,
                //     cad_status: user._cad_status,
                //     connected: user._connected,
                //     warns: user._warns,
                //     isAdmin: user._isAdmin,
                //     reputation: user._reputation,
                //     gameID: user._gameID,
                //     combRequst: user.combRequst||null,
                // }
                // logs.push({time: new Date().getTime(), message: message, userInfo: userInfo})
                // mysql.query(`update accounts set actions = '${JSON.stringify(logs||[])}' where ID = ${r[0].ID};`,(e)=>{
                //     if(e) {
                //         //bot.channels.get('578689473567784961').send(`${user.pedName()}: ошибка MySQL ${e.message}`);
                //         console.log(e);
                //     }
                // });
            }// else bot.channels.get('578689473567784961').send(`${user.pedName()}: ошибка логирования: ${JSON.stringify(message)}`);
        })
    }

    if(message.type == "preAuth" && user.status() == "preLogin"){
        if(message.token == null) {
            let token = global.generator(20);
            user.token(token);
            user.send({type: "sessionData", token: token});
            user.status("connected");
        } else {
            for(let i = 0; i < users.length; i++){
                if(users[i]&&users[i].token() == message.token) return {type: "setUser", asID: i};
            }
            user.token(message.token);
            user.status("connected");
        }
    } else if(message.type == "onPanicLocationChanged" && user.status() != "connected" && user.status != "preLogin") {
        global.panic.location = message.loc;
        global.broadcast({type:"100BC"});
    } else if(message.type == "logout" && user.status() != "connected" && user.status != "preLogin") {
        user.status("connected");
    } else if(message.type == "authLogin" && (message.email && message.email.length > 5 && message.email.length <= 64)  && (message.pass && message.pass.length >= 5 && message.pass.length <= 32) && user.status != "connected") {
        let isEmail = message.email.search(/^[a-zA-Z0-9-.]{4,64}@[a-zA-Z0-9]{2,32}\.[a-zA-Z0-9]{2,10}$/) == 0;
        let isPass = message.pass.search(/^[a-zA-Z0-9\_\-@]{4,64}$/) == 0;
        if(isEmail && isPass) {
            mysql.query(`select * from accounts;`, (err, res) => {
                let found = false;
                for(let i in res) {
                    let account = res[i];
                    if(account.email == message.email && account.password == message.pass) {
                        if(account.access == "banned") {
                            user.send({type: "notification", title: "CAD Banned", msg: `Ваш аккаунт ${account.email} заблокирован в CAD.<br>Причину уточните у Администратора.`});
                            found = true;
                            return;
                        }
                        else if(account.access != "new") {
                            /*let a_f = false;
                            users.forEach((e)=>{
                                if(e!=null&&e.sign()==account.sign&&e.isOnline()&&e.status()=="authed") {
                                    user.send({type: "notification", title: "CAD Error", msg: `В системе имеется авторизированный человек с данного аккаунт.<br>Если это ошибка, немедленно сообщите Администрации!`});
                                    a_f = true;
                                }
                            })
                            if(a_f)return;*/
                            user.department(account.department);
                            user.rank(account.rank);
                            user.sign(account.sign);
                            user.pedName(account.pedName);
                            user._gameID =account.gameID;
                            user.access(account.access);
                            user._reputation = account.reputation;
                            user._warns = account.warns;
                            user._isAdmin = account.isAdmin;
                            user._note = account.note;
                            user._discord = account.discord;
                            user.cadID = account.ID;
                            user.meta = account.meta;
                            user._badge = account.badge;
                            user.cadStatus(0);
                            // if(account["2fa"]==1){
                            //     user.authStage = [1,global.generator(4,"0123456789")];
                            //     // global.discord(account.discord, `Попытка авторизации ${user.ip}. Для подтверждения введите \`.auth ${user.authStage[1]}\`, в случае, если это были не Вы - введите \`.block\`!`);
                            //     user.send({type: "notification", title: "Waiting confirmation", msg: `Ожидаем подтверждения в Discord!`});
                            // } else {
                                user.status("authed");
                                global.broadcast({type:"adminLog"});
                                global.updateUnits();
                                mysql.query(`select * from dbTable;`,(_e,res)=>{
                                    user.send({"type":"dbInfo","data":res});
                                });
                                global.updateWanted(user);
                            // }
                            found = true;
                            return;
                        } else {
                            found = true;
                            user.send({type: "notification", title: "Not verified", msg: `Ваш аккаунт ${account.email} не подтвержден Администратором.<br>Ожидайте уведомления об результатах в Discord!`});
                            return;
                        }
                        break;
                    } 
                }
                if(!found) user.send({type: "notification", title: "Log in error", msg: `Аккаунт ${message.email} не найден в базе данных.<br>Запросить доступ к CAD можно перейдя во вкладку "Request access"`});
            });
        } else user.send({type: "notification", title: "Log in error", msg: `Ошибка следующего поля: ${isEmail?"Пароль":"Email"}. Исправьте ошибку, и повторите попытку.`});
    } else if(message.type == "unitChangeStatus" && user.status() == "authed" && message.val!=null && (typeof(message.val) == "number"||message.val==0)) {
        if(message.isOther&&((user.cadStatus()==2&&user.department()==1)||user.isAdmin())) {
            console.log("For Other 1")
            let comb = null;
            let c_id = 0;
            global.combinedUnits.forEach((e)=>{
                if(e.units.includes(message.unit)) {
                    comb = e;
                    message.unit=e.sign;
                } else if(comb==null) {
                    c_id++;
                }
            })

            if(comb!=null){
                global.combinedUnits[c_id].status = message.val;
                global.updateUnits();
            } else {
                for(uID in users) {
                    let u =users[uID];
                    if(u&&u.status()=="authed"&&u._badge == message.unit) {
                        if(u.isOnline()) u.cadStatus(message.val);
                        else console.log("Error of changing unit status "+message.unit+". Unit is not online.")
                    }
                }
                global.log(`${user.sign()}: change status for ${message.unit} to ${message.val}`);
            }
            return;
        }
        if(user.deptInfo("control")&&user.access()=="control" && message.val == 2) {
            let next = true;
            for(let uID in users) {
                let us = users[uID];
                if(us&&us.status()=="authed"&&us.isOnline()&&us.cadStatus()==2&&us.deptInfo("control")){
                    next = false;
                }
            }
            if(next) {
                user.cadStatus(message.val);
                global.log(`${user.sign()}: set as active control;`);
            }
            else user.send({type:"notification",msg:"One other active control",title:"CAD Error"});
        } else {

            let comb = null;
            let c_id = 0;
            global.combinedUnits.forEach((e)=>{
                if(e.units.includes(user._badge)) {
                    comb = e;
                } else if(comb==null) {
                    c_id++;
                }
            })
            console.log("COMBINE: ",c_id,comb)
            if(comb!=null){
                global.combinedUnits[c_id].status = message.val;
                global.updateUnits();
            } else {
                user.cadStatus(message.val);
                global.log(`${user.sign()}: changing status: ${message.val};`);
            }
        }
    } else if(message.type == "toggleSignal100" && user.status() == "authed") {
        console.log(`toggleSignal100 ${user.status()} ${user.department()} ${user.cadStatus()}`);
        global.log(`${user.sign()}: toggle signal 100 to ${global.siren._active?"disabled":"enabled"};`);
        global.siren.active(!global.siren._active);
        if(global.siren._active) {
            global.panic._users = [];
            global.panic._active = false;
            global.broadcast({type:"100BC"});
        }
    } else if(message.type == "togglePanic" && user.status() == "authed" && !user.deptInfo("control")) {
        global.panic.sys(user);
        global.log(`${user.sign()}: toggle panic;`)
    } else if(message.type == "requestAccess" && user.status() == "connected") {
        let error = null;
        let data = message;
        let isEmail = global.regex(data.email, "email");
        let isPass = global.regex(data.pass, "password");
        if(isEmail&&isPass) {
            mysql.query(`select * from accounts where email = '${data.email}';`, (err, res) => {
                if(res.length==0) {
                    let next = false;
                    error==null?((global.regex(data.firstname, /^[a-zA-ZА-Яа-я]{3,15}$/)||global.regex(data.firstname, /^[a-zA-Z]{3,15} [a-zA-Z]{3,15}$/))?null:error="First Name"):null;
                    error==null?((global.regex(data.lastname, /^[a-zA-Zа-яА-Я]{3,15}$/)||global.regex(data.lastname, /^[a-zA-Z]{3,15} [a-zA-Z]{3,15}$/))?null:error="Last Name"):null;
                    error==null?(global.regex(data.phone, /^[0-9]{3}\-[0-9]{4}$/)?null:error="Phone Number"):null;
                    error==null?(global.regex(data.realid, /^[A-Z]{1}[0-9]{3}[A-Z]{3}$/)?null:error="RealID"):null;
                    error==null?(global.regex(data.dp, /^[a-zA-Z\s]{3,50}$/)?null:error="Department"):null;
                    error==null?(global.regex(data.discord, /^.{2,64}#[0-9]{4}$/)?null:error="Discord"):null;
                    if(error!=null) {
                        user.send({type: "notification", title: "Request error", msg: `Ошибка в поле: ${error}. Исправьте и попробуйте снова.`});
                    } else {
                        mysql.query(`insert into accounts (email, password, preDept, rank, phone, sign, pedName, warns, discord, badge, actions) values ("${data.email}", "${data.pass}", "${data.dp}", "new", "${data.phone}", "", "${data.firstname} ${data.lastname}", "[]", "${data.discord}", "${data.badge}", "[]");`, (err, res) => {
                            if(err) {
                                console.log(err);
                                user.send({type: "notification", title: "System error", msg: `Ошибка системы: ${err.code}<br>Детали:  ${err.message}<br>Сообщите об этом Администратору!`});
                            } else {
                                mysql.query(`select ID from accounts where badge = '${data.badge}';`,(_,_r)=>{
                                    user.send({type: "notification", title: "Request sended", msg: `Ваш запрос доступа к CAD отправлен Управляющему составу.<br>Ожидайте сообщения в Discord об результатах.`, close: "changeTab(0)", bg: "success"});
                                    //channels.get('578689473567784961').send(`[${_r[0].ID}] Новый запрос на доступ к CAD'y: ${data.firstname} ${data.lastname}. Email: ${data.email}. Department: ${data.dp}`);
                                })
                            }
                        });
                    }
                } else {
                    user.send({type: "notification", title: "Request error", msg: `Email адрес ${data.email} уже существует в базе данных!`});
                }
            });
        }
    } else if(message.type == "closeCall" && !isNaN(parseInt(message.id)) && user.status() == "authed") {
        global.callouts.close(user, parseInt(message.id));
    } else if(message.type == "newCallout" && user.status() == "authed" && user.deptInfo("control") && message.desc.length > 3 && message.loc.length > 3) {
        global.callouts.create(user, message.desc, message.loc, message.realLoc);
    } else if(message.type == "connectToCall" && typeof(message.callID) == "number" && message.units.length != 0 && user.status() == "authed" && user.deptInfo("control") && user.cadStatus() == 2 && user.access() == "control") {
        let checked = [];
        message.units.forEach((unit) => {
            if(unit != null) {
                let comb = null;
                let c_id = 0;
                global.combinedUnits.forEach((e)=>{
                    if(e.units.includes(unit)) {
                        comb = e;
                        unit=e.sign;
                    } else if(comb==null) {
                        c_id++;
                    }
                })

                if(!checked.includes(unit)) { 
                    checked.push(unit);
                    let found = false;
                    let foundIN = 0;
                    if(global.callouts.list[message.callID].units.includes(unit)){
                        found=true;
                        foundIN = global.callouts.list[message.callID].units.indexOf(unit);
                    }
                    if(found) {
                        users.forEach((_u) => {
                            if(_u!=null&&_u.sign() == unit&&_u.cadStatus()==3) _u.cadStatus(2);
                        })
                        if(comb!=null) {
                            global.combinedUnits[c_id].status = 2;
                        }
                        global.callouts.log(message.callID, `Диспетчер ${user.sign()} открепил юнита ${unit} от вызова.`);
                        global.callouts.list[message.callID].units.splice(foundIN, 1);
                    } else {
                        users.forEach((_u) => {
                            if(_u!=null&&_u.sign() == unit) {
                                _u.cadStatus(3);
                                _u.send({type:"connectedToCall"})
                            }
                        })
                        if(comb!=null) {
                            global.combinedUnits[c_id].status = 3;
                        }
                        global.callouts.log(message.callID, `Диспетчер ${user.sign()} прикрепил к вызову ${unit}`);
                        global.callouts.list[message.callID].units.push(unit);
                    }
                }
            }
            global.updateUnits();
        });
        global.callouts.update();
    } else if(message.type == "attachMe" && message.call!=null) {
        
    } else if(message.type == "giveWarn" && message.unit!=null && message.unit.length>2 && message.unit.length < 10) {
        let unit = global.getUserByBadge(message.unit);
        if(unit==null) return user.send({type: "notification", title: "CAD Error", msg: `Пользователь ${message.sign} не найден!`});
        unit.giveWarn(user, message.reason);
    } else if(message.type == "addWanted" && message.data!=null && user.status() == "authed") {
        global.wanted.add(user, message.obj, message.data);
    } else if(message.type == "customRequest" && user.status() == "authed" && user.access()=="unit") {
        users.forEach((u)=>{
            if(u!=null&&u.status()=="authed") {
                console.log(message.to, u.department(), u.sign())
                if(message.to=="ems"&&u._department==5) {
                    console.log("ems",message.to=="ems",u._department)
                    u.send({type:"notification",t:0,title:`Уведомление от ${user.sign()}`,msg:message.text,sound: true})
                }
                if(message.to=="police"&&(u._department==2||u._department==3||u._department==4)) {
                    console.log("police",message.to=="police",u._department)
                    u.send({type:"notification",t:0,title:`Уведомление от ${user.sign()}`,msg:message.text,sound: true})
                }
            }
        })
    } else if(message.type == "rmWanted" && message.id!=null && user.access()=="unit") {
        global.wanted.rm(user, message.id);
    } else if(message.type == "setCallData" && message.id!=null && user.access()=="control" && user.deptInfo("control") && user.cadStatus() == 2 && user.department() == 1) {
        if(message.desc!=null) global.callouts.list[message.id-1].desc = message.desc;
        if(message.loc!=null) global.callouts.list[message.id-1].loc = message.loc;
        if(message.desc!=null||message.loc!=null) global.callouts.log(message.id-1,`${user.sign()} изменил информацию на: Описание: [${message.desc}] | Локация: [${message.loc}]`);
        if(message.note!=null&&message.note.length>0) {
            global.callouts.log(message.id-1,`${user.sign()}: ${message.note}`);
        }
    } else if(message.type == "combineUnits" && ((user.isAdmin())||(user.deptInfo("control") && user.cadStatus() == 2 && user.department() == 1))) {
        if(message.units.length!=2){
            user.send({type: "notification", title: "Request error", msg: `Units length is not 2!`});
        } else if(message.sign.length < 2 || message.sign.length > 12) {
            user.send({type: "notification", title: "Request error", msg: `Sign length out of range: 2-12.`});
        } else {
            let comb = null;
            let c_id = 0;
            message.units.forEach((_e)=>{
                if(comb==null){
                    global.combinedUnits.forEach((e)=>{
                        if(e.units.includes(_e)) {
                            comb = e;
                        } else if(comb==null) {
                            c_id++;
                        }
                    })
                }
            });

            if(comb!=null){
            user.send({type: "notification", title: "Request error", msg: `Офицер уже в парном юните.`});
            } else {
                global.combinedUnits.push({units:message.units,status:2,sign:message.sign});
                global.updateUnits();
            }
        }
    } else if(message.type == "deCombineUnit" && ((user.deptInfo("control") && user.cadStatus() == 2 && user.department() == 1)||(user.isAdmin()))) {
        let comb = null;
        let c_id = 0;
        global.combinedUnits.forEach((e)=>{
            if(e.units.includes(message.unit)) {
                comb = e;
            } else if(comb==null) {
                c_id++;
            }
        })

        if(comb!=null){
            global.combinedUnits.splice(c_id,1);
            global.updateUnits();
        } else {
            user.send({type: "notification", title: "Request error", msg: `Офицер не в парном юните.`});
        }
    }  else if(message.type == "deCombineMe" && user.status() == "authed") {
        let comb = null;
        let c_id = 0;
        global.combinedUnits.forEach((e)=>{
            if(e.units.includes(user._badge)) {
                comb = e;
            } else if(comb==null) {
                c_id++;
            }
        })

        if(comb!=null){
            global.combinedUnits.splice(c_id,1);
            global.updateUnits();
        } else {
            user.send({type: "notification", title: "Request error", msg: `Вы не в парном юните.`});
        }
    } else if(message.type == "saveNote" && user.status() == "authed") {
        user._note = message.val;
        mysql.query(`update accounts set note = '${message.val}' where sign = '${user.sign()}';`);
    } else if(message.type == "regNewVehicle" && user.status() == "authed") {
        let t = global.timeConv(new Date().getTime());
        let js;
        let el = global.vehicles.find((e)=>{return e[1] == message.model});
        //if(el == null || el[0]==0) bot.channels.get('578689473567784961').send(`${user.pedName()}: регистрация невалидного транспорта \`[${el?el[0]:"NO"}] ${message.model}\``);
        if(message.timed) js = JSON.stringify(`{"log": ["[${t}] ${user.pedName()}: Временная регистрация до ${message.time}."], "vin": "${message.vin}", "model": "${message.model}", "owner": "${message.owner}", "status": 4, "img": "${message.img}", "time": "${message.time}", "color": "${message.color}"}`);
        else js = JSON.stringify(`{"log": ["[${t}] ${user.pedName()}: Регистрация."], "vin": "${message.vin}", "model": "${message.model}", "owner": "${message.owner}", "status": 0, "plate": ${message.plate}, "engine": ${message.engine}, "susp": ${message.susp}, "trans": ${message.trans}, "turbo": ${message.turbo}, "img": "${message.img}", "color": "${message.color}"}`);
        console.log(`insert into dbTable (Type, Data) values (1, ${js});`)
        user.reputation(0.1);
        mysql.query(`insert into dbTable (Type, Data) values (1, ${js});`, ()=>{
            global.updateDataBase();
        });
    } else if(message.type == "changeVehicleInfo" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.veh};`, (err,res)=>{
            res = typeof(res[0].Data)=="string"?JSON.parse(res[0].Data):res[0].Data;
            let resChanged = false;
            if(message.owner!=null){
                res.owner = message.owner;
                res.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Изменён владелец на :${message.ownerI}`);
            } else {
                if(res.plate != message.plate+1 || res.trans != message.trans || res.susp != message.susp || res.engine != message.engine || res.turbo != message.turbo) resChanged = true;
                res.plate = message.plate+1;
                res.trans = message.trans;
                res.susp = message.susp;
                res.engine = message.engine;
                res.turbo = message.turbo;
                res.vehNotes = message.vehNotes;
                if(message.changeStatus){
                    res.status = message.status;
                    res.sData = message.sData;
                    let _reason = res.sData.reason!=null?`Причина: ${res.sData.reason||"NULL"}`:"";
                    let _loc = res.sData.loc!=null?` | Локация: ${res.sData.loc||"NULL"}`:"";
                    res.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Статус: ${message.status==0?"На трафике":message.status==1?"Арестован":message.status==2?"В розыске":"Снят с регистрации"}. ${_reason}${_loc};`);
                }
            }
            if(message.status!=2) {
                mysql.query(`select * from wanted where Type = 1 And Status = 1;`,(_, r2)=>{
                    r2.forEach((_r2)=>{
                        if(_r2.Data.vin==JSON.parse(res).vin) global.wanted.rm(user, _r2.ID);
                    })
                });
            }
            //if(resChanged) res.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Изменена конфигурация транспорта: [Номерной знак = ${res.plate}] [Трансмиссия = ${res.trans}] [Подвеска = ${res.susp}] [Двигатель = ${res.engine}] [Турбо = ${res.turbo}];`);
            res=JSON.stringify(res);
            mysql.query(`update dbTable set Data = '${res}' where ID = ${message.veh};`,()=>{
                global.updateDataBase();
            });
            global.updateWanted();
        });
    } else if(message.type == "updateTable" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.id};`, (err,res)=>{
            res = typeof(res[0].Data)=="string"?JSON.parse(res[0].Data):res[0].Data;
            if(message.decl == "regImage") res.img = message.image;
            else res.img1 = message.image;
            res.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: обновлена фотография(${message.decl == "regImage"?"1":"2"});`)
            res = JSON.stringify(res);
            mysql.query(`update dbTable set Data = '${res}' where ID = ${message.id};`,()=>{
                global.updateDataBase();
            });
            global.updateWanted();
        });
    } else if(message.type == "regRealID" && user.status() == "authed") {
        console.log(message.data);
        let d = message.data;
        d.isFemale = "";
        d.isMale = "";
        let t = global.timeConv(new Date().getTime());
        d.log = [`[${t}] ${user.pedName()}: Регистрация.`];
        d.status = 0;
        d.driver = {
            status: 0,
            gived: [0, 0, null], //дата выдачи, дата важности, кто выдал
            authority: "",
            types: [],
        };
        d.weapon = {
            status: 0,
            gived: [0, 0, null], //дата выдачи, дата важности, кто выдал
            authority: "",
            types: [],
            lvl: "",
            guns: [],
        };
        d.points = 0;
        d.addon = "Отсутствует";
        // d.owner = user.cadID;
        mysql.query(`insert into dbTable (Type, Data) values (0, '${JSON.stringify(d)}');`, ()=>{
            global.updateDataBase();
        });
    } else if(message.type == "changePedInfo" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.ped};`, (e,res)=>{
            let data = res[0].Data;
            if(message.object == "driver") {
                if(message.driver.gived!=null) data.driver.gived = message.driver.gived;
                if(message.driver.authority!=null) data.driver.authority = message.driver.authority;
                if(message.driver.types!=null) data.driver.types = message.driver.types;
                
                if(message.driver.status!=null) {
                    if(message.driver.status==3){
                        data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Изъята лицензия на вождение / ${message.reason};`)
                        data.points = 0;
                    } else if(message.driver.status == 1&&data.driver.status == 0) {
                        data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Выдана лицензия на вождение: ${message.driver.types&&message.driver.types.join(", ")};`);
                        user.reputation(0.12);
                    } else if(message.driver.status == 1&&data.driver.status == 1) {
                        data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Лицензия на вождение обновлена на новый срок: ${message.driver.types&&message.driver.types.join(", ")};`);
                        user.reputation(0.05);
                    } else {
                        data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Восстановлена лицензия на вождение: ${message.driver.types&&message.driver.types.join(", ")};`)
                        user.reputation(0.05);
                    }
                    data.driver.status = message.driver.status;
                }
            } else if(message.object == "weapon") {
                console.log(data.weapon)
                if(message.weapon.status==3){
                        data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Изъята лицензия на оружие / ${message.reason};`);
                        data.points = 0;
                } else if(message.weapon.status == 1&&data.weapon.status == 0) {
                    data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Выдана лицензия на оружие: ${message.weapon.types&&message.weapon.types.join(", ")};`);
                    user.reputation(0.12);
                } else if(message.weapon.status == 1&&data.weapon.status == 1) {
                    data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Лицензия на оружие обновлена на новый срок: ${message.weapon.types&&message.weapon.types.join(", ")};`);
                    user.reputation(0.05);
                } else {
                    data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Восстановлена лицензия на оружие: ${message.weapon.types&&message.weapon.types.join(", ")};`)
                    user.reputation(0.05);
                }
                if(message.weapon.gived!=null) data.weapon.gived = message.weapon.gived;
                if(message.weapon.authority!=null) data.weapon.authority = message.weapon.authority;
                if(message.weapon.types!=null) data.weapon.types = message.weapon.types;
                if(message.weapon.status!=null) data.weapon.status = message.weapon.status;
                if(message.weapon.lvl!=null) data.weapon.lvl = message.weapon.lvl;
                data.weapon.hunter = message.weapon.hunter;
                data.weapon.status = message.weapon.status;
            } else {
                let forLog = ``;
                let sta = message.status==0?'свободен':
                            message.status==1?'арестован':
                            message.status==2?'в розыске':
                            message.status==3?'условно-досрочное освобождение':
                            message.status==4?'подписка о невыезде':
                            message.status==5?'мертв':'unkown';
                if(message.status!=2) {
                    mysql.query(`select * from wanted where Type=0;`,(_, r2)=>{
                        r2.forEach((_r2)=>{
                            if(_r2.Data.rn==data.realid) mysql.query(`delete from wanted where ID = ${_r2.ID};`);
                        })
                    });
                }
                let reason = message.sData.reason!=null?("Причина: "+message.sData.reason):"";
                let loc = message.sData.loc!=null?", Локация: "+message.sData.loc:"";
                if(message.status!=null) {forLog+=`Изменен cтатус на ${sta} ${reason}${loc};`;data.status = message.status;}
                if(message.familyStatus!=null) {forLog+=`▼Изменен cеменый статус ${message.familyStatus==0?"Не женат(а)":message.familyStatus==1?"Женат/Замужем":message.familyStatus==2?"Разведен(а)":"Вдов(а)"};`;data.familyStatus = message.familyStatus;}
                if(message.family!=null) {forLog+=`▼Изменена информация о семье;`;data.family = message.family;}
                if(message.addon!=null) {forLog+=`▼Изменена доп.информация;`;data.addon = message.addon;}
                if(message.medical!=null) {forLog+=`▼Изменена мед.информация;`;data.medical = message.medical;}
                if(data.status!=4) message.sData.homeSet = false;
                data.sData = message.sData;
                if(forLog!=``) data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: ${forLog}`);
            }
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.ped};`,(err)=>{
                global.updateDataBase();
            });
            global.updateWanted();
        });
    } else if(message.type == "callReport" && user.status() == "authed" && user.department() == 5) {
        mysql.query(`select * from dbTable where ID = ${message.ped};`,(e,r)=>{
            if(r[0]==null) return;
            let data = r[0].Data;
            data.medical+=`▼[${global.timeConv(new Date().getTime())}] ${user.pedName()}: вызов / ${message.report1}${message.callID!=0?` / [CALLID: ${message.callID}]`:""}`;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.ped};`,()=>{
                global.updateDataBase();
            });
        });
    } else if(message.type == "changeUnitData" && user.status() == "authed" && (user._badge == message.badge||user.isAdmin())){
        //badge
        //sign
        mysql.query(`update accounts set sign = '${message.sign}', rank = '${message.rank}', pedName = '${message.name}', discord = '${message.discord}', access = '${parseInt(message.dept)==1?"control":"unit"}', department = ${parseInt(message.dept)}, phone = '${message.phone}', gameID = ${message.newID} where badge = '${message.badge}';`);
        users.forEach((e)=>{
            if(e!=null&&e.isOnline()&&e.status()=="authed"&&e._badge==message.badge){
                e.sign(message.sign);
                e.pedName(message.name);
                if(user.isAdmin()){
                    e.department(message.dept);
                    e.rank(message.rank);
                    e._gameID = message.newID;
                    e.status("authed");
                }
            }
        })
        global.updateUnits();
    } else if(message.type == "addCrime" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.id};`,(__e,r)=>{console.log(__e);
            /////////////
            let data = r[0].Data;
            if(message.sType=="ticket") {
                message.result.forEach((e)=>{
                    let l = [];
                    for(let c = 0; c < 5; c++) {
                        if(e[1][c]!=null&&e[1][c].length!=0){
                            if(e[1][c]=="e") l.push("эвакуация");
                            else if(typeof(e[1][c])=="number") l.push("$"+e[1][c]);
                            else l.push(e[1][c]);
                        }
                    }
                    data.criminal+=`▼[${user.pedName()} ${new Date().toLocaleDateString()}] ${e[0]}: ${e[2]=="warning"?"// предупреждение":l.join(", ")}`;
                });
                data.points==null?data.points=message.points:data.points=+message.points;
            } else {
                data.criminal+=`▼[${user.pedName()} ${new Date().toLocaleDateString()}] ${message.result}`;
                if(message.prints!=null&&message.prints==true) data.prints = message.prints;
            }
            console.log(data.criminal);
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(e,_r)=>{
                console.log(e);
                global.updateDataBase();
            });
        })
    } else if(message.type=="editContact"&&user.status()=="authed"){
        //id
        //phone
        //work
        //residence
        mysql.query(`select * from dbTable where ID = ${message.id};`,(__e,r)=>{console.log(__e);
            let data = r[0].Data;
            data.residence = message.residence;
            data.phone = message.phone;
            data.workplace = message.work;
            data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Изменена контактная информация: ${message.phone}/${message.work}/${message.residence}`);
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(e,_r)=>{
                global.updateDataBase();
            });
        });
    } else if(message.type == "weaponRegistration" && user.status()=="authed") {
        mysql.query(`select * from dbTable where ID = ${message.id};`,(__e,r)=>{console.log(__e);
            let data = r[0].Data;
            if(data.weapon.guns==null) data.weapon.guns = [];
            data.weapon.guns.push({number: message.number, type: message.wT, model: message.model,gived: user.pedName(), taked: false});
            data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Зарегистрировано оружие ${message.model} типа ${message.wT==1?"PAF":message.wT==2?"SCF":"LCF"} #${message.number}`);
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(e,_r)=>{
                console.log(e);
                global.updateDataBase();
            });
        });
    } else if(message.type == "removeWeapon" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.ped};`,(__e,r)=>{console.log(__e);
            let data = r[0].Data;
            data.weapon.guns[message.id].taked = true;
            data.log.push(`[${global.timeConv(new Date().getTime())}] ${user.pedName()}: Снято с регистрации оружие #${data.weapon.guns[message.id].number}`);
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.ped};`,(e,_r)=>{
                console.log(e);
                global.updateDataBase();
            });
        });
    } else if(message.type == "1banUserPre" && user.status() == "authed" && user.isAdmin()) {
        let code = global.generator(6,"1234567890");
        let us = global.getUserBySign(message.user);
        if(us==null) console.log("USER NOT FOUND: "+message.user)
        if(us==null) return;
        // global.discord(user._discord, "!! Внимание !! Вы пытаетесь заблокировать человека "+(typeof(us)=="string"?us:us.pedName())+"! Код подтверждения: "+code);
        console.log("Confirm code: "+code)
        //bot.channels.get('578689473567784961').send(`${user.pedName()}: Попытка бана человека ${(typeof(us)=="string"?us:us.pedName())}.`);
        if(global.codes==null) global.codes = [];
        global.codes[user._id] = [code,message.user];
    } else if(message.type == "banUserPre" && user.status() == "authed" && user.isAdmin()) {
        // let code = global.codes[user._id];
        // if(code==null) return;
        // if(message.confirmCode == code[0]&&message.user==code[1]) {
            let user = global.getUserBySign(message.user);
            if(user==null) return;
            user.status("connected");
            mysql.query(`update accounts set access='banned' where sign='${user.sign()}';`);
            //bot.channels.get('578689473567784961').send(`${user.pedName()}: Попытка бана человека. !! ОК ${message.confirmCode}:${code[0]} !!`);
            // global.discord(user._discord, `Ваш аккаунт заблокирован! Обратитесь к Администрации для уточнения причин.`);
        // } else bot.channels.get('578689473567784961').send(`${user.pedName()}: Попытка бана человека. !! Неверный код ${message.confirmCode}:${code[0]} !!`);
        // global.codes[user._id] = null;
    } else if(message.type == "setRealID" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.ped};`, (e,res)=>{
            let data = res[0].Data;
            data.realid = message.value;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.ped};`,(err)=>{
                global.updateDataBase();
            });
            global.updateWanted();
        });
    } else if(message.type == "editWanted" && user.status() == "authed") {
        mysql.query(`select * from wanted where ID = ${message.tID};`, (e,res)=>{
            let data = res[0].Data;

            if(message.tp == "ped") {
                data.rn = message.rn;
                data.name = message.name;
            } else {
                data.vin = message.vin;
                data.model = message.model;
            }
            data.desc = message.desc;
            data.reason = message.reason;
            data.loc = message.loc;
            global.log(`${user.sign()}: edit wanted ${message.tp};`);
            mysql.query(`update wanted set Data = '${JSON.stringify(data)}' where ID = ${message.tID};`,(err)=>{
                global.updateDataBase();
            });
            global.updateWanted();
        });
    } else if(message.type == "changePersonalInfo" && user.status() == "authed") {
        mysql.query(`select * from dbTable where ID = ${message.id};`, (e,res)=>{
            let data = res[0].Data;
            data.personalInfo = message.info;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(err)=>{
                global.updateDataBase();
            });
        });
    } else if(message.type=="changeVehicleColor" && user.status() == "authed") {
        //color
        //id
        mysql.query(`select * from dbTable where ID = ${message.id};`, (e,res)=>{
            let data = res[0].Data;
            data.color = message.color;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(err)=>{
                global.updateDataBase();
            });
        });
    } else if(message.type=="changeVehicleNumber" && user.status() == "authed") {
        //color
        //id
        mysql.query(`select * from dbTable where ID = ${message.id};`, (e,res)=>{
            let data = res[0].Data;
            data.vin = message.vin;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(err)=>{
                global.updateDataBase();
            });
        });
    } else if(message.type=="changePedRN" && user.status() == "authed") {
        //color
        //id
        mysql.query(`select * from dbTable where ID = ${message.id};`, (e,res)=>{
            let data = res[0].Data;
            data.realid = message.realid;
            mysql.query(`update dbTable set Data = '${JSON.stringify(data)}' where ID = ${message.id};`,(err)=>{
                global.updateDataBase();
            });
        });
    } else if(message.type == "restartAlert" && user.status() == "authed" && user.isAdmin()){
        users.forEach((e)=>{
            if(e!=null&&e.isOnline()&&e.status()=="authed"){
                e.send({"type":"restartAlert","msg":message.msg});
            }
        })
    } else if(message.type == "acceptUnit" && user.status() == "authed" && user.isAdmin()) {
        //id
        let id = parseInt(message.id);
        let dept = parseInt(message.dept);
        let gid = parseInt(message.gid||0);
        mysql.query(`select * from accounts where ID = ${id};`, (err, res) => {
            if(res[0]==null) {return user.send({type: "notification", msg: "Ошибка системы: неверный ID.", title: "CAD Error"});}
            else if(res[0]!=null&&res[0].access!="new") {return user.send({type: "notification", msg: "Ошибка скрипта.", title: "CAD Error"});}
            else {
                mysql.query(`select * from accounts where ID=${id};`, (err,res)=>{
                    let sign = "N-"+(res[0].discord.split("#")[1]);
                    mysql.query(`update accounts set access = "unit", department = ${dept}, sign = "${sign}", gameID = "${gid}" where ID = ${id};`)
                });
                global.updateUnits();
            }
        })
    } else if(message.type == "requestCombine" && user.status() == "authed") {
        let u = global.getUserByBadge(message.unit, true);
        if(u.isOnline() == false) return;
        u.combRequst = user;
        u.send({type: "requestCombine", unit: user.sign(), sign: message.sign});
    } else if(message.type == "requestCombineOkay" && user.status() == "authed") {
        global.combinedUnits.push({units: [user.combRequst._badge, user._badge],status:2,sign:message.sign});
        user.combRequst.send({type:"notification",msg:`Офицер ${user.sign()} подтвердил запрос.`,t: 1})
        global.updateUnits();
    } else if(message.type == "requestCombineFailed" && user.status() == "authed") {
        user.combRequst.send({type:"notification",msg:`Офицер ${user.sign()} отказался от запроса.`,t: 1})
    }
    users[id]=user;
    //////////////////////////////////
}

// global.discord = (discord, msg) => {
//     console.log("[DISCORD] "+discord+": "+msg);
//     bot.guilds.forEach((e)=>{
//         if(e.id=="445278871294574592") {
//             e.members.forEach((u)=>{
//                 if((u.user.username+"#"+u.user.discriminator)==discord) {
//                     u.send(msg);
//                 }
//             })
//         }
//     });
// }

global.regex = (_s, _r) => {
    if(_r == "email") _r = /^[a-zA-Z0-9._]{4,64}@[a-zA-Z0-9]{2,32}\.[a-zA-Z0-9]{2,10}$/;
    else if(_r == "password") _r = /^[a-zA-Z0-9\_\-@]{5,32}$/;
    return _s.search(_r) == 0;
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