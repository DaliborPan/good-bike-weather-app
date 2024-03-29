import { FC, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { createPortal } from 'react-dom'
import { IcoChevronRight } from './icons'
import { signOut, useSession } from 'next-auth/react'

interface IProps {
  className?: string
}

interface NavOpt {
  link: string
  name: string
}

export const AppNavigation: FC<IProps> = ({ className }) => {
  const router = useRouter()

  // TODO: create custom hook, because since we use middleware to handle
  // authentication, at this point we can assume, that `data.user`
  // will always be defined
  const { data } = useSession()

  const navOpts: NavOpt[] = [
    { link: '/auth/home', name: 'Home' },
    { link: '/auth/history', name: 'Overview' },
  ]

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 15],
        },
      },
    ],
  })

  const onSignOut = () => {
    localStorage.removeItem('userPreferences')
    signOut()
  }

  return (
    <div className={`shrink-0 w-full h-16 bg-light-green flex ${className ? className : ''}`}>
      {/* Left side of the header */}
      <div className="grow px-2 flex items-center">
        <div className={'mr-6 h-11 w-64 relative'}>
          <Image src="/images/logo-color-transparent.png" alt="Company logo" layout="fill" objectFit="contain" />
        </div>

        {navOpts.map((navOpt) => (
          <Link key={navOpt.link} href={navOpt.link}>
            <span className={`app-navigation ${router.asPath === navOpt.link ? 'app-navigation--active' : ''}`}>
              {navOpt.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Right side of the header */}
      <div className="self-center pr-6">
        <Menu>
          <Menu.Button className="flex items-center" ref={setReferenceElement}>
            <div className="w-10 h-10 bg-whiskey rounded-full flex justify-center items-center">
              <span className="text-white text-xl">
                {data?.user?.name
                  ?.trim()
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </span>
            </div>
            <div className="text-lg mr-7 ml-3">{data?.user?.name}</div>
            <IcoChevronRight className={`fill-whiskey w-4 rotate-90`} />
          </Menu.Button>

          {typeof window === 'object' &&
            createPortal(
              <Menu.Items
                as="div"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="w-56 bg-whiskey rounded-lg divide-y px-4 py-2 text-white divide-y-white text-lg"
              >
                <Menu.Item as="button" className="block w-full p-2 text-left">
                  <Link href="/auth/profile">
                    <span>Settings</span>
                  </Link>
                </Menu.Item>
                <Menu.Item as="button" className="block w-full p-2 text-left" onClick={onSignOut}>
                  Logout
                </Menu.Item>
              </Menu.Items>,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              document.querySelector('#portal')!
            )}
        </Menu>
      </div>
    </div>
  )
}
