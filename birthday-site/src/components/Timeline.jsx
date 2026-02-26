import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const memories = [
  { src: "/images/timeline/she_with_her_mother_whenshewassmall_maybe2yearsold.jpg", tilt: -3 },
  { src: "/images/timeline/school_her.jpeg", tilt: 2 },
  { src: "/images/timeline/on_her_parents_27thannuversary_in2021_june 8th.jpg", tilt: -1 },
  { src: "/images/timeline/ayat(nickname_pakhi)_her_bigsistersdaughter_herheart.jpg", tilt: 4 },
  { src: "/images/timeline/n3.jpeg", tilt: -2 },
  { src: "/images/timeline/n1.jpg", tilt: 3 },
  { src: "/images/timeline/n4.jpeg", tilt: -2 }
];

const MemoryAlbum = () => {

  const containerRef = useRef(null);

  // 🌸 Subtle Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#fffafb] via-[#fdecef] to-[#fff5f7] py-28 px-5 overflow-hidden"
    >

      {/* 🌸 Floating Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-3xl"
            style={{
              width: Math.random() * 200 + 120,
              height: Math.random() * 200 + 120,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.12, 0.22, 0.12]
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* HEADER with Parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="relative z-10 text-center mb-24"
      >
        <p className="text-rose-400 text-[10px] tracking-[0.8em] uppercase font-bold mb-6">
          Collected Light
        </p>

        <h2 className="text-3xl md:text-7xl font-serif italic text-rose-700 leading-tight">
          Every Moment Looks Beautiful
          <br className="hidden md:block" />
          With You In It
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* 📱 MOBILE VERSION */}
        <div className="space-y-16 md:hidden">
          {memories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              animate={{ y: [0, -6, 0] }}
              className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] shadow-[0_25px_70px_rgba(225,29,72,0.15)]"
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-[420px] object-cover transition duration-1000"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🖥 DESKTOP VERSION */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-12 space-y-20">
          {memories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.06 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              className="relative break-inside-avoid group"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotate: 0
                }}
                transition={{ duration: 0.4 }}
                className="relative bg-white p-6 shadow-[0_30px_80px_rgba(225,29,72,0.18)]"
                style={{ transform: `rotate(${item.tilt}deg)` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-200/40 backdrop-blur-sm -rotate-2" />

                <div className="overflow-hidden">
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-auto object-cover transition duration-1000"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Closing Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center mt-32"
      >
        <p className="text-rose-600 italic font-serif text-xl md:text-3xl">
          “And today, we celebrate all of them.”
        </p>
      </motion.div>

    </section>
  );
};

export default MemoryAlbum;