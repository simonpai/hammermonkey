import { useContext } from 'react';
import { Context } from '../component/common/ApiProvider';

export default function useConfirm() {
  return useContext(Context);
}
