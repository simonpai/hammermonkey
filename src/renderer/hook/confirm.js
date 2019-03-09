import { useContext } from 'react';
import { Context } from '../semantic/ConfirmProvider';

export default function useConfirm() {
  return useContext(Context);
}
