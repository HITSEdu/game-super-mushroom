import type {ISpirit} from './interfaces.ts';
import {useModalStore} from '../store/ModalStore.ts';
import SpiritModal from '../components/modals/SpiritModal.tsx';

export const spirits: ISpirit[] = [
  {
    id: 1,
    name: 'Onyx',
    action: () => useModalStore.getState().open(<SpiritModal spiritId={1} />),
    season: 'winter'
  },
  {
    id: 2,
    name: 'Swifty',
    action: () => useModalStore.getState().open(<SpiritModal spiritId={2} />),
    season: 'spring'
  },
  {
    id: 3,
    name: 'Mira',
    action: () => useModalStore.getState().open(<SpiritModal spiritId={3} />),
    season: 'summer'
  },
  {
    id: 4,
    name: 'Laurus',
    action: () => useModalStore.getState().open(<SpiritModal spiritId={4} />),
    season: 'autumn'
  },
];
