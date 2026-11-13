import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  X, 
  Send, 
  CheckCircle2, 
  MapPin, 
  FileText,
  Maximize2,
  Building2,
  Moon,
  Users,
  Smile,
  ClipboardList,
  ShieldCheck,
  Compass,
  Info,
  Check,
  BookOpen,
  Camera,
  Landmark,
  ListChecks,
  FileCheck,
  Clock,
  MessagesSquare,
  BadgeCheck,
  FileUp,
  ClipboardCheck,
  Fingerprint,
  ChevronDown,
  HelpCircle,
  Phone,
  Mail,
  Sparkles,
  Shield,
  Calendar,
  PlaneTakeoff,
  Timer,
  Plus,
  Minus,
  Star,
  LogIn,
  UserCheck,
  Headphones,
  Banknote,
  UserRound,
  BookUser,
  Menu,
  Stethoscope
} from 'lucide-react';
import riyadhLandmarkImg from './assets/images/riyadh_kingdom_tower_1793168502736.jpg';
import luxuryTravelHeroImg from './assets/images/luxury_travel_hero_1793916079999.jpg';
import riyadhTowersImg from './assets/images/saudi_riyadh_towers_1793171971761.jpg';
import makkahHaramImg from './assets/images/saudi_makkah_haram_1793171992086.jpg';
import madinahMosqueImg from './assets/images/saudi_madinah_mosque_1793172018602.jpg';
import alulaRocksImg from './assets/images/saudi_alula_rocks_1793172040661.jpg';
import samplePassportImg from './assets/images/sample_passport_doc_1793172918254.jpg';
import samplePersonalPhotoImg from './assets/images/sample_personal_photo_1793172939195.jpg';
import ApplyPage from './pages/ApplyPage';
import sampleBankStatementImg from './assets/images/sample_bank_statement_1793172957447.jpg';
import step1SendDocsImg from './assets/images/step1_send_docs.png';
import step2FingerprintApptImg from './assets/images/step2_fingerprint_appt.png';
import step3FileReviewImg from './assets/images/step3_file_review.png';
import step4VisaIssuanceImg from './assets/images/step4_visa_issuance.png';
import saudiEmblemImg from './assets/images/saudi_emblem_clean.png';
import documentsMockupGraphic from './assets/images/documents_mockup_graphic.png';
import { trackPageView, trackContactEvent } from './lib/metaPixel';

interface ApplicationStepData {
  number: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  imageAlt: string;
  previewTitle: string;
}

const APPLICATION_STEPS: ApplicationStepData[] = [
  {
    number: '01',
    stepNumber: 1,
    title: 'إرسال المستندات',
    description: 'أرسل صورة جواز السفر والصورة الشخصية والبيانات المطلوبة لبدء طلبك.',
    icon: FileUp,
    image: step1SendDocsImg,
    imageAlt: 'خطوة 01: إرسال المستندات المطلوبة',
    previewTitle: 'الخطوة 01: إرسال المستندات — صورة جواز السفر والصورة الشخصية والبيانات'
  },
  {
    number: '02',
    stepNumber: 2,
    title: 'مراجعة وتجهيز الطلب',
    description: 'نراجع بياناتك ونجهز طلب التأشيرة ونتولى إجراءات التقديم اللازمة.',
    icon: ClipboardCheck,
    image: step3FileReviewImg,
    imageAlt: 'خطوة 02: مراجعة وتجهيز طلب التأشيرة والتدقيق',
    previewTitle: 'الخطوة 02: مراجعة وتجهيز الطلب والتدقيق الشامل'
  },
  {
    number: '03',
    stepNumber: 3,
    title: 'موعد البصمة',
    description: 'نساعدك في حجز موعد البصمة، والتوجه إلى مركز تساهيل لاستكمال الإجراءات المطلوبة.',
    icon: Fingerprint,
    image: step2FingerprintApptImg,
    imageAlt: 'خطوة 03: حجز موعد البصمة في مركز تساهيل',
    previewTitle: 'الخطوة 03: موعد البصمة في مركز تساهيل'
  },
  {
    number: '04',
    stepNumber: 4,
    title: 'إصدار التأشيرة',
    description: 'نتابع حالة طلبك حتى صدور التأشيرة وإبلاغك بالنتيجة.',
    icon: BadgeCheck,
    image: step4VisaIssuanceImg,
    imageAlt: 'خطوة 04: متابعة الطلب حتى صدور التأشيرة',
    previewTitle: 'الخطوة 04: إصدار التأشيرة السياحية السعودية'
  }
];

interface DestinationCardData {
  id: string;
  city: string;
  landmark: string;
  image: string;
}

const DESTINATIONS: DestinationCardData[] = [
  {
    id: 'riyadh',
    city: 'الرياض',
    landmark: 'أبراج الرياض',
    image: riyadhTowersImg
  },
  {
    id: 'makkah',
    city: 'مكة المكرمة',
    landmark: 'المسجد الحرام',
    image: makkahHaramImg
  },
  {
    id: 'madinah',
    city: 'المدينة المنورة',
    landmark: 'المسجد النبوي',
    image: madinahMosqueImg
  },
  {
    id: 'alula',
    city: 'العلا',
    landmark: 'تكوينات صخرية',
    image: alulaRocksImg
  }
];

interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface VisaDetailCardData {
  id: string;
  label: string;
  value: string;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IncludedServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INCLUDED_SERVICES_DATA: IncludedServiceCardData[] = [
  {
    id: 'enjaz-submission',
    title: 'تقديم طلب التأشيرة',
    description: 'عبر منصة إنجاز',
    icon: FileCheck
  },
  {
    id: 'biometrics-appt',
    title: 'حجز موعد البصمة',
    description: 'في مركز تساهيل',
    icon: Calendar
  },
  {
    id: 'medical-insurance',
    title: 'إصدار تأمين طبي',
    description: 'معتمد وشامل',
    icon: ShieldCheck
  },
  {
    id: 'issuance-followup',
    title: 'متابعة الطلب',
    description: 'حتى صدور التأشيرة',
    icon: Headphones
  }
];

const VISA_DETAILS: VisaDetailCardData[] = [
  {
    id: 'validity',
    label: 'صلاحية التأشيرة',
    value: '90 يوماً',
    note: 'تبدأ من تاريخ إصدار التأشيرة رسميًا.',
    icon: Calendar
  },
  {
    id: 'stay',
    label: 'مدة الإقامة',
    value: '90 يوماً',
    note: 'مدة الإقامة المسموحة داخل المملكة.',
    icon: Clock
  },
  {
    id: 'entries',
    label: 'عدد مرات الدخول',
    value: 'مرة واحدة',
    note: 'تسمح بالدخول لمرة واحدة خلال الصلاحية.',
    icon: LogIn
  },
  /* <!-- يحتاج تأكيدًا من نشكا --> */
  {
    id: 'processing',
    label: 'مدة معالجة الطلب',
    value: '3 أيام عمل',
    note: 'تحتسب بعد إتمام موعد البصمة في تساهيل.',
    icon: Timer
  }
];

function KaabaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <line x1="4" y1="9.5" x2="20" y2="9.5" />
      <path d="M10 20v-5h4v5" />
      <line x1="12" y1="12" x2="12" y2="15" />
    </svg>
  );
}

interface UnifiedCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HERO_TRUST_CARDS: UnifiedCardData[] = [
  {
    id: 'hero-enjaz',
    title: 'طلب إنجاز',
    description: 'نقدم طلبك عبر إنجاز',
    icon: FileCheck
  },
  {
    id: 'hero-biometrics',
    title: 'موعد البصمة',
    description: 'نحجز موعد بصمتك لك',
    icon: Fingerprint
  },
  {
    id: 'hero-insurance',
    title: 'تأمين طبي',
    description: 'إصدار التأمين المعتمد لك',
    icon: ShieldCheck
  },
  {
    id: 'hero-followup',
    title: 'متابعة الطلب',
    description: 'نتابع طلبك حتى الإصدار',
    icon: Headphones
  }
];

const VISA_FEATURES: FeatureCardData[] = [
  {
    id: 'no-mahram',
    title: 'بدون محرم',
    description: 'تقديم السيدات دون محرم',
    icon: UserCheck
  },
  {
    id: 'no-sponsor',
    title: 'بدون كفيل',
    description: 'دون كفيل أو مستضيف',
    icon: ShieldCheck
  },
  {
    id: 'no-medical',
    title: 'بدون فحص',
    description: 'لا يُشترط فحص طبي',
    icon: Stethoscope
  },
  /* <!-- يحتاج تأكيدًا من نشكا --> */
  {
    id: 'fast-processing',
    title: 'إجراءات سريعة',
    description: 'إنجاز سريع بعد البصمة',
    icon: Timer
  },
  {
    id: 'umrah-tourism',
    title: 'العمرة والسياحة',
    description: 'أداء العمرة وزيارة المعالم',
    icon: KaabaIcon
  },
  {
    id: 'all-ages',
    title: 'لجميع الأعمار',
    description: 'للفئات العمرية وفق الشروط',
    icon: Users
  }
];

interface WhyNashkaItemData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WHY_NASHKA_ITEMS: WhyNashkaItemData[] = [
  {
    id: 'file-review',
    title: 'تدقيق احترافي',
    description: 'مراجعة شاملة لمستنداتك',
    icon: FileCheck
  },
  {
    id: 'prep-request',
    title: 'تجهيز متكامل',
    description: 'إعداد الملف وحجز البصمة',
    icon: FileText
  },
  {
    id: 'clear-procedures',
    title: 'إجراءات واضحة',
    description: 'إرشاد مباشر حتى الاستلام',
    icon: ListChecks
  },
  /* <!-- يحتاج تأكيدًا من نشكا --> */
  {
    id: 'clear-fees',
    title: 'شفافية التكلفة',
    description: 'سعر واضح ومعلن مسبقًا',
    icon: BadgeCheck
  },
  /* <!-- يحتاج تأكيدًا من نشكا --> */
  {
    id: 'continuous-followup',
    title: 'متابعة مستمرة',
    description: 'متابعة طلبك حتى الإصدار',
    icon: MessagesSquare
  }
];

interface UnifiedCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  revealIndex?: number;
  enableReveal?: boolean;
}

function Card({ title, description, icon: IconComponent, revealIndex, enableReveal = false }: UnifiedCardProps) {
  return (
    <div
      data-unified-card
      {...(enableReveal ? { 'data-reveal-card': '', 'data-reveal-index': revealIndex } : {})}
      className="w-full h-[88px] p-4 bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 shadow-sm hover:shadow-md md:hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out motion-reduce:transition-none motion-reduce:transform-none flex flex-row items-center gap-[14px] text-start cursor-default"
    >
      {/* Unified 44px Dual-ring Navy + Gold Icon */}
      <div className="w-[44px] h-[44px] rounded-full p-0.5 bg-white border-2 border-secondary shadow-sm flex items-center justify-center shrink-0">
        <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white">
          <IconComponent className="w-5 h-5 text-white stroke-[1.8]" aria-hidden="true" />
        </div>
      </div>

      {/* 2-line Text Block: 16px bold Title + 13px Description, single line each */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3
          data-card-title
          className="text-[16px] font-extrabold text-primary leading-tight whitespace-nowrap font-['Cairo']"
        >
          {title}
        </h3>
        <p
          data-card-desc
          className="text-[13px] text-slate-600 font-normal leading-tight whitespace-nowrap mt-1 font-['Cairo']"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function PassportDocIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <circle cx="12" cy="10" r="3.5" />
      <path d="M12 6.5v7" />
      <path d="M8.5 10h7" />
      <line x1="8" y1="17.5" x2="16" y2="17.5" />
    </svg>
  );
}

function BiometricDocIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7.5 17c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" />
    </svg>
  );
}

function BankBuildingIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V10" />
      <path d="M9 21V10" />
      <path d="M15 21V10" />
      <path d="M19 21V10" />
      <path d="M2 10h20" />
      <path d="M12 3L2 10h20L12 3z" />
    </svg>
  );
}

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  previewLabel: string;
  badge?: string;
}

const REQUIRED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'passport',
    title: 'جواز سفر ساري',
    description: 'صورة واضحة من جواز السفر ساري الصلاحية.',
    icon: PassportDocIcon,
    image: samplePassportImg,
    previewLabel: 'نموذج جواز السفر — صفحة البيانات سارية المفعول'
  },
  {
    id: 'photo',
    title: 'صورة شخصية حديثة',
    description: 'صورة شخصية حديثة بالمواصفات الرسمية.',
    icon: BiometricDocIcon,
    image: samplePersonalPhotoImg,
    previewLabel: 'المواصفات القياسية للصورة الشخصية الرسمية (4×6)'
  },
  {
    id: 'bank-statement',
    title: 'كشف حساب بنكي',
    description: 'كشف حساب لأخر 3 أشهر.',
    icon: BankBuildingIcon,
    image: sampleBankStatementImg,
    previewLabel: 'نموذج كشف الحساب البنكي الرسمي المعتمد',
    badge: 'لموعد البصمة'
  }
];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'price',
    question: 'كم تبلغ تكلفة خدمة التأشيرة السياحية؟',
    answer: '9,500 جنيه مصري للباقة المتكاملة، وتشمل رسوم منصة إنجاز، التأمين الطبي المعتمد، حجز موعد تساهيل، وتدقيق ومتابعة الملف.'
  },
  {
    id: 'docs',
    question: 'ما هي المستندات المطلوبة لبدء الطلب؟',
    answer: 'يلزم فقط توفير صورة واضحة من جواز سفر ساري وصورة شخصية حديثة بخلفية بيضاء، ويتولى فريقنا استكمال باقي بيانات الملف.'
  },
  {
    id: 'bank-statement',
    question: 'هل كشف الحساب البنكي مطلوب عند بدء التقديم؟',
    answer: 'لا، كشف الحساب غير مطلوب لبدء التقديم معنا؛ يُطلب فقط أثناء حضور موعد البصمة في مركز تساهيل وفق الشروط.'
  },
  /* <!-- يحتاج تأكيدًا من نشكا --> */
  {
    id: 'duration',
    question: 'كم تستغرق مدة معالجة واستخراج التأشيرة؟',
    answer: 'المدة المعتادة هي 3 أيام عمل تقريباً، تبدأ بعد إتمام موعد البصمة وتقديم الأوراق في مركز تساهيل.'
  },
  {
    id: 'guarantee',
    question: 'هل قبول التأشيرة مضمون 100%؟',
    answer: 'نضمن لك اكتمال وتدقيق الملف بنسبة 100% لتفادي أي رفض إجرائي، بينما يبقى قرار الموافقة الرسمي للجهات المختصة.'
  },
  {
    id: 'tasheel',
    question: 'هل يشترط الذهاب إلى مركز تساهيل شخصياً؟',
    answer: 'نعم، يشترط الحضور الشخصي لإجراء البصمة الحيوية وتسليم المستندات وفق الإجراءات والتعليمات الرسمية للمملكة.'
  },
  {
    id: 'umrah',
    question: 'هل تسمح التأشيرة السياحية بأداء مناسك العمرة؟',
    answer: 'نعم، تتيح التأشيرة السياحية أداء العمرة وزيارة مكة المكرمة والمدينة المنورة طوال العام، باستثناء موسم الحج.'
  },
  {
    id: 'additional-costs',
    question: 'هل توجد أي رسوم أو مصاريف إضافية غير معلنة؟',
    answer: 'لا، السعر محدد بـ 9,500 جنيه مصري ويشمل كافة الخدمات المذكورة في الباقة دون أي تكاليف إضافية خفية.'
  },
  {
    id: 'refund',
    question: 'ما هي السياسة المتبعة في حال تعثر صدور التأشيرة؟',
    answer: 'ندرس أسباب القرار مع الجهات المختصة ونساعدك في معالجة الملاحظات وإعادة التقديم وفق الضوابط المعتمدة للخدمة.'
  },
  {
    id: 'start-how',
    question: 'كيف أبدأ في تقديم طلب التأشيرة الآن؟',
    answer: 'انقر على زر «ابدأ طلب التأشيرة الآن» وسجل بياناتك الأولية، وسيتواصل معك مستشار نشكا فوراً لتنسيق الإجراءات.'
  }
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'apply'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/apply' || hash === '#apply-page' || hash === '#apply') {
        return 'apply';
      }
    }
    return 'home';
  });

  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(riyadhLandmarkImg);
  const [previewTitle, setPreviewTitle] = useState<string>('معلم الرياض الشهير — برج المملكة وأفق العاصمة المتألق');
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);
  const [applicantCount, setApplicantCount] = useState<number>(1);

  const unitPrice = 9500;
  const totalPrice = unitPrice * applicantCount;

  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileStickyBar, setShowMobileStickyBar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const finalCtaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (currentRoute !== 'home') {
        setShowMobileStickyBar(false);
        return;
      }

      const heroBottom = heroRef.current
        ? heroRef.current.getBoundingClientRect().bottom
        : 400 - scrollY;
      const isPastHero = heroBottom <= 80;

      const finalCtaTop = finalCtaRef.current
        ? finalCtaRef.current.getBoundingClientRect().top
        : Infinity;
      const isAtOrPastFinalCta = finalCtaTop <= window.innerHeight - 24;

      setShowMobileStickyBar(isPastHero && !isAtOrPastFinalCta);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [currentRoute]);

  // Progressive scroll-reveal (fade + 8px slide) for cards; visible by default if JS fails or prefers-reduced-motion
  useEffect(() => {
    if (currentRoute !== 'home' || typeof window === 'undefined') return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('#why-us [data-reveal-card], #features [data-reveal-card]')
    );
    if (!cards.length) return;

    const pendingTimeouts: number[] = [];

    const revealCard = (el: HTMLElement) => {
      const delay = Number(el.dataset.revealIndex || '0') * 45;
      el.style.transition = `opacity 280ms ease-out ${delay}ms, transform 280ms ease-out ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      const tid = window.setTimeout(() => {
        el.style.transition = '';
        el.style.opacity = '';
        el.style.transform = '';
      }, 340 + delay);
      pendingTimeouts.push(tid);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            revealCard(target);
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.96) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
      pendingTimeouts.forEach((tid) => window.clearTimeout(tid));
      cards.forEach((card) => {
        card.style.transition = '';
        card.style.opacity = '';
        card.style.transform = '';
      });
    };
  }, [currentRoute]);

  const navigateToApply = () => {
    setCurrentRoute('apply');
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ page: 'apply' }, '', '/apply');
      } catch {
        window.location.hash = '#apply';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ page: 'home' }, '', '/');
      } catch {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/apply' || window.location.hash === '#apply') {
        setCurrentRoute('apply');
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track Meta Pixel PageView on route changes without duplicate execution
  useEffect(() => {
    trackPageView(currentRoute === 'apply' ? '/apply' : '/');
  }, [currentRoute]);

  // Global ESC key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsImagePreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const openImagePreview = (imgSrc: string, title: string) => {
    setPreviewImage(imgSrc);
    setPreviewTitle(title);
    setIsImagePreviewOpen(true);
  };

  // Dedicated separate page for Visa Application Form
  if (currentRoute === 'apply') {
    return <ApplyPage onBackToHome={navigateToHome} />;
  }

  return (
    <div className="w-full min-h-screen bg-white text-[#1A1B4B] flex flex-col antialiased selection:bg-[#C9A13B]/20 selection:text-[#2E2F7F] overflow-x-hidden pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
      
      {/* =========================================================
          1. HEADER (الترويسة العلوية — مظهر أنيق، يتقلص ناعماً عند التمرير)
         ========================================================= */}
      <header className={`w-full border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-300 shadow-sm ${
        isScrolled ? 'py-2.5' : 'py-5'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-secondary flex items-center justify-center font-extrabold text-xl shadow-sm border border-secondary/30 select-none">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <div className="flex flex-col text-start">
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-primary leading-tight font-['Cairo']">
                نشكا للسياحة
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold tracking-widest uppercase font-['Cairo']">
                NASHKA TOURISM
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 font-['Cairo']">
            <a href="#why-us" className="hover:text-primary transition-colors">لماذا نشكا</a>
            <a href="#features" className="hover:text-primary transition-colors">المزايا</a>
            <a href="#pricing" className="hover:text-primary transition-colors">الأسعار والخدمات</a>
            <a href="#steps" className="hover:text-primary transition-colors">خطوات التقديم</a>
            <a href="#faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</a>
          </nav>

          {/* Action Area: Mobile gold phone + Hamburger | Desktop Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile (< 768px): Gold phone call icon button next to Hamburger Menu */}
            <a
              href="tel:01040009577"
              className="md:hidden w-10 h-10 rounded-lg bg-secondary/15 text-secondary hover:bg-secondary hover:text-primary border border-secondary/40 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="اتصال هاتف مباشر"
              title="اتصل بنا: 01040009577"
            >
              <Phone className="w-4 h-4 text-secondary" />
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-primary flex items-center justify-center transition-all cursor-pointer"
              aria-label="فتح القائمة"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop CTA Button */}
            <button
              type="button"
              onClick={navigateToApply}
              className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-['Cairo']"
              aria-label="ابدأ طلب التأشيرة"
            >
              <span>ابدأ الطلب</span>
              <ArrowLeft className="w-4 h-4 text-secondary" />
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2 duration-200 font-['Cairo']">
            <a 
              href="#why-us" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 text-sm font-bold text-gray-700 hover:text-primary border-b border-gray-50"
            >
              لماذا تختار نشكا؟
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 text-sm font-bold text-gray-700 hover:text-primary border-b border-gray-50"
            >
              مزايا التأشيرة السياحية
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 text-sm font-bold text-gray-700 hover:text-primary border-b border-gray-50"
            >
              تكاليف الخدمة والباقات (9,500 جنيه)
            </a>
            <a 
              href="#steps" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 text-sm font-bold text-gray-700 hover:text-primary border-b border-gray-50"
            >
              خطوات التقديم
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="py-2 text-sm font-bold text-gray-700 hover:text-primary border-b border-gray-50"
            >
              الأسئلة الشائعة
            </a>
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); navigateToApply(); }}
              className="w-full mt-2 py-3 bg-primary text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>ابدأ طلب التأشيرة الآن</span>
              <ArrowLeft className="w-4 h-4 text-secondary" />
            </button>
          </div>
        )}
      </header>

      {/* =========================================================
          2. HERO SECTION (الواجهة الرئيسية — Mobile First Architecture)
         ========================================================= */}
      <main ref={heroRef} className="w-full max-w-full overflow-x-hidden flex flex-col justify-center relative py-12 sm:py-16 lg:py-20 text-white">
        
        {/* Luxury Travel Hero Background Image with requested 270deg royal blue overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <img
            src={luxuryTravelHeroImg}
            alt="صالة السفر الفاخرة — نشكا للسياحة"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Professional 270deg royal blue gradient overlay specified in prompt */}
          <div 
            className="absolute inset-0" 
            style={{ background: 'linear-gradient(270deg, rgba(22, 26, 141, 0.92) 0%, rgba(22, 26, 141, 0.70) 100%)' }} 
          />
        </div>

        {/* Hero Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            
            {/* Text Container with strict sequence */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-start">
              
              {/* [1] Country Badge */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-white/10 border border-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-3.5 sm:mb-4 shadow-sm font-['Cairo']">
                <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                <span>المملكة العربية السعودية</span>
              </div>

              {/* [2] H1 Main Title */}
              <h1 className="w-full mt-3 mb-3 sm:mt-4 sm:mb-4 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white text-start tracking-tight leading-[1.2] sm:leading-[1.15] text-balance font-['Cairo']">
                التأشيرة السياحية
              </h1>
              
              {/* [3] H2 Marketing Subtitle */}
              <h2 className="mt-2.5 sm:mt-3 text-lg sm:text-xl lg:text-2xl font-bold text-secondary leading-snug font-['Cairo'] text-start">
                ابدأ رحلتك إلى السعودية مع نشكا
              </h2>

              {/* [4] Certified Description */}
              <p 
                style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }} 
                className="mt-4 sm:mt-5 text-white/95 leading-relaxed max-w-xl font-normal font-['Cairo'] text-start"
              >
                نساعدك في تجهيز طلب التأشيرة ومتابعة الإجراءات، من تقديم الطلب حتى صدور النتيجة.
              </p>

              {/* [5 + 6 + 7] Price & Package Capsule */}
              <div className="mt-5 sm:mt-6 w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-2 sm:pe-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md text-white shadow-sm">
                <span className="bg-secondary text-primary font-bold px-3 py-1.5 rounded-lg text-sm sm:text-base shrink-0 font-['Cairo']">
                  9,500 جنيه
                </span>
                <span className="font-bold text-white text-sm sm:text-base font-['Cairo']">
                  باقة التجهيز المتكاملة
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="text-xs sm:text-sm text-white/80 font-['Cairo']">
                  شاملة رسوم إنجاز، التأمين، وحجز تساهيل
                </span>
              </div>

              {/* [8] Primary CTA Button */}
              <div className="mt-6 sm:mt-7 w-full sm:w-auto flex items-center">
                <button
                  type="button"
                  onClick={navigateToApply}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3.5 bg-secondary hover:bg-secondary-hover active:scale-[0.98] text-primary font-bold text-base sm:text-lg min-h-[48px] py-3.5 px-7 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer font-['Cairo'] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="ابدأ طلب التأشيرة الآن"
                >
                  <span>ابدأ طلب التأشيرة الآن</span>
                  <ArrowLeft className="w-5 h-5 text-primary transition-transform group-hover:-translate-x-1 shrink-0" aria-hidden="true" />
                </button>
              </div>

              {/* [9] Reassurance Message with mb-10 spacing */}
              <div className="w-full text-center sm:text-start flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/80 mt-3.5 mb-10 font-['Cairo']">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                <span>نتأكد من جاهزية أوراقك قبل التقديم</span>
              </div>

            </div>

            {/* Hero Visual Container */}
            <div className="w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-square max-h-[460px] rounded-2xl overflow-hidden shadow-2xl border-2 border-secondary/40 relative group bg-primary">
              <div className="absolute top-3.5 end-3.5 z-20">
                <button
                  type="button"
                  onClick={() => openImagePreview(riyadhLandmarkImg, 'معلم الرياض الشهير — برج المملكة وأفق العاصمة المتألق')}
                  className="w-9 h-9 rounded-lg bg-primary/80 hover:bg-primary backdrop-blur-md text-secondary flex items-center justify-center border border-secondary/40 shadow-sm transition-all hover:scale-105 cursor-pointer"
                  title="عرض الصورة بالحجم الكامل"
                  aria-label="تكبير الصورة"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <img 
                src={riyadhLandmarkImg} 
                alt="معلم الرياض الشهير — برج المملكة وأفق العاصمة المتألق بالإضاءة الذهبية"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>

          </div>

          {/* ج. كروت الثقة (Hero Trust Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 auto-rows-fr mt-6 md:mt-10 w-full">
            {HERO_TRUST_CARDS.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>

        </div>
      </main>



      {/* =========================================================
          2. WHY CHOOSE NASHKA SECTION (لماذا تختار نشكا؟)
         ========================================================= */}
      <section id="why-us" className="w-full py-16 md:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            
            {/* Category / Kicker */}
            <div className="inline-flex items-center gap-2 bg-[#FDFBF7] text-primary px-4 py-1.5 rounded-full text-[13px] sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>خدمة متخصصة وموثوقة</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              لماذا تختار نشكا؟
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl mx-auto">
              نرافقك في إجراءات التأشيرة بخطوات واضحة ومتابعة مستمرة.
            </p>
          </div>

          {/* 5 Unified Cards Grid — 1 col on mobile (< 640px), equal columns on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr w-full">
            {WHY_NASHKA_ITEMS.map((item, index) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon}
                revealIndex={index}
                enableReveal
              />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          3. VISA FEATURES SECTION (مزايا التأشيرة السياحية — Premium Minimal)
         ========================================================= */}
      <section id="features" className="w-full py-16 md:py-24 bg-[#FDFBF7] border-t border-gray-100 relative">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full text-[13px] sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>مزايا التأشيرة السياحية</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              اكتشف مزايا التأشيرة
            </h2>

            {/* Clarified Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl mx-auto">
              تعرّف على أبرز ما تتيحه التأشيرة السياحية قبل التقديم.
            </p>
          </div>

          {/* 6 Unified Cards Grid — 1 col on mobile (< 640px), equal columns on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr w-full">
            {VISA_FEATURES.map((feature, index) => (
              <Card
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                revealIndex={index}
                enableReveal
              />
            ))}
          </div>

          {/* Single-row Secondary CTA at end of Features */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              type="button"
              onClick={navigateToApply}
              className="group inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-hover active:scale-[0.98] text-primary font-bold text-sm sm:text-base min-h-[48px] px-7 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none cursor-pointer font-['Cairo'] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>ابدأ طلب التأشيرة</span>
              <ArrowLeft className="w-4 h-4 text-primary transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================
          4. VISA DETAILS SECTION (تفاصيل التأشيرة — Elite UI Minimal Luxury)
         ========================================================= */}
      <section id="details" className="w-full py-16 md:py-24 bg-white border-t border-gray-100 relative">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FDFBF7] text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>محددات التأشيرة الرسمية</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              تفاصيل التأشيرة
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl mx-auto">
              تعرّف على صلاحية التأشيرة ومدة الإقامة وعدد مرات الدخول بدقة وموثوقية.
            </p>
          </div>

          {/* 4 Detail Cards Grid — 4 columns on desktop, 32px gap, top padding for overlapping icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-20 lg:gap-8 pt-16 sm:pt-20 mb-12">
            {VISA_DETAILS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center justify-between text-center pt-20 sm:pt-22 pb-8 px-4 sm:px-6 group min-h-[380px] lg:min-h-[400px] h-full cursor-default"
                >
                  {/* Central Overlapping Icon: Royal Blue with Gold Double Border */}
                  <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 sm:p-2 bg-white border-2 border-secondary shadow-sm flex items-center justify-center shrink-0 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white shadow-inner">
                      <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Top content block */}
                  <div className="w-full flex flex-col items-center">
                    {/* 1. Title / Feature Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 font-['Cairo'] tracking-tight">
                      {item.label}
                    </h3>

                    {/* 2. Main Value */}
                    <span className="text-3xl sm:text-4xl lg:text-4xl font-black text-primary font-['Cairo'] tracking-tight leading-tight">
                      {item.value}
                    </span>

                    {/* 3. Decorative Divider: Short Gold Line */}
                    <div className="w-12 h-1 bg-secondary rounded-full mx-auto my-3.5" />
                  </div>

                  {/* 4. Descriptive Subtitle */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-[240px] mx-auto">
                    {item.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Notice Callout Box below cards with smaller text */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200/80 bg-white p-3.5 sm:p-4.5 flex items-center justify-center gap-2.5 text-center shadow-sm">
            <Info className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Cairo']">
              * المدة تقديرية، وتبدأ بعد استلام المستندات كاملة ومراجعتها وبدء الإجراءات الرسمية، وقد تختلف حسب إجراءات وتدقيق الجهات المختصة في المملكة.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          5. PRICING & INCLUDED SERVICES SECTION (تكاليف الخدمة — ما يشمله السعر)
         ========================================================= */}
      <section id="pricing" className="w-full py-16 md:py-24 bg-[#FDFBF7] border-t border-gray-100 relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            
            {/* Top Pill / Badge: السعر والخدمة */}
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3.5 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>السعر والخدمة</span>
            </div>

            {/* Main Title flanked by subtle golden decorative lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5">
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-secondary" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight leading-tight font-['Cairo']">
                ما يشمله السعر
              </h2>
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-secondary" />
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo']">
              سعر خدمة التأشيرة السياحية السعودية من نشكا
            </p>
          </div>

          {/* Master Reference Card (Image image_f9d961c0.png) */}
          <div className="bg-white rounded-2xl border-[1.5px] border-secondary shadow-[0_10px_30px_-5px_rgba(22,26,141,0.08)] overflow-hidden flex flex-col lg:flex-row-reverse">
            
            {/* Vertical Banner on the Left (in RTL layout) */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0 relative overflow-hidden bg-gradient-to-b from-primary via-[#10146B] to-primary-dark text-white flex flex-col justify-between p-5 sm:p-7 min-h-[220px] sm:min-h-[240px] lg:min-h-[480px]">
              
              {/* Background Riyadh Kingdom Tower Night Photo */}
              <img 
                src={riyadhLandmarkImg} 
                alt="برج المملكة في الرياض ليلاً" 
                className="absolute inset-0 w-full h-full object-cover object-center mix-blend-luminosity opacity-40 scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/70 to-primary/90" />

              {/* Top: Emblem & Title */}
              <div className="relative z-10 flex flex-col items-center text-center pt-2 sm:pt-4">
                <div className="w-14 h-14 mb-2 flex items-center justify-center">
                  <img 
                    src={saudiEmblemImg} 
                    alt="شعار المملكة العربية السعودية" 
                    className="w-12 h-auto object-contain brightness-0 invert opacity-95" 
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Cairo'] tracking-tight leading-snug">
                  التأشيرة السياحية<br />السعودية
                </h3>
              </div>

              {/* Bottom Decorative Brand Signature */}
              <div className="relative z-10 mt-auto pt-6 text-center">
                <div className="w-10 h-0.5 bg-secondary rounded-full mx-auto mb-2 opacity-80" />
                <span className="text-[11px] text-[#DEC99D] font-semibold tracking-wider font-['Cairo'] uppercase">
                  NASHKA TOURISM
                </span>
              </div>

              {/* Decorative Golden Wave Accent along inner border */}
              <div className="hidden lg:block absolute inset-y-0 end-0 w-6 pointer-events-none z-20">
                <svg className="w-full h-full fill-none" viewBox="0 0 24 500" preserveAspectRatio="none">
                  <path d="M24,0 C6,160 -4,320 24,500" stroke="#C9A13B" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-5 sm:p-7 lg:p-9 flex flex-col justify-between">
              
              {/* Top Row: Service Intro & Passport Badge (Right) + Price Box (Left) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-6 border-b border-gray-100 text-center sm:text-start">
                
                {/* Right: Service Title & Passport Icon */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-secondary to-[#997722] p-2 flex flex-col items-center justify-center text-white shadow-sm shrink-0 border border-secondary/40">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="12" cy="10" r="4" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-primary font-['Cairo'] tracking-tight">
                      التأشيرة السياحية السعودية
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-['Cairo'] mt-0.5 max-w-md">
                      خدمة متكاملة لإصدار التأشيرة الإلكترونية عبر المنصة الرسمية للمملكة.
                    </p>
                  </div>
                </div>

                {/* Left: Prominent Official Price Box */}
                <div className="bg-[#FAF7F0] border border-secondary/60 rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-center gap-3 shrink-0 shadow-sm">
                  <div className="flex flex-col text-start">
                    <span className="text-xs font-bold text-primary font-['Cairo'] leading-tight">
                      سعر الخدمة للفرد
                    </span>
                    <div className="flex flex-col text-[11px] font-bold text-secondary leading-tight font-['Cairo'] mt-0.5">
                      <span>جنيه</span>
                      <span>مصري</span>
                    </div>
                  </div>
                  <span className="text-3xl md:text-4xl font-black text-primary font-['Cairo'] tracking-tight leading-none">
                    9,500 جنيه
                  </span>
                </div>

              </div>

              {/* Middle Section: 4 Included Services with Gold Checkmarks */}
              <div className="py-6">
                
                {/* Header with rounded checkmark icon */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-primary font-['Cairo']">
                    يشمل السعر:
                  </h4>
                </div>

                {/* 4 Equal Cards Grid with Gold Checkmark icons */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
                  {INCLUDED_SERVICES_DATA.map((service) => {
                    const IconComp = service.icon;
                    return (
                      <div
                        key={service.id}
                        className="bg-white hover:bg-[#FAF7F0] rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-secondary/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center group cursor-default relative"
                      >
                        {/* Gold Checkmark Badge */}
                        <div className="absolute top-2.5 end-2.5 w-4 h-4 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-[#FDFBF7] border border-gray-200/80 flex items-center justify-center text-primary mb-2.5 group-hover:scale-105 transition-transform">
                          <IconComp className="w-5 h-5 text-primary" />
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-primary group-hover:text-primary-dark transition-colors font-['Cairo'] leading-snug">
                          {service.title}
                        </h5>
                        <p className="text-[11px] sm:text-xs text-slate-600 font-['Cairo'] mt-0.5">
                          {service.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Note / Important Notification Bar */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F0] border border-gray-200/80 flex items-center justify-center gap-2 text-center shadow-sm">
                <div className="w-4 h-4 rounded-full border border-secondary text-secondary flex items-center justify-center shrink-0 text-[10px] font-bold font-serif">
                  i
                </div>
                <p className="text-xs sm:text-sm text-primary font-['Cairo'] leading-relaxed">
                  <strong className="text-primary font-bold">ملاحظات مهمة:</strong> السعر خاص بالخدمة الأساسية فقط • لا يشمل أي خدمات إضافية مثل الطيران أو الإقامة.
                </p>
              </div>

              {/* Bottom Action CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={navigateToApply}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-bold px-8 py-3.5 sm:py-4 min-h-[48px] rounded-lg text-base transition-all shadow-md hover:shadow-lg cursor-pointer font-['Cairo'] relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>لطلب التأشيرة الآن</span>
                  <Send className="w-4 h-4 text-secondary rotate-180 transition-transform group-hover:-translate-x-1" />
                </button>

                <a
                  href={`https://wa.me/201060070093?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن خدمة التأشيرة السياحية السعودية (9,500 جنيه) عبر نشكا')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F0] border border-gray-200 hover:border-secondary/50 text-primary hover:text-secondary-hover font-bold px-7 py-3.5 sm:py-4 min-h-[48px] rounded-lg text-base transition-all shadow-sm font-['Cairo']"
                >
                  <svg className="w-5 h-5 text-secondary fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                  </svg>
                  <span>تواصل معنا</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          6. DESTINATIONS SECTION (رحلتك إلى السعودية - وجهات المملكة)
         ========================================================= */}
      <section id="destinations" className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FDFBF7] text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>معالم وتجارب بارزة</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              رحلتك إلى السعودية
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl mx-auto">
              اكتشف معالم المملكة وتجاربها التي تستحق الزيارة.
            </p>
          </div>

          {/* 4 Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 xl:gap-7">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-secondary/50 transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(22,26,141,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(22,26,141,0.12)] group flex flex-col"
              >
                {/* Destination Photo with Zoom on Hover & Lightbox Click */}
                <div 
                  className="aspect-[16/10] w-full relative overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => openImagePreview(dest.image, `${dest.city} — ${dest.landmark}`)}
                  title={`عرض صورة ${dest.city} بحجم كبير`}
                >
                  <img
                    src={dest.image}
                    alt={`${dest.city} — ${dest.landmark}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Dark Gradient Overlay at the Bottom for contrast */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#0A0C3C]/85 via-[#0A0C3C]/25 to-transparent pointer-events-none" 
                    aria-hidden="true" 
                  />

                  {/* Location Pin Badge */}
                  <div className="absolute top-3.5 end-3.5 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-secondary/40 shadow-sm flex items-center gap-1.5 font-['Cairo']">
                    <MapPin className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
                    <span>{dest.city}</span>
                  </div>

                  {/* Magnify Icon on Hover */}
                  <div className="absolute bottom-3 end-3 w-8 h-8 rounded-full bg-primary/85 hover:bg-primary text-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border border-secondary/30 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-4 sm:p-5 text-center flex flex-col items-center justify-center flex-grow bg-white">
                  <h3 className="text-lg font-bold text-primary mb-1.5 leading-snug font-['Cairo']">
                    {dest.city}
                  </h3>
                  <span className="text-xs sm:text-sm font-semibold text-primary bg-[#FAF7F0] px-3.5 py-1 rounded-full border border-gray-200/80 font-['Cairo']">
                    {dest.landmark}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          7. REQUIRED DOCUMENTS SECTION (المستندات المطلوبة)
         ========================================================= */}
      <section id="documents" className="w-full py-16 md:py-24 bg-[#FDFBF7] border-t border-gray-100 relative overflow-hidden">
        
        {/* Soft decorative background ambient glow */}
        <div className="absolute top-0 start-0 w-96 h-96 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Layout: Right Side (Header + 3 Cards) | Left Side (3D Realistic Mockup Graphic) */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 xl:gap-14 mb-8 sm:mb-10">
            
            {/* Header & 3 Document Cards (Start/Right side in RTL) */}
            <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-start">
              
              {/* Section Label (Pill Badge) */}
              <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
                <FileText className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                <span>المستندات المطلوبة</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2 font-['Cairo']">
                جهّز مستنداتك لبدء الطلب
              </h2>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl">
                لضمان تقديم طلبك بسرعة وسلاسة، يُرجى تجهيز المستندات التالية:
              </p>

              {/* 3 Document Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full mt-6 sm:mt-7">
                {REQUIRED_DOCUMENTS.map((doc) => {
                  const IconComponent = doc.icon;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => openImagePreview(doc.image, doc.previewLabel)}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-secondary/50 transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(22,26,141,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(22,26,141,0.12)] hover:-translate-y-1 flex flex-col items-center text-center group cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          openImagePreview(doc.image, doc.previewLabel);
                        }
                      }}
                      title={`انقر لمعاينة ${doc.previewLabel}`}
                    >
                      {/* Optional Note Badge */}
                      {doc.badge && (
                        <span className="absolute top-2.5 end-2.5 bg-secondary/15 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary/30 font-['Cairo']">
                          {doc.badge}
                        </span>
                      )}

                      {/* Icon Container: Soft blue squircle matching reference */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center text-primary shadow-[0_2px_10px_rgba(22,26,141,0.06)] group-hover:scale-105 group-hover:border-secondary/40 group-hover:bg-[#FAF7F0] transition-all duration-300 mb-4 shrink-0">
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-primary-dark transition-colors font-['Cairo'] tracking-tight mb-1.5">
                        {doc.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-['Cairo']">
                        {doc.description}
                      </p>

                      {/* Micro interaction hint */}
                      <div className="mt-3 flex items-center gap-1 text-[11px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-semibold font-['Cairo']">
                        <Maximize2 className="w-3 h-3 text-secondary" />
                        <span>معاينة النموذج</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* 3D Realistic Mockup Graphic of Documents (Left side in RTL) */}
            <div 
              onClick={() => openImagePreview(documentsMockupGraphic, 'نماذج المستندات الرسمية للتأشيرة السياحية السعودية — جواز السفر والصورة الشخصية وكشف الحساب')}
              className="w-full sm:w-auto lg:w-[320px] xl:w-[360px] shrink-0 flex items-center justify-center cursor-pointer group"
              title="انقر لتكبير معاينة المستندات"
            >
              <div className="relative p-2 rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={documentsMockupGraphic} 
                  alt="نماذج المستندات المطلوبة — جواز السفر المصري والصورة الشخصية وكشف الحساب البنكي" 
                  className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] xl:max-w-[360px] h-auto object-contain drop-shadow-xl select-none"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* Full-Width Important Notice Bar (كشف الحساب البنكي يُطلب فقط أثناء موعد البصمة) */}
          <div className="w-full rounded-2xl bg-[#FAF7F0] border border-[#C9A13B]/35 px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-center gap-3 sm:gap-3.5 shadow-sm">
            <div 
              className="w-6 h-6 rounded-full border-[1.8px] border-secondary text-secondary flex items-center justify-center shrink-0 text-xs font-bold font-serif shadow-xs select-none"
              aria-hidden="true"
            >
              i
            </div>
            <p className="text-xs sm:text-sm md:text-base font-['Cairo'] leading-relaxed text-center sm:text-start">
              <strong className="font-bold text-primary ms-1">ملاحظة:</strong>
              <span className="text-[#1A1B4B]"> كشف الحساب البنكي يُطلب فقط أثناء موعد البصمة، وليس ضمن مستندات التقديم.</span>
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          8. APPLICATION STEPS SECTION (خطوات التقديم)
         ========================================================= */}
      <section id="steps" className="w-full py-16 md:py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            
            {/* Section Label (Pill Badge) */}
            <div className="inline-flex items-center gap-2 bg-[#FDFBF7] text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>رحلتك تبدأ بخطوات بسيطة</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              خطوات التقديم
            </h2>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo'] max-w-xl mx-auto">
              نتولى معك إجراءات التقديم خطوة بخطوة، من تجهيز الطلب وحتى إصدار التأشيرة.
            </p>
          </div>

          {/* Desktop & Tablet Timeline Layout (Hidden on Mobile) */}
          <div className="hidden md:block relative pt-4">
            {/* Horizontal Gold Dashed Connecting Timeline for Desktop */}
            <div 
              className="hidden lg:block absolute top-[28px] inset-x-20 border-t-2 border-dashed border-secondary/40 z-0 pointer-events-none" 
              aria-hidden="true" 
            />

            {/* 4 Cards in Horizontal RTL Order */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 relative z-10">
              {APPLICATION_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col items-center group text-center"
                  >
                    {/* Numbered Circular Indicator situated above each card */}
                    <div 
                      className="w-14 h-14 rounded-full border-2 border-secondary bg-white text-secondary font-black text-sm flex items-center justify-center shadow-sm mb-4 relative z-10 group-hover:scale-110 group-hover:bg-[#FAF7F0] transition-all duration-300 font-['Cairo'] select-none"
                      aria-label={`الخطوة ${step.number}`}
                    >
                      <span className="tracking-wider">{step.number}</span>
                    </div>

                    {/* Step Card */}
                    <div 
                      onClick={() => openImagePreview(step.image, step.previewTitle)}
                      className="w-full bg-white rounded-2xl p-6 border border-gray-100 hover:border-secondary/50 shadow-[0_4px_20px_-2px_rgba(22,26,141,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(22,26,141,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between text-center h-full cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          openImagePreview(step.image, step.previewTitle);
                        }
                      }}
                      title={`معاينة تفاصيل ${step.title}`}
                    >
                      <div className="w-full flex flex-col items-center">
                        {/* Icon Container: Soft blue squircle */}
                        <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-[#FAF7F0] group-hover:border-secondary/40 transition-all duration-300 mb-4 shadow-2xs">
                          <IconComponent className="w-7 h-7 text-primary" />
                        </div>

                        {/* Step Title */}
                        <h3 className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors font-['Cairo'] tracking-tight mb-2">
                          {step.title}
                        </h3>

                        {/* Step Description */}
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-['Cairo']">
                          {step.description}
                        </p>
                      </div>

                      {/* Micro interaction preview link */}
                      <div className="mt-4 pt-3 border-t border-gray-100/80 w-full flex items-center justify-center gap-1.5 text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-semibold font-['Cairo']">
                        <Maximize2 className="w-3.5 h-3.5 text-secondary" />
                        <span>معاينة التفاصيل</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Step Timeline (Visible Only on Mobile < 768px) */}
          <div className="md:hidden relative ps-10 pe-1 py-2">
            {/* Continuous Vertical Dashed Timeline Line */}
            <div 
              className="absolute top-6 bottom-8 start-5 w-0.5 border-s-2 border-dashed border-secondary/50 -translate-x-1/2 pointer-events-none" 
              aria-hidden="true" 
            />

            {/* Vertical Step Sequence */}
            <div className="flex flex-col gap-5">
              {APPLICATION_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.stepNumber} className="relative group text-start">
                    {/* Numbered Indicator on the vertical line */}
                    <div 
                      className="absolute -start-10 top-3.5 w-10 h-10 rounded-full border-2 border-secondary bg-white text-secondary font-black text-xs flex items-center justify-center shadow-sm z-10 font-['Cairo'] select-none"
                      aria-label={`الخطوة ${step.number}`}
                    >
                      <span>{step.number}</span>
                    </div>

                    {/* Step Card on Mobile */}
                    <div 
                      onClick={() => openImagePreview(step.image, step.previewTitle)}
                      className="bg-white rounded-2xl p-4.5 border border-gray-100 active:border-secondary/50 shadow-[0_4px_20px_-2px_rgba(22,26,141,0.05)] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center text-primary shrink-0 shadow-2xs">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-primary font-['Cairo']">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal font-['Cairo'] pe-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={navigateToApply}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-hover active:scale-[0.98] text-primary font-bold px-8 py-3.5 sm:py-4 min-h-[48px] rounded-lg text-sm sm:text-base transition-all shadow-sm hover:shadow-md cursor-pointer font-['Cairo'] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span>ابدأ طلب التأشيرة الآن</span>
              <ArrowLeft className="w-4 h-4 text-primary" />
            </button>
            <a
              href="https://wa.me/201060070093"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F0] border border-gray-200 hover:border-secondary/50 text-primary hover:text-secondary-hover font-bold px-6 py-3.5 sm:py-4 min-h-[48px] rounded-lg text-sm sm:text-base transition-all shadow-sm font-['Cairo']"
            >
              <span>استفسر عبر واتساب</span>
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================
          9. FREQUENTLY ASKED QUESTIONS SECTION (الأسئلة الشائعة)
         ========================================================= */}
      <section id="faq" className="w-full py-16 md:py-24 bg-[#FDFBF7] border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-gray-200/80 shadow-sm font-['Cairo']">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span>إجابات سريعة ومباشرة</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight leading-tight mb-2.5 font-['Cairo']">
              الأسئلة الشائعة
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed font-['Cairo']">
              إجابات سريعة عن التأشيرة السياحية.
            </p>
          </div>

          {/* Accordion 2-Column Grid (1 Column on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndices.includes(index);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen 
                      ? 'bg-[#FDFBF7] border-primary shadow-[0_4px_20px_-2px_rgba(22,26,141,0.08)]' 
                      : 'bg-white border-gray-100 hover:border-secondary/40 hover:bg-[#FCFAF6]/60 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-start flex items-center justify-between gap-3 px-5 py-4 cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    {/* Question */}
                    <span className="text-sm sm:text-base font-bold text-primary leading-snug font-['Cairo']">
                      {item.question}
                    </span>
                    
                    {/* Expand Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen 
                        ? 'bg-primary text-secondary rotate-180 shadow-sm' 
                        : 'bg-[#FAF7F0] text-secondary border border-gray-200/80'
                    }`}>
                      <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="px-5 pb-4 pt-1.5 border-t border-primary/10 text-xs sm:text-sm text-slate-600 leading-relaxed font-['Cairo'] animate-in fade-in duration-200"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="mt-8 sm:mt-10 text-center max-w-md mx-auto bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_-2px_rgba(22,26,141,0.05)]">
            <p className="text-xs sm:text-sm font-semibold text-primary mb-3 font-['Cairo']">
              عندك استفسار إضافي لم تجده هنا؟
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/201060070093"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold px-6 py-3 min-h-[44px] rounded-lg transition-all shadow-sm font-['Cairo']"
              >
                <span>تواصل معنا عبر واتساب</span>
                <ArrowLeft className="w-3.5 h-3.5 text-secondary" />
              </a>
              <button
                type="button"
                onClick={navigateToApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7F0] hover:bg-[#F3EFE6] border border-gray-200/80 text-primary text-xs sm:text-sm font-bold px-5 py-3 min-h-[44px] rounded-lg transition-all cursor-pointer font-['Cairo']"
              >
                <span>طلب اتصال مستشار</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          10. ACTION CTA SECTION (دعوة لبدء تقديم الطلب في الصفحة المخصصة)
         ========================================================= */}
      <section id="apply-cta" ref={finalCtaRef} className="w-full bg-[#FAF7F0] py-16 md:py-20 border-t border-gray-200/80">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-md border border-secondary/30 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            
            {/* Text block */}
            <div className="flex flex-col text-center lg:text-start max-w-xl">
              <div className="inline-flex items-center gap-2 self-center lg:self-start bg-secondary/20 border border-secondary/40 px-3.5 py-1 rounded-full text-xs font-semibold text-secondary mb-3 font-['Cairo']">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>ابدأ رحلتك بسهولة</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug font-['Cairo']">
                جاهز لبدء طلب تأشيرتك السياحية؟
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed font-normal font-['Cairo']">
                انتقل إلى صفحة قالب التقديم المخصصة لتسجيل بياناتك والبدء في تجهيز وتدقيق ملفك وحجز موعد تساهيل ومتابعة طلبك.
              </p>

              {/* Official Contact Direct Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 pt-3 border-t border-white/10 text-xs text-white/90 font-['Cairo']">
                <a 
                  href="tel:01040009577" 
                  className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  <span>هاتف الشركة:</span>
                  <span className="font-bold tracking-wider" dir="ltr">01040009577</span>
                </a>
                <span className="text-white/30 hidden sm:inline">•</span>
                <a 
                  href={`https://wa.me/201060070093?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن التقديم على التأشيرة السياحية السعودية عبر نشكا للسياحة')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-secondary rotate-180" />
                  <span>واتساب الاستفسارات:</span>
                  <span className="font-bold tracking-wider" dir="ltr">01060070093</span>
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={navigateToApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary hover:bg-secondary-hover active:scale-[0.98] text-primary font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 min-h-[48px] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer font-['Cairo']"
              >
                <span>الانتقال لنموذج التقديم</span>
                <ArrowLeft className="w-4 h-4 text-primary" />
              </button>

              <a
                href={`https://wa.me/201060070093?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن التقديم على التأشيرة السياحية السعودية عبر نشكا للسياحة')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-6 py-3.5 sm:py-4 min-h-[48px] rounded-lg border border-white/25 transition-all font-['Cairo']"
              >
                <Send className="w-4 h-4 text-secondary rotate-180" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          11. MINIMAL FOOTER (الفوتر المطلوب حصرياً)
         ========================================================= */}
      <footer className="w-full bg-[#10146B] text-white border-t border-white/10 py-7 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/80 font-['Cairo']">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">نشكا للسياحة — NASHKA TOURISM</span>
            <span>·</span>
            <span>جميع الحقوق محفوظة © 2026</span>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-white/75">
            <span>دقة واحترافية في إعداد الملفات</span>
            <span>•</span>
            <span>خدمة معتمدة لزوار المملكة العربية السعودية</span>
          </div>
        </div>
      </footer>

      {/* =========================================================
          LIGHTBOX / FULL-SIZE PHOTO PREVIEW
         ========================================================= */}
      {isImagePreviewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1B4B]/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={previewTitle}
        >
          <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsImagePreviewOpen(false)}
              className="absolute -top-11 sm:-top-12 end-1 sm:end-0 text-white hover:text-[#C9A13B] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="إغلاق العرض"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#C9A13B]/50 shadow-2xl bg-[#2E2F7F] max-h-[85vh] w-auto">
              <img 
                src={previewImage} 
                alt={previewTitle}
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>
            <p className="text-white/90 text-sm font-medium mt-3 text-center">
              {previewTitle}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================
          FLOATING QUICK WHATSAPP BUTTON (Desktop Only — لا يغطي أي نص)
         ========================================================= */}
      <a
        href={`https://wa.me/201060070093?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن التقديم على التأشيرة السياحية السعودية عبر نشكا للسياحة')}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactEvent({ channel: 'whatsapp', content_name: 'Desktop Floating WhatsApp' })}
        className="hidden md:inline-flex fixed bottom-5 start-5 z-40 items-center gap-2 bg-[#0F7A3A] hover:bg-[#0B632E] text-white py-2.5 px-4 rounded-full shadow-lg hover:shadow-xl transition-colors duration-200 motion-reduce:transition-none border border-white/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3A] focus-visible:ring-offset-2"
        aria-label="تواصل معنا فوراً عبر واتساب"
      >
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
        </svg>
        <span className="text-sm font-bold">تواصل واتساب</span>
      </a>

      {/* =========================================================
          MOBILE STICKY CONVERSION BAR (الشريط السفلي الثابت للهواتف)
         ========================================================= */}
      <div
        aria-hidden={!showMobileStickyBar}
        className={`fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(22,26,141,0.08)] flex items-center justify-between gap-2 font-['Cairo'] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          showMobileStickyBar ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col text-start min-w-0 flex-1">
          <span className="text-[14px] font-extrabold text-primary leading-tight">
            9,500 جنيه
          </span>
          <span className="text-[13px] text-slate-600 font-semibold leading-snug">
            باقة التجهيز والتأمين وتساهيل
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={navigateToApply}
            tabIndex={showMobileStickyBar ? 0 : -1}
            className="bg-secondary hover:bg-secondary-hover active:scale-[0.98] text-primary font-bold px-3.5 min-h-[48px] rounded-lg text-[14px] shadow-sm transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none shrink-0 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            اطلب التأشيرة الآن
          </button>
          <a
            href={`https://wa.me/201060070093?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن التقديم على التأشيرة السياحية السعودية عبر نشكا للسياحة')}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={showMobileStickyBar ? 0 : -1}
            onClick={() => trackContactEvent({ channel: 'whatsapp', content_name: 'Mobile Sticky Bar WhatsApp' })}
            className="w-12 h-12 rounded-lg bg-[#0F7A3A] hover:bg-[#0B632E] active:scale-[0.98] text-white flex items-center justify-center shadow-sm transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7A3A] focus-visible:ring-offset-2"
            aria-label="تواصل معنا عبر واتساب"
            title="تواصل عبر واتساب"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}
