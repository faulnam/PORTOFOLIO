import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Code,
  Database,
  Globe,
  Layers,
  ExternalLink,
  Download,
  Star,
  Briefcase,
  Award,
  GraduationCap,
  Phone,
  CheckCircle2,
  X,
  ZoomIn,
} from "lucide-react";

interface WindowContentProps {
  app: string;
  isDark: boolean;
}

const SKILLS = [
  {
    category: "Backend Development",
    items: [
      "PHP",
      "Laravel",
      "MySQL",
      "REST API Integration",
      "Autentikasi & Otorisasi",
      "CRUD & Pengolahan Data",
    ],
    icon: Database,
    level: 95,
  },
  {
    category: "Frontend Development",
    items: [
      "JavaScript",
      "Tailwind CSS",
      "Alpine.js",
      "Blade Templating",
      "HTML5 & CSS3",
      "Responsive Web Design",
    ],
    icon: Globe,
    level: 92,
  },
  {
    category: "Tools & Deployment",
    items: [
      "Git & GitHub",
      "Postman",
      "Payment Gateway (Midtrans/Xendit)",
      "Domain & Hosting Setup",
      "WhatsApp API Integration",
      "Keamanan Siber (BNSP)",
    ],
    icon: Code,
    level: 90,
  },
  {
    category: "Produk Digital & Lainnya",
    items: [
      "Template Boilerplate Web",
      "Canva & Figma (UI/UX Dasar)",
      "Copywriting & MS Office",
      "Manajemen Proyek Klien",
    ],
    icon: Layers,
    level: 88,
  },
];

const PROFICIENCIES = [
  {
    skill: "PHP & Laravel Framework",
    level: 95,
    color: "from-red-500 to-orange-500",
  },
  {
    skill: "Blade, Tailwind CSS & Alpine.js",
    level: 92,
    color: "from-blue-500 to-cyan-500",
  },
  {
    skill: "MySQL & REST API Integration",
    level: 90,
    color: "from-emerald-500 to-green-500",
  },
  {
    skill: "Payment Gateway (Midtrans/Xendit) & Deployment",
    level: 88,
    color: "from-purple-500 to-indigo-500",
  },
  {
    skill: "Pengembangan Boilerplate Website Siap Pakai",
    level: 94,
    color: "from-amber-400 to-orange-500",
  },
  {
    skill: "Keamanan Siber (BNSP Junior Cyber Security)",
    level: 90,
    color: "from-blue-600 to-indigo-500",
  },
  {
    skill: "UI/UX Dasar (Figma/Canva) & Manajemen Proyek Klien",
    level: 85,
    color: "from-pink-500 to-rose-500",
  },
];

const CERTIFICATES = [
  {
    title: "Sertifikat Kompetensi BNSP — Keamanan Siber Muda (Junior Cyber Security)",
    number: "No. 62021 2529 2 0150163 2025 / Reg. TIK 1565 34852 2025",
    image: "/bnsp-cyber-security.jpg",
    description:
      "Sertifikat Kompetensi resmi berskala nasional dari Badan Nasional Sertifikasi Profesi (BNSP) melalui Lembaga Sertifikasi Profesi (LSP) Teknologi Digital. Menyatakan M. Syifaul Anam telah kompeten pada bidang Keamanan Siber (Cyber Security) dengan kualifikasi Keamanan Siber Muda (Junior Cyber Security).",
    badge: "Sertifikasi Profesi BNSP",
  },
  {
    title: "Specialist Media Social",
    number: "-",
    image: "/tumbu.png",
    description:
      "Sertifikat ini membuktikan keahlian dalam merancang, mengelola, dan mengevaluasi strategi media sosial yang efektif untuk meningkatkan brand awareness dan engagement.",
  },
  {
    title: "Digital Marketing",
    number: "-",
    image: "/1.png",
    description:
      "Mengenal dasar-dasar pemasaran digital, termasuk strategi online, periklanan, hingga konversi pelanggan dalam ekosistem digital modern.",
  },
  {
    title: "Mastering Capcut",
    number: "626/25/FTH/2024",
    image: "/2.png",
    description:
      "Sertifikat ini menunjukkan kemampuan dalam mengedit video kreatif menggunakan Capcut untuk konten digital, termasuk efek, transisi, dan storytelling visual.",
  },
  {
    title: "Digital Advertising menggunakan Meta Ads",
    number: "625/27/FTH/2024",
    image: "/3.png",
    description:
      "Mendalami strategi iklan digital melalui platform Meta (Facebook & Instagram Ads), termasuk segmentasi, targeting, dan optimalisasi kampanye.",
  },
  {
    title: "Menyusun CV yang Profesional dan Menunjang Karir",
    number: "624/6/FTH/2024",
    image: "/17.png",
    description:
      "Pelatihan ini memberikan panduan praktis untuk membuat CV profesional yang menarik HRD dan relevan dengan kebutuhan industri.",
  },
  {
    title: "Memaksimalkan LinkedIn untuk Peluang Kerja",
    number: "623/7/FTH/2024",
    image: "/5.png",
    description:
      "Menjelaskan cara membangun profil LinkedIn yang kuat, memperluas jaringan profesional, dan menarik rekruter melalui strategi konten.",
  },
  {
    title: "Rahasia Sukses dalam Wawancara Kerja",
    number: "622/8/FTH/2024",
    image: "/6.png",
    description:
      "Mengajarkan teknik menjawab pertanyaan wawancara, membangun kesan positif, dan mempresentasikan diri secara profesional.",
  },
  {
    title: "Teknik Pembuatan Presentasi yang Memikat",
    number: "621/9/FTH/2024",
    image: "/7.png",
    description:
      "Pelatihan ini membahas cara menyusun slide yang menarik, menyampaikan pesan dengan efektif, dan menjaga perhatian audiens.",
  },
  {
    title: "Search Engine Optimization Fundamental",
    number: "619/23/FTH/2024",
    image: "/8.png",
    description:
      "Mempelajari dasar-dasar SEO, termasuk optimasi on-page, keyword research, dan peningkatan peringkat di mesin pencari.",
  },
  {
    title: "Customer Segmentation",
    number: "618/1/FTH/2024",
    image: "/9.png",
    description:
      "Sertifikat ini menunjukkan pemahaman dalam membagi pasar menjadi segmen yang relevan untuk meningkatkan efektivitas kampanye pemasaran.",
  },
  {
    title: "Digital Marketing Channel",
    number: "617/4/FTH/2024",
    image: "/10.png",
    description:
      "Mengenal berbagai kanal digital (email, sosial media, website, dll) dan bagaimana mengelolanya secara terintegrasi.",
  },
  {
    title: "Social Media Marketing",
    number: "616/17/FTH/2024",
    image: "/11.png",
    description:
      "Pelatihan dalam strategi pemasaran melalui platform media sosial, mulai dari perencanaan konten hingga analisis performa.",
  },
  {
    title: "Content Marketing",
    number: "615/5/FTH/2024",
    image: "/12.png",
    description:
      "Fokus pada cara membuat konten yang relevan dan bernilai untuk menarik, melibatkan, dan mempertahankan audiens.",
  },
  {
    title: "Seni Komunikasi Efektif",
    number: "620/10/FTH/2024",
    image: "/13.png",
    description:
      "Mempelajari teknik komunikasi interpersonal yang efektif, baik verbal maupun non-verbal, dalam konteks profesional.",
  },
  {
    title: "Business Model Development",
    number: "614/2/FTH/2024",
    image: "/14.png",
    description:
      "Sertifikat ini membuktikan kemampuan merancang dan mengembangkan model bisnis inovatif yang berkelanjutan.",
  },
  {
    title: "Analytics and Data-Driven Marketing",
    number: "613/3/FTH/2024",
    image: "/15.png",
    description:
      "Menunjukkan kompetensi dalam menganalisis data pemasaran untuk mengambil keputusan strategis berbasis insight.",
  },
  {
    title: "Product Marketing",
    number: "612/15/FTH/2024",
    image: "/16.png",
    description:
      "Fokus pada strategi peluncuran produk, positioning, dan komunikasi nilai produk untuk pasar sasaran.",
  },
  {
    title: "Introduction to Digital Marketing",
    number: "611/12/FTH/2024",
    image: "/4.png",
    description:
      "Sebagai pengantar dunia pemasaran digital, sertifikat ini mencakup overview kanal digital, strategi dasar, dan tren industri.",
  },
];

const PROJECTS = [
  {
    title: "JuangDev — Studio Web & Katalog 20+ Produk Digital",
    domain: "juangdev.my.id",
    image: "/projek/juangdev.my.id.png",
    description:
      "Platform studio pengembangan web mandiri yang menghimpun 20+ proyek aplikasi web dan produk digital siap pakai dalam berbagai kategori (SaaS, E-Commerce, POS Kasir, Sistem Informasi, Company Profile, hingga Landing Page). Seluruh katalog karya lengkap dapat dijelajahi langsung melalui website JuangDev.",
    features: [
      "Etalase utama 20+ proyek web & produk digital siap pakai",
      "Mencakup sistem SaaS, POS Kasir, E-Commerce, & Sistem Informasi",
      "Pengembangan end-to-end berbasis Laravel, Tailwind CSS, & MySQL",
      "Integrasi Payment Gateway (Midtrans/Xendit) & notifikasi WhatsApp",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js", "MySQL"],
    link: "https://juangdev.my.id",
  },
  {
    title: "NoraPadel — Platform E-Commerce Spesialis Padel",
    domain: "norapadel.com",
    image: "/projek/norapadel.com.png",
    description:
      "Platform e-commerce resmi PT Nora Active Indonesia untuk penjualan raket, sepatu, tas, dan perlengkapan olahraga padel original dari berbagai brand global ternama dengan pengalaman belanja modern dan cepat.",
    features: [
      "Proyek platform e-commerce resmi dari PT Nora Active Indonesia",
      "Fitur cerdas AI Racket Finder untuk rekomendasi raket sesuai profil pemain",
      "Katalog produk multi-brand dengan filter kategori, harga, dan pencarian cepat",
      "Dukungan multi-bahasa (Indonesia & Inggris) serta konsultasi ahli padel",
    ],
    tech: ["PHP", "Laravel", "Blade", "Tailwind CSS", "MySQL", "REST API"],
    link: "https://norapadel.com",
  },
  {
    title: "LeadMaps BI — Business Lead Scraper & Market Intelligence",
    domain: "scraping.juangdev.my.id",
    image: "/projek/scraping.juangdev.my.id.png",
    description:
      "Produk SaaS intelijen bisnis dan otomasi lead generation buatan JuangDev yang memetakan ribuan bisnis lokal di Google Maps (seperti klinik, restoran, kafe, salon, dan UMKM) yang belum memiliki website untuk mempermudah penawaran solusi digital.",
    features: [
      "Produk SaaS intelijen pasar & scraping Google Maps buatan JuangDev",
      "Fitur otomatis No-Website Hunter & pemetaan prospek B2B potensial",
      "Dashboard analitik prospek real-time & manajemen pipeline outreach WhatsApp",
      "Manajemen paket berlangganan (Plan & Kasir), API Key, dan multi-pengguna",
    ],
    tech: ["Laravel", "Tailwind CSS", "JavaScript", "REST API", "MySQL"],
    link: "https://scraping.juangdev.my.id",
  },
  {
    title: "Warkasir — Sistem Kasir (POS) & Self-Order QR Multi-Kedai",
    domain: "warkasir.juangdev.my.id",
    image: "/projek/warkasir.juangdev.my.id.png",
    description:
      "Produk SaaS sistem kasir modern (Point of Sale) berlangganan buatan JuangDev untuk kafe, warung makan, dan bisnis kuliner multi-kedai. Memungkinkan pelanggan memesan serta membayar mandiri langsung dari meja via scan QR Code tanpa antre dan tanpa instal aplikasi.",
    features: [
      "Produk SaaS kasir POS & self-order multi-kedai buatan JuangDev",
      "Pemesanan mandiri (Self-Order) melalui scan QR Code di setiap meja",
      "Integrasi pembayaran digital QRIS otomatis & manajemen transaksi kasir",
      "Notifikasi pesanan otomatis langsung ke WhatsApp kasir dan pelanggan",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "QRIS Payment", "WhatsApp API"],
    link: "https://warkasir.juangdev.my.id",
  },
  {
    title: "Catatanku — Doodle Workspace & Manajemen Tugas",
    domain: "catatanku.juangdev.my.id",
    image: "/projek/catatanku.juangdev.my.id.png",
    description:
      "Produk web ruang kerja digital kreatif buatan JuangDev bergaya ilustrasi doodle (Neo-Brutalism) untuk mengelola checklist harian, memantau tenggat waktu (deadline), menyusun board pekerjaan, serta mencatat wishlist dan target impian dengan antarmuka yang ceria.",
    features: [
      "Produk workspace digital & to-do list buatan JuangDev",
      "Manajemen multi-board tugas interaktif & pemantauan tugas overdue",
      "Kalender agenda terintegrasi untuk penjadwalan target harian dan mingguan",
      "Sistem pengingat alarm & Web Push Notification otomatis",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js", "Web Push API"],
    link: "https://catatanku.juangdev.my.id",
  },
  {
    title: "Kedai Printingku — E-Commerce Digital & Offset Printing",
    domain: "kedaiprintingku.id",
    image: "/projek/kedaiprintingku.id.png",
    description:
      "Proyek platform e-commerce percetakan digital dan offset yang dikembangkan saat bekerja di PT Andidev, memudahkan pelanggan memesan jasa cetak banner, stiker vinyl, kaos DTF, hingga merchandise dengan kalkulator estimasi harga dan pelacakan pesanan real-time.",
    features: [
      "Proyek platform e-commerce percetakan dari PT Andidev",
      "Kalkulator estimasi harga cetak otomatis berdasarkan ukuran & spesifikasi bahan",
      "Fitur pelacakan status pesanan (Lacak Pesanan) secara real-time",
      "Katalog produk terstruktur dengan integrasi konsultasi desain via WhatsApp",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "MySQL", "WhatsApp Integration"],
    link: "https://kedaiprintingku.id",
  },
  {
    title: "Leo Printing — Katalog & Kalkulasi Percetakan Online",
    domain: "leoprinting.juangdev.my.id",
    image: "/projek/leoprinting.juangdev.my.id.png",
    description:
      "Proyek aplikasi web percetakan yang dikembangkan saat bekerja di PT Andidev, menghadirkan solusi pemesanan cepat dan berkualitas untuk roll-up banner, x-banner, spanduk, stiker, kaos custom, kartu nama, brosur, hingga merchandise dengan kalkulasi harga otomatis.",
    features: [
      "Proyek pengembangan aplikasi web percetakan dari PT Andidev",
      "Kalkulasi harga otomatis sesuai spesifikasi cetak dan kuantitas pesanan",
      "Navigasi cepat berbasis kategori produk, pencarian instan, dan keranjang belanja",
      "Banner kampanye promo dinamis & tombol konsultasi cepat WhatsApp",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "JavaScript", "MySQL"],
    link: "https://leoprinting.juangdev.my.id",
  },
  {
    title: "Innerbeauty — E-Commerce Skincare, Nail Art & Kosmetik",
    domain: "innerbeauty.id",
    image: "/projek/innerbeauty.id.png",
    description:
      "Platform e-commerce kecantikan dan perawatan kulit dari PT Nora Active Indonesia, menyediakan koleksi nail art, kutek gel, skincare, dan kosmetik premium original dengan desain antarmuka elegan serta pengalaman belanja yang aman.",
    features: [
      "Proyek toko online kecantikan & skincare dari PT Nora Active Indonesia",
      "Katalog produk kecantikan berdasarkan kategori, brand, dan New Arrivals",
      "Dukungan fitur Wishlist, keranjang belanja, dan riwayat pesanan",
      "Pengaturan multi-bahasa (ID/EN) serta kustomisasi tampilan tema",
    ],
    tech: ["Laravel", "Blade", "Tailwind CSS", "MySQL", "JavaScript"],
    link: "https://innerbeauty.id",
  },
  {
    title: "Gridline Digital — Website Agensi Digital & Pemasaran",
    domain: "gridlinedigital.site",
    image: "/projek/gridlinedigital.site.png",
    description:
      "Website company profile modern dari PT Nora Active Indonesia bertema dark-futuristic untuk agensi layanan pembuatan website, aplikasi mobile, optimasi SEO, e-commerce, dan manajemen media sosial yang berfokus pada pertumbuhan bisnis klien.",
    features: [
      "Proyek website company profile agensi dari PT Nora Active Indonesia",
      "Showcase layanan lengkap (Landing Page, Web E-Commerce, SEO, Social Media)",
      "Halaman portofolio hasil kerja, daftar paket harga, dan artikel edukasi",
      "Alur penjadwalan konsultasi gratis (Free Consultation) bagi calon klien",
    ],
    tech: ["Laravel", "Tailwind CSS", "JavaScript", "SEO Optimization"],
    link: "https://gridlinedigital.site",
  },
  {
    title: "Kriptastic — E-Commerce & Pemesanan Camilan Sehat",
    domain: "kriptastic.my.id",
    image: "/projek/kriptaastic.my.id.png",
    description:
      "Platform e-commerce pemesanan camilan sehat buatan JuangDev untuk produk keripik lezat berbahan dasar sayur pakcoy, protein tahu, dan nori seaweed. Dirancang dengan visual segar dan alur checkout instan via WhatsApp.",
    features: [
      "Platform e-commerce produk camilan sehat buatan JuangDev",
      "Highlight komposisi bahan sehat & informasi keunggulan nutrisi produk",
      "Alur checkout pemesanan langsung terhubung ke WhatsApp",
      "Fitur mini-game interaktif di dalam website untuk meningkatkan engagement",
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Interactive UI"],
    link: "https://kriptastic.my.id",
  },
];

const ACTIVITIES = [
  {
    id: "weza-sprint",
    title: "Sesi Sprint Review & Kolaborasi Developer",
    organization: "PT Weza Group",
    category: "Kolaborasi Tim",
    date: "2025",
    image: "/dokumentasi/pt-weza.jpeg",
    description:
      "Dokumentasi sesi sprint review, diskusi arsitektur kode aplikasi web internal, dan sinkronisasi backlog GitHub bersama tim developer saat program magang di PT Weza Group.",
    highlights: ["Sprint Review", "Diskusi Arsitektur Kode", "On-site Sidoarjo"],
  },
  {
    id: "andidev-standup",
    title: "Daily Standup & Koordinasi Proyek Daring",
    organization: "PT Andidev",
    category: "Meeting & Standup",
    date: "2026",
    image: "/dokumentasi/pt-andidev.jpeg",
    description:
      "Koordinasi rutin jarak jauh (remote meeting) via Google Meet bersama tim developer dan desainer PT Andidev untuk sinkronisasi progres fitur aplikasi web, review desain, dan jadwal deployment.",
    highlights: ["Google Meet", "Remote Standup", "Sinkronisasi Fitur Klien"],
  },
  {
    id: "nora-coding",
    title: "Pengembangan Backend & Pengujian Kode E-Commerce",
    organization: "PT Nora Active Indonesia",
    category: "Sesi Coding",
    date: "2026",
    image: "/dokumentasi/pt-nora.jpeg",
    description:
      "Suasana pengerjaan fitur backend, perancangan database seeder, dan pengujian unit test (PHPUnit) saat mengembangkan platform e-commerce norapadel.com menggunakan framework Laravel.",
    highlights: ["Laravel & PHPUnit", "Backend Testing", "E-Commerce NoraPadel"],
  },
  {
    id: "andidev-websekolah",
    title: "Implementasi & Preview Web Profil Sekolah",
    organization: "PT Andidev",
    category: "Pengembangan Web",
    date: "2026",
    image: "/dokumentasi/web-sekolah-andidev.png",
    description:
      "Dokumentasi implementasi website profil sekolah modern (Sekolah Alam An Naba) di PT Andidev, mencakup tampilan landing page responsif, katalog program unggulan, dan alur pendaftaran PPDB daring.",
    highlights: ["Demo Web Sekolah", "Sistem PPDB Online", "Desain Responsif"],
  },
  {
    id: "juangdev-arkha",
    title: "Perancangan UI/UX Multi-Device Arkha Properti",
    organization: "JuangDev",
    category: "Desain UI/UX",
    date: "2026",
    image: "/dokumentasi/arkha-properti.jpeg",
    description:
      "Dokumentasi hasil perancangan UI/UX lintas perangkat (MacBook Air & Smartphone) untuk platform konsultan dan pengembang properti mewah Arkha Properti yang dikerjakan di studio JuangDev.",
    highlights: ["Multi-Device Mockup", "UI/UX Konsultan Properti", "Desain Responsif"],
  },
  {
    id: "juangdev-fifashoes",
    title: "Showcase UI/UX Toko Online Sepatu (Fifa Shoes)",
    organization: "JuangDev",
    category: "Desain UI/UX",
    date: "2026",
    image: "/dokumentasi/fifa-shoes.jpeg",
    description:
      "Dokumentasi konsep desain prototipe e-commerce sepatu modern dengan katalog interaktif, filter kategori produk, dan alur checkout ramah pengguna untuk desktop, tablet, dan mobile.",
    highlights: ["E-Commerce Footwear", "Tablet & Mobile Layout", "Katalog Interaktif"],
  },
  {
    id: "juangdev-fifabag",
    title: "Perancangan Antarmuka E-Commerce Produk Tas (Fifa Bag)",
    organization: "JuangDev",
    category: "Desain UI/UX",
    date: "2026",
    image: "/dokumentasi/fifa-bag.jpeg",
    description:
      "Dokumentasi perancangan antarmuka e-commerce tas pria & wanita di JuangDev dengan fokus pada tata letak visual minimalis, fotografi produk estetis, dan kenyamanan alur keranjang belanja.",
    highlights: ["E-Commerce Bags", "Minimalist Checkout", "UI/UX Showcase"],
  },
  {
    id: "andidev-sprint2",
    title: "Review Progres & Sprint Planning Sistem Web",
    organization: "PT Andidev",
    category: "Kolaborasi Tim",
    date: "2026",
    image: "/dokumentasi/pt-andidev2.jpeg",
    description:
      "Koordinasi teknis tim developer PT Andidev dalam meninjau progres fitur aplikasi web klien, integrasi API, serta penyusunan timeline sprint release berikutnya.",
    highlights: ["PT Andidev", "Sprint Planning", "Review Progres Web"],
  },
  {
    id: "nora-strategi",
    title: "Evaluasi & Diskusi Strategi Platform NoraPadel",
    organization: "PT Nora Active Indonesia",
    category: "Kolaborasi Tim",
    date: "2026",
    image: "/dokumentasi/pt-nora2.jpeg",
    description:
      "Sesi diskusi dan sinkronisasi bersama tim mengenai performa platform e-commerce NoraPadel, feedback pengguna, dan rencana penambahan fitur katalog baru.",
    highlights: ["Nora Active Indonesia", "Evaluasi E-Commerce", "Diskusi Strategis"],
  },
  {
    id: "nora-modul",
    title: "Pengembangan Modul & Integrasi Fitur NoraPadel",
    organization: "PT Nora Active Indonesia",
    category: "Sesi Coding",
    date: "2026",
    image: "/dokumentasi/pt-nora3.jpeg",
    description:
      "Sesi implementasi teknis modul transaksi, integrasi payment gateway, dan penyempurnaan alur checkout pada toko online spesialis padel norapadel.com.",
    highlights: ["Modul Pembayaran", "Laravel & MySQL", "E-Commerce NoraPadel"],
  },
  {
    id: "nora-showcase",
    title: "Dokumentasi Showcase Produk & Tim Operasional PT Nora",
    organization: "PT Nora Active Indonesia",
    category: "Kolaborasi Tim",
    date: "2026",
    image: "/dokumentasi/pt-nora4.jpeg",
    description:
      "Dokumentasi tim operasional dan display jajaran produk perlengkapan raket padel di PT Nora Active Indonesia untuk kebutuhan promosi dan konten platform.",
    highlights: ["Showcase Produk", "Operasional Tim", "Ekosistem Padel"],
  },
  {
    id: "weza-debugging",
    title: "Sesi Coding & Debugging Sistem Internal Perusahaan",
    organization: "PT Weza Group",
    category: "Kolaborasi Tim",
    date: "2025",
    image: "/dokumentasi/pt-weza2.jpeg",
    description:
      "Dokumentasi sesi pengujian kode, query optimization pada MySQL, dan pemecahan kendala (debugging) fitur aplikasi web internal saat magang di PT Weza Group.",
    highlights: ["PT Weza Group", "Debugging & Query", "Magang Full Stack"],
  },
  {
    id: "bem-seminar",
    title: "Kepanitiaan Seminar Internasional BEM Fasilkom",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-seminar-internasional.jpeg",
    description:
      "Dokumentasi kebersamaan tim panitia BEM Fakultas Ilmu Komputer dalam menyelenggarakan program kerja Seminar Internasional, berfokus pada publikasi media dan peliputan kegiatan.",
    highlights: ["Seminar Internasional", "BEM Fasilkom", "Publikasi & Dokumentasi"],
  },
  {
    id: "bem-uec",
    title: "Penyelenggaraan Turnamen Esports (UEC) BEM",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-uec-turnamen.jpeg",
    description:
      "Pelaksanaan program kerja turnamen University Esports Championship (UEC) oleh BEM Fakultas Ilmu Komputer, mengelola materi visual, live bracket, dan dokumentasi jalannya kejuaraan.",
    highlights: ["Turnamen UEC", "Esports Championship", "Media & Desain Grafis"],
  },
  {
    id: "bem-workshop-linkedin",
    title: "Workshop Edukasi Profil LinkedIn & Personal Branding",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-workshop-linkedin.jpeg",
    description:
      "Program kerja workshop BEM Fakultas Ilmu Komputer yang mengedukasi mahasiswa mengenai strategi membangun profil LinkedIn profesional dan perluasan jejaring karir di industri.",
    highlights: ["Workshop LinkedIn", "Personal Branding", "Divisi Media"],
  },
  {
    id: "bem-lkmmtd-1",
    title: "Kaderisasi & Kepanitiaan LKMM-TD Mahasiswa",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-lkmmtd.jpeg",
    description:
      "Terlibat aktif dalam kepanitiaan Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar (LKMM-TD) sebagai wadah kaderisasi kepemimpinan dan manajemen organisasi kampus.",
    highlights: ["LKMM-TD", "Kaderisasi Kepemimpinan", "BEM Fasilkom"],
  },
  {
    id: "bem-lkmmtd-2",
    title: "Pelatihan Manajemen & Dinamika Forum LKMM-TD",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-lkmmtd2.jpeg",
    description:
      "Dokumentasi sesi pemaparan materi manajemen organisasi, simulasi persidangan, dan dinamika pemecahan masalah forum pada rangkaian acara LKMM-TD.",
    highlights: ["Manajemen Organisasi", "Dinamika Forum", "Pelatihan Mahasiswa"],
  },
  {
    id: "bem-ssc",
    title: "Kompetisi Siswa SMA/SMK (SSC) Tingkat Daerah",
    organization: "BEM Fakultas Ilmu Komputer",
    category: "Organisasi & Kampus",
    date: "2024",
    image: "/dokumentasi/bem-ssc-lomba-smasmk.png",
    description:
      "Penyelenggaraan event kompetisi pelajar SMA/SMK sederajat (SSC - Sidoarjo Student Competition) yang diinisiasi BEM Fasilkom untuk memacu inovasi dan kreativitas generasi muda.",
    highlights: ["Kompetisi SSC", "Lomba SMA/SMK", "Inovasi & Kreativitas"],
  },
];

const WindowContent: React.FC<WindowContentProps> = React.memo(({ app, isDark }) => {
  const [selectedDoc, setSelectedDoc] = useState<(typeof ACTIVITIES)[0] | null>(null);
  const [selectedCert, setSelectedCert] = useState<(typeof CERTIFICATES)[0] | null>(null);
  const [docFilter, setDocFilter] = useState("Semua");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDoc(null);
        setSelectedCert(null);
      }
    };
    if (selectedDoc || selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDoc, selectedCert]);

  const textColor = isDark ? "text-white" : "text-gray-900";
  const secondaryTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const accentColor = isDark ? "text-blue-400" : "text-blue-600";
  const cardBg = isDark ? "bg-gray-800/70" : "bg-gray-50/90";
  const borderColor = isDark ? "border-gray-700/60" : "border-gray-200/80";

  switch (app) {
    case "home":
      return (
        <div
          className="p-5 md:p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 shadow-2xl overflow-hidden">
              <img
                src="/profil.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-light mb-2 md:mb-4 ${textColor}`}>
              M Syifaul Anam
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl font-light ${secondaryTextColor} mb-5 md:mb-8`}>
              Full Stack Developer
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 sm:space-x-8 mb-6 md:mb-8 text-sm md:text-base">
              <div className={`flex items-center ${secondaryTextColor}`}>
                <MapPin size={18} className="mr-2 shrink-0" />
                Sidoarjo, Jawa Timur
              </div>
              <div className={`flex items-center ${secondaryTextColor}`}>
                <Calendar size={18} className="mr-2 shrink-0" />
                Siap untuk Magang &amp; Bekerja
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-0 md:space-x-4 mb-8 md:mb-12">
              <a
                href="https://github.com/faulnam"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Github size={20} className={accentColor} />
              </a>

              <a
                href="https://linkedin.com/in/faulnam"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Linkedin size={20} className={accentColor} />
              </a>

              <a
                href="mailto:syifakul.anm@gmail.com"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Mail size={20} className={accentColor} />
              </a>

              <a
                href="/CV_M_Syifaul_Anam.pdf"
                download="CV_M_Syifaul_Anam.pdf"
                className="px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 text-sm md:text-base"
              >
                <Download size={16} />
                <span>Unduh CV</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            <div className={`p-5 md:p-6 rounded-2xl ${cardBg} border ${borderColor}`}>
              <h2 className={`text-xl md:text-2xl font-semibold mb-3 md:mb-4 ${textColor}`}>
                Tentang Saya
              </h2>
              <p
                className={`text-left md:text-justify text-sm md:text-base ${secondaryTextColor} leading-relaxed mb-4`}
              >
                Saya Syifaul Anam, seorang Full Stack Developer berbasis di Sidoarjo dengan fokus pada pengembangan aplikasi web end-to-end menggunakan PHP/Laravel, MySQL, Tailwind CSS, dan JavaScript.
              </p>
              <p
                className={`text-left md:text-justify text-sm md:text-base ${secondaryTextColor} leading-relaxed`}
              >
                Berpengalaman bekerja sebagai Full Stack Developer di PT Andidev (Oktober 2026 – Sekarang), PT Nora Active Indonesia, PT Weza Group, serta pendiri studio web JuangDev. Terbiasa menangani integrasi API, payment gateway, arsitektur database, hingga deployment sistem siap pakai.
              </p>
            </div>

            <div className={`p-5 md:p-6 rounded-2xl ${cardBg} border ${borderColor}`}>
              <h2 className={`text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${textColor}`}>
                Statistik Singkat
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${accentColor} mb-1`}>
                    20+
                  </div>
                  <div className={`text-xs md:text-sm ${secondaryTextColor}`}>
                    Proyek &amp; Produk Web
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${accentColor} mb-1`}>
                    Full Stack
                  </div>
                  <div className={`text-xs md:text-sm ${secondaryTextColor}`}>
                    Laravel &amp; REST API
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${accentColor} mb-1`}>
                    3+
                  </div>
                  <div className={`text-xs md:text-sm ${secondaryTextColor}`}>
                    Perusahaan &amp; Studio
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${accentColor} mb-1`}>
                    S1
                  </div>
                  <div className={`text-xs md:text-sm ${secondaryTextColor}`}>
                    Informatika
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "about":
      return (
        <div
          className="p-5 md:p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-3xl md:text-4xl font-light mb-5 md:mb-8 ${textColor}`}>
            Tentang Saya
          </h1>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="md:col-span-2">
              <h2 className={`text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${textColor}`}>
                Perjalanan &amp; Latar Belakang
              </h2>
              <div className="space-y-4 md:space-y-5">
                <p
                  className={`text-left md:text-justify ${secondaryTextColor} leading-relaxed text-sm sm:text-base md:text-lg`}
                >
                  Saya adalah lulusan S1 Informatika dari Universitas Nahdlatul Ulama Sidoarjo (2022 – 2026) dan seorang Full Stack Developer dengan fokus utama pada perancangan dan pembangunan aplikasi web end-to-end menggunakan PHP/Laravel, MySQL, REST API, Tailwind CSS, dan JavaScript.
                </p>
                <p
                  className={`text-left md:text-justify ${secondaryTextColor} leading-relaxed text-sm sm:text-base md:text-lg`}
                >
                  Memiliki pengalaman kerja profesional sebagai Full Stack Developer di PT Andidev (Oktober 2026 – Sekarang) dan PT Nora Active Indonesia (norapadel.com), magang di PT Weza Group, serta pendiri studio web JuangDev (juangdev.my.id) yang merancang dan menjual template boilerplate website siap pakai.
                </p>
                <p
                  className={`text-left md:text-justify ${secondaryTextColor} leading-relaxed text-sm sm:text-base md:text-lg`}
                >
                  Terbiasa menangani seluruh siklus proyek: dari konsultasi kebutuhan klien, perancangan database, integrasi payment gateway dan WhatsApp, hingga deployment ke server produksi dengan fokus pada performa, keamanan, dan pengalaman pengguna yang optimal.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className={`p-6 rounded-2xl ${cardBg} border ${borderColor} h-fit`}
              >
                <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>
                  Pendidikan
                </h2>
                <div className="flex items-start space-x-3">
                  <GraduationCap className={`${accentColor} mt-1 shrink-0`} size={22} />
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>
                      S1 Informatika
                    </h3>
                    <p className={`text-sm ${accentColor}`}>
                      Universitas Nahdlatul Ulama Sidoarjo
                    </p>
                    <p className={`text-xs mt-1 ${secondaryTextColor}`}>
                      2022 – 2026
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${cardBg} border ${borderColor} h-fit`}
              >
                <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>
                  Fokus &amp; Nilai Kerja
                </h2>
                <ul className={`space-y-3 text-sm ${secondaryTextColor}`}>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Pengembangan Web End-to-End</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Full Stack Laravel &amp; REST API</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Integrasi API &amp; Payment Gateway</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Desain Responsif &amp; Ramah Pengguna</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>Komunikasi Aktif &amp; Tepat Deadline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-2xl font-semibold mb-8 ${textColor}`}>
              Pengalaman Kerja &amp; Organisasi
            </h2>
            <div className="space-y-6">
              {/* MacBook Window 1 - PT Andidev */}
              <div
                className={`perf-card rounded-2xl border ${borderColor} ${cardBg} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 md:px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-gray-800/80" : "bg-gray-100/80"
                    }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex space-x-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span
                      className={`text-xs font-mono ml-2 truncate ${secondaryTextColor}`}
                    >
                      PT Andidev — Full Stack Developer
                    </span>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] md:text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                      ? "bg-gray-700/80 text-gray-300"
                      : "bg-white text-gray-700 border border-gray-200"
                      }`}
                  >
                    Oktober 2026 – Sekarang
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`text-xl font-semibold ${textColor}`}>
                        Full Stack Developer
                      </h3>
                      <p className={`${accentColor} text-sm font-medium mt-0.5`}>
                        PT Andidev • Parttime (Fleksibel)
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      <span>Remote</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${secondaryTextColor}`}>
                    <li>
                      Mengembangkan dan memelihara aplikasi web skala enterprise dan kebutuhan klien secara end-to-end menggunakan PHP/Laravel dan MySQL.
                    </li>
                    <li>
                      Merancang arsitektur database yang efisien, RESTful API, serta fitur autentikasi dan manajemen hak akses pengguna.
                    </li>
                    <li>
                      Membangun antarmuka web modern, responsif, dan interaktif menggunakan Tailwind CSS dan JavaScript.
                    </li>
                    <li>
                      Berkolaborasi aktif dengan tim pengembang untuk memastikan kode bersih, performa optimal, dan stabilitas aplikasi.
                    </li>
                  </ul>
                </div>
              </div>

              {/* MacBook Window 2 - PT Nora Active Indonesia */}
              <div
                className={`perf-card rounded-2xl border ${borderColor} ${cardBg} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 md:px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-gray-800/80" : "bg-gray-100/80"
                    }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex space-x-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span
                      className={`text-xs font-mono ml-2 truncate ${secondaryTextColor}`}
                    >
                      PT Nora Active Indonesia — Full Stack Developer
                    </span>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] md:text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                      ? "bg-gray-700/80 text-gray-300"
                      : "bg-white text-gray-700 border border-gray-200"
                      }`}
                  >
                    2026
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`text-xl font-semibold ${textColor}`}>
                        Full Stack Developer
                      </h3>
                      <p className={`${accentColor} text-sm font-medium mt-0.5`}>
                        PT Nora Active Indonesia • Fulltime
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      <span>On-site / Surabaya</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${secondaryTextColor}`}>
                    <li>
                      Mengembangkan platform e-commerce norapadel.com untuk penjualan produk olahraga padel menggunakan PHP/Laravel.
                    </li>
                    <li>
                      Membangun fitur CRUD, autentikasi pengguna, dan pengelolaan data produk untuk mendukung operasional toko online.
                    </li>
                    <li>
                      Melakukan integrasi API serta pengolahan data untuk mendukung fungsionalitas aplikasi secara menyeluruh.
                    </li>
                    <li>
                      Berkolaborasi dengan tim internal untuk memelihara dan mengembangkan aplikasi sesuai kebutuhan bisnis perusahaan.
                    </li>
                  </ul>
                </div>
              </div>

              {/* MacBook Window 3 - JuangDev */}
              <div
                className={`perf-card rounded-2xl border ${borderColor} ${cardBg} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 md:px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-gray-800/80" : "bg-gray-100/80"
                    }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex space-x-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span
                      className={`text-xs font-mono ml-2 truncate ${secondaryTextColor}`}
                    >
                      JuangDev — Founder &amp; Full Stack Developer
                    </span>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] md:text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                      ? "bg-gray-700/80 text-gray-300"
                      : "bg-white text-gray-700 border border-gray-200"
                      }`}
                  >
                    2026 – Sekarang
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`text-xl font-semibold ${textColor}`}>
                        Founder &amp; Full Stack Developer
                      </h3>
                      <p className={`${accentColor} text-sm font-medium mt-0.5`}>
                        JuangDev (juangdev.my.id) • Usaha Freelance Mandiri
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      <span>Remote / Sidoarjo</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${secondaryTextColor}`}>
                    <li>
                      Mendirikan dan menjalankan studio pengembangan web JuangDev sebagai platform usaha freelance mandiri.
                    </li>
                    <li>
                      Merancang dan mengembangkan 20+ produk digital serta proyek aplikasi web siap pakai (SaaS, E-Commerce, POS Kasir, Sistem Informasi, Company Profile, Landing Page) menggunakan Laravel, Blade, dan Tailwind CSS.
                    </li>
                    <li>
                      Menangani seluruh siklus proyek klien: konsultasi kebutuhan, pengembangan fitur kustom (payment gateway, integrasi WhatsApp, dashboard admin), hingga deployment dan dukungan purna jual.
                    </li>
                    <li>
                      Menyelesaikan proyek sesuai deadline melalui komunikasi aktif dan pembaruan progres berkala bersama klien.
                    </li>
                  </ul>
                </div>
              </div>

              {/* MacBook Window 4 - PT Weza Group */}
              <div
                className={`perf-card rounded-2xl border ${borderColor} ${cardBg} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 md:px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-gray-800/80" : "bg-gray-100/80"
                    }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex space-x-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span
                      className={`text-xs font-mono ml-2 truncate ${secondaryTextColor}`}
                    >
                      PT Weza Group — Web Developer
                    </span>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] md:text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                      ? "bg-gray-700/80 text-gray-300"
                      : "bg-white text-gray-700 border border-gray-200"
                      }`}
                  >
                    2025
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`text-xl font-semibold ${textColor}`}>
                        Web Developer
                      </h3>
                      <p className={`${accentColor} text-sm font-medium mt-0.5`}>
                        PT Weza Group • Magang
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      <span>Hybrid / Sidoarjo</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${secondaryTextColor}`}>
                    <li>
                      Mengembangkan dan memelihara aplikasi berbasis web internal perusahaan menggunakan PHP/Laravel selama program magang.
                    </li>
                    <li>
                      Melakukan integrasi API serta pengolahan data untuk mendukung fungsionalitas aplikasi.
                    </li>
                    <li>
                      Mengimplementasikan fitur CRUD dan autentikasi pengguna sesuai kebutuhan proyek yang diberikan.
                    </li>
                  </ul>
                </div>
              </div>

              {/* MacBook Window 5 - Organisasi BEM */}
              <div
                className={`perf-card rounded-2xl border ${borderColor} ${cardBg} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                <div
                  className={`flex items-center justify-between gap-2 px-3.5 md:px-4 py-2.5 border-b ${borderColor} ${isDark ? "bg-gray-800/80" : "bg-gray-100/80"
                    }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex space-x-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span
                      className={`text-xs font-mono ml-2 truncate ${secondaryTextColor}`}
                    >
                      BEM Fakultas Ilmu Komputer — Divisi Media
                    </span>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap text-[11px] md:text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                      ? "bg-gray-700/80 text-gray-300"
                      : "bg-white text-gray-700 border border-gray-200"
                      }`}
                  >
                    2024
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className={`text-xl font-semibold ${textColor}`}>
                        Anggota Divisi Media
                      </h3>
                      <p className={`${accentColor} text-sm font-medium mt-0.5`}>
                        BEM Fakultas Ilmu Komputer • Organisasi Kampus
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <MapPin size={13} />
                      <span>Sidoarjo</span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-1.5 text-sm ${secondaryTextColor}`}>
                    <li>
                      Mendesain konten kreatif untuk media sosial resmi BEM Fakultas Ilmu Komputer.
                    </li>
                    <li>
                      Mengelola dokumentasi dan publikasi berbagai kegiatan kampus.
                    </li>
                    <li>
                      Berkontribusi dalam pembuatan video recap dan perancangan tampilan feed media sosial kampus.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "skills":
      return (
        <div
          className="p-5 md:p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-3xl md:text-4xl font-light mb-6 md:mb-8 ${textColor}`}>
            Keahlian &amp; Teknologi
          </h1>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-8 md:mb-12">
            {SKILLS.map((skillGroup) => {
              const IconComponent = skillGroup.icon;
              return (
                <div
                  key={skillGroup.category}
                  className={`p-6 rounded-2xl ${cardBg} border ${borderColor} hover:shadow-lg transition-shadow duration-200`}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl mr-4 bg-gradient-to-br from-blue-500 to-purple-600">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-semibold ${textColor}`}>
                        {skillGroup.category}
                      </h2>
                      <div className="flex items-center mt-1">
                        <div
                          className={`w-20 h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"
                            } mr-2`}
                        >
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${skillGroup.level}%` }}
                          />
                        </div>
                        <span className={`text-sm ${secondaryTextColor}`}>
                          {skillGroup.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm ${isDark
                          ? "bg-blue-900/50 text-blue-300 border border-blue-800/50"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`p-6 rounded-2xl ${cardBg} border ${borderColor}`}>
            <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>
              Tingkat Penguasaan Keahlian
            </h2>
            <div className="space-y-6">
              {PROFICIENCIES.map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${textColor}`}>
                      {item.skill}
                    </span>
                    <span className={`${secondaryTextColor}`}>
                      {item.level}%
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${isDark ? "bg-gray-700" : "bg-gray-200"
                      }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-sm`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "certificates":
      return (
        <div
          className="p-5 md:p-7"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-3xl md:text-4xl font-light mb-8 ${textColor}`}>
            Sertifikat &amp; Pelatihan
          </h1>

          <div className="grid gap-6">
            {CERTIFICATES.map((cert, index) => (
              <div
                key={index}
                className={`perf-card rounded-2xl border transition-shadow duration-200 hover:shadow-lg ${cardBg} ${borderColor} overflow-hidden`}
              >
                <div className="md:flex items-stretch">
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className={`md:w-2/5 ${cardBg} flex items-center justify-center p-3 border-b md:border-b-0 md:border-r ${borderColor} overflow-hidden group cursor-pointer relative`}
                    title="Klik untuk memperbesar sertifikat"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="max-h-56 md:max-h-64 w-auto max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                        <ZoomIn size={14} />
                        <span>Lihat Sertifikat</span>
                      </span>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 flex flex-col justify-between min-h-0">
                    <div>
                      {cert.badge && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 mb-2">
                          {cert.badge}
                        </span>
                      )}
                      <h3 className={`text-xl font-semibold mb-1 ${textColor}`}>
                        {cert.title}
                      </h3>
                      <p className={`${secondaryTextColor} text-sm mb-2`}>
                        No. Sertifikat:{" "}
                        <span className="font-mono">{cert.number}</span>
                      </p>
                      <div className="overflow-y-auto max-h-32 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <p className={`${secondaryTextColor} text-sm leading-relaxed`}>
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popup Layar Penuh Preview Sertifikat */}
          {selectedCert &&
            createPortal(
              <div
                className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in"
                onClick={() => setSelectedCert(null)}
              >
                {/* Tombol Tutup Floating */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-150 hover:scale-110 shadow-2xl z-50 cursor-pointer"
                  title="Tutup (Esc)"
                  aria-label="Tutup"
                >
                  <X size={26} />
                </button>

                {/* Gambar Sertifikat Full */}
                <div
                  className="relative max-w-[95vw] max-h-[88vh] flex items-center justify-center select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  />
                </div>

                {/* Caption Minimalis Floating di Bawah */}
                <div
                  className="mt-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-medium shadow-lg max-w-[90vw] truncate text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedCert.title} {selectedCert.number !== "-" ? `• ${selectedCert.number}` : ""}
                </div>
              </div>,
              document.body
            )}

          <div className="mt-12 text-center">
            <p className={`${secondaryTextColor} mb-6 text-lg`}>
              Halaman ini menampilkan sertifikat resmi yang telah saya peroleh
              melalui berbagai kursus dan pelatihan digital.
            </p>
          </div>
        </div>
      );

    case "projects":
      return (
        <div
          className="p-5 md:p-7"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
            <div>
              <h1 className={`text-3xl md:text-4xl font-light ${textColor}`}>
                Proyek Unggulan
              </h1>
              <p className={`mt-2 ${secondaryTextColor}`}>
                Kurasi proyek pilihan dari aplikasi perusahaan, produk SaaS, hingga e-commerce. Untuk melihat keseluruhan 20+ proyek web lainnya, jelajahi katalog lengkap di{" "}
                <a
                  href="https://juangdev.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${accentColor} font-medium hover:underline`}
                >
                  JuangDev
                </a>
                .
              </p>
            </div>
          </div>

          <div className="grid gap-7">
            {PROJECTS.map((project, index) => (
              <div
                key={project.domain}
                className={`perf-card rounded-2xl border transition-shadow duration-200 hover:shadow-lg ${cardBg} ${borderColor} overflow-hidden`}
              >
                <div className="md:flex items-stretch">
                  {/* Kolom Gambar - Background selaras dengan deskripsi, tanpa perbedaan warna */}
                  <div className={`w-full md:w-[50%] lg:w-[52%] shrink-0 relative overflow-hidden ${cardBg} flex items-center justify-center border-b md:border-b-0 md:border-r ${borderColor} group`}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block aspect-[16/10] overflow-hidden relative"
                      title={`Buka ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-full object-cover object-left-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                          <ExternalLink size={13} />
                          <span>Kunjungi Website</span>
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Kolom Konten */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Header Kartu */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className={`text-xl md:text-2xl font-semibold ${textColor} leading-tight`}>
                            {project.title}
                          </h3>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium ${accentColor} hover:underline inline-flex items-center gap-1 mt-1`}
                          >
                            <Globe size={14} />
                            <span>{project.domain}</span>
                          </a>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-1.5 shrink-0 transition-colors duration-150 shadow-sm"
                            title="Kunjungi Website"
                          >
                            <span>Kunjungi</span>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>

                      {/* Area Deskripsi & Fitur yang bisa di-scroll mandiri tiap kartu jika panjang */}
                      <div className="md:overflow-y-auto md:max-h-52 my-3 md:pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <p
                          className={`${secondaryTextColor} leading-relaxed text-sm md:text-base mb-3`}
                        >
                          {project.description}
                        </p>

                        {/* Fitur Unggulan */}
                        <div>
                          <h4
                            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${textColor} opacity-80`}
                          >
                            Fitur Unggulan:
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-1.5">
                            {project.features.map((feat) => (
                              <li
                                key={feat}
                                className={`flex items-start text-xs md:text-sm ${secondaryTextColor}`}
                              >
                                <CheckCircle2
                                  size={15}
                                  className="mr-1.5 mt-0.5 text-emerald-500 shrink-0"
                                />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/40 dark:border-gray-700/40">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${isDark
                            ? "bg-gray-700/70 text-gray-200 border border-gray-600/50"
                            : "bg-gray-200/70 text-gray-800 border border-gray-300/60"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className={`${secondaryTextColor} mb-6 text-lg`}>
              Ingin menjelajahi keseluruhan 20+ proyek web dan produk digital lainnya yang telah saya kembangkan?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://juangdev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 inline-block rounded-lg font-medium transition-transform duration-150 hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                Lihat 20+ Katalog Karya di JuangDev
              </a>
              <a
                href="https://github.com/faulnam?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3 inline-block rounded-lg font-medium transition-transform duration-150 hover:scale-105 ${cardBg} border ${borderColor} ${textColor}`}
              >
                Lihat Repositori GitHub
              </a>
            </div>
          </div>
        </div>
      );

    case "documentation": {
      const categories = [
        "Semua",
        "Kolaborasi Tim",
        "Organisasi & Kampus",
        "Meeting & Standup",
        "Sesi Coding",
        "Pengembangan Web",
        "Desain UI/UX",
      ];
      const filteredActivities =
        docFilter === "Semua"
          ? ACTIVITIES
          : ACTIVITIES.filter((item) => item.category === docFilter);

      return (
        <div
          className="p-5 md:p-7"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className={`text-3xl md:text-4xl font-light ${textColor}`}>
                Dokumentasi Kegiatan
              </h1>
              <p className={`mt-2 ${secondaryTextColor}`}>
                Koleksi foto dokumentasi kerja sama tim, sesi coding, meeting daring, dan perancangan produk digital.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-7">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setDocFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-150 ${docFilter === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : `${cardBg} ${borderColor} border ${secondaryTextColor} hover:opacity-80`
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Dokumentasi */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className={`perf-card rounded-2xl border transition-all duration-200 hover:shadow-lg ${cardBg} ${borderColor} overflow-hidden flex flex-col`}
              >
                {/* Foto Dokumentasi */}
                <div
                  onClick={() => setSelectedDoc(act)}
                  className="relative aspect-[16/10] overflow-hidden bg-gray-900 group cursor-pointer"
                  title="Klik untuk memperbesar foto"
                >
                  <img
                    src={act.image}
                    alt={act.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                      <ZoomIn size={14} />
                      <span>Lihat Foto Penuh</span>
                    </span>
                  </div>
                </div>

                {/* Konten Keterangan Foto */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${isDark
                          ? "bg-blue-900/50 text-blue-300 border border-blue-800/50"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}
                      >
                        {act.organization} • {act.category}
                      </span>
                      <span className={`text-xs font-mono ${secondaryTextColor}`}>
                        {act.date}
                      </span>
                    </div>

                    <h3 className={`text-lg font-semibold ${textColor} mb-2 leading-snug`}>
                      {act.title}
                    </h3>

                    <p className={`${secondaryTextColor} text-sm leading-relaxed text-left md:text-justify mb-3`}>
                      {act.description}
                    </p>
                  </div>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/40 dark:border-gray-700/40">
                    {act.highlights.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium ${isDark
                          ? "bg-gray-700/60 text-gray-300 border border-gray-600/40"
                          : "bg-gray-200/70 text-gray-700 border border-gray-300/60"
                          }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popup Layar Penuh Foto Dokumentasi Saja */}
          {selectedDoc &&
            createPortal(
              <div
                className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-fade-in"
                onClick={() => setSelectedDoc(null)}
              >
                {/* Tombol Tutup Floating */}
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-150 hover:scale-110 shadow-2xl z-50 cursor-pointer"
                  title="Tutup (Esc)"
                  aria-label="Tutup"
                >
                  <X size={26} />
                </button>

                {/* Gambar Dokumentasi Full */}
                <div
                  className="relative max-w-[95vw] max-h-[88vh] flex items-center justify-center select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedDoc.image}
                    alt={selectedDoc.title}
                    className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  />
                </div>

                {/* Caption Minimalis Floating di Bawah */}
                <div
                  className="mt-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-medium shadow-lg max-w-[90vw] truncate text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedDoc.title} • {selectedDoc.organization} ({selectedDoc.date})
                </div>
              </div>,
              document.body
            )}
        </div>
      );
    }

    case "contact":
      return (
        <div
          className="p-5 md:p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-3xl md:text-4xl font-light mb-6 md:mb-8 ${textColor}`}>
            Hubungi Saya
          </h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className={`text-xl md:text-2xl font-semibold mb-5 md:mb-8 ${textColor}`}>
                Informasi Kontak
              </h2>

              <div className="space-y-4">
                <a
                  href="mailto:syifakul.anm@gmail.com"
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="p-3 rounded-lg mr-4 shrink-0 bg-gradient-to-br from-red-500 to-pink-600">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold ${textColor}`}>Email</p>
                    <p className={`${accentColor} hover:underline truncate`}>
                      syifakul.anm@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/62859171681988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-emerald-500 to-green-600">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>
                      Telepon / WhatsApp
                    </p>
                    <p className={`${accentColor} hover:underline`}>
                      +62 859-1716-81988
                    </p>
                  </div>
                </a>

                <a
                  href="https://juangdev.my.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Globe className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>
                      Katalog 20+ Proyek &amp; Studio Web
                    </p>
                    <p className={`${accentColor} hover:underline`}>
                      juangdev.my.id
                    </p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/faulnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-blue-500 to-blue-600">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>LinkedIn</p>
                    <p className={`${accentColor} hover:underline`}>
                      linkedin.com/in/faulnam
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/faulnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-gray-700 to-gray-900">
                    <Github className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>GitHub</p>
                    <p className={`${accentColor} hover:underline`}>
                      github.com/faulnam
                    </p>
                  </div>
                </a>
              </div>

              <div
                className={`mt-8 p-6 rounded-2xl ${cardBg} border ${borderColor}`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>
                  Mari Bekerja Sama!
                </h3>
                <p
                  className={`text-left md:text-justify ${secondaryTextColor} leading-relaxed text-sm md:text-base`}
                >
                  Saya siap berkontribusi penuh dalam program magang IT
                  Programmer / Web Developer, peluang kerja profesional, maupun
                  kolaborasi pengembangan sistem aplikasi web. Jangan ragu untuk
                  menghubungi saya!
                </p>
              </div>
            </div>

            <div>
              <h2 className={`text-2xl font-semibold mb-8 ${textColor}`}>
                Kirim Pesan
              </h2>

              <form
                className="space-y-6"
                action="https://formspree.io/f/mwpkbgvz"
                method="POST"
              >
                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="name"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-150 ${isDark
                      ? "bg-gray-800/70 border-gray-700 text-white focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="email"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-150 ${isDark
                      ? "bg-gray-800/70 border-gray-700 text-white focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="message"
                  >
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-150 resize-none ${isDark
                      ? "bg-gray-800/70 border-gray-700 text-white focus:border-blue-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Ceritakan kebutuhan proyek atau pesan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-transform duration-150 hover:scale-[1.02] shadow-lg"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="p-8">Konten tidak ditemukan</div>;
  }
});

export default WindowContent;
