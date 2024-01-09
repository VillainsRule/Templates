import Discord from 'discord.js';
import config from '../../config.js';

export default async function (client) {
    client.user.setActivity(config.rpc.text, {
        type: config.rpc.type
    });

    client.user.setStatus(config.rpc.status);

    console.log(`Connected to ${client.user.tag}!\n    Guild Count: ${client.guilds.cache.map(guild => guild.id).length}`);

    const rest = new Discord.REST({
        version: '10'
    }).setToken(config.token);

    rest.put(Discord.Routes.applicationCommands(config.clientId), {
        body: client.commands.map(cmd => cmd.deploy.toJSON())
    }).then((data) => console.log(`    Commands: ${data.length}`)).catch(console.error);
};