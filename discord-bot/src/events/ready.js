import Discord from 'discord.js';
import config from '../../config.js';

export default async (client) => {
    client.user.setPresence({
        activities: config.activities,
        status: config.status
    });

    console.log(`Connected to ${client.user.tag}!`);

    const rest = new Discord.REST({ version: '10' }).setToken(config.token);

    const globalUpload = await rest.put(Discord.Routes.applicationCommands(config.client), {
        body: [
            ...client.commands.filter(cmd => !cmd.flags?.includes('ADMIN_GUILD')).map(cmd => cmd.data.toJSON()),
            ...client.contexts.map(ctx => ctx.data.toJSON())
        ]
    });

    console.log(`Global commands deployed! (${globalUpload.length})`);

    const adminUpload = await rest.put(Discord.Routes.applicationGuildCommands(config.client, config.adminServer), {
        body: client.commands.filter(cmd => cmd.flags?.includes('ADMIN_GUILD')).map(cmd => cmd.data.toJSON())
    });

    console.log(`Admin commands deployed to server! (${adminUpload.length})`);
};