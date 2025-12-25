import { Metadata } from "next";
import TitleSection from "@/components/title-section";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are",
};

const About = () => {
  return (
    <div>
      <TitleSection title="About Us" subTitle="Lorem ipsum dolor sit amet." />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Image src="/about-image.jpg" width={650} height={579} alt="about" />
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who we are
            </h1>
            <p className="text-gray-700 py-5 text-justify">
              Kaluna Living adalah merek home decor yang berbasis di Surabaya, didirikan pada tahun 2016 dengan visi sederhana: menciptakan perlengkapan rumah yang membawa kegembiraan (home living goods that bring you joy). Perjalanan kami dimulai dari produk tekstil dan berkembang ke kreasi kayu dan rotan. Dalam beberapa tahun terakhir, kami memfokuskan hati pada keramik dan wooden tableware yang dibuat sepenuh hati oleh artisan lokal. Kami menggabungkan kesederhanaan dengan sentuhan warna ceria untuk menghadirkan kenyamanan, keindahan, dan makna ke dalam kehidupan sehari-hari pelanggan.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision :</h4>
                  <p className="text-gray-600 text-justify">
                    Menjadi merek keramik dan tableware lokal yang diakui atas kemampuannya membawa kenyamanan, keindahan, dan makna ke dalam kehidupan sehari-hari pelanggan.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                  <p className="text-gray-600">
                    * Merancang dan membuat setiap produk keramik dan tableware secara handcrafted (dibuat sepenuh hati) oleh artisan lokal.<br />
                    * Menjunjung tinggi nilai kehangatan dan koneksi melalui pola, warna ceria, dan pesan yang dibagikan dalam setiap koleksi.<br />
                    * Memastikan pelanggan tidak hanya membeli produk, tetapi juga menyambut kenyamanan, keindahan, dan makna ke dalam rumah mereka.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
        </div>
      </div>
    </div>
  );
};

export default About;
