import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Heart,
  Coffee,
  Feather,
  TrainFront,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const SecretGallery = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleUnlock = () => {
    if (password.toLowerCase().trim() === "moti") {
      setIsUnlocked(true);
      const heroMusic = document.getElementById("hero-audio");
      if (heroMusic) heroMusic.pause();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const memories = [
    {
      title: "How it Began",
      text:
        "Our story began with two cups of bad tea. But you stayed anyway. You smiled and said the second one was better — just so I wouldn't feel bad.",
      img: "/images/friendship/tea.jpg",
      icon: <Coffee size={22} className="text-amber-500" />,
    },
    {
      title: "The Quiet Strength",
      text:
        "When life felt heavy, you stood beside me. When I doubted myself, you believed in me. You didn't just watch me grow; you helped me bloom.",
      img: "/images/friendship/ipreparingherforherexam.jpeg",
      icon: <Feather size={22} className="text-rose-400" />,
    },
    {
      title: "Station Goodbyes",
      text:
        "Dropping you at the station never felt normal. 'Reach home and text me' — those words carried more care than they looked. Every goodbye was just a countdown to seeing you again.",
      img: "/images/friendship/me&she_ontrain_when_idropedherwhenshewasgoingtohome.jpeg",
      icon: <TrainFront size={22} className="text-blue-400" />,
    },
  ];

  return (
    <section
      id="secret-gallery"
      className="relative min-h-screen bg-gradient-to-b from-[#fff0f3] via-[#fde2e7] to-[#fff5f7] overflow-hidden font-serif px-6"
    >
      {/* Soft Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-3xl"
            style={{
              width: 250,
              height: 250,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.35, 0.2], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* LOCK SCREEN */
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen text-center relative z-10"
          >
            <motion.div
              animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
              className="max-w-sm w-full bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-rose-200"
            >
              <Sparkles className="text-rose-400 mb-6 mx-auto" size={28} />
              <h2 className="text-xs tracking-[0.6em] text-rose-400 uppercase mb-10">
                A Private Archive
              </h2>

              <div className="relative mb-8">
                <input
                  type="password"
                  placeholder="The Secret Nickname"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-rose-200 text-center py-3 text-xl outline-none focus:border-rose-400"
                />
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="absolute right-0 top-3 text-rose-400"
                >
                  <HelpCircle size={16} />
                </button>
              </div>

              {showHint && (
                <p className="text-rose-500/70 text-xs italic mb-6">
                  The name you pretend to get annoyed at...
                </p>
              )}

              <button
                onClick={handleUnlock}
                className="text-xs tracking-[0.5em] uppercase text-rose-500 hover:text-rose-600 transition-all"
              >
                Unlock Our Story
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* TIMELINE */
          <div className="relative z-10 py-32 max-w-6xl mx-auto">

            {/* INTRO */}
            <div className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="space-y-8"
              >
                <div className="h-px w-24 bg-rose-300 mx-auto" />
                <h2 className="text-4xl md:text-6xl italic text-rose-600">
                  Why You?
                </h2>
                <p className="text-rose-700/80 leading-[2] text-xl md:text-2xl italic max-w-lg mx-auto">
                  Because in this noisy world, you became my calm.
                </p>
                <ChevronDown
                  className="mx-auto text-rose-300 animate-bounce mt-8"
                  size={28}
                />
              </motion.div>
            </div>

            {/* CENTER LINE */}
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-rose-200 hidden md:block" />

              {memories.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`relative mb-32 flex flex-col md:flex-row items-center ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* IMAGE */}
                    <div className="w-full md:w-1/2 p-4">
                      <div className="rounded-3xl overflow-hidden shadow-xl border border-rose-100">
                        <img
                          src={m.img}
                          className="w-full h-[320px] md:h-[380px] object-cover transition-all duration-[2000ms] hover:scale-105"
                          alt=""
                        />
                      </div>
                    </div>

                    {/* TEXT */}
                    <div className="w-full md:w-1/2 p-6 text-center md:text-left space-y-6">
                      <div className="flex justify-center md:justify-start gap-3 items-center">
                        {m.icon}
                        <span className="text-xs tracking-[0.4em] text-rose-400 uppercase">
                          Chapter {i + 1}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl italic text-rose-600">
                        {m.title}
                      </h3>

                      <p className="text-rose-700/80 leading-[1.8] italic">
                        {m.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* FINAL MESSAGE (UNCHANGED CONTENT) */}
            <div className="mt-32 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="max-w-3xl mx-auto space-y-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart
                    size={64}
                    className="mx-auto text-rose-400 fill-rose-400/20"
                  />
                </motion.div>

                <h2 className="text-4xl md:text-6xl italic text-rose-600">
                  Before I say Happy Birthday, Moti…
                </h2>

                <div className="space-y-8 text-rose-700/80 text-lg md:text-2xl italic leading-relaxed">
                  <p>
                    There’s something I need to say. I know there were moments
                    when I didn’t understand you the way I should have. Moments
                    when my words were careless. Moments when I hurt you.
                  </p>
                  <p>
                    And still — you stayed. You chose this friendship again and
                    again. That says everything about your heart.
                  </p>
                  <p>
                    If I ever made you feel unseen, unvalued, or hurt —
                    <span className="text-rose-500">
                      {" "}
                      I am truly sorry, Moti.
                    </span>
                  </p>
                  <p>
                    You deserve patience. You deserve respect. You deserve a
                    friend who protects your peace. And I promise, I will try to
                    be that friend for you.
                  </p>
                </div>

                <div className="h-px w-32 bg-rose-200 mx-auto" />

                <div className="space-y-8">
                  <h3 className="text-5xl md:text-7xl italic text-rose-500">
                    Happy Birthday, Moti 🤍
                  </h3>

                  <div className="text-rose-700/80 text-lg md:text-2xl italic leading-relaxed space-y-6">
                    <p>
                      May this year give you calm when your mind is heavy,
                      strength when life feels hard, and success in everything
                      you dream about.
                    </p>
                    <p className="text-rose-500/70 text-base md:text-xl">
                      Our story started with just two cups of bad tea. But what
                      we built from that day is something rare.
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 2 }}
                  className="pt-16 space-y-4 border-t border-rose-200"
                >
                  <p className="text-2xl md:text-4xl italic text-rose-600">
                    You will always be my Moti.
                  </p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SecretGallery;