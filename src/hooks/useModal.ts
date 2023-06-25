import { AppContext } from '@/context/app.context';

import { useContext } from 'react';

export default function useModal() {
  const { openModal, closeModal } = useContext(AppContext);

  return {
    openModal,
    closeModal,
  } as const;
}
