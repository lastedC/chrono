const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const clientId = process.env.CLIENTID
const guildId = process.env.GUILDID


const commands = [];
const globalCommands = []
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./test').filter(file => file.endsWith('.js'));
const globalFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./test/${file}`);
	commands.push(command.data.toJSON());
};

for (const file of globalFiles) {
	const globalCommand = require(`./commands/${file}`);
	globalCommands.push(globalCommand.data.toJSON());
};

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}

	try {
		console.log(`Started refreshing ${globalCommands.length} global (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: globalCommands },
		);

		console.log(`Successfully reloaded ${data.length} global (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();