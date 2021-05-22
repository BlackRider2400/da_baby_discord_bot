const Discord = require('discord.js');
const client = new Discord.Client();
var timer;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //Math.floor(Math.random() * 1800 + 1800) * 1000
  timer = setInterval(start, Math.floor(Math.random() * 1800 + 1800) * 1000);
  start();
});


client.login("TOKEN");

async function start(){
  clearInterval(timer);
  var guildList = Array.from(client.guilds.cache);
  var i = 0;
  guildList.forEach(guild => {
    try{
      setTimeout(function(){
        connect(client.guilds.cache.get(getId(guild)));
      }, i * 1000);
      i+= 5;
    }catch(err){
      console.log(err);
    }
  });
  timer = setInterval(start, Math.floor(Math.random() * 1800 + 1800) * 1000);
}

async function connect(server){
  var maxVc = server.channels.cache.filter(ch => ch.type == "voice").random();
  server.channels.cache.filter(ch => ch.type == "voice").forEach(vc =>{
      if(maxVc.members.size < vc.members.size && vc.members.size > 0){
        maxVc = vc;
      }
  });
  if(maxVc.members.size <= 0){

  }else{
    play(maxVc);
  }
}

async function play(vc){
  console.log("connecting to: " + vc.name);
  const connection = await vc.join();
  console.log("connected to: " + vc.name);
  const dispatcher = connection.play('sound_effect.mp3');
  dispatcher.setVolume(1);
  dispatcher.on('finish', () => {
    vc.leave();
  });
}

function getId(name){
  var id = "";
  var ok = true;
  name = name.toString();
  for(var k = 0; k < name.length;k++){
    if(name.charAt(k) != "," && ok == true){
      id += name.charAt(k);
    }
    else{
      ok = false;
    }
  }
  return id;
}
