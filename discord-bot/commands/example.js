import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';

export default {
    deploy: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example command.'),

    async run(interaction, client) {
        interaction.reply({
            content: 'hi there :P',
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('my_interaction')
                        .setLabel('My Interaction')
                        .setStyle(ButtonStyle.Primary)
                )
            ]
        });
    },

    interactions: {
        'my_interaction': async (client, interaction) => {
            interaction.reply({
                content: 'whoa, you clicked a button :0'
            });
        }
    }
};