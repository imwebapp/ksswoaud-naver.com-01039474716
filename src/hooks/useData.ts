import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { UserI } from '../stores/auth/type';

const useData = () => {
  const profile: UserI | undefined = useSelector((state: RootState) => state.user.profile);
  return { userData: profile };
};

export default useData;
