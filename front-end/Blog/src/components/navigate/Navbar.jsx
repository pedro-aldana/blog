import { connect } from "react-redux";
import {useState,CSSProperties,Fragment, useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../../assets/img/vk.png'
import DotLoader from "react-spinners/ClipLoader";
import { Popover, Transition } from '@headlessui/react'

const solutions = [
  {
    name: 'Registrarse',
    description: 'Registrate en este nuestra web',
    href: '/casos',
    icon: IconOne,
  },
  {
    name: 'Dashboard',
    description: 'Inicia Sesion y publica un post',
    href: `${process.env.REACT_APP_URL}`,
    icon: IconTwo,
  },
  {
    name: 'Blog',
    description: 'Ve los Posts de nuestro blog',
    href: '/blog',
    icon: IconThree,
  },
  
]

function Navbar(){

  const [loading,setLoading]=useState(true)

  window.onscroll = function() {scrollFunction()}

  function scrollFunction() {
      if(document.getElementById('navbar')){
          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
              document.getElementById('navbar').classList.add('shadow-navbar');
              document.getElementById('navbar').classList.add('bg-white');
          }else{
              document.getElementById('navbar').classList.remove('shadow-navbar');
              document.getElementById('navbar').classList.remove('bg-white');
          }
      }
  }

  const [open, setOpen] = useState(false)

  return(
      <nav data-scroll data-scroll-id="hey" id='navbar' className='w-full py-6 top-0 transition duration-300 ease-in-out z-40 fixed'>
          <div className="px-4 sm:px-6">
              <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
                  <Link to='/' className="ml-4 mt-2">
                    <img  src={logo}
                      width={100}
                      height={190}
                      className="" /> Inicio
                  </Link>
                  <div className="ml-4 mt-2 flex-shrink-0">
                  <NavLink to='/blog' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-96">Blog</NavLink>
                  
                  <NavLink to='/registro' className="inline-flex ml-12 items-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Registrarse</NavLink>
                  
                  
                  <Link
                      to={`${process.env.REACT_APP_URL}`}
                      className="inline-flex ml-12 items-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                      Dashboard
                      <DotLoader className="ml-3 -mr-1 h-5 w-5" loading={loading} size={20} color="#f2f2f2" />
                  </Link>
                  </div>
              </div>
              <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
                  <Link to='/' className="ml-4 mt-2">
                  <img
                      src={logo}
                      width={60}
                      height={160}
                      className=""
                  />
                  </Link>
                  <div className="ml-4 mt-2 flex-shrink-0">

                  
                  <Popover className="relative">
                      {({ open }) => (
                      <>
                          <Popover.Button
                          className={`
                              ${open ? '' : 'text-opacity-90'}
                              focus:ring-none focus:outline-none`}
                          >
                          {
                              open ?
                              <i  className='bx bx-x text-4xl'></i>
                              :
                              <i  className='bx bx-menu text-4xl'></i>
                          }
                          </Popover.Button>

                          <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                          >
                          <Popover.Panel className="absolute -left-32 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                  {solutions.map((item) => (
                                  <Link
                                      key={item.name}
                                      to={item.href}
                                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                      <item.icon aria-hidden="true" />
                                      </div>
                                      <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">
                                          {item.name}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                          {item.description}
                                      </p>
                                      </div>
                                  </Link>
                                  ))}
                              </div>
                              <div className="bg-gray-50 p-4">
                                  <a
                                  href="##"
                                  className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                  <span className="flex items-center">
                                      <span className="text-sm font-medium text-gray-900">
                                      Documentacion
                                      </span>
                                  </span>
                                  <span className="block text-sm text-gray-500">
                                    Codigo Publico de la Pagina
                                  </span>
                                  </a>
                              </div>
                              </div>
                          </Popover.Panel>
                          </Transition>
                      </>
                      )}
                  </Popover>
                  </div>
              </div>
          </div>
      </nav>
  )
}

// para exportar las variables de estado con redux
const mapStateToProp = (state) => ({});

export default connect(mapStateToProp, {})(Navbar);

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}