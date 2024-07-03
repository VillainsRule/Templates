export default {
    customID: 'my-interaction',

    execute: async ({ interaction }) => {
        interaction.reply({ content: 'You pressed a button!' });
    }
}