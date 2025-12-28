import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ArrowTrendingUpIcon, Bars3Icon, ChartBarIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Previsão', href: '/previsao', icon: ArrowTrendingUpIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Equipe', href: '/membros', icon: UserCircleIcon }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation()
  return (
    <Disclosure
      as="nav"
      className="relative bg-[#F5F6FF] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 shadow-md"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botao de menu mobile*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-white/5 hover:text-green-400 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to='/' className="flex shrink-0 items-center">
              <img
                alt="logo"
                src="logo.svg"
                className="h-4 w-auto"
              />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}

                      className={classNames(
                        isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-black/5 ',
                        'rounded-md px-3 py-2 text-base font-medium',
                      )}
                    >
                      <div className='flex gap-2'>
                        <item.icon className="w-4" />
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-white/5 hover:text-blue-400',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                <div className='flex gap-2'>
                  <item.icon className="w-4" />
                  {item.name}
                </div>
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
