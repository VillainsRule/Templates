import Discord from 'discord.js';

export default async (client, interaction) => {
    if (interaction.guild) {
        let getPermission = (p) => interaction.guild.members.cache.find(m => m.id === client.user.id).permissions.has(p);
        let errorPermission = () => interaction.reply({
            ephemeral: true,
            content: 'In this guild, I need base permissions to:\n\n- Send Messages (+ in threads)\n- Read Messages\n- Read Message History\n- Use External Emojis\n- Embed Links\n- Attach Files\n\nI am missing at least one of these permissions, and cannot operate properly.\nPlease make sure the channel you are running this in also has these permissions.'
        });

        if ([
            getPermission('SendMessages'),
            getPermission('ViewChannel'),
            getPermission('SendMessagesInThreads'),
            getPermission('ReadMessageHistory'),
            getPermission('UseExternalEmojis'),
            getPermission('EmbedLinks'),
            getPermission('AttachFiles')
        ].some(perm => perm === false)) return errorPermission();
    };

    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (command) {
            console.log(`@${interaction.user.username} used ${interaction.commandName}.`);

            let reply;
            try {
                reply = await interaction.deferReply({
                    fetchReply: command.fetchReply || false,
                    ephemeral: command.ephemeral || false
                });
            } catch (e) {
                if (interaction.guild) errorPermission();
            };

            if (reply) await command.execute({ client, interaction, reply });
        };
    };

    if (interaction.isContextMenuCommand()) {
        const context = client.contexts.get(interaction.commandName);

        if (context) {
            console.log(`@${interaction.user.username} used context ${interaction.commandName}.`);

            let reply;
            try {
                reply = await interaction.deferReply({ ephemeral: true });
            } catch (e) {
                errorPermission();
            };

            if (reply) await context.execute({ client, interaction });
        };
    };

    if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);

        if (command) {
            console.log(`@${interaction.user.username} is autocompleting ${interaction.commandName}.`);
            await command.autocomplete({ client, interaction });
        };
    };

    if (interaction.isButton() || interaction.isModalSubmit() || interaction.isStringSelectMenu()) {
        if (interaction.message.interaction && interaction.message.interaction?.user.id !== interaction.user.id) return interaction.reply({
            embeds: [new Discord.EmbedBuilder().setDescription(`**You cannot interact with another user's command.**`)],
            ephemeral: true
        });

        let $interaction = client.interactions.find((i) => i.customID === interaction.customId || interaction.customId.startsWith(i.customID + '_'));
        let args = interaction.customId.split('_').slice(1);

        if ($interaction) $interaction.execute({ interaction, client, args, db });
        else console.log(`Interaction ${interaction.customId} not found!`);
    };
};