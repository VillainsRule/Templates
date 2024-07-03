import Discord from 'discord.js';

export default {
    data: new Discord.ContextMenuCommandBuilder()
        .setName(`Example Menu`)
        .setType(Discord.ApplicationCommandType.Message),

    execute: async ({ interaction }) => {
        interaction.reply({ content: 'Example context menu command!' });
    }
}