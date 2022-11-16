const Discord = require('discord.js')
const { Client, Events } = require('discord.js');
const Levels = require('discord-xp');

const client = new Client({ intents: 3276799 });

const mongoose = require('./database/mongoose');
require('dotenv').config();

const fs = require('fs');
const path = require('node:path');

Levels.setURL(`mongodb+srv://chrono:${process.env.PASS}@cluster0.alikqpp.mongodb.net/?retryWrites=true&w=majority`);
client.commands = new Discord.Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandsPath = path.join(__dirname, 'commands');
const testPath = path.join(__dirname, 'test');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const testFiles = fs.readdirSync(testPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

for (const file of testFiles) {
	const testFilePath = path.join(testPath, file);
	const command = require(testFilePath);
	client.commands.set(command.data.name, command);
}

mongoose.init();
client.login(process.env.TOKEN);