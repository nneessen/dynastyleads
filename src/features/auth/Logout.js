import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

export default function Logout() {
  // isLoading is undefined here, so define a loading state
  // or assume it's always false for now
  const isLoading = false;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    // Then redirect to homepage or login:
    window.location.href = '/';
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
