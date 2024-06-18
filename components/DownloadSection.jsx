import Image from 'next/image'
import { Container } from './Container'
import backgroundImage from '../images/background-call-to-action.jpg'
import {useState} from "react";
import Model2 from "./Model2";
import ButtonDialog from "./Button2";
import {useMyContext} from "../contexts/MyContext";

export function DownloadSection() {
  const {popup} = useMyContext();

  return (
    <section
      id="Team"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      {popup && <Model2 />}

      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Unleash the Power of our Data!
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Download the most diverse open source speech dataset for Indian languages. We encourage the use of this dataset to develop and improve your speech AI technologies and applications for an inclusive Digital India.
          </p>
          <ButtonDialog color={'white'} mt={10} />
        </div>
      </Container>
    </section>
  )
}
