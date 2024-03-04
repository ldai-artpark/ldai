import Link from 'next/link'
import { MailIcon, BuildingOffice2Icon } from '@heroicons/react/outline';
import Container from './Container'
import setup from "../../setup";


function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}


const Building = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div>
              <h2 className='text-zinc-800 font-medium'>Contact Us</h2>
              <p className='mt-2'>The Project Vaani team</p>
              <div className='gap-4 flex mt-1'><MailIcon className='h-5 w-5 text-zinc-600 mt-1' /><span className='ml-1'> vaanicontact@gmail.com </span></div>
              <div className='gap-4 flex mt-1'>
                <Building className='h-5 w-5 text-zinc-600 mt-1' />
                <p class="mb-4">
                  <span class="block">SPIRE LAB, Room No. EE C 326</span>
                  <span class="block">Department of Electrical Engineering</span>
                  <span class="block">Indian Institute of Science Bangalore-560012</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row mt-10">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/">{setup.siteName}</NavLink>
                {/*<NavLink href="/projects">Projects</NavLink>*/}
                {/*<NavLink href="/speaking">Speaking</NavLink>*/}
                {/*<NavLink href="/uses">Uses</NavLink>*/}
              </div>

              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} {setup.projectName}. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
