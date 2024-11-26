import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar } from './catalyst/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from './catalyst/dropdown';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from './catalyst/sidebar';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
} from '@heroicons/react/16/solid';
import {
  HomeIcon,
} from '@heroicons/react/20/solid';
import profile from "../assets/profile.png";
import { selectCurrentUser } from '../features/user/userSlice';
import useAuth from '../hooks/useAuth';
import { RootState } from '../store/store';

function TodoSidebar() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Sidebar className="bg-gray-100 h-screen">
      <SidebarHeader>
        <h1 className="text-xl font-bold p-4">{t('app')}</h1>
        <SidebarSection>
          <SidebarItem onClick={() => handleNavigation('/dashboard')}>
            <HomeIcon />
            <SidebarLabel>{t('dashboard')}</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        
      </SidebarBody>
      <SidebarFooter>
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-3">
              <Avatar 
                src={profile} 
                className="size-10" 
                square 
              />
              <span className="min-w-0">
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-800">
                  {currentUser?.email || 'Not logged in'}
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="top start">
            <DropdownItem onClick={handleLogout}>
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>{t('signOut')}</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarFooter>
    </Sidebar>
  );
}

export default TodoSidebar;

