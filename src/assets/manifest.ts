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
            name: 'player',
            assets: [
                {alias: 'player', src: 'src/assets/player/player_1.png'},
            ],
        },
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
        }
    ]
};
