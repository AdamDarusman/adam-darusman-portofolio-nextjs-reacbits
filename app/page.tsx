"use client";

import { useState } from "react";
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import LiquidEther from "./components/LiquidEther/LiquidEther";
import GooeyNav from "./components/GooeyNav/GooeyNav";

// ─── Data ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "SIRTRW",
    description:
      "Portal layanan publik digital terintegrasi untuk lingkungan RT/RW — pengurusan surat pengantar, pelaporan aduan warga, transparansi keuangan kas, hingga peminjaman inventaris secara real-time.",
    tech: ["Laravel", "Blade", "MySQL", "PHP"],
    status: "Active",
    statusColor: "bg-green-100 text-green-800 border-green-200",
    gradient: "from-teal-400 to-cyan-500",
    image: "/assets/projects/sirtrw2.png", // Isi dengan path gambar, contoh: "/assets/projects/sirtrw.jpg"
    github: "https://github.com/DhaniKWP/SIRTRW",
    live: null,
    stars: 0,
    forks: 3,
  },
  {
    title: "Wijaya Motor",
    description:
      "Sistem manajemen bengkel motor fullstack — booking service, manajemen mekanik, tracking status kendaraan, dan pembuatan invoice digital secara otomatis.",
    tech: ["Laravel", "Blade", "MySQL", "PHP"],
    status: "Completed",
    statusColor: "bg-blue-100 text-blue-800 border-blue-200",
    gradient: "from-orange-400 to-amber-500",
    image: "/assets/projects/wijayamotor.png", // Isi dengan path gambar
    github: "https://github.com/DhaniKWP/wijayamotor",
    live: null,
    stars: 1,
    forks: 0,
  },
  {
    title: "SafetyGuard",
    description:
      "Sistem Pelaporan Insiden & Kepatuhan K3 berbasis Java — laporan hazard, incident timeline, safety compliance checklist, dan risk assessment. Project UAS Semester 4 PBO.",
    tech: ["Java", "OOP", "Swing"],
    status: "Completed",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    gradient: "from-red-400 to-rose-500",
    image: "/assets/projects/safetyguard.png", // Isi dengan path gambar
    github: "https://github.com/DhaniKWP/SafetyGuard",
    live: null,
    stars: 0,
    forks: 0,
  },
  {
    title: "HRIS Java",
    description:
      "Human Resource Information System berbasis Java — manajemen karyawan, tracking absensi, penggajian, cuti, dan rekrutmen dalam satu platform terintegrasi.",
    tech: ["Java", "OOP", "MySQL"],
    status: "Completed",
    statusColor: "bg-blue-100 text-blue-800 border-blue-200",
    gradient: "from-blue-400 to-indigo-500",
    image: "/assets/projects/hris.png", // Isi dengan path gambar
    github: "https://github.com/DhaniKWP/hris-java",
    live: null,
    stars: 2,
    forks: 0,
  },
  {
    title: "TikTok Downloader",
    description:
      "Tool web sederhana untuk download video TikTok tanpa watermark dan konversi ke MP3. Paste link, klik download — selesai. Deployed di Railway.",
    tech: ["HTML", "CSS", "Python", "Flask"],
    status: "Live",
    statusColor: "bg-purple-100 text-purple-800 border-purple-200",
    gradient: "from-pink-400 to-purple-500",
    image: "/assets/projects/tiktok.png", // Isi dengan path gambar
    github: "https://github.com/DhaniKWP/Tiktok-Downloader",
    live: "https://tiktok-downloader-v2.up.railway.app/",
    stars: 0,
    forks: 0,
  },
  {
    title: "LelanginAja",
    description:
      "Platform lelang barang online berbasis web — sistem bidding real-time, manajemen produk, riwayat penawaran, dan integrasi pembayaran. Project akhir Pemrograman Web Semester 3.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    status: "Completed",
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    gradient: "from-green-400 to-emerald-500",
    image: "/assets/projects/lelanginaja.png", // Isi dengan path gambar
    github: "https://github.com/DhaniKWP/LelanginAja",
    live: null,
    stars: 0,
    forks: 0,
  },
  {
    title: "Pinkcash",
    description:
      "Aplikasi mobile berbasis Flutter untuk pencatatan keuangan pribadi. Memiliki antarmuka feminin bernuansa pink yang interaktif untuk melacak pemasukan, pengeluaran, serta target tabungan.",
    tech: ["Flutter", "Dart", "Mobile App"],
    status: "Completed",
    statusColor: "bg-pink-100 text-pink-800 border-pink-200",
    gradient: "from-pink-400 to-rose-400",
    image: "/assets/projects/pinkycash.jpeg", // Thumbnail Pinkcash
    images: ["/assets/projects/pinkycash.jpeg"], 
    github: "https://github.com/DhaniKWP/flutter-catatan-keuangan",
    live: null,
    stars: 0,
    forks: 0,
  },
  {
    title: "Pink To-Do List",
    description:
      "Aplikasi manajemen tugas (To-Do list) berbasis Flutter dengan antarmuka elegan bernuansa pink. Pengguna dapat mengelompokkan tugas berdasarkan kategori dan melacak progress penyelesaian harian.",
    tech: ["Flutter", "Dart", "Mobile App"],
    status: "Completed",
    statusColor: "bg-rose-100 text-rose-800 border-rose-200",
    gradient: "from-fuchsia-400 to-pink-500",
    image: "/assets/projects/todo.jpeg", // Thumbnail To-Do List
    images: ["/assets/projects/todo.jpeg"],
    github: "https://github.com/DhaniKWP/flutter-todo-list",
    live: null,
    stars: 0,
    forks: 0,
  },
];

const CERTIFICATES = [
  {
    title: "Sertifikat Kompetensi BNSP",
    issuer: "Badan Nasional Sertifikasi Profesi",
    date: "22 Juli 2024",
    color: "from-blue-500 to-indigo-600",
    icon: "🏅",
    image: "/assets/certificates/sertif1.jpeg", // Masukkan path gambar sertifikat BNSP di sini
    placeholder: false,
    description: "Telah dinyatakan kompeten untuk Kualifikasi Level II pada kompetensi keahlian Teknik Komputer dan Jaringan pada bidang pekerjaan Jaringan Komputer. Diselenggarakan oleh Lembaga Sertifikasi Profesi SMKN 5 Kab. Tangerang.",
  },
  {
    title: "Juara 3 Lomba Web Developer",
    issuer: "Global Institute (GLI 2025)",
    date: "Okt - Nov 2025",
    color: "from-amber-500 to-orange-600",
    icon: "🏆",
    image: "/assets/certificates/penghargaan1.jpeg", // Masukkan path gambar piagam penghargaan di sini
    placeholder: false,
    description: "Meraih Juara 3 dalam Lomba Web Developer pada acara Gebyar Lomba Inovasi (GLI) 2025 yang diselenggarakan di Global Institute. Penghargaan ini diberikan atas inovasi dan keahlian teknis dalam pengembangan website.",
  },
  {
    title: "Sertifikat Uji Kompetensi Keahlian",
    issuer: "Kemendikbud (PT. Mediatama Teknik Solusindo)",
    date: "20 Mei 2024",
    color: "from-purple-500 to-pink-600",
    icon: "🎖️",
    image: "/assets/certificates/sertif2.jpeg", // Masukkan path gambar sertifikat UKK di sini
    placeholder: false,
    description: "Lulus dengan predikat 'Kompeten' pada Uji Kompetensi Keahlian Teknik Komputer dan Jaringan. Telah berhasil menyelesaikan penugasan praktikum: Troubleshooting Keamanan Jaringan Pada Jaringan WAN.",
  },
  {
    title: "Sertifikat PRAKERIN",
    issuer: "PT. Takagi Sari Multi Utama",
    date: "20 Agustus 2022 – 20 November 2022",
    color: "from-teal-500 to-cyan-600",
    icon: "🏢",
    image: "/assets/certificates/takagi.jpeg",
    placeholder: false,
    description: "Telah melaksanakan Praktik Kerja Industri (PRAKERIN) di PT. Takagi Sari Multi Utama selama 3 bulan, mulai 20 Agustus 2022 hingga 20 November 2022. Kegiatan magang ini mencakup praktik kerja nyata di lingkungan industri manufaktur di kawasan industri Jatake, Tangerang.",
  },
  {
    title: "Sertifikat PRAKERIN",
    issuer: "PT. Mediatama Teknik Solusindo",
    date: "Juli 2023 – Oktober 2023",
    color: "from-red-500 to-orange-600",
    icon: "🏭",
    image: "/assets/certificates/mediatama.jpeg",
    placeholder: false,
    description: "Telah melaksanakan Praktik Kerja Industri (PRAKERIN) di PT. Mediatama Teknik Solusindo – Electrical Mechanical Rotating Service, Tangerang, selama 4 bulan, dari Juli 2023 hingga Oktober 2023. Dinyatakan lulus dengan hasil Sangat Baik pada bidang keahlian Teknik Komputer dan Jaringan.",
  },
];

// ─── Helper: scroll ke section ───────────────────────────────────────────────
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  const currentYear = new Date().getFullYear();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-200 relative overflow-hidden">
      {/* Main Iridescence Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <LiquidEther />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* ── Navigation ─────────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-blue-900/50 shadow-none">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <AnimatedContent
                distance={30}
                direction="horizontal"
                reverse={false}
                config={{ tension: 200, friction: 25 }}
                initialOpacity={0}
                animateOpacity
                threshold={0.1}
              >
                <button
                  onClick={() => scrollTo("home")}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-none">
                    <span className="text-white text-sm font-bold">D</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    DKWP
                  </span>
                </button>
              </AnimatedContent>

              <AnimatedContent
                distance={30}
                direction="horizontal"
                reverse={true}
                config={{ tension: 200, friction: 25 }}
                initialOpacity={0}
                animateOpacity
                threshold={0.1}
              >
                <div className="hidden md:flex items-center gap-6">
                  <GooeyNav
                    items={[
                      { label: "Home", onClick: () => scrollTo("home") },
                      { label: "About", onClick: () => scrollTo("about") },
                      { label: "Projects", onClick: () => scrollTo("projects") },
                      { label: "Certificate", onClick: () => scrollTo("certificates") },
                      { label: "Contact", onClick: () => scrollTo("contact") },
                    ]}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                  />
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/20"
                  >
                    Let&apos;s Talk
                  </button>
                </div>
              </AnimatedContent>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-blue-900/50 pt-4 flex flex-col gap-3">
                {[
                  { label: "Home", id: "home" },
                  { label: "About", id: "about" },
                  { label: "Projects", id: "projects" },
                  { label: "Certificates", id: "certificates" },
                  { label: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollTo(item.id);
                      setMenuOpen(false);
                    }}
                    className="text-left text-slate-400 hover:text-blue-600 font-medium py-1 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    scrollTo("contact");
                    setMenuOpen(false);
                  }}
                  className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium text-center"
                >
                  Let&apos;s Talk
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <section id="home" className="pt-24 pb-20 relative">
          <div className="absolute inset-0 opacity-20 z-0">
            <LiquidEther />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[85vh] py-8 lg:py-0">
              {/* Left Content */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="space-y-8 max-w-4xl">
                  {/* Status Badge */}
                  <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 200, friction: 20 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.1}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full shadow-none backdrop-blur-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 text-sm font-medium">
                        Available for opportunities
                      </span>
                    </div>
                  </AnimatedContent>

                  {/* Main Heading */}
                  <div className="space-y-6">
                    <AnimatedContent
                      distance={80}
                      direction="vertical"
                      reverse={false}
                      config={{ tension: 150, friction: 20 }}
                      initialOpacity={0}
                      animateOpacity
                      threshold={0.2}
                    >
                      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-200 leading-tight">
                        Hello, I&apos;m
                      </h1>
                    </AnimatedContent>

                    <AnimatedContent
                      distance={80}
                      direction="vertical"
                      reverse={false}
                      config={{ tension: 150, friction: 20 }}
                      initialOpacity={0}
                      animateOpacity
                      threshold={0.2}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-200">
                          a
                        </span>
                        <RotatingText
                          texts={[
                            "Software Engineer",
                            "Full-Stack Developer",
                            "Problem Solver",
                            "Tech Innovator",
                          ]}
                          mainClassName="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-xl sm:text-2xl lg:text-4xl font-bold inline-flex transition-all shadow-none"
                          staggerFrom="center"
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-100%" }}
                          staggerDuration={0.03}
                          splitLevelClassName="overflow-hidden"
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 400,
                          }}
                          rotationInterval={3500}
                        />
                      </div>
                    </AnimatedContent>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <SplitText
                      text="Dhani Kusuma Wardana Putra"
                      className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                      delay={100}
                      animationFrom={{ opacity: 0, transform: "translate3d(0,60px,0)" }}
                      animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                      threshold={0.2}
                      rootMargin="-30px"
                    />
                  </div>

                  {/* Description */}
                  <div className="max-w-2xl">
                    <BlurText
                      text="Mahasiswa di Global Institute jurusan Software Engineering, berasal dari Tangerang. Passionate dalam pengembangan perangkat lunak modern dan solusi digital inovatif."
                      delay={60}
                      animateBy="words"
                      direction="top"
                      className="text-base sm:text-xl text-slate-400 leading-relaxed"
                    />
                  </div>

                  {/* CTA Buttons */}
                  <AnimatedContent
                    distance={60}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 200, friction: 25 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.3}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        onClick={() => scrollTo("projects")}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-none hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        View My Work
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => scrollTo("contact")}
                        className="px-8 py-4 border-2 border-blue-200 text-slate-300 rounded-xl font-medium hover:bg-blue-950/40 hover:border-blue-300 transition-all duration-300 backdrop-blur-sm"
                      >
                        Get In Touch
                      </button>
                    </div>
                  </AnimatedContent>
                </div>
              </div>

              {/* Right Content - Lanyard */}
              <div className="lg:col-span-5 order-1 lg:order-2 hidden sm:flex justify-center lg:justify-end">
                <AnimatedContent
                  distance={80}
                  direction="horizontal"
                  reverse={true}
                  config={{ tension: 120, friction: 20 }}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.1}
                >
                  <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
                    <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-40 animate-pulse" />
                    <div
                      className="absolute bottom-16 right-8 w-20 h-20 bg-indigo-200 rounded-full blur-xl opacity-60 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                    <div className="absolute top-1/3 right-16 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce" />
                    <div
                      className="absolute bottom-1/3 left-12 w-3 h-3 bg-indigo-400 rounded-full opacity-70 animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    />

                    {/* Lanyard */}
                    <div className="relative z-10 w-[300px] h-[400px]">
                      <Lanyard
                        position={[0, 0, 20]}
                        gravity={[0, -40, 0]}
                        segments={10}
                        enablePhysics={true}
                      />
                    </div>

                    {/* Floating Card */}
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-none p-4 w-56 border border-blue-900/50 transform rotate-6 hover:rotate-3 transition-transform duration-500 z-20">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">D</span>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-sm">DKWP</h3>
                            <p className="text-blue-100 text-xs">Software Engineering</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-slate-400 text-xs">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-slate-400 text-xs">Global Institute</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full" />
                          <span className="text-slate-400 text-xs">Tangerang, ID</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ── About Section ────────────────────────────────────────────── */}
        <section id="about" className="py-20 bg-slate-900/40 backdrop-blur-sm relative">
          <div className="absolute inset-0 opacity-15 z-0">
            <LiquidEther />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedContent
              distance={80}
              direction="vertical"
              reverse={false}
              config={{ tension: 150, friction: 25 }}
              initialOpacity={0}
              animateOpacity
              threshold={0.3}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                  About Me
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Passionate about creating innovative solutions through code
                </p>
              </div>
            </AnimatedContent>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <AnimatedContent
                  distance={60}
                  direction="horizontal"
                  reverse={false}
                  config={{ tension: 150, friction: 25 }}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.4}
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-slate-200">My Journey</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Mahasiswa di <strong>Global Institute</strong> jurusan Software
                      Engineering, berasal dari <strong>Tangerang, Banten</strong>. Gue
                      fokus belajar teknologi modern untuk menciptakan solusi digital yang
                      berdampak positif bagi masyarakat.
                    </p>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Passion gue ada di full-stack development — gue suka tantangan logis
                      di sisi backend sekaligus kreativitas di sisi frontend. Mulai dari
                      web Laravel, Java, sampai Python Flask.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {[
                        { value: "10+", label: "Projects" },
                        { value: "4+", label: "Languages" },
                        { value: "48", label: "GitHub Repos" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="text-center p-4 bg-slate-900/70 rounded-2xl border border-blue-900/50 shadow-none"
                        >
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {stat.value}
                          </div>
                          <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedContent>

                <AnimatedContent
                  distance={60}
                  direction="horizontal"
                  reverse={true}
                  config={{ tension: 150, friction: 25 }}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.4}
                >
                  <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-none border border-blue-900/50">
                    <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Tech Stack
                    </h4>
                    <div className="space-y-4">
                      {[
                        { label: "Backend", skills: ["Laravel", "PHP", "Java", "Python Flask", "Node.js"] },
                        { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
                        { label: "Mobile", skills: ["Kotlin", "Flutter"] },
                        { label: "Database", skills: ["MySQL", "SQLite"] },
                      ].map((group) => (
                        <div key={group.label}>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                            {group.label}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-blue-950/40 text-blue-700 border border-blue-900/50 rounded-lg text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects Section ─────────────────────────────────────────── */}
        <section
          id="projects"
          className="py-20 bg-slate-950/40 relative"
        >
          <div className="absolute inset-0 opacity-10 z-0">
            <LiquidEther />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedContent
              distance={80}
              direction="vertical"
              reverse={false}
              config={{ tension: 150, friction: 25 }}
              initialOpacity={0}
              animateOpacity
              threshold={0.3}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                  Featured Projects
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  A showcase of my development journey — real projects from my GitHub
                </p>
                <a
                  href="https://github.com/DhaniKWP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-slate-800 text-white rounded-full text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Lihat semua di GitHub
                </a>
              </div>
            </AnimatedContent>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project, index) => (
                  <AnimatedContent
                    key={index}
                    distance={60}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 150, friction: 25 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.4}
                  >
                    <div className="bg-slate-900/70 backdrop-blur-sm border border-blue-900/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full">
                      {/* Preview area */}
                      {project.image ? (
                        <div 
                          className="w-full h-40 relative border-b border-blue-50 cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                          {project.stars > 0 && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs z-10">
                              ⭐ {project.stars}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => setSelectedProject(project)}
                          className={`w-full h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden cursor-pointer`}
                        >
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                          <span className="text-white/80 text-5xl font-black tracking-tighter select-none drop-shadow">
                            {project.title.split(" ")[0].toUpperCase()}
                          </span>
                          {/* Stars badge */}
                          {project.stars > 0 && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
                              ⭐ {project.stars}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}
                          >
                            {project.status}
                          </span>
                          <div className="flex gap-2">
                            {/* GitHub button */}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Lihat di GitHub"
                              className="w-8 h-8 bg-slate-800 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 text-slate-400"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                            {/* Live button */}
                            {project.live ? (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Lihat website"
                                className="w-8 h-8 bg-blue-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 text-blue-600"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            ) : (
                              <div
                                title="Belum ada live demo"
                                className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 cursor-not-allowed"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-200 mb-3">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 mb-4 leading-relaxed text-sm flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, ti) => (
                            <span
                              key={ti}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Certificates & Awards Section ────────────────────────────── */}
        <section id="certificates" className="py-20 bg-slate-900/40 backdrop-blur-sm relative">
          <div className="absolute inset-0 opacity-15 z-0">
            <LiquidEther />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedContent
              distance={80}
              direction="vertical"
              reverse={false}
              config={{ tension: 150, friction: 25 }}
              initialOpacity={0}
              animateOpacity
              threshold={0.3}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                  Certificates & Awards
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Pencapaian, sertifikasi, dan penghargaan yang telah diraih
                </p>
              </div>
            </AnimatedContent>

            <div className="max-w-6xl mx-auto">
              {/* Certificate Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {CERTIFICATES.map((cert, index) => (
                  <AnimatedContent
                    key={index}
                    distance={60}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 150, friction: 25 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.4}
                  >
                    <div 
                      onClick={() => setSelectedCertificate(cert)}
                      className="bg-slate-900/70 backdrop-blur-sm border border-blue-900/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer flex flex-col h-full"
                    >
                      {/* Image area */}
                      {cert.image ? (
                        <div className="w-full h-44 relative border-b border-blue-50">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-full h-44 bg-gradient-to-br ${cert.color} flex flex-col items-center justify-center relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
                          <span className="text-5xl mb-2 drop-shadow">{cert.icon}</span>
                          {cert.placeholder && (
                            <span className="text-white/70 text-xs font-medium bg-slate-900/10 px-3 py-1 rounded-full">
                              📸 Tambahkan Gambar
                            </span>
                          )}
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-slate-200 mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mb-3">{cert.issuer}</p>
                        <p className="text-slate-400 leading-relaxed text-sm flex-1 line-clamp-3">
                          {cert.description}
                        </p>
                        {cert.date && (
                          <div className="mt-4 pt-4 border-t border-slate-800">
                            <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-600 rounded-full text-xs font-medium">
                              {cert.date}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Section ──────────────────────────────────────────── */}
        <section
          id="contact"
          className="py-20 bg-slate-950/40 relative"
        >
          <div className="absolute inset-0 opacity-15 z-0">
            <LiquidEther />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedContent
              distance={80}
              direction="vertical"
              reverse={false}
              config={{ tension: 150, friction: 25 }}
              initialOpacity={0}
              animateOpacity
              threshold={0.3}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                  Let&apos;s Connect
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Ready to collaborate or just want to say hello?
                </p>
              </div>
            </AnimatedContent>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <AnimatedContent
                  distance={60}
                  direction="horizontal"
                  reverse={false}
                  config={{ tension: 150, friction: 25 }}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.4}
                >
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-slate-200">Get in Touch</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Gue selalu terbuka untuk diskusi peluang baru, proyek kreatif,
                      atau ngobrol soal teknologi dan inovasi!
                    </p>

                    <div className="space-y-4">
                      {[
                        {
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          ),
                          title: "Email",
                          content: "dhanikusuma256@gmail.com",
                          href: "mailto:dhanikusuma256@gmail.com",
                          color: "from-blue-500 to-indigo-500",
                        },
                        {
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          ),
                          title: "Location",
                          content: "Tangerang, Banten, Indonesia",
                          href: null,
                          color: "from-green-500 to-emerald-500",
                        },
                        {
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          ),
                          title: "LinkedIn",
                          content: "linkedin.com/in/DhaniKWP",
                          href: "https://www.linkedin.com/in/DhaniKWP",
                          color: "from-blue-600 to-blue-700",
                        },
                        {
                          icon: (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          ),
                          title: "GitHub",
                          content: "github.com/DhaniKWP",
                          href: "https://github.com/DhaniKWP",
                          color: "from-slate-600 to-slate-800",
                        },
                      ].map((contact, index) => {
                        const inner = (
                          <div className="flex items-center gap-4 p-4 bg-slate-900/70 backdrop-blur-sm rounded-xl border border-blue-900/50 hover:shadow-none transition-all duration-300 group">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${contact.color} text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-none`}
                            >
                              {contact.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-200">
                                {contact.title}
                              </h4>
                              <p className="text-slate-400 text-sm">{contact.content}</p>
                            </div>
                          </div>
                        );
                        return contact.href ? (
                          <a
                            key={index}
                            href={contact.href}
                            target={contact.href.startsWith("mailto") ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div key={index}>{inner}</div>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedContent>

                <AnimatedContent
                  distance={60}
                  direction="horizontal"
                  reverse={true}
                  config={{ tension: 150, friction: 25 }}
                  initialOpacity={0}
                  animateOpacity
                  threshold={0.4}
                >
                  <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/50 shadow-none">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-900/40 backdrop-blur-sm"
                          placeholder="Your Name"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-900/40 backdrop-blur-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-slate-900/40 backdrop-blur-sm"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <button
                        onClick={() => {
                          const name = (
                            document.getElementById("contact-name") as HTMLInputElement
                          )?.value;
                          const email = (
                            document.getElementById("contact-email") as HTMLInputElement
                          )?.value;
                          const message = (
                            document.getElementById("contact-message") as HTMLTextAreaElement
                          )?.value;
                          const subject = encodeURIComponent(
                            `Portfolio Contact from ${name || "Someone"}`
                          );
                          const body = encodeURIComponent(
                            `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                          );
                          window.open(
                            `mailto:dhanikusuma256@gmail.com?subject=${subject}&body=${body}`,
                            "_self"
                          );
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-none hover:scale-105 transition-all duration-300"
                      >
                        Send Message ✨
                      </button>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5 z-0">
            <LiquidEther />
          </div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl translate-x-40 translate-y-40" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="pt-16 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-none">
                      <span className="text-white text-lg font-bold">D</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        Dhani Kusuma Wardana Putra
                      </h3>
                      <p className="text-slate-400 text-sm">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4 max-w-md">
                    Passionate about creating innovative digital solutions through modern
                    technology. Based in Tangerang, Banten — building the future, one
                    line of code at a time.
                  </p>
                  <p className="text-slate-400 text-sm italic mb-4">
                    &ldquo;Eat &gt; Sleep &gt; Code &gt; Repeat&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">
                      Available for opportunities
                    </span>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                  <ul className="space-y-3">
                    {[
                      { label: "Home", id: "home" },
                      { label: "About", id: "about" },
                      { label: "Projects", id: "projects" },
                      { label: "Certificates", id: "certificates" },
                      { label: "Contact", id: "contact" },
                    ].map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollTo(item.id)}
                          className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        >
                          <div className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300" />
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-white">Let&apos;s Connect</h4>
                  <div className="space-y-4">
                    {[
                      {
                        name: "GitHub",
                        handle: "@DhaniKWP",
                        href: "https://github.com/DhaniKWP",
                        color: "hover:bg-gray-600",
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        ),
                      },
                      {
                        name: "LinkedIn",
                        handle: "/in/DhaniKWP",
                        href: "https://www.linkedin.com/in/DhaniKWP",
                        color: "hover:bg-blue-600",
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        ),
                      },
                      {
                        name: "Email",
                        handle: "dhanikusuma256@gmail.com",
                        href: "mailto:dhanikusuma256@gmail.com",
                        color: "hover:bg-indigo-600",
                        icon: (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        ),
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 group"
                      >
                        <div
                          className={`w-10 h-10 bg-slate-900/10 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 group-hover:scale-110`}
                        >
                          {social.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{social.name}</span>
                          <span className="text-xs text-slate-400">{social.handle}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="py-6 border-t border-slate-700/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-400 text-sm">
                  <span>© {currentYear} Dhani Kusuma Wardana Putra</span>
                  <div className="hidden md:block w-1 h-1 bg-slate-500 rounded-full" />
                  <span>All rights reserved</span>
                </div>
                <div className="flex items-center gap-6 text-slate-400 text-sm">
                  <a
                    href="https://github.com/DhaniKWP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/5 text-center">
                <p className="text-slate-500 text-xs flex items-center justify-center gap-2">
                  <span>Crafted with</span>
                  <span className="text-red-400 animate-pulse">❤️</span>
                  <span>using React, Next.js &amp; Tailwind CSS</span>
                  <span className="mx-2">•</span>
                  <span>Deployed on Vercel</span>
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Modal Project */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedProject(null)}
            />
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col lg:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-200 transition-colors"
                aria-label="Tutup Modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              {/* Image Side */}
              <div className="w-full lg:w-3/5 bg-slate-800 min-h-[220px] sm:min-h-[300px] lg:h-[80vh] relative flex flex-col items-center justify-start overflow-y-auto p-3 sm:p-4 gap-4 sm:gap-6 scrollbar-hide">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  selectedProject.images.map((img: string, idx: number) => (
                    img ? (
                      <div key={idx} className="relative w-full min-h-[280px] sm:min-h-[400px] lg:min-h-[600px] flex-shrink-0 bg-slate-900 rounded-xl shadow-none border border-slate-700 overflow-hidden">
                        <Image src={img} alt={`${selectedProject.title} screenshot ${idx + 1}`} fill className="object-contain p-2" />
                      </div>
                    ) : null
                  ))
                ) : selectedProject.image ? (
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-contain p-4" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                    <span className="text-white/80 text-8xl font-black tracking-tighter select-none drop-shadow">
                      {selectedProject.title.split(" ")[0].toUpperCase()}
                    </span>
                  </div>
                )}
                
                {/* Fallback empty message for images array */}
                {selectedProject.images && selectedProject.images.every((i: string) => !i) && !selectedProject.image && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                    <span className="text-white/80 text-8xl font-black tracking-tighter select-none drop-shadow">
                      {selectedProject.title.split(" ")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content Side */}
              <div className="w-full lg:w-2/5 p-5 sm:p-8 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-start mb-3 sm:mb-4 gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-200">{selectedProject.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedProject.statusColor}`}>
                    {selectedProject.status}
                  </span>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Teknologi yang Digunakan</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech: string, ti: number) => (
                      <span key={ti} className="px-3 py-1 bg-blue-950/40 text-blue-700 border border-blue-900/50 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto flex gap-4 pt-6 border-t border-slate-800">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  {selectedProject.live && (
                    <a 
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Sertifikat */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedCertificate(null)}
            />
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-200 transition-colors"
                aria-label="Tutup Modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              {/* Image Side */}
              <div className="w-full md:w-3/5 bg-slate-800 min-h-[220px] sm:min-h-[300px] md:min-h-[500px] relative flex items-center justify-center">
                {selectedCertificate.image ? (
                  <Image src={selectedCertificate.image} alt={selectedCertificate.title} fill className="object-contain" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${selectedCertificate.color} flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
                    <span className="text-8xl mb-2 drop-shadow">{selectedCertificate.icon}</span>
                  </div>
                )}
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-2/5 p-5 sm:p-8 flex flex-col overflow-y-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2">{selectedCertificate.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{selectedCertificate.issuer}</p>
                {selectedCertificate.date && (
                  <span className="inline-block px-3 py-1 bg-blue-950/40 text-blue-600 rounded-full text-xs font-medium w-fit mb-6">
                    {selectedCertificate.date}
                  </span>
                )}
                <div className="prose prose-slate">
                  <h4 className="text-lg font-semibold text-slate-300 mb-2">Tentang Sertifikat Ini</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {selectedCertificate.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-none hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}