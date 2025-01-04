import React, { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";

const dummyTestimonials = [
  { feedback: "Bimbingan tugas akhir saya sangat membantu, terutama dalam hal analisis data yang rumit.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Proses bimbingan yang sangat jelas dan mendalam. Bimbingan RPL membuat tugas akhir saya lebih terstruktur.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan yang sangat profesional, membantu saya memahami metode GIS untuk penelitian tugas akhir.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan untuk tugas akhir saya sangat baik, membantu dalam perancangan jaringan.", author: "Anonymous", role: "Networking" },
  { feedback: "Pelatihan yang sangat berharga, bimbingan Data Mining saya menjadi lebih terarah.", author: "Anonymous", role: "Data Mining" },
  { feedback: "RPL sangat membantu dalam pemrograman dan pengembangan aplikasi tugas akhir saya.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan saya di GIS sangat membantu dalam pembuatan model peta untuk tugas akhir.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan saya sangat efektif, membantu mempercepat implementasi di tugas akhir.", author: "Anonymous", role: "Networking" },
  { feedback: "Bimbingan Data Mining yang diberikan sangat bermanfaat untuk analisis data yang kompleks dalam tugas akhir.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL sangat baik, sangat membantu dalam proses coding tugas akhir saya.", author: "Anonymous", role: "RPL" },
  { feedback: "Sangat puas dengan bimbingan GIS yang saya terima, banyak wawasan baru tentang pemetaan digital.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan memberikan panduan yang jelas, tugas akhir saya menjadi lebih terstruktur.", author: "Anonymous", role: "Networking" },
  { feedback: "Bimbingan Data Mining memberikan banyak insight baru untuk penelitian saya, sangat berguna.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL saya memberikan pemahaman yang lebih baik tentang pemrograman dan aplikasi tugas akhir.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan GIS yang saya terima membantu menyelesaikan masalah spatial yang saya hadapi dalam tugas akhir.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan membantu saya dalam merancang infrastruktur jaringan untuk tugas akhir.", author: "Anonymous", role: "Networking" },
  { feedback: "Saya merasa terbantu dengan bimbingan Data Mining, dapat menganalisis data dengan lebih mudah.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL saya sangat produktif, menghasilkan aplikasi yang sangat dibutuhkan dalam tugas akhir.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan GIS memberikan pengetahuan baru tentang analisis geospasial yang sangat penting dalam tugas akhir.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan memudahkan saya untuk menyelesaikan tugas akhir saya dalam hal konfigurasi jaringan.", author: "Anonymous", role: "Networking" },
  { feedback: "Data Mining dalam tugas akhir saya sangat mendalam berkat bimbingan yang saya terima.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL memberikan pemahaman lebih dalam tentang pengembangan aplikasi untuk tugas akhir saya.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan GIS sangat membantu dalam proses pengolahan data spasial yang saya butuhkan untuk tugas akhir.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan memberikan cara yang tepat dalam membangun dan mengatur sistem jaringan untuk tugas akhir saya.", author: "Anonymous", role: "Networking" },
  { feedback: "Bimbingan Data Mining memberikan pengalaman yang sangat berharga dalam analisis data besar untuk tugas akhir.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL memungkinkan saya mengatasi masalah pengkodean dalam tugas akhir dengan lebih efisien.", author: "Anonymous", role: "RPL" },
  { feedback: "Bimbingan GIS memberi saya perspektif baru dalam penggunaan perangkat GIS untuk tugas akhir saya.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan yang saya terima sangat lengkap dan membantu dalam penyusunan tugas akhir.", author: "Anonymous", role: "Networking" },
  { feedback: "Bimbingan Data Mining sangat bermanfaat dalam pengolahan data besar untuk tugas akhir saya.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL saya sangat terstruktur, membuat proses pengembangan aplikasi tugas akhir menjadi lebih mudah.", author: "Anonymous", role: "RPL" },
  { feedback: "Saya merasa lebih siap berkat bimbingan GIS, tugas akhir saya menjadi lebih tepat dan akurat.", author: "Anonymous", role: "GIS" },
  { feedback: "Bimbingan jaringan sangat membantu dalam mengimplementasikan teknologi jaringan pada tugas akhir saya.", author: "Anonymous", role: "Networking" },
  { feedback: "Bimbingan Data Mining memudahkan saya dalam mengeksplorasi dan menganalisis data yang saya butuhkan untuk tugas akhir.", author: "Anonymous", role: "Data Mining" },
  { feedback: "Bimbingan RPL membuat saya lebih percaya diri dalam menyelesaikan pengkodean aplikasi untuk tugas akhir.", author: "Anonymous", role: "RPL" },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyTestimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <svg
            className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium text-gray-900 dark:text-white testimonial-text">
              "{dummyTestimonials[currentIndex].feedback}"
            </p>
          </blockquote>

          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img
              className="w-6 h-6 rounded-full"
              src="https://via.placeholder.com/40"
              alt="Anonymous profile"  // Memperbaiki alt
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                {dummyTestimonials[currentIndex].author}
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                {dummyTestimonials[currentIndex].role}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
