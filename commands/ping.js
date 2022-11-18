const Discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bots ping!'),
	async execute(interaction, client) {
		try {
			const mesg = await interaction.reply({ content: "Pong!", fetchReply: true });

			await interaction.editReply({ content: `⌛ Getting ping...` });
			await interaction.editReply({ content: `<:ping:1043048170407604254> Pong! Bot Latency: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`` });
		} catch (err) {
			console.log("Something Went Wrong => ", err);
		}
	},
};