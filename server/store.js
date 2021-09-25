let messages = [
    // { text: 'Bienvenido', author: 'admin' },
    // { text: 'Holiiii!!!!!!! que tal estás. Me mola mazo el canal. Es super top :). Sigue a tope LUL LUL LUL', author: 'Pepe' }
];

module.exports = {
    addMessage: message => {
        messages.push(message);
    },
    getMessages: () => {
        return messages;
    }
};