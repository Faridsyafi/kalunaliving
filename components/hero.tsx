import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Background Image"
          fill
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">
          Welcome To Kaluna Living
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Get Special offer just for you today.
        </p>

        {/* BUTTONS - WARM BROWN */}
        <div className="flex gap-5">
          {/* ORDER NOW */}
          <Link
            href="#"
            className="bg-[#A7744B] text-white py-2.5 px-6 md:px-10 text-lg font-semibold 
                     rounded-md shadow-md transition-all duration-300 
                     hover:bg-[#8F643E] hover:scale-105 hover:shadow-xl"
          >
            Order Now
          </Link>

          {/* CONTACT US */}
          <Link
            href="/contact"
            className="border border-[#A7744B] text-[#A7744B] py-2.5 px-6 md:px-10 
                     text-lg font-semibold rounded-md transition-all duration-300 
                     hover:bg-[#A7744B] hover:text-white hover:scale-105 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
