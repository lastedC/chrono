const { REST, Routes } = require('discord.js');
require('dotenv').config();
const clientId = process.env.CLIENTID
const guildId = process.env.GUILDID

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);