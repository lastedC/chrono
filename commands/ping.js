const { SlashCommandBuilder, Discord } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		try {
			const mesg = await interaction.reply({ content: "Pong!", fetchReply: true });
	  
			await interaction.editReply({ content: `Pong!\nBot Latency: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`` });
		  } catch (err) {
			console.log("Something Went Wrong => ", err);
		  }
	},
};