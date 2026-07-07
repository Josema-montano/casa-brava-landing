import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: string;
};

type GalleryItem = {
  title: string;
  label: string;
  tint: string;
  image: string;
};

type ExperienceCard = {
  title: string;
  description: string;
  tint: string;
  image: string;
};

const heroVisual = 'https://images.pexels.com/photos/30479386/pexels-photo-30479386.jpeg?cs=srgb&dl=pexels-lens-clickk-2148991298-30479386.jpg&fm=jpg&w=900&q=80&auto=compress';
const storyVisual = 'https://images.pexels.com/photos/36747296/pexels-photo-36747296.jpeg?cs=srgb&dl=pexels-max-griss-16866522-36747296.jpg&fm=jpg&w=900&q=80&auto=compress';
const locationVisual = 'https://images.pexels.com/photos/20208915/pexels-photo-20208915.jpeg?cs=srgb&dl=pexels-jplenio-20208915.jpg&fm=jpg&w=900&q=80&auto=compress';

const categoryVisuals: Record<string, string> = {
  'From the Fire': 'https://images.pexels.com/photos/18824037/pexels-photo-18824037.jpeg?cs=srgb&dl=pexels-boris-ivas-28180462-18824037.jpg&fm=jpg&w=900&q=80&auto=compress',
  'Small Plates': 'https://images.pexels.com/photos/33696402/pexels-photo-33696402.jpeg?cs=srgb&dl=pexels-maarten-ceulemans-1837879676-33696402.jpg&fm=jpg&w=900&q=80&auto=compress',
  'Signature Cocktails': 'https://images.pexels.com/photos/16807989/pexels-photo-16807989.jpeg?cs=srgb&dl=pexels-airamdphoto-16807989.jpg&fm=jpg&w=900&q=80&auto=compress',
  Desserts: 'https://images.pexels.com/photos/11794317/pexels-photo-11794317.jpeg?cs=srgb&dl=pexels-hernan-santarelli-4166599-11794317.jpg&fm=jpg&w=900&q=80&auto=compress',
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'About', href: '#about' },
];

const particles = [
  { left: '8%', top: '16%', delay: 0 },
  { left: '15%', top: '68%', delay: 0.8 },
  { left: '24%', top: '28%', delay: 1.2 },
  { left: '39%', top: '14%', delay: 1.8 },
  { left: '56%', top: '26%', delay: 0.5 },
  { left: '64%', top: '74%', delay: 1.4 },
  { left: '72%', top: '18%', delay: 0.9 },
  { left: '84%', top: '58%', delay: 1.1 },
  { left: '92%', top: '24%', delay: 0.3 },
];

const menuItems: MenuItem[] = [
  {
    category: 'From the Fire',
    name: 'Brava Ribeye',
    description: 'ember butter, roasted garlic, smoked salt',
    price: '$58',
  },
  {
    category: 'Small Plates',
    name: 'Charred Octopus',
    description: 'paprika oil, potato cream, citrus',
    price: '$24',
  },
  {
    category: 'From the Fire',
    name: 'Fire-Roasted Vegetables',
    description: 'herb ash, goat cheese, toasted seeds',
    price: '$18',
  },
  {
    category: 'Small Plates',
    name: 'Casa Brava Tacos',
    description: 'slow-braised beef, red salsa, pickled onion',
    price: '$22',
  },
  {
    category: 'Signature Cocktails',
    name: 'Ember Old Fashioned',
    description: 'bourbon, smoked orange, bitters',
    price: '$19',
  },
  {
    category: 'Desserts',
    name: 'Dark Chocolate Flan',
    description: 'cocoa, caramel, sea salt',
    price: '$14',
  },
];

const galleryItems: GalleryItem[] = [
  { title: 'Dark dining room', label: 'Warm shadows, intimate tables', tint: 'from-stone/50 via-charcoal to-charcoal', image: 'https://images.pexels.com/photos/32568165/pexels-photo-32568165.jpeg?cs=srgb&dl=pexels-magda-ehlers-pexels-32568165.jpg&fm=jpg&w=900&q=80&auto=compress' },
  { title: 'Grilled food', label: 'Fire-kissed plates with texture', tint: 'from-wine/70 via-ember/40 to-charcoal', image: 'https://images.pexels.com/photos/18824037/pexels-photo-18824037.jpeg?cs=srgb&dl=pexels-boris-ivas-28180462-18824037.jpg&fm=jpg&w=900&q=80&auto=compress' },
  { title: 'Cocktail bar', label: 'Amber glass and a polished glow', tint: 'from-sand/30 via-wine/50 to-charcoal', image: 'https://images.pexels.com/photos/36366519/pexels-photo-36366519.jpeg?cs=srgb&dl=pexels-mediha-ekici-2150926769-36366519.jpg&fm=jpg&w=900&q=80&auto=compress' },
  { title: 'Elegant table setting', label: 'Bone china, brass, and restraint', tint: 'from-bone/20 via-stone/50 to-charcoal', image: 'https://images.pexels.com/photos/33696402/pexels-photo-33696402.jpeg?cs=srgb&dl=pexels-maarten-ceulemans-1837879676-33696402.jpg&fm=jpg&w=900&q=80&auto=compress' },
  { title: 'Warm lights', label: 'Golden reflections across wood and stone', tint: 'from-ember/50 via-wine/40 to-charcoal', image: 'https://images.pexels.com/photos/11794317/pexels-photo-11794317.jpeg?cs=srgb&dl=pexels-hernan-santarelli-4166599-11794317.jpg&fm=jpg&w=900&q=80&auto=compress' },
  { title: 'Open fire kitchen', label: 'Focused heat and chef movement', tint: 'from-wine/60 via-ember/40 to-charcoal', image: 'https://images.pexels.com/photos/15711722/pexels-photo-15711722.jpeg?cs=srgb&dl=pexels-suki-lee-110686949-15711722.jpg&fm=jpg&w=900&q=80&auto=compress' },
];

const experiences: ExperienceCard[] = [
  {
    title: 'Fire Kitchen',
    description: 'Open flames, steel, and charcoal built into the evening ritual.',
    tint: 'from-ember/45 via-wine/20 to-charcoal',
    image: 'https://images.pexels.com/photos/11172128/pexels-photo-11172128.jpeg?cs=srgb&dl=pexels-sultan-ali-179322820-11172128.jpg&fm=jpg&w=900&q=80&auto=compress',
  },
  {
    title: 'Signature Cocktails',
    description: 'Seasonal drinks with smoke, spice, and a quietly confident finish.',
    tint: 'from-sand/35 via-wine/40 to-charcoal',
    image: 'https://images.pexels.com/photos/16807989/pexels-photo-16807989.jpeg?cs=srgb&dl=pexels-airamdphoto-16807989.jpg&fm=jpg&w=900&q=80&auto=compress',
  },
  {
    title: 'Private Dining',
    description: 'A secluded setting for long conversations and memorable arrivals.',
    tint: 'from-stone/40 via-charcoal to-wine/30',
    image: 'https://images.pexels.com/photos/2104568/pexels-photo-2104568.jpeg?cs=srgb&dl=pexels-naimbic-2104568.jpg&fm=jpg&w=900&q=80&auto=compress',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const groupedMenu = useMemo(
    () =>
      menuItems.reduce<Record<string, MenuItem[]>>((accumulator, item) => {
        if (!accumulator[item.category]) {
          accumulator[item.category] = [];
        }
        accumulator[item.category].push(item);
        return accumulator;
      }, {}),
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('submitted');
    window.setTimeout(() => setFormStatus('idle'), 2800);
  }

  const handleDirection = () => {
    window.open('https://www.google.com/maps/search/Av.+Brava+128,+Downtown+District', '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.location.href = 'tel:+59170000000';
  };

  return (
    <div className="relative overflow-x-hidden bg-charcoal text-bone">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-ember via-sand to-wine"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 transition-all duration-500 ${
          scrolled ? 'bg-charcoal/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#home" className="font-serif text-lg tracking-[0.3em] text-bone uppercase">
            Casa Brava
          </a>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.24em] text-sand/85 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-300 hover:text-bone ${activeSection === item.href.slice(1) ? 'text-ember' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              className="hidden rounded-full border border-ember/50 bg-ember/10 px-5 py-2 text-xs uppercase tracking-[0.22em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:bg-ember/20 hover:shadow-glow md:inline-flex"
            >
              Reserve
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-bone md:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label="Toggle navigation menu"
            >
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/5 bg-charcoal/95 px-4 py-5 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.24em] text-sand/85">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition-colors hover:border-ember/50 hover:bg-ember/10 hover:text-bone"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-ember">0{item.label.length}</span>
                  </a>
                ))}
                <a
                  href="#reserve"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full bg-ember px-5 py-3 text-center text-xs tracking-[0.22em] text-bone"
                >
                  Reserve
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative min-h-screen overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(178,58,46,0.24),_transparent_35%),radial-gradient(circle_at_30%_20%,_rgba(110,31,42,0.3),_transparent_32%),linear-gradient(180deg,rgba(13,13,13,0.25),rgba(13,13,13,0.92))]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22520%22 height=%22520%22 viewBox=%220 0 520 520%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22520%22 height=%22520%22 filter=%22url(%23n)%22 opacity=%220.18%22/%3E%3C/svg%3E')] opacity-20 mix-blend-soft-light" />
          </motion.div>

          <div className="absolute inset-0 grain opacity-30" />

          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, index) => (
              <motion.span
                key={`${particle.left}-${index}`}
                className="absolute h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_24px_rgba(178,58,46,0.65)]"
                style={{ left: particle.left, top: particle.top }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.2, 0.95, 0.2],
                  scale: [0.85, 1.15, 0.85],
                }}
                transition={{ duration: 5 + index * 0.2, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pt-28 md:px-8 lg:pt-24">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-4xl pb-16 pt-16 lg:pb-24">
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-sand/80"
                >
                  Bold flavors. Warm nights. Brava spirit.
                </motion.p>

                <div className="space-y-4">
                  {['Where fire', 'meets elegance.'].map((line, index) => (
                    <motion.h1
                      key={line}
                      initial={{ opacity: 0, y: 38 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.18, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-4xl font-serif text-5xl leading-none tracking-[-0.04em] text-bone sm:text-6xl md:text-7xl lg:text-[7.5rem]"
                    >
                      {line}
                    </motion.h1>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                  className="mt-8 max-w-2xl text-base leading-8 text-bone/78 sm:text-lg"
                >
                  A refined dining experience shaped by bold flavors, warm nights, and the Brava spirit.
                </motion.p>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delayChildren: 0.8, staggerChildren: 0.12 },
                    },
                  }}
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                  {[
                    { label: 'Reserve a Table', href: '#reserve', primary: true },
                    { label: 'Explore Menu', href: '#menu', primary: false },
                  ].map((button) => (
                    <motion.a
                      key={button.label}
                      href={button.href}
                      variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                      className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-sm uppercase tracking-[0.24em] transition-all duration-300 ${
                        button.primary
                          ? 'bg-ember text-bone shadow-glow hover:-translate-y-1 hover:bg-wine'
                          : 'border border-white/12 bg-white/5 text-bone hover:-translate-y-1 hover:border-ember/60 hover:bg-ember/10'
                      }`}
                    >
                      {button.label}
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="relative pb-12 lg:pb-28"
              >
                <div className="absolute inset-x-8 top-8 h-64 rounded-full bg-radial-ember blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 shadow-2xl shadow-black/60 backdrop-blur-sm">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(244,239,231,0.1),rgba(13,13,13,0.4)),radial-gradient(circle_at_50%_20%,rgba(178,58,46,0.34),transparent_34%),linear-gradient(135deg,rgba(94,90,85,0.3),rgba(13,13,13,0.96))]">
                    <motion.div
                      animate={{ y: [0, -16, 0], scale: [1, 1.02, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(216,195,165,0.18),transparent_20%),linear-gradient(180deg,transparent,rgba(13,13,13,0.55))]"
                    />
                    <img
                      src={heroVisual}
                      alt="Casa Brava lounge atmosphere"
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                      loading="eager"
                  decoding="async"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.08),rgba(13,13,13,0.6)),radial-gradient(circle_at_50%_20%,rgba(178,58,46,0.24),transparent_40%)]" />
                    <div className="absolute inset-x-8 top-8 rounded-[1.5rem] border border-white/10 bg-charcoal/35 p-6 backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.35em] text-sand/70">Casa Brava</p>
                      <p className="mt-4 font-serif text-4xl leading-none text-bone">Fire, stone, wine.</p>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-bone/72">
                        A cinematic concept for intimate dinners, luminous cocktails, and memorable nights.
                      </p>
                    </div>
                    <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-2">
                      {['Open-fire cuisine', 'Reservation-first experience'].map((value) => (
                        <div key={value} className="rounded-2xl border border-white/10 bg-charcoal/55 px-4 py-3 text-sm text-bone/82 backdrop-blur-md">
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          id="about-story"
          className="border-y border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(110,31,42,0.14),transparent_32%),linear-gradient(180deg,#0d0d0d,#111111)] py-24 md:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Brand story</p>
              <h2 className="max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                Born from fire. Served with soul.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/72">
                Casa Brava celebrates the intensity of open-fire cooking, the warmth of Latin hospitality, and the elegance of a night meant to be remembered.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 28 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-transparent p-3 shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(178,58,46,0.42),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(216,195,165,0.18),transparent_28%),linear-gradient(135deg,rgba(94,90,85,0.35),rgba(13,13,13,0.96))] p-8">
                <img
                  src={storyVisual}
                  alt="Textured stone and fire composition"
                  className="absolute inset-0 h-full w-full object-cover opacity-88"
                       loading="lazy"
                       decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.08),rgba(13,13,13,0.55))]" />
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-charcoal/28 p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.32em] text-sand/70">Editorial visual</p>
                  <div>
                    <p className="font-serif text-4xl text-bone">Stone, wood, smoke.</p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-bone/72">
                      A tactile composition of warm glow, mineral surfaces, and fire-lit contrast built to feel intimate and premium.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section id="menu" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionVariants}
              className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Menu preview</p>
                <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                  Flavors with character.
                </h2>
              </div>
              <a href="#reserve" className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.24em] text-sand/90 transition hover:border-ember/70 hover:bg-ember/10 hover:text-bone">
                View Full Menu
              </a>
            </motion.div>

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {Object.entries(groupedMenu).map(([category, items]) => (
                <motion.div
                  key={category}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                  className="rounded-[2rem] border border-white/8 bg-white/[0.035] p-6 shadow-2xl shadow-black/40"
                >
                  <div className="relative mb-6 overflow-hidden rounded-[1.6rem] border border-white/8 bg-charcoal/70">
                    <img
                      src={categoryVisuals[category]}
                      alt={category}
                      className="h-40 w-full object-cover opacity-85"
                           loading="lazy"
                       decoding="async"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.1),rgba(13,13,13,0.62))]" />
                    <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.34em] text-bone/85">{category}</p>
                  </div>
                  <p className="mb-6 text-xs uppercase tracking-[0.34em] text-sand/70">{category}</p>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.article
                        key={item.name}
                        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -3 }}
                        className="group rounded-[1.5rem] border border-white/8 bg-charcoal/65 px-5 py-5 transition duration-300 hover:border-ember/50 hover:bg-ember/8 hover:shadow-glow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-2xl text-bone transition group-hover:text-sand">{item.name}</h3>
                            <p className="mt-2 max-w-lg text-sm leading-6 text-bone/68">{item.description}</p>
                          </div>
                          <span className="shrink-0 rounded-full border border-ember/25 bg-ember/8 px-3 py-1 text-sm text-sand transition group-hover:border-ember/60 group-hover:bg-ember/15 group-hover:text-bone">
                            {item.price}
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="border-y border-white/5 bg-[#0b0b0b] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionVariants}
              className="mb-10"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Gallery</p>
              <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                Immersive moments in light and shadow.
              </h2>
            </motion.div>

            <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-3">
              {galleryItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: index * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group min-w-[280px] flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/35 md:min-w-0"
                >
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${item.tint}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105"
                           loading="lazy"
                       decoding="async"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,239,231,0.14),transparent_18%),linear-gradient(180deg,transparent,rgba(13,13,13,0.85))]" />
                    <motion.div
                      className="absolute inset-0 origin-center bg-[linear-gradient(145deg,rgba(255,255,255,0.18),transparent_35%,rgba(0,0,0,0.2))] opacity-30"
                      animate={{ scale: [1, 1.08, 1], x: [0, 6, 0] }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22580%22 height=%22900%22 viewBox=%220 0 580 900%22%3E%3Cdefs%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3C/defs%3E%3Crect width=%22580%22 height=%22900%22 filter=%22url(%23g)%22 opacity=%220.16%22/%3E%3C/svg%3E')] mix-blend-soft-light opacity-35" />
                    <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/10 bg-charcoal/50 p-5 backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.32em] text-sand/72">{item.title}</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-bone/75">{item.label}</p>
                    </div>
                    <motion.div
                      className="absolute inset-0 border border-transparent transition-colors group-hover:border-ember/45"
                      whileHover={{ boxShadow: '0 0 0 1px rgba(178, 58, 46, 0.3), 0 24px 80px rgba(0, 0, 0, 0.45)' }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionVariants}
              className="mb-10"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Experience</p>
              <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                An atmosphere built for slow nights.
              </h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {experiences.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  whileHover={{ y: -7 }}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 transition"
                >
                  <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${card.tint} p-6`}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-88 transition duration-700 group-hover:scale-105"
                           loading="lazy"
                       decoding="async"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,239,231,0.18),transparent_20%),linear-gradient(180deg,transparent,rgba(13,13,13,0.8))]" />
                    <div className="relative flex h-full flex-col justify-end">
                      <p className="text-xs uppercase tracking-[0.32em] text-sand/70">{card.title}</p>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-bone/80">{card.description}</p>
                    </div>
                  </div>
                  <div className="border-t border-white/8 px-6 py-6 transition group-hover:border-ember/40 group-hover:bg-ember/8">
                    <p className="text-sm uppercase tracking-[0.24em] text-sand/75">Curated detail</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="reserve" className="relative min-h-screen border-y border-white/5 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(178,58,46,0.2),transparent_32%),linear-gradient(180deg,#0d0d0d,#101010)]" />
          <div className="absolute inset-0 grain opacity-25" />

          <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Reservations</p>
              <h2 className="max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                Reserve your table at Casa Brava.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-bone/72">
                Step into a night of fire, flavor, and warm hospitality.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Name', type: 'text', value: formData.name, key: 'name' },
                  { label: 'Email', type: 'email', value: formData.email, key: 'email' },
                  { label: 'Date', type: 'date', value: formData.date, key: 'date' },
                  { label: 'Time', type: 'time', value: formData.time, key: 'time' },
                ].map((field) => (
                  <label key={field.label} className="flex flex-col gap-2 text-sm text-sand/85">
                    <span className="uppercase tracking-[0.24em] text-xs text-sand/70">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      value={field.value}
                      onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                      className="rounded-2xl border border-white/10 bg-charcoal/70 px-4 py-3 text-bone outline-none transition placeholder:text-bone/30 focus:border-ember/70 focus:ring-2 focus:ring-ember/20"
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2 text-sm text-sand/85">
                  <span className="uppercase tracking-[0.24em] text-xs text-sand/70">Guests</span>
                  <select
                    required
                    value={formData.guests}
                    onChange={(event) => setFormData((current) => ({ ...current, guests: event.target.value }))}
                    className="rounded-2xl border border-white/10 bg-charcoal/70 px-4 py-3 text-bone outline-none transition focus:border-ember/70 focus:ring-2 focus:ring-ember/20"
                  >
                    {['1', '2', '3', '4', '5', '6', '7', '8'].map((guestCount) => (
                      <option key={guestCount} value={guestCount}>
                        {guestCount}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-sand/85 sm:col-span-2">
                  <span className="uppercase tracking-[0.24em] text-xs text-sand/70">Message</span>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                    placeholder="Any notes, celebrations, or seating preferences."
                    className="rounded-2xl border border-white/10 bg-charcoal/70 px-4 py-3 text-bone outline-none transition placeholder:text-bone/30 focus:border-ember/70 focus:ring-2 focus:ring-ember/20"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-ember px-7 py-4 text-sm uppercase tracking-[0.24em] text-bone transition hover:-translate-y-0.5 hover:bg-wine hover:shadow-glow"
                >
                  Book Now
                </button>
                <AnimatePresence>
                  {formStatus === 'submitted' ? (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-sand"
                    >
                      Reservation request captured. This concept uses a frontend-only confirmation.
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-bone/55"
                    >
                      Frontend demo form with lightweight validation.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </div>
        </section>

        <section id="location" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionVariants}
              className="mb-10"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ember">Location</p>
              <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl">
                Find us in the heart of the city.
              </h2>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
              >
                <div className="space-y-8 text-bone/78">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-sand/70">Address</p>
                    <p className="mt-2 text-2xl text-bone">Av. Brava 128, Downtown District</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-sand/70">Hours</p>
                      <p className="mt-2 leading-7">Tuesday - Sunday<br />6:00 PM - 11:30 PM</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-sand/70">Phone</p>
                      <p className="mt-2 leading-7">+591 700 00000</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={handleDirection} className="rounded-full bg-ember px-6 py-3 text-xs uppercase tracking-[0.24em] text-bone transition hover:-translate-y-0.5 hover:bg-wine">
                      Get Directions
                    </button>
                    <button type="button" onClick={handleCall} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.24em] text-bone transition hover:-translate-y-0.5 hover:border-ember/60 hover:bg-ember/10">
                      Call Now
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(178,58,46,0.26),transparent_32%),linear-gradient(135deg,rgba(94,90,85,0.45),rgba(13,13,13,0.96))] p-4 shadow-2xl shadow-black/35"
              >
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-charcoal/45 p-8 text-center backdrop-blur-sm">
                  <img
                    src={locationVisual}
                    alt="Stylized map placeholder of Downtown District"
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                         loading="lazy"
                       decoding="async"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.08),rgba(13,13,13,0.7))]" />
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.35em] text-sand/70">Map placeholder</p>
                    <p className="mt-4 font-serif text-4xl text-bone">Downtown District</p>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-bone/72">
                      A stylized location card for portfolio presentation. Replace with a live map embed when deploying for a real venue.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-white/5 py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="mb-4 text-xs uppercase tracking-[0.35em] text-ember"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="font-serif text-4xl leading-tight tracking-[-0.03em] text-bone sm:text-5xl md:text-6xl"
            >
              Casa Brava is more than a restaurant.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.14 }}
              className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-bone/72"
            >
              It is a place for bold conversations, shared plates, warm light, and flavors that stay with you.
            </motion.p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#090909] py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[1fr_0.8fr_0.8fr]">
          <div>
            <p className="font-serif text-3xl text-bone">Casa Brava</p>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-sand/70">Fine Dining Concept</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-bone/60">Casa Brava — Concept Landing Page</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-ember">Navigation</p>
            <div className="mt-4 grid gap-3 text-sm text-bone/72">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-bone">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-ember">Newsletter</p>
            <div className="mt-4 flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/30 focus:border-ember/70 focus:ring-2 focus:ring-ember/20"
              />
              <button className="rounded-full bg-ember px-5 py-3 text-xs uppercase tracking-[0.24em] text-bone transition hover:bg-wine">
                Join
              </button>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm text-sand/75 transition hover:text-bone">
              Instagram placeholder
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;