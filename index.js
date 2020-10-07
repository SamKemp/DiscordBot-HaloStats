require("dotenv").config()

const request = require('request');

const Discord = require("discord.js")
const client = new Discord.Client()

var prefix = "!";

// Wait for the bot to be logged in before we do anything
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'Halo Reach' }, status: 'online' });
});

// When message is sent
client.on("message", msg => {
  // Ignore DM's
  if(!msg.guild){return;}
  // Ignore self
  if(msg.author.id == client.user.id) return;

  // If message is !stats
  if (msg.content === prefix + "stats")
  {
    console.log("Received stats request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = 'https://halo.samkemp.me/api/StatsFromDiscord.php?ID=' + msg.author.id;

    StatRequest(msg, requestURL, msg.author);
  }
  else if (msg.content === prefix + "fiesta")
  {
    console.log("Received fiesta request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = 'https://halo.samkemp.me/api/FiestaFromDiscord.php?ID=' + msg.author.id;

    GamemodeRequest(msg, requestURL, msg.author, "SUPER SLAYER FIESTA");
  }
  else if (msg.content === prefix + "infection")
  {
    console.log("Received infection request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = 'https://halo.samkemp.me/api/InfectionFromDiscord.php?ID=' + msg.author.id;

    GamemodeRequest(msg, requestURL, msg.author, "INFECTION");
  }
  else if (msg.content === prefix + "makemystatslookgood")
  {
    console.log("Received fake request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = 'https://halo.samkemp.me/api/FakeFromDiscord.php?ID=' + msg.author.id;

    GamemodeRequest(msg, requestURL, msg.author, "SUPER SLAYER FAKER");
  }
  else if (msg.content === prefix + "ImperialBen")
  {
    console.log("Received Imperial Ben request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = 'https://halo.samkemp.me/api/ImperialBen.php';

    ImperialBen(msg, requestURL, msg.author);
  }
  // else if (msg.content.startsWith(prefix + "stats"))
  // {

  //   console.log("Received stats request from " + msg.author.username);

  //   user = msg.mentions.users.first();

  //   if(!user)
  //   {
  //     msg.reply("You didn't mention a valid user");
  //     return;
  //   }

  //   msg.delete().catch(console.error);

  //   requestURL = 'https://halo.samkemp.me/api/StatsFromDiscord.php?ID=' + msg.guild.member(user).id;

  //   StatRequest(msg, requestURL, msg.guild.member(user));

  // }
  else if (msg.content === prefix + "meme")
  {
    console.log("Received meme request from " + msg.author.username);

    msg.delete().catch(console.error);

    requestURL = "https://halo.samkemp.me/api/meme.php";

    MemeRequest(msg, requestURL);
  }
  else if (msg.content === prefix + "help")
  {
    console.log("Received help request from " + msg.author.username);

    msg.delete().catch(console.error);

    HelpCommand(msg);
  }
});

// Log our bot in
client.login(process.env.BOT_TOKEN)

function MemeRequest(msg, url)
{
  // Make request to the API
  request(url, { json: true }, (err, res, body) => {

    if (err)
    {
      // API error handling
      msg.reply("Something went wrong finding a meme ¯\_(ツ)_/¯");
      return console.log(err);
    }

    if (body == null || body == "")
    {
      // API error handling
      msg.reply("Something went wrong finding a meme ¯\_(ツ)_/¯");
      return console.log(err);
    }

    const embed = new Discord.MessageEmbed()
    .setTitle("Halo Meme")
    .setURL('https://halo.samkemp.me/')
    .setAuthor('Halo Stats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png', 'https://halo.samkemp.me')
    //.setThumbnail('https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png')
    .setImage(body.ImageURL)
    .setTimestamp()
    .setFooter('Pulled from HaloStats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png');

    msg.channel.send(embed).catch(console.error);

  });
}

function StatRequest(msg, url, member)
{
  // Make request to the API
  request(url, { json: true }, (err, res, body) => {

    if (err)
    {
      // API error handling
      msg.reply("I'm having trouble finding stats for " + member.username);
      return console.log(err);
    }

    if (body == null || body == "")
    {
      // API error handling
      msg.reply("I'm having trouble finding stats for " + member.username);
      return console.log('No stats found for ' + member.username);
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(body.PlayerName)
    .setURL('https://halo.samkemp.me/Player/' + body.PlayerID + '/')
    .setAuthor('Halo Stats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png', 'https://halo.samkemp.me')
    .setThumbnail('https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png')
    .addField('Average Score*', body.Average, true)
    .addField('Game Count', body.GameCount, true)
    .addField('\u200B', '\u200B', true)
    .addField('Total Kills', body.Kills, true)
    .addField('Total Deaths', body.Deaths, true)
    .addField('K:D', body.KD, true)
    .setTimestamp()
    .setFooter('Generated by HaloStats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png');

    msg.channel.send(embed).catch(console.error);
  });
}

function GamemodeRequest(msg, url, member, title)
{
  // Make request to the API
  request(url, { json: true }, (err, res, body) => {

    if (err)
    {
      // API error handling
      msg.reply("I'm having trouble finding stats for " + member.username);
      return console.log(err);
    }

    if (body == null || body == "")
    {
      // API error handling
      msg.reply("I'm having trouble finding stats for " + member.username);
      return console.log('No stats found for ' + member.username);
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(body.PlayerName)
    .setURL('https://halo.samkemp.me/Player/' + body.PlayerID + '/')
    .setAuthor(title, 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png', 'https://halo.samkemp.me')
    .setThumbnail('https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png')
    .addField('Average Score', body.Average, true)
    .addField('Game Count', body.GameCount, true)
    .addField('K:D', body.KD, true)
    //.addField('\u200B', '\u200B', true)
    // New Line
    .addField('Kills', body.Kills, true)
    .addField('Deaths', body.Deaths, true)
    .addField('Suicides', body.Suicides, true)
    // New Line
    .addField('Weapon Kills', body.WKills, true)
    .addField('Grenade Kills', body.GKills, true)
    .addField('Melee Kills', body.MKills, true)
    // New Line
    .addField('Average Kills', body.KillsPerGame, true)
    .addField('Average Deaths', body.DeathsPerGame, true)
    .addField('\u200B', '\u200B', true)
    .setTimestamp()
    .setFooter('Generated by HaloStats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png');

    msg.channel.send(embed).catch(console.error);
  });
}

function ImperialBen(msg, url, member)
{
  // Make request to the API
  request(url, { json: true }, (err, res, body) => {

    if (err)
    {
      // API error handling
      msg.reply("I'm having trouble finding the imperial Ben - " + member.username);
      return console.log(err);
    }

    if (body == null || body == "")
    {
      // API error handling
      msg.reply("I'm having trouble finding the imperial Ben - " + member.username);
      return console.log('No imperial Ben found - ' + member.username);
    }

    const embed = new Discord.MessageEmbed()
    .setTitle(body.PlayerName)
    .setURL('https://halo.samkemp.me/Player/' + body.PlayerID + '/')
    .setAuthor('The Imperial Ben', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png', 'https://halo.samkemp.me')
    .setThumbnail('https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png')
    .addField('The Imperial Ben', body.Average, false)
    .addField('Total Score', body.Score, true)
    .addField('Game Count', body.GameCount, true)
    .setTimestamp()
    .setFooter('Generated by HaloStats', 'https://cdn.samkemp.me/Halo/HaloMCCIcon-noBG.png');

    msg.channel.send(embed).catch(console.error);

    var Ben = msg.guild.members.cache.get('410901385920512000');

    // if(Ben != "" && Ben != null && Ben != undefined) Ben.setNickname(body.Average + " Exactly One Imperial Ben");
    
    // msg.guild.members.cache.get(client.user.id).setNickname(body.Average + " Exactly One Imperial Ben");
  });
}

function HelpCommand(msg)
{
  var Output = "";

  Output = "**__Available commands__**\n";
  Output += prefix + "help - Displays this help message\n";
  Output += prefix + "meme - Gets a random meme from the Halo Stats system\n";
  Output += prefix + "stats - Get your own overall stats\n";
  Output += prefix + "fiesta - Get your fiesta stats\n";
  Output += prefix + "infection - Get your infection stats\n";
  Output += prefix + "makemystatslookgood - Fake your fiesta stats\n";
  Output += prefix + "ImperialBen - Interested to find the Imperial Ben?";

  msg.reply(Output);
}