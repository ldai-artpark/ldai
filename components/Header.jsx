'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import ButtonDialog from "./Button2";
import Image from "next/image";
import IIScLogo from "../assets/IIScLogo.png";
import ArtparkLogo from "../assets/ARTPARK.png";


function MobileNavLink({ href, children }) {
  return (
      <Popover.Button as={Link} href={href} className="block w-full p-2">
        {children}
      </Popover.Button>
  )
}

function MobileNavIcon({ open }) {
  return (
      <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
      >
        <path
            d="M0 1H14M0 7H14M0 13H14"
            className={clsx(
                'origin-center transition',
                open && 'scale-90 opacity-0',
            )}
        />
        <path
            d="M2 2L12 12M12 2L2 12"
            className={clsx(
                'origin-center transition',
                !open && 'scale-90 opacity-0',
            )}
        />
      </svg>
  )
}

function Logo1(){
  return(
      <>
        <div className={"flex gap-6 bg-slate-60"}>
          <Link href={'https://www.iisc.ac.in/'} ><Image className="w-12 h-12 " src={IIScLogo} alt="IISc Logo" /></Link>
          <Link href={'https://artpark.in/'} ><Image className={'h-auto w-64'} src={ArtparkLogo} alt="Artpark Logo" /></Link>
        </div>
      </>
  )
}

function MobileNavigation() {
  return (
      <Popover>
        <Popover.Button
            className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
            aria-label="Toggle Navigation"
        >
          {({ open }) => <MobileNavIcon open={open} />}
        </Popover.Button>
        <Transition.Root>
          <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
          </Transition.Child>
          <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
                as="div"
                className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
            >
              <MobileNavLink href="#Home">Home</MobileNavLink>
              <MobileNavLink href="#About">About</MobileNavLink>
              <MobileNavLink href="#Data">Data</MobileNavLink>
              <MobileNavLink href="#Team">Team</MobileNavLink>
              <MobileNavLink href="#Media">Media</MobileNavLink>
              <hr className="m-2 border-slate-300/40" />
              {/*<MobileNavLink href={"/api/auth/login"}>Member Sign in</MobileNavLink>*/}
            </Popover.Panel>
          </Transition.Child>
        </Transition.Root>
      </Popover>
  )
}

export function Header() {
  return (
      <header className="py-10">
        <Container>
          <nav className="relative z-50 flex justify-between item-center">
            <div className="flex items-center md:gap-x-12">
              <Link href="#" aria-label="Home">
                <div className={"flex gap-2"}>
                  {/* Logo Side*/}
                  <div className={"flex gap-2 items-center rounded-full"}>
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
                </div>
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                <NavLink href="#Home">Home</NavLink>
                <NavLink href="#About">About</NavLink>
                <NavLink href="#Data">Data</NavLink>
                <NavLink href="#Team">Team</NavLink>
                <NavLink href="#Media">Media</NavLink>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              {/*<div className="hidden md:block">*/}
              {/*  <NavLink href={"/api/auth/login"}>Member sign in</NavLink>*/}
              {/*</div>*/}
              <div className={"hidden md:block"}>
                <Logo1/>
              </div>

              {/*<ButtonDialog color={'blue'} mt={0}/>*/}
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          </nav>
        </Container>
      </header>
  )
}
