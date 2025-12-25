import Image from "next/image";
import Link from "next/link";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTiktokLine,
  RiWhatsappLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-950">
      <div className="max-w-screen-xl mx-auto w-full px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          {/* Logo + Description */}
          <div>
          <Image
                src="/logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-[128px] h-auto"
                priority
              />
            <p className="text-gray-400">
              Home living goods that bring you joy.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/kalunaliving"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiInstagramLine />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/kalunalivinggoods"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiFacebookCircleLine />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiTiktokLine />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281234546572"
                target="_blank"
                className="text-white text-2xl hover:text-[#A7744B] transition"
              >
                <RiWhatsappLine />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <div className="flex gap-20">
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">
                  Links
                </h4>
                <ul className="space-y-5 text-gray-400">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      produks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#A7744B] transition"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">
                  Legal
                </h4>
                <ul className="space-y-5 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Legal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Term &amp; Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Payment Method
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#A7744B] transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>

            <form className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  className="w-full p-3 rounded-sm bg-white text-gray-800"
                  placeholder="johndoe@example.com"
                />
              </div>

              <button
                className="bg-[#A7744B] p-3 font-bold text-white w-full text-center rounded-sm 
                                 hover:bg-[#8F643E] transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-700 py-8 text-center text-base text-gray-500">
        &copy; Copyright 2025 | Maulana-fti-unmer
      </div>
    </footer>
  );
};

export default Footer;
