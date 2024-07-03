import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example command.'),

    flags: [],

    execute: async ({ interaction }) => {
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
    }
};