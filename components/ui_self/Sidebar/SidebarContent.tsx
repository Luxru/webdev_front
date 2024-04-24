import Link from 'next/link'
import routes, { checkActive } from 'routes/sidebar'
import { IRoute, Role } from 'utils/types'
import * as Icons from 'icons'
import { IIcon } from 'icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon]
  return <Icon {...props} />
}

interface ISidebarContent {
  linkClicked: () => void
}

export function isSidebarItemActivate(route: IRoute, pathname: string) {
  return route.default
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

function SidebarContent({ linkClicked }: ISidebarContent) {
  const { pathname } = useRouter();
  const appName = process.env.NEXT_PUBLIC_APP_NAME
  const [role, setRole] = useState(Role.SalesRepresentative)

  useEffect(() => {
    getSession().then((session) => {
      console.log(session)
      setRole((session?.user.role) ?? Role.SalesRepresentative)
    })
  }, [])

  return (
    <div className="text-gray-500 dark:text-gray-400">
      <div className='ml-6 py-6'>
        <Link href="/#" passHref
          className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {appName}
        </Link>
      </div>
      <ul>
        {routes.map((route) => {
          if (route.routes != undefined) {
            // 拥有子菜单
            return <SidebarSubmenu route={route} role={role} key={route.name} linkClicked={linkClicked} />
          } else {
            //if not activate return null
            return checkActive(role, route) && <li className='relative px-6 py-3' key={route.name}>
              <Link
                href={route.path || '#'}
                passHref
                scroll={false}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 
                ${isSidebarItemActivate(route, pathname)
                    ? 'dark:text-gray-100 text-gray-800'
                    : ''
                  }`}
                onClick={linkClicked}
              >
                {isSidebarItemActivate(route, pathname) && (
                  <span
                    className='absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg'
                    aria-hidden='true'
                  ></span>
                )}
                <Icon
                  className='w-5 h-5'
                  aria-hidden='true'
                  icon={route.icon || ''}
                />
                <span className='ml-4'>{route.name}</span>
              </Link>
            </li>
          }
        }

        )}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SidebarContent