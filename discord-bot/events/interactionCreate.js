export default async function (client, interaction) {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) return await command.run(interaction, client);
    } else if (interaction.isButton() || interaction.isModalSubmit()) {
        client.commands.map(cmd => cmd.interactions)
            .filter(i => i)
            .map(i => Object.entries(i))
            .flat(1)
            .forEach(i => i[0] === interaction.customId.split('-')[0] ? i[1](client, interaction) : null);
    };
};