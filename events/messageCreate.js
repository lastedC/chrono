const { Events } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
	name: Events.MessageCreate,
	async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        // Random Xp between 1 and 30
        const randomXP = Math.floor(Math.random() * 29) + 1
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.member} has reached level ${user.level}!`)
        }

	},
};