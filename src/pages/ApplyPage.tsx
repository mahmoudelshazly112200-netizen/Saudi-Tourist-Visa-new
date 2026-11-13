import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Landmark, 
  Compass, 
  Check, 
  Info,
  User,
  Flag,
  Briefcase,
  Camera,
  FileText,
  UploadCloud,
  X,
  FileCheck,
  AlertCircle,
  Calendar,
  Users,
  Plus,
  Minus,
  Star
} from 'lucide-react';
import riyadhTowerImg from '../assets/images/riyadh_kingdom_tower_1793168502736.jpg';
import { trackLeadEvent, trackContactEvent } from '../lib/metaPixel';

interface ApplyPageProps {
  onBackToHome: () => void;
}

const NATIONALITIES = [
  // الأكثر طلباً
  'مصر (مصري)',
  'المملكة العربية السعودية (سعودي)',
  'الإمارات العربية المتحدة (إماراتي)',
  'الكويت (كويتي)',
  'سلطنة عمان (عماني)',
  'البحرين (بحريني)',
  'قطر (قطري)',
  'الأردن (أردني)',
  'المغرب (مغربي)',
  'تونس (تونسي)',
  'الجزائر (جزائري)',
  'السودان (سوداني)',
  'ليبيا (ليبي)',
  'اليمن (يمني)',
  'العراق (عراقي)',
  'سوريا (سوري)',
  'لبنان (لبناني)',
  'فلسطين (فلسطيني)',
  'موريتانيا (موريتاني)',
  'الصومال (صومالي)',
  'جيبوتي (جيبوتي)',
  'جزر القمر',
  // دول العالم (أبجدياً)
  'أذربيجان',
  'أرمينيا',
  'أستراليا',
  'إسبانيا',
  'إستونيا',
  'إسواتيني',
  'جمهورية أفريقيا الوسطى',
  'أفغانستان',
  'ألبانيا',
  'ألمانيا',
  'أندورا',
  'إندونيسيا',
  'أنغولا',
  'أنتيغوا وباربودا',
  'الأرجنتين',
  'أوزبكستان',
  'أوغندا',
  'أوكرانيا',
  'إيران',
  'أيرلندا',
  'آيسلندا',
  'إيطاليا',
  'باكستان',
  'باراغواي',
  'باربادوس',
  'بالاو',
  'البرازيل',
  'البرتغال',
  'المملكة المتحدة (بريطانيا)',
  'بلجيكا',
  'بلغاريا',
  'بليز',
  'بنغلاديش',
  'بنما',
  'بنين',
  'الباهاماس',
  'بوتان',
  'بوتسوانا',
  'بوركينا فاسو',
  'بوروندي',
  'البوسنة والهرسك',
  'بولندا',
  'بوليفيا',
  'بيرو',
  'تايلاند',
  'تايوان',
  'تركمانستان',
  'تركيا',
  'ترينيداد وتوباغو',
  'تشاد',
  'جمهورية التشيك',
  'تشيلي',
  'تنزانيا',
  'توغو',
  'توفالو',
  'تونغا',
  'تيمور الشرقية',
  'جامايكا',
  'الجبل الأسود',
  'جزر سليمان',
  'جزر مارشال',
  'جنوب أفريقيا',
  'جنوب السودان',
  'جورجيا',
  'الدنمارك',
  'دومينيكا',
  'جمهورية الدومينيكان',
  'رواندا',
  'روسيا',
  'روسيا البيضاء (بيلاروسيا)',
  'رومانيا',
  'زامبيا',
  'زيمبابوي',
  'ساحل العاج (كوت ديفوار)',
  'ساموا',
  'سان مارينو',
  'سانت فينسنت والغرينادين',
  'سانت كيتس ونيفيس',
  'سانت لوسيا',
  'ساو تومي وبرينسيب',
  'السنغال',
  'سنغافورة',
  'السويد',
  'سويسرا',
  'سيراليون',
  'سريلانكا',
  'سيشل',
  'صربيا',
  'الصين',
  'طاجيكستان',
  'الغابون',
  'غامبيا',
  'غانا',
  'غرينادا',
  'غواتيمالا',
  'غيانا',
  'غينيا',
  'غينيا الاستوائية',
  'غينيا بيساو',
  'فانواتو',
  'فرنسا',
  'الفلبين',
  'فنلندا',
  'فيتنام',
  'فيجي',
  'قبرص',
  'قيرغيزستان',
  'كازاخستان',
  'الكاميرون',
  'كرواتيا',
  'كمبوديا',
  'كندا',
  'كوبا',
  'كوريا الجنوبية',
  'كوريا الشمالية',
  'كوستاريكا',
  'كولومبيا',
  'جمهورية الكونغو',
  'جمهورية الكونغو الديمقراطية',
  'كينيا',
  'كيريباتي',
  'لاتفيا',
  'لاوس',
  'لوكسمبورغ',
  'ليبيريا',
  'ليتوانيا',
  'ليختنشتاين',
  'ليسوتو',
  'مالطا',
  'مالي',
  'ماليزيا',
  'المجر (هنغاريا)',
  'مدغشقر',
  'المالديف',
  'المكسيك',
  'مالاوي',
  'منغوليا',
  'موريشيوس',
  'موزمبيق',
  'مولدوفا',
  'موناكو',
  'ميكرونيزيا',
  'ناميبيا',
  'ناورو',
  'النمسا',
  'نيبال',
  'النيجر',
  'نيجيريا',
  'نيكاراغوا',
  'نيوزيلندا',
  'هايتي',
  'الهند',
  'هندوراس',
  'هولندا',
  'الولايات المتحدة الأمريكية',
  'اليابان',
  'اليونان',
  'جنسية أخرى'
];

export default function ApplyPage({ onBackToHome }: ApplyPageProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationality, setNationality] = useState('مصر (مصري)');
  const [profession, setProfession] = useState('');
  const [applicantCount, setApplicantCount] = useState<number>(1);
  const [expectedTravelDate, setExpectedTravelDate] = useState('');
  const [hasBankStatement, setHasBankStatement] = useState<'yes' | 'no'>('yes');
  const [consentAgreed, setConsentAgreed] = useState(true);

  // File Upload State (Real interactive files)
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  const [personalPhotoFile, setPersonalPhotoFile] = useState<File | null>(null);
  const [personalPhotoPreview, setPersonalPhotoPreview] = useState<string | null>(null);

  // Validation & Submission State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  const passportInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Handle Passport File
  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassportFile(file);
      setValidationError(null);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPassportPreview(url);
      } else {
        setPassportPreview(null);
      }
    }
  };

  const removePassportFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPassportFile(null);
    setPassportPreview(null);
    if (passportInputRef.current) {
      passportInputRef.current.value = '';
    }
  };

  // Handle Personal Photo File
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPersonalPhotoFile(file);
      setValidationError(null);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPersonalPhotoPreview(url);
      } else {
        setPersonalPhotoPreview(null);
      }
    }
  };

  const removePersonalPhotoFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPersonalPhotoFile(null);
    setPersonalPhotoPreview(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setValidationError('يرجى كتابة الاسم بالكامل كما هو مكتوب في جواز السفر.');
      return;
    }
    if (!phoneNumber.trim()) {
      setValidationError('يرجى كتابة رقم هاتف أو واتساب صحيح للتواصل معك.');
      return;
    }
    if (!profession.trim()) {
      setValidationError('يرجى كتابة مهنتك الحالية.');
      return;
    }
    if (!passportFile) {
      setValidationError('يرجى إرفاق صورة واضحة لصفحة البيانات في جواز السفر.');
      return;
    }
    if (!personalPhotoFile) {
      setValidationError('يرجى إرفاق صورة شخصية حديثة.');
      return;
    }
    if (!consentAgreed) {
      setValidationError('يرجى تأكيد الموافقة على مراجعة البيانات والمستندات للتواصل معك.');
      return;
    }

    setValidationError(null);

    // Generate Official Reference Code
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setReferenceId(`NSK-SA-${randomCode}`);
    setSubmissionDate(new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Prepared conversion event architecture (will activate when CONVERSION_TRACKING_ENABLED is set to true)
    trackLeadEvent({
      content_name: 'Saudi Visa Application Form Submission',
      content_category: 'Visa Service',
      value: 9500 * applicantCount,
      currency: 'EGP',
      applicant_count: applicantCount
    });
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhoneNumber('');
    setNationality('مصر (مصري)');
    setProfession('');
    setApplicantCount(1);
    setExpectedTravelDate('');
    setHasBankStatement('yes');
    setConsentAgreed(true);
    setPassportFile(null);
    setPassportPreview(null);
    setPersonalPhotoFile(null);
    setPersonalPhotoPreview(null);
    setValidationError(null);
    if (passportInputRef.current) passportInputRef.current.value = '';
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#1A1B4B] flex flex-col antialiased selection:bg-[#C9A13B]/20 selection:text-[#2E2F7F]" dir="rtl">
      
      {/* Background Graphic Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none" aria-hidden="true">
        {/* Airplane outline in top corner */}
        <svg
          className="absolute top-2 start-4 sm:start-12 w-64 h-64 text-[#DEC99D]/40"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 120 180 L 260 90 C 280 75 310 95 300 120 L 260 200 L 330 230 L 350 215 C 355 210 365 215 362 225 L 352 250 L 362 275 C 365 285 355 290 350 285 L 330 270 L 260 300 L 220 370 C 210 385 190 380 190 365 L 195 295 L 120 220 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* =========================================================
          TOP NAV BAR: Brand and Back to Home
         ========================================================= */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#DEC99D]/50 sticky top-0 z-40 shadow-2xs">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-3 text-start hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E2F7F] rounded-xl p-1"
            title="العودة للصفحة الرئيسية"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#2E2F7F] text-[#C9A13B] flex items-center justify-center font-extrabold text-xl shadow-xs border border-[#C9A13B]/30 select-none">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A13B]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#2E2F7F] leading-tight">
                نشكا للسياحة
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#585A7E] font-semibold tracking-widest uppercase">
                NASHKA TOURISM
              </span>
            </div>
          </button>

          {/* Back to Home Button */}
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-[#FDFBF7] hover:bg-[#F3F5FA] text-[#2E2F7F] font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm border border-[#DEC99D]/80 hover:border-[#2E2F7F] transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E2F7F]"
          >
            <ArrowRight className="w-4 h-4 text-[#C9A13B]" />
            <span>العودة للرئيسية</span>
          </button>

        </div>
      </header>

      {/* =========================================================
          MAIN APPLICATION LAYOUT: Exact Match to Approved Mockup
         ========================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* =====================================================
                LEFT PANEL (Desktop): Scenic Riyadh Landmark Backdrop
               ===================================================== */}
            <div className="hidden lg:flex lg:col-span-5 flex-col sticky top-28 self-start">
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#DEC99D]/70 shadow-xl bg-[#2E2F7F] aspect-[4/5] max-h-[720px] w-full">
                
                {/* Background photo of Riyadh Kingdom Tower and Flag */}
                <img 
                  src={riyadhTowerImg} 
                  alt="برج المملكة وأفق الرياض" 
                  className="w-full h-full object-cover select-none"
                />

                {/* Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B4B]/95 via-[#2E2F7F]/40 to-transparent" />

                {/* Curved Gold & Navy Top Accent */}
                <div className="absolute top-0 end-0 w-36 h-36 bg-gradient-to-bl from-[#C9A13B]/40 to-transparent rounded-bl-full pointer-events-none" />

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white space-y-3">
                  <div className="inline-flex items-center gap-2 bg-[#C9A13B]/25 border border-[#C9A13B]/50 px-3 py-1 rounded-full text-xs font-bold text-[#F3E3B6]">
                    <span>تأشيرة السعودية من مصر</span>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    ملفك يُراجع بدقة قبل التقديم
                  </h3>

                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                    نراجع بياناتك ومستنداتك، ونستكمل لك التقديم على منصة إنجاز، والتأمين الطبي، وحجز موعد تساهيل مع متابعة مستمرة.
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Phone className="w-3.5 h-3.5 text-[#C9A13B]" />
                      <span>للاستفسار: 01040009577</span>
                    </span>
                    <span className="text-[#C9A13B] font-bold">نشكا للسياحة</span>
                  </div>
                </div>

              </div>

            </div>

            {/* =====================================================
                RIGHT PANEL: Official Application Form
               ===================================================== */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Header Title and Badge */}
              <div className="text-center sm:text-start mb-6 sm:mb-8">
                
                {/* Golden Badge: نموذج التقديم الرسمي */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AD45] to-[#B88F28] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 shadow-xs">
                  <FileText className="w-4 h-4 text-white" />
                  <span>نموذج بدء الطلب</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl font-black text-[#2E2F7F] tracking-tight leading-tight">
                  سجّل بياناتك وابدأ طلب تأشيرتك
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-[#52547D] mt-2 font-normal leading-relaxed">
                  املأ بياناتك الأساسية وارفع صورة الجواز والصورة الشخصية، وفريق نشكا هيراجع ملفك ويتواصل معاك قبل أي إجراء.
                </p>

              </div>

              {/* Form Card Container */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#DEC99D]/80 shadow-md">
                
                {/* Validation Error Alert */}
                {validationError && (
                  <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7 text-start">
                  
                  {/* =====================================================
                      SECTION 1: البيانات الأساسية
                     ===================================================== */}
                  <div className="relative pt-3">
                    
                    {/* Floating Section Pill Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#2E2F7F] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-xs">
                      <User className="w-3.5 h-3.5 text-[#C9A13B]" />
                      <span>البيانات الأساسية</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* 1. Full Name */}
                      <div>
                        <label htmlFor="full-name" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5">
                          الاسم بالكامل <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="full-name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="اكتب اسمك كما هو في جواز السفر"
                            className="w-full pe-10 ps-3.5 py-3 rounded-2xl border border-[#DCD5C5] focus:border-[#2E2F7F] focus:ring-2 focus:ring-[#2E2F7F]/15 text-xs sm:text-sm outline-none transition-all bg-[#FCFAF6] focus:bg-white placeholder:text-[#8E90B0]"
                          />
                          <User className="w-4 h-4 text-[#8E90B0] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* 2. Phone / WhatsApp */}
                      <div>
                        <label htmlFor="phone-number" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5">
                          رقم الموبايل / واتساب <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="phone-number"
                            type="tel"
                            required
                            dir="ltr"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="01xxxxxxxxx"
                            className="w-full ps-10 pe-3.5 py-3 rounded-2xl border border-[#DCD5C5] focus:border-[#2E2F7F] focus:ring-2 focus:ring-[#2E2F7F]/15 text-xs sm:text-sm outline-none transition-all bg-[#FCFAF6] focus:bg-white text-end placeholder:text-[#8E90B0]"
                          />
                          <Phone className="w-4 h-4 text-[#8E90B0] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* 3. Nationality */}
                      <div>
                        <label htmlFor="nationality" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5">
                          الجنسية <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="w-full pe-10 ps-3.5 py-3 rounded-2xl border border-[#DCD5C5] focus:border-[#2E2F7F] focus:ring-2 focus:ring-[#2E2F7F]/15 text-xs sm:text-sm outline-none transition-all bg-[#FCFAF6] focus:bg-white text-[#1A1B4B] cursor-pointer appearance-none"
                          >
                            {NATIONALITIES.map((nat) => (
                              <option key={nat} value={nat}>
                                {nat}
                              </option>
                            ))}
                          </select>
                          <Flag className="w-4 h-4 text-[#8E90B0] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* 4. Current Profession */}
                      <div>
                        <label htmlFor="profession" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5">
                          المهنة الحالية <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="profession"
                            type="text"
                            required
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="مثال: مهندس، محاسب، صاحب عمل"
                            className="w-full pe-10 ps-3.5 py-3 rounded-2xl border border-[#DCD5C5] focus:border-[#2E2F7F] focus:ring-2 focus:ring-[#2E2F7F]/15 text-xs sm:text-sm outline-none transition-all bg-[#FCFAF6] focus:bg-white placeholder:text-[#8E90B0]"
                          />
                          <Briefcase className="w-4 h-4 text-[#8E90B0] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* 5. Number of Applicants */}
                      <div>
                        <label htmlFor="applicant-count" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <span>عدد المسافرين</span>
                            <span className="text-rose-500">*</span>
                          </span>
                          <span className="text-[11px] text-[#585A7E] font-medium">
                            {applicantCount === 1 ? 'مسافر واحد' : applicantCount === 2 ? 'مسافران' : applicantCount <= 10 ? `${applicantCount} مسافرين` : `${applicantCount} مسافر`}
                          </span>
                        </label>
                        <div className="flex items-center justify-between rounded-2xl border border-[#DCD5C5] bg-[#FCFAF6] p-1.5 focus-within:border-[#2E2F7F] focus-within:ring-2 focus-within:ring-[#2E2F7F]/15 transition-all">
                          <button
                            type="button"
                            onClick={() => setApplicantCount(Math.max(1, applicantCount - 1))}
                            disabled={applicantCount <= 1}
                            className="w-10 h-10 rounded-xl bg-white border border-[#DCD5C5] text-[#2E2F7F] flex items-center justify-center hover:bg-[#F3F5FA] active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all shadow-2xs"
                            title="تقليل عدد المسافرين"
                            aria-label="تقليل عدد المسافرين"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <div className="flex items-center gap-2 font-black text-[#2E2F7F] text-sm select-none">
                            <Users className="w-4 h-4 text-[#C9A13B]" />
                            <span>{applicantCount} {applicantCount === 1 ? 'مسافر' : applicantCount === 2 ? 'مسافرين' : 'أفراد'}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setApplicantCount(Math.min(20, applicantCount + 1))}
                            disabled={applicantCount >= 20}
                            className="w-10 h-10 rounded-xl bg-white border border-[#DCD5C5] text-[#2E2F7F] flex items-center justify-center hover:bg-[#F3F5FA] active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all shadow-2xs"
                            title="زيادة عدد المسافرين"
                            aria-label="زيادة عدد المسافرين"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* 6. Expected Travel Date */}
                      <div>
                        <label htmlFor="travel-date" className="block text-xs sm:text-sm font-bold text-[#1A1B4B] mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <span>موعد السفر المتوقع</span>
                            <span className="text-[11px] font-normal text-[#585A7E]">(اختياري)</span>
                          </span>
                          <span className="text-[10px] text-[#8E90B0] font-normal">
                            تاريخ تقريبي
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            id="travel-date"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={expectedTravelDate}
                            onChange={(e) => setExpectedTravelDate(e.target.value)}
                            className="w-full pe-10 ps-3.5 py-3 rounded-2xl border border-[#DCD5C5] focus:border-[#2E2F7F] focus:ring-2 focus:ring-[#2E2F7F]/15 text-xs sm:text-sm outline-none transition-all bg-[#FCFAF6] focus:bg-white text-[#1A1B4B] cursor-pointer"
                          />
                          <Calendar className="w-4 h-4 text-[#8E90B0] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* =====================================================
                      SECTION 2: المستندات المطلوبة (رفع الملفات الفعلي)
                     ===================================================== */}
                  <div className="relative pt-2">
                    
                    {/* Floating Section Pill Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#2E2F7F] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-xs">
                      <FileCheck className="w-3.5 h-3.5 text-[#C9A13B]" />
                      <span>المستندات المطلوبة الآن</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Box 1: Passport Photo Upload */}
                      <div>
                        <input
                          ref={passportInputRef}
                          type="file"
                          id="passport-file-input"
                          accept="image/*,.pdf"
                          onChange={handlePassportChange}
                          className="hidden"
                        />

                        <div
                          onClick={() => passportInputRef.current?.click()}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              passportInputRef.current?.click();
                            }
                          }}
                          className={`w-full rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                            passportFile
                              ? 'bg-emerald-50/70 border-emerald-400'
                              : 'bg-[#F2F6FC]/70 border-[#C5D5EB] hover:border-[#2E2F7F] hover:bg-[#EBF2FB]'
                          }`}
                        >
                          {passportFile ? (
                            <div className="w-full flex flex-col items-center">
                              {passportPreview ? (
                                <img
                                  src={passportPreview}
                                  alt="معاينة جواز السفر"
                                  className="w-16 h-16 object-cover rounded-xl border border-emerald-300 shadow-2xs mb-2"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                                  <FileCheck className="w-6 h-6" />
                                </div>
                              )}
                              <span className="text-xs font-bold text-emerald-800 truncate max-w-[200px]">
                                {passportFile.name}
                              </span>
                              <span className="text-[10px] text-emerald-600 mt-0.5">
                                {(passportFile.size / 1024).toFixed(0)} كيلوبايت · تم الإرفاق
                              </span>
                              <button
                                type="button"
                                onClick={removePassportFile}
                                className="mt-2 text-[11px] text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
                              >
                                تغيير الملف
                              </button>
                            </div>
                          ) : (
                            <>
                              {/* Passport Icon in circle */}
                              <div className="w-11 h-11 rounded-full bg-white border border-[#C5D5EB] flex items-center justify-center text-[#2E2F7F] mb-2.5 shadow-2xs">
                                <FileText className="w-5 h-5 text-[#2E2F7F]" />
                              </div>

                              <h4 className="text-sm font-bold text-[#2E2F7F]">
                                صورة جواز السفر <span className="text-rose-500">*</span>
                              </h4>
                              
                              <p className="text-[11px] text-[#585A7E] mt-0.5">
                                صورة واضحة لصفحة البيانات (جواز ساري)
                              </p>

                              {/* Upload Cloud Icon */}
                              <div className="mt-3 text-[#2E2F7F]/70">
                                <UploadCloud className="w-5 h-5" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Box 2: Personal Photo Upload */}
                      <div>
                        <input
                          ref={photoInputRef}
                          type="file"
                          id="personal-photo-input"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />

                        <div
                          onClick={() => photoInputRef.current?.click()}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              photoInputRef.current?.click();
                            }
                          }}
                          className={`w-full rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                            personalPhotoFile
                              ? 'bg-emerald-50/70 border-emerald-400'
                              : 'bg-[#F2F6FC]/70 border-[#C5D5EB] hover:border-[#2E2F7F] hover:bg-[#EBF2FB]'
                          }`}
                        >
                          {personalPhotoFile ? (
                            <div className="w-full flex flex-col items-center">
                              {personalPhotoPreview ? (
                                <img
                                  src={personalPhotoPreview}
                                  alt="معاينة الصورة الشخصية"
                                  className="w-16 h-16 object-cover rounded-xl border border-emerald-300 shadow-2xs mb-2"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                                  <Camera className="w-6 h-6" />
                                </div>
                              )}
                              <span className="text-xs font-bold text-emerald-800 truncate max-w-[200px]">
                                {personalPhotoFile.name}
                              </span>
                              <span className="text-[10px] text-emerald-600 mt-0.5">
                                {(personalPhotoFile.size / 1024).toFixed(0)} كيلوبايت · تم الإرفاق
                              </span>
                              <button
                                type="button"
                                onClick={removePersonalPhotoFile}
                                className="mt-2 text-[11px] text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
                              >
                                تغيير الصورة
                              </button>
                            </div>
                          ) : (
                            <>
                              {/* Camera Icon in circle */}
                              <div className="w-11 h-11 rounded-full bg-white border border-[#C5D5EB] flex items-center justify-center text-[#2E2F7F] mb-2.5 shadow-2xs">
                                <Camera className="w-5 h-5 text-[#2E2F7F]" />
                              </div>

                              <h4 className="text-sm font-bold text-[#2E2F7F]">
                                الصورة الشخصية <span className="text-rose-500">*</span>
                              </h4>
                              
                              <p className="text-[11px] text-[#585A7E] mt-0.5">
                                صورة حديثة وواضحة بخلفية بيضاء
                              </p>

                              {/* Upload Cloud Icon */}
                              <div className="mt-3 text-[#2E2F7F]/70">
                                <UploadCloud className="w-5 h-5" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                    </div>

                    {applicantCount > 1 && (
                      <p className="mt-3 text-[11px] text-[#585A7E] bg-[#FDFBF7] p-2.5 rounded-xl border border-[#DEC99D]/60 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#C9A13B] shrink-0" />
                        <span>ارفع مستندات المسافر الرئيسي هنا فقط، وبعدها هيستلم فريق نشكا أوراق باقي المسافرين ({applicantCount - 1} {applicantCount - 1 === 1 ? 'مسافر' : 'مسافرين'}) عبر واتساب.</span>
                      </p>
                    )}

                  </div>

                  {/* =====================================================
                      SECTION 3: كشف الحساب البنكي (اختيار نعم / لا)
                     ===================================================== */}
                  <div className="relative pt-2">
                    
                    {/* Floating Section Pill Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#2E2F7F] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 shadow-xs">
                      <Landmark className="w-3.5 h-3.5 text-[#C9A13B]" />
                      <span>كشف الحساب البنكي</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1B4B] mb-2.5">
                      هل متوفر لديك كشف حساب بنكي لآخر 3 أشهر؟ <span className="text-rose-500">*</span>
                    </h4>

                    {/* Radio Options Grid */}
                    <div className="grid grid-cols-2 gap-3.5">
                      
                      {/* Option: نعم، متوفر */}
                      <button
                        type="button"
                        onClick={() => setHasBankStatement('yes')}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                          hasBankStatement === 'yes'
                            ? 'bg-[#FEF9EE] border-[#C9A13B] shadow-2xs'
                            : 'bg-white border-[#E2DBCA] hover:border-[#DEC99D]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold text-[#1A1B4B]">
                          نعم، متوفر
                        </span>
                        
                        {/* Custom Radio Circle */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          hasBankStatement === 'yes'
                            ? 'border-[#C9A13B] bg-white'
                            : 'border-slate-300'
                        }`}>
                          {hasBankStatement === 'yes' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A13B]" />
                          )}
                        </div>
                      </button>

                      {/* Option: لا، غير متوفر */}
                      <button
                        type="button"
                        onClick={() => setHasBankStatement('no')}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                          hasBankStatement === 'no'
                            ? 'bg-[#FEF9EE] border-[#C9A13B] shadow-2xs'
                            : 'bg-white border-[#E2DBCA] hover:border-[#DEC99D]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-bold text-[#1A1B4B]">
                          لا، غير متوفر حالياً
                        </span>

                        {/* Custom Radio Circle */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          hasBankStatement === 'no'
                            ? 'border-[#C9A13B] bg-white'
                            : 'border-slate-300'
                        }`}>
                          {hasBankStatement === 'no' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A13B]" />
                          )}
                        </div>
                      </button>

                    </div>

                    {/* Info Notice Box */}
                    <div className="mt-3.5 flex items-center gap-2 p-3 rounded-xl bg-[#FDFBF7] border border-[#DEC99D]/70 text-[11px] sm:text-xs text-[#52547D]">
                      <Info className="w-4 h-4 text-[#C9A13B] shrink-0" />
                      <p>
                        مش محتاج ترفع كشف الحساب دلوقتي؛ بنسألك فقط عشان مستشار نشكا يوضح لك المطلوب قبل موعد البصمة في تساهيل.
                      </p>
                    </div>

                  </div>

                  {/* =====================================================
                      SECTION 4: الموافقة وإرسال الطلب
                     ===================================================== */}
                  <div className="pt-2 space-y-4">
                    
                    {/* 9. الموافقة على استخدام البيانات */}
                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FCFAF6] border border-[#DEC99D]/70 hover:border-[#2E2F7F] transition-all cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consentAgreed}
                        onChange={(e) => {
                          setConsentAgreed(e.target.checked);
                          if (e.target.checked) setValidationError(null);
                        }}
                        className="mt-0.5 w-4 h-4 rounded text-[#2E2F7F] border-[#DCD5C5] focus:ring-[#2E2F7F] accent-[#2E2F7F] cursor-pointer"
                      />
                      <span className="text-xs text-[#2E2F7F] font-medium leading-relaxed">
                        أوافق على مراجعة بياناتي ومستنداتي من قِبل فريق نشكا للتواصل معي وتجهيز إجراءات التأشيرة.
                      </span>
                    </label>

                    {/* 10. زر إرسال الطلب */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#D5AD45] via-[#C9A13B] to-[#B88F28] hover:from-[#c29b3a] hover:to-[#a98120] active:scale-[0.99] text-white font-extrabold h-[54px] rounded-2xl text-base sm:text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E2F7F]"
                    >
                      <Send className="w-5 h-5 text-white" />
                      <span>تأكيد وإرسال الطلب</span>
                    </button>

                    {/* Trust Note */}
                    <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#52547D] text-center pt-0.5">
                      <ShieldCheck className="w-4 h-4 text-[#C9A13B] shrink-0" />
                      <span>بياناتك ومستنداتك تُستخدم لمراجعة ملفك والتواصل معك فقط.</span>
                    </div>

                  </div>

                </form>

              </div>

              {/* Trust Section Footer underneath form */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#DEC99D]/60 flex items-center gap-3 text-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#2E2F7F] text-[#C9A13B] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#C9A13B]" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#2E2F7F]">أكثر من 10,000 عميل</h5>
                    <p className="text-[11px] text-[#585A7E]">خبرة حقيقية في ملفات السفر</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#DEC99D]/60 flex items-center gap-3 text-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF9EE] text-[#C9A13B] flex items-center justify-center shrink-0 border border-[#DEC99D]">
                    <Star className="w-5 h-5 text-[#C9A13B] fill-[#C9A13B]" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#2E2F7F]">تقييم 5 نجوم</h5>
                    <p className="text-[11px] text-[#585A7E]">متابعة واضحة وخدمة موثوقة</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#DEC99D]/60 flex items-center gap-3 text-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#047857]/10 text-[#047857] flex items-center justify-center shrink-0 border border-[#047857]/20">
                    <ShieldCheck className="w-5 h-5 text-[#047857]" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#2E2F7F]">بياناتك في أمان</h5>
                    <p className="text-[11px] text-[#585A7E]">حفظ سري لجوازك ومستنداتك</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* =========================================================
              SUCCESS STATE PAGE: Official Receipt & Next Steps
             ========================================================= */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#DEC99D]/80 shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-xs mb-5">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="inline-block bg-[#FDFBF7] text-[#2E2F7F] border border-[#DEC99D]/80 px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs">
              تم استلام طلبك بنجاح
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#2E2F7F] mb-3">
              شكرًا لك، {fullName}
            </h2>

            <p className="text-sm text-[#52547D] leading-relaxed max-w-md mx-auto mb-6">
              تم تسجيل طلب التأشيرة السياحية بنجاح. فريق نشكا هيراجع بياناتك والمستندات المرفقة ويتواصل معاك على رقم ({phoneNumber}) لتأكيد الخطوة التالية.
            </p>

            {/* Official Reference & Summary Card */}
            <div className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#DEC99D]/80 max-w-md mx-auto text-xs text-[#2E2F7F] mb-8 space-y-2.5 text-start">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#DEC99D]/50">
                <span className="text-[#585A7E]">رقم متابعة الطلب:</span>
                <span className="font-mono text-base font-black text-[#C9A13B] tracking-wider">
                  {referenceId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#585A7E]">عدد المسافرين:</span>
                <span className="font-bold text-[#2E2F7F]">
                  {applicantCount} {applicantCount === 1 ? 'مسافر واحد' : applicantCount === 2 ? 'مسافران' : `${applicantCount} مسافرين`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#585A7E]">المهنة:</span>
                <span className="font-bold text-[#2E2F7F]">{profession}</span>
              </div>

              {expectedTravelDate && (
                <div className="flex items-center justify-between">
                  <span className="text-[#585A7E]">موعد السفر المتوقع:</span>
                  <span className="font-bold text-[#2E2F7F]">{expectedTravelDate}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[#585A7E]">الجنسية:</span>
                <span className="font-bold text-[#2E2F7F]">{nationality}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#585A7E]">كشف الحساب البنكي:</span>
                <span className="font-bold text-[#2E2F7F]">
                  {hasBankStatement === 'yes' ? 'متوفر' : 'غير متوفر حاليًا'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#585A7E]">المستندات المرفقة:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>جواز السفر + الصورة الشخصية</span>
                </span>
              </div>

              <div className="pt-2 border-t border-[#DEC99D]/50 text-[11px] text-[#585A7E] text-center">
                تاريخ التسجيل: {submissionDate}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/201060070093?text=${encodeURIComponent(`السلام عليكم، قمت بتقديم طلب تأشيرة سياحية عبر الموقع برقم مرجع ${referenceId} باسم ${fullName} لعدد ${applicantCount} مسافرين.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D5AD45] to-[#B88F28] hover:from-[#c29b3a] hover:to-[#a98120] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>تابع طلبك عبر واتساب</span>
              </a>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2E2F7F] hover:bg-[#232462] text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-xs cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-[#C9A13B]" />
                <span>العودة للصفحة الرئيسية</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-[#585A7E] hover:text-[#2E2F7F] underline cursor-pointer"
              >
                تقديم طلب آخر لمسافر جديد
              </button>
            </div>

          </div>
        )}

      </main>

      {/* =========================================================
          MINIMAL FOOTER: Official Brand Copyright
         ========================================================= */}
      <footer className="w-full bg-[#10146B] text-white border-t border-white/10 py-6 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70 font-['Cairo']">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">نشكا للسياحة — NASHKA TOURISM</span>
            <span>·</span>
            <span>جميع الحقوق محفوظة © 2026</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/60">
            <span>مراجعة وتجهيز ملفات التأشيرة السياحية السعودية</span>
            <span>•</span>
            <span>هاتف: 01040009577</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
