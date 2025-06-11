export interface Manifest {
    bundles: {
        name: string;
        assets: {
            alias: string;
            src: string;
        }[];
    }[];
}

export const manifest = {
    bundles: [
        {
            name: 'enemy',
            assets: [
                {alias: 'enemy', src: 'src/assets/enemies/enemy.png'},
            ],
        },
        {
            name: 'star',
            assets: [
                {alias: 'star', src: 'src/assets/obstacles/star.png'},
            ],
        },
        {
            name: 'ground',
            assets: [
                {alias: 'ground', src: 'src/assets/obstacles/ground.jpg'},
            ],
        },
        {
            name: 'platform',
            assets: [
                {alias: 'platform', src: 'src/assets/obstacles/platform.jpg'},
            ],
        },
        {
            name: 'finish',
            assets: [
                {alias: 'finish', src: 'src/assets/obstacles/finish.png'},
            ],
        },

        {
            name: 'player_underworld',
            assets: [
                {alias: 'player_underworld', src: 'src/assets/player/spritesheet/player_underworld.png'},
            ],
        },

        {
            name: 'player_1_winter',
            assets: [
                {alias: 'player_1_winter', src: 'src/assets/player/spritesheet/player_1_winter.png'},
            ],
        },
        {
            name: 'player_1_summer',
            assets: [
                {alias: 'player_1_summer', src: 'src/assets/player/spritesheet/player_1_summer.png'},
            ],
        },
        {
            name: 'player_1_spring',
            assets: [
                {alias: 'player_1_spring', src: 'src/assets/player/spritesheet/player_1_spring.png'},
            ],
        },
        {
            name: 'player_1_autumn',
            assets: [
                {alias: 'player_1_autumn', src: 'src/assets/player/spritesheet/player_1_autumn.png'},
            ],
        },

        {
            name: 'player_2_winter',
            assets: [
                {alias: 'player_2_winter', src: 'src/assets/player/spritesheet/player_2_winter.png'},
            ],
        },
        {
            name: 'player_2_summer',
            assets: [
                {alias: 'player_2_summer', src: 'src/assets/player/spritesheet/player_2_summer.png'},
            ],
        },
        {
            name: 'player_1_spring',
            assets: [
                {alias: 'player_2_spring', src: 'src/assets/player/spritesheet/player_2_spring.png'},
            ],
        },
        {
            name: 'player_2_autumn',
            assets: [
                {alias: 'player_2_autumn', src: 'src/assets/player/spritesheet/player_2_autumn.png'},
            ],
        },

        {
            name: 'player_3_winter',
            assets: [
                {alias: 'player_3_winter', src: 'src/assets/player/spritesheet/player_3_winter.png'},
            ],
        },
        {
            name: 'player_3_summer',
            assets: [
                {alias: 'player_3_summer', src: 'src/assets/player/spritesheet/player_3_summer.png'},
            ],
        },
        {
            name: 'player_3_spring',
            assets: [
                {alias: 'player_3_spring', src: 'src/assets/player/spritesheet/player_3_spring.png'},
            ],
        },
        {
            name: 'player_3_autumn',
            assets: [
                {alias: 'player_3_autumn', src: 'src/assets/player/spritesheet/player_3_autumn.png'},
            ],
        },
    ]
};
