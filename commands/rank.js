const { SlashCommandBuilder } = require('discord.js');
const { Levels } = require('discord-xp');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Displays the level of a selected member.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target member.')),

	async execute(interaction) {
		const targetMember = interaction.options.getUser('user');
        if (!targetMember) member = interaction.user;
        console.log(targetMember)

        const target = await Levels.fetch(targetMember.user.id, interaction.guild.id);
        if (!target) return interaction.reply('The member specified does not have a level yet.');
        console.log(target)

        try {
            interaction.reply(`${targetMember.user.tag} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level + 1)}`)
        } catch (err) {
            console.log(err)
        }
	},
};