import {Viewport} from 'pixi-viewport';
import {PixiReactElementProps} from '@pixi/react';

declare module '@pixi/react' {
    interface PixiElements {
        pixiViewport: PixiReactElementProps<typeof Viewport>;
    }
}