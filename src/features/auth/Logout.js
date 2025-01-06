import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  return (
    <ButtonIcon disabled={isLoading} onClick={() => 'Log out todo'}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
