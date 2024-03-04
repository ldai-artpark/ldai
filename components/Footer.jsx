import Link from 'next/link'

import { Container } from './Container'
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { MailIcon } from '@heroicons/react/outline';

const Building = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <div className={"flex gap-2 justify-center items-center rounded-full"}>
            <Link href={"/"}>
              <h1 className={"text-3xl tracking-wider font-bold"}>
                <span className={"text-gradient drop-shadow"}>
                  VAANI
                </span>
              </h1>
            </Link>
            <span className={"text-xs mt-2 text-gray-500 sr-only"}>
              by <Link href="https://newron.ai">Newron.ai</Link>
            </span>
          </div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="#Home">Home</NavLink>
              <NavLink href="#About">About</NavLink>
              <NavLink href="#Team">Data</NavLink>
              <NavLink href="#Team">Team</NavLink>
              <NavLink href="#Media">Media</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between text-zinc-600 ">
          <div>
            <h2 className='font-medium'>Contact Us</h2>
            <p className='mt-2'>We are always open to new ideas and collaborations. <br /> Feel free to reach out to us.</p>
            <div className='gap-4 flex mt-1'><MailIcon className='h-5 w-5 text-zinc-600 mt-1' /><span className='ml-1'> vaanicontact@gmail.com </span></div>
            <div className='gap-4 flex mt-1'>
              <Building className='h-5 w-5 text-zinc-600 mt-1' />
              <p className="mb-4 leading-2">
                <span className="block">SPIRE LAB, Room No. EE C 326</span>
                <span className="block">Department of Electrical Engineering</span>
                <span className="block">Indian Institute of Science Bangalore-560012</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row mt-10">
            <p className="text-sm text-zinc-600 ">
              &copy; 2024 The Project VAANI. All rights
              reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}


