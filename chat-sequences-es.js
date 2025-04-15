const chatSequences = {
    groceryList: [
        {
            type: 'message',
            class: 'user-message',
            content: '¿Podrías ayudarme a encontrar cosas para el desayuno? 📝',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¡Por supuesto! Aquí tienes algunos elementos esenciales:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🥖',
                name: 'Pan Fresco',
                price: '$3.99',
                location: 'Pasillo 2B'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🥛',
                name: 'Leche Orgánica',
                price: '$4.99',
                location: 'Pasillo 4B'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¿Te gustaría también algunas frutas frescas? 🍎',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: 'Sí, ¿qué frutas están frescas esta semana?',
            delay: 1500
        },
        {
            type: 'product',
            content: {
                icon: '🍎',
                name: 'Manzanas Frescas',
                price: '$0.99/lb',
                location: 'Pasillo 3D'
            },
            delay: 1000
        },
       
    ],
    
    spaghetti: [
        {
            type: 'message',
            class: 'user-message',
            content: 'Quiero hacer espaguetis 🍝',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¡Te ayudaré a hacer unos deliciosos espaguetis! Esto es lo que necesitarás:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🍝',
                name: 'Espaguetis Premium',
                price: '$2.99',
                location: 'Pasillo 3'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🍅',
                name: 'Salsa de Tomate',
                price: '$3.49',
                location: 'Pasillo 5'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¿Te gustaría carne molida para la salsa? 🥩',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: '¡Sí, por favor!',
            delay: 1500
        },
        {
            type: 'product',
            content: {
                icon: '🥩',
                name: 'Carne Molida',
                price: '$6.99/lb',
                location: 'Pasillo 6B'
            },
            delay: 1000
        }
    ],
    
    gardening: [
        {
            type: 'message',
            class: 'user-message',
            content: 'Quiero empezar un huerto de verduras 🌱',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¡Excelente elección! Vamos a ayudarte a comenzar con tu huerto de verduras. Aquí tienes algunos elementos esenciales:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🌱',
                name: 'Kit de Inicio para Semillas de Verduras',
                price: '$24.99',
                location: 'Pasillo 3-C'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🪴',
                name: 'Mezcla para Macetas',
                price: '$12.99',
                location: 'Pasillo 3-D'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: '¿Te gustaría algunas herramientas básicas de jardinería para comenzar? 🛠️',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: '¡Sí, por favor!',
            delay: 1500
        },
        
    ]
};

// Export the sequences
export default chatSequences; 