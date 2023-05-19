import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout as logoutApi } from 'api/rest.v1';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useUser } from 'hooks/useStore';
import { SocketContext } from 'contexts/socket';
import ProfileImage from 'components/atoms/ProfileImage';
import Logo from 'components/atoms/Logo';
import { classNames } from 'utils';
import ROUTES from 'constants/routes';

const navigation = [
  { name: '게임', href: '/game', current: false },
  { name: '채널', href: '/channel', current: false },
  { name: '팔로잉', href: '/following', current: false },
  { name: '회원 검색', href: '/search', current: false },
  { name: '설정', href: '/setting', current: false },
];

export default function HeaderGnb() {
  const {
    logout,
    setIsOnboarded,
    id: myUserId,
    nickname: MyUserNickname,
  } = useUser((state) => state);
  const socket = useContext(SocketContext);

  const postLogoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      socket.disconnect();
      setIsOnboarded(false);
      logout();
    },
  });

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="header">
            <div className="mx-auto max-w-xl px-2">
              <div className="relative flex h-14 items-center justify-between">
                {/* GNB Left */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Disclosure.Button className="inline-flex vh-center rounded p-2 text-gray hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open global menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* GNB Middle */}
                <div className="vh-center flex-1">
                  <Logo />
                </div>
                {/* GNB Right */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-dark text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray min-w-13 min-h-13">
                        <span className="sr-only">Open user menu</span>
                        {myUserId && (
                          <ProfileImage
                            userId={myUserId}
                            nickname={`${MyUserNickname}`}
                            size={32}
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
                        {myUserId && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`${ROUTES.PROFILE.USER(myUserId)}`}
                                className={classNames(
                                  active ? 'bg-gray-dark' : '',
                                  'block px-4 py-2 text-sm text-text-light'
                                )}
                              >
                                내 프로필
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/setting"
                              className={classNames(
                                active ? 'bg-gray-dark' : '',
                                'block px-4 py-2 text-sm text-text-light'
                              )}
                            >
                              설정
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              role="button"
                              onClick={() => postLogoutMutation.mutate()}
                              className={classNames(
                                active ? 'bg-gray-dark' : '',
                                'block px-4 py-2 text-sm text-text-light cursor-pointer'
                              )}
                            >
                              로그아웃
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
          </div>
          {/* backdrop */}
          {open && (
            <Disclosure.Button className="header-backdrop"></Disclosure.Button>
          )}
        </>
      )}
    </Disclosure>
  );
}
