import { motion } from "framer-motion";
import { MailOpen, Feather, Heart } from "lucide-react";

const BirthdayWishes = () => {
  const content = {
    label: "A Personal Letter",
    title: "Dear Best Friend...",
    message: `I am not your heart,
but I miss you
more than words can explain.

I am not your family,
yet I care for you
like my own.

I am not your blood,
but I’m ready to
share your pain and tears.

I’ll stand by you
in silence and storms alike—
because I’m your stupid best friend,
always here, no matter what,
even when you feel alone or lost,
and the world feels heavy,
holding your hand,
reminding you you're stronger
than you think.`,
    signature: "Happy Birthday Moti🤍",
    ps: "I'll always be here, no matter how much the world changes."
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#fffafb] via-[#fdecef] to-[#fff5f7] py-32 px-6 flex items-center justify-center overflow-hidden">

      {/* 🌸 Soft Floating Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300/20 blur-3xl"
            style={{
              width: Math.random() * 200 + 120,
              height: Math.random() * 200 + 120,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.25, 0.15] }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl w-full bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-[0_30px_100px_rgba(225,29,72,0.15)] border border-rose-100"
      >

        <div className="text-center space-y-8">

          {/* Header */}
          <div className="space-y-4">
            <MailOpen className="mx-auto text-rose-400" size={28} />
            <p className="text-[10px] tracking-[0.6em] uppercase text-rose-400 font-bold">
              {content.label}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-rose-700 leading-tight">
              {content.title}
            </h2>
          </div>

          <div className="w-16 h-px bg-rose-300/40 mx-auto" />

          {/* Letter Body */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="whitespace-pre-line text-slate-600 leading-[2.1] text-lg md:text-xl font-serif italic text-center"
          >
            {content.message}
          </motion.p>

          {/* Signature */}
          <div className="pt-10 space-y-4">
            <div className="flex justify-center gap-4 opacity-40">
              <Feather size={18} className="-rotate-12 text-rose-400" />
              <Heart size={16} className="text-rose-500 fill-rose-500" />
              <Feather size={18} className="rotate-12 text-rose-400" />
            </div>

            <p className="text-2xl md:text-4xl italic font-serif text-rose-600">
              {content.signature}
            </p>
          </div>

        </div>
      </motion.div>

      {/* Closing line below card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-16 text-center w-full px-6"
      >
        <p className="text-rose-500 italic font-serif text-sm md:text-lg opacity-70">
          “{content.ps}”
        </p>
      </motion.div>

    </section>
  );
};

export default BirthdayWishes;