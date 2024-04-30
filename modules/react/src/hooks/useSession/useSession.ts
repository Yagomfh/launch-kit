import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../../contexts';

function useSession<T>() {
  return useContext(AuthContext) as unknown as AuthContextData<T>;
}

export default useSession;
