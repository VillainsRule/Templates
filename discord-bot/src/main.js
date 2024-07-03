import Discord from 'discord.js';
import fs from 'fs';

import config from '../config.js';

const client = new Discord.Client({ intents: Object.values(Discord.GatewayIntentBits).map((v) => Discord.IntentsBitField.resolve(v)) });

client.commands = new Discord.Collection();
client.contexts = new Discord.Collection();
client.interactions = new Discord.Collection();

for (const file of fs.readdirSync(import.meta.dirname + '/commands')) {
	const command = (await import(`./commands/${file}`)).default;
	client.commands.set(command.data.name, command);
};

for (const file of fs.readdirSync(import.meta.dirname + '/contexts')) {
    const context = await import(`./contexts/${file}`);
    client.contexts.set(context.default.data.name, context.default);
};

for (const file of fs.readdirSync(import.meta.dirname + '/events').filter(file => file.endsWith('.js'))) {
	const event = (await import(`./events/${file}`)).default;
    client.on(file.split('.')[0], (t, u) => event(client, t, u || null));
};

for (const file of fs.readdirSync(import.meta.dirname + '/interactions')) {
    const interaction = (await import(`./interactions/${file}`)).default;
    client.interactions.set(interaction.customID, interaction);
};

client.login(config.token);