import Discord from 'discord.js';
import fs from 'fs';

import config from './config.js';

const client = new Discord.Client({
	intents: Object.values(Discord.GatewayIntentBits).filter(a => isNaN(a)).map(a => Discord.GatewayIntentBits[a])
});

client.commands = new Discord.Collection();

for (const file of fs.readdirSync('./commands')) {
	const command = (await import(`./commands/${file}`)).default;
	client.commands.set(command.deploy.name, command);
};

for (const file of fs.readdirSync('./events').filter(file => file.endsWith('.js'))) {
	const event = (await import(`./events/${file}`)).default;
    client.on(file.split('.')[0], (t, u) => event(client, t, u || null));
};

client.login(config.token);