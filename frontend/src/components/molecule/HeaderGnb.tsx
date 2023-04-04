import { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getWhoami, postLogout } from 'api/api.v1';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLogin, useUser } from 'hooks/useStore';
import SearchBar from 'components/molecule/SearchBar';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';

const navigation = [
  { name: 'Game', href: '/game', current: false },
  { name: 'Channel', href: '/channel', current: false },
  { name: 'Following', href: '/following', current: false },
  { name: 'Setting', href: '/setting', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center text-lg font-medium text-white">
      <Link to="/">
        <div className="block h-8 w-auto lg:hidden">The Pong</div>
      </Link>
      <Link to="/">
        <div className="hidden h-8 w-auto lg:block">The Pong</div>
      </Link>
    </div>
  );
}

export default function HeaderGnb() {
  const logout = useLogin((state) => state.logout);
  const setIsOnboarded = useUser((state) => state.setIsOnboarded);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const postLogoutMutation = useMutation(postLogout);

  useEffect(() => {
    if (postLogoutMutation.isSuccess) {
      setIsOnboarded(false);
      logout();
    }
  }, [postLogoutMutation.isSuccess]);

  const handleLogout = () => {
    postLogoutMutation.mutate();
  };

  return (
    <Disclosure
      as="nav"
      className="container mx-auto max-w-xl fixed top-0 left-0 right-0 backdrop-blur-md"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-xl px-2">
            <div className="relative flex h-14 items-center justify-between">
              {/* GNB Left */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center rounded p-2 text-gray hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open global menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* GNB Middle */}
              <div className="flex flex-1 items-center justify-center">
                <Logo />
              </div>
              {/* GNB Right */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded bg-gray-dark text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray min-w-13 min-h-13">
                      <span className="sr-only">Open user menu</span>
                      {whoamiQuery.isSuccess && (
                        <ProfileImage
                          userId={whoamiQuery.data.id}
                          alt="My profile image"
                          size={52}
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-gray-darker py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/profile/${whoamiQuery.data?.id}`}
                            className={classNames(
                              active ? 'bg-gray-dark' : '',
                              'block px-4 py-2 text-sm text-text-light'
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/setting"
                            className={classNames(
                              active ? 'bg-gray-dark' : '',
                              'block px-4 py-2 text-sm text-text-light'
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            role="button"
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-dark' : '',
                              'block px-4 py-2 text-sm text-text-light cursor-pointer'
                            )}
                          >
                            Logout
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="container max-w-xl space-y-1 px-2 pt-2 pb-3">
              <SearchBar />
              <hr className="my-6 border-gray-light dark:border-gray" />
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-lighter text-white'
                      : 'text-gray transition hover:scale-101 hover:skew-y-2 hover:translate-y-1 hover:text-white hover:drop-shadow-md',
                    'block px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
