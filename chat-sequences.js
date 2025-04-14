const chatSequences = {
    groceryList: [
        {
            type: 'message',
            class: 'user-message',
            content: 'Could you find me stuff for breakfast? 📝',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'Of course! Here are some essentials:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🥖',
                name: 'Fresh Bread',
                price: '$3.99',
                location: 'Aisle 2B'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🥛',
                name: 'Organic Milk',
                price: '$4.99',
                location: 'Aisle 4B'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'Would you like some fresh fruits as well? 🍎',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: 'Yes, what\'s fresh this week?',
            delay: 1500
        },
        {
            type: 'product',
            content: {
                icon: '🍎',
                name: 'Fresh Apples',
                price: '$0.99/lb',
                location: 'Aisle 3D'
            },
            delay: 1000
        },
       
    ],
    
    spaghetti: [
        {
            type: 'message',
            class: 'user-message',
            content: 'I want to make spaghetti 🍝',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'I\'ll help you make delicious spaghetti! Here\'s what you\'ll need:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🍝',
                name: 'Premium Spaghetti',
                price: '$2.99',
                location: 'Aisle 3'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🍅',
                name: 'Tomato Sauce',
                price: '$3.49',
                location: 'Aisle 5'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'Would you like ground beef for the sauce? 🥩',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: 'Yes, please!',
            delay: 1500
        },
        {
            type: 'product',
            content: {
                icon: '🥩',
                name: 'Ground Beef',
                price: '$6.99/lb',
                location: 'Aisle 6B'
            },
            delay: 1000
        }
    ],
    
    gardening: [
        {
            type: 'message',
            class: 'user-message',
            content: 'I want to start a vegetable garden 🌱',
            delay: 1000
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'Great choice! Let\'s help you get started with your vegetable garden. Here are some essentials:',
            delay: 2000
        },
        {
            type: 'product',
            content: {
                icon: '🌱',
                name: 'Vegetable Seed Starter Kit',
                price: '$24.99',
                location: 'Aisle 3-C'
            },
            delay: 1000
        },
        {
            type: 'product',
            content: {
                icon: '🪴',
                name: 'Potting Soil Mix',
                price: '$12.99',
                location: 'Aisle 3-D'
            },
            delay: 800
        },
        {
            type: 'message',
            class: 'bot-message',
            content: 'Would you like some basic gardening tools to get started? 🛠️',
            delay: 1500
        },
        {
            type: 'message',
            class: 'user-message',
            content: 'Yes, please!',
            delay: 1500
        },
        
    ]
};

// Export the sequences
export default chatSequences; 