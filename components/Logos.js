import IIScLogo from "../assets/IIScLogo.png";
import MeityLogo from "../assets/Meity.png";
import ShaipLogo from "../assets/ShaipLogo.png";
import MagdapLogo from "../assets/Magdaplogo.png";
import GoogleLogo from "../assets/GoogleLogo.png";
import ArtparkLogo from "../assets/ArtParkLogo.png";
import NewronLogo from "../assets/newron-logo2x.png";
import Image from "next/image";

function Logos() {

    return (
        <div className="flex justify-center mt-10 mb-6">
        <ul
            role="list"
            className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
  {[
    [
      { name: 'MEITY', logo: MeityLogo , width: 70, className: "dark:invert", },
      { name: 'IISC', logo: IIScLogo, width: 100, className: "dark:invert" },
      { name: 'Google', logo: GoogleLogo, width: 200 },
    ],
    [
      { name: 'Artpark', logo: ArtparkLogo, width: 200 },
      // { name: 'Magdap', logo: MagdapLogo, width: 150 },
      // { name: 'Shaip', logo: ShaipLogo, className: "drop-shadow-[0px_0px_5px_rgba(0,0,0,0.4)]" },
      // { name: 'Newron', logo: NewronLogo, width: 70 },
    ],
  ].map((group, groupIndex) => (
    <li key={groupIndex}>
      <ul
        role="list"
        className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
            {group.map((company) => (
                <li key={company.name} className="flex">
                        <Image className={company.className} src={company.logo} alt={company.name} width={company.width} />
                 </li>
                    ))}
                </ul>
            </li>
            ))}
        </ul>
    </div>
    )
}

export default Logos;
