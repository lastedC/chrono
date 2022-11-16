const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Levels = require('discord-xp');
const Canvacord = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Displays the level of a selected member.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target member.')),

    async execute(interaction) {

        const targetMember = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;

        const target = await Levels.fetch(targetMember.id, interaction.guild.id);
        if (!target) return interaction.reply('The member specified does not have a level yet.');



        // Create rank card
        const rank = new Canvacord.Rank()
            .setUsername(targetMember.username)
            .setDiscriminator(targetMember.discriminator)
            .setProgressBar("#FFFFFF", "COLOR")
            .setAvatar(`https://cdn.discordapp.com/avatars/${targetMember.id}/${targetMember.avatar}.jpeg`)
            .setCurrentXP(target.level || 0)
            .setRequiredXP(Levels.xpFor(target.level + 1))
            .setLevel(target.level)

        rank.build()
            .then(data => {
                //const attachment = new MessageAttachment(data, "RankCard.png");
                interaction.reply({ files: "RankCard.png" });

                // const emb = new EmbedBuilder()
                //     .setImage(rank)
                // interaction.reply(rank);
            })
        }
    };