requirejs.config({
    baseUrl: '/',
    paths: {
        'lodash': 'node_modules/lodash/lodash',
        'phaser': 'node_modules/phaser-ce/build/phaser',
        'recurrent': 'lib/recurrent',
        'reinforce': 'lib/reinforce',
    },
    shim: {
        'phaser': {exports: 'Phaser'},
        'recurrent': {exports: 'R'},
        'reinforce': {exports: 'RL', deps: ['recurrent']},
    },
});

requirejs(['src/main']);