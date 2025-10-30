import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaUserMd, 
  FaUserPlus, 
  FaFileUpload, 
  FaRobot, 
  FaClipboardList,
  FaChartLine,
  FaArrowRight,
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  const steps = [
    {
      number: '01',
      title: 'إنشاء الحساب',
      description: 'سجل كطبيب أورام وابدأ في استخدام المنصة مجاناً مع الوصول الكامل لجميع الميزات. عملية التسجيل تستغرق دقيقتين فقط.',
      icon: <FaUserMd className="text-xl sm:text-2xl" />,
      gradient: 'from-blue-500 to-cyan-500',
      duration: '2 دقيقة',
      features: ['تسجيل مجاني', 'تحقق سريع', 'دعم فوري']
    },
    {
      number: '02',
      title: 'إضافة المرضى',
      description: 'أضف بيانات المرضى والسجلات الطبية الخاصة بهم بشكل آمن وسري. النظام يتوافق مع معايير الخصوصية العالمية.',
      icon: <FaUserPlus className="text-xl sm:text-2xl" />,
      gradient: 'from-green-500 to-emerald-500',
      duration: '30 ثانية',
      features: ['بيانات آمنة', 'إدخال سريع', 'توافق مع المعايير']
    },
    {
      number: '03',
      title: 'رفع التحاليل',
      description: 'قم برفع الصور الشعاعية والتحاليل الطبية للمريض بسهولة وأمان. يدعم النظام جميع الصيغ الشائعة.',
      icon: <FaFileUpload className="text-xl sm:text-2xl" />,
      gradient: 'from-purple-500 to-violet-500',
      duration: '1 دقيقة',
      features: ['تنسيقات متعددة', 'رفع سحابي', 'جودة عالية']
    },
    {
      number: '04',
      title: 'الحصول على التحليل',
      description: 'احصل على تحليل مفصل من الذكاء الاصطناعي في دقائق مع تقارير شاملة ونتائج دقيقة تصل إلى 98%.',
      icon: <FaRobot className="text-xl sm:text-2xl" />,
      gradient: 'from-orange-500 to-amber-500',
      duration: '3 دقائق',
      features: ['دقة 98%', 'تحليل شامل', 'نتائج فورية']
    },
    {
      number: '05',
      title: 'وضع الخطة العلاجية',
      description: 'استخدم الاقتراحات الذكية لوضع خطة علاجية مخصصة بناءً على أحدث البروتوكولات العالمية والممارسات الطبية.',
      icon: <FaClipboardList className="text-xl sm:text-2xl" />,
      gradient: 'from-red-500 to-pink-500',
      duration: '5 دقائق',
      features: ['بروتوكولات حديثة', 'خطط مخصصة', 'توصيات ذكية']
    },
    {
      number: '06',
      title: 'المتابعة',
      description: 'تابع تطور حالة المريض وقم بتعديل الخطة عند الحاجة مع تنبيهات ذكية وتقارير دورية تلقائية.',
      icon: <FaChartLine className="text-xl sm:text-2xl" />,
      gradient: 'from-indigo-500 to-blue-500',
      duration: 'مستمرة',
      features: ['متابعة مستمرة', 'تنبيهات ذكية', 'تقارير تلقائية']
    }
  ];

  // كشف نوع الجهاز
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
    }
    }
  };

  const stepCardVariants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? 0 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-10 -left-10 w-40 h-40 md:w-64 md:h-64 bg-blue-100 rounded-full opacity-40"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 md:w-64 md:h-64 bg-purple-100 rounded-full opacity-40"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* العنوان الرئيسي */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            رحلة بسيطة نحو تشخيص أفضل
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-4">
            كيف تعمل <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">المنصة؟</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            خطوات بسيطة لتحويل الرعاية الصحية للأورام باستخدام الذكاء الاصطناعي
          </p>
        </motion.div>

        {/* العرض الرئيسي - تصميم مختلف للجوال vs التابلت vs الديسكتوب */}
        <div className={`${isMobile ? 'flex flex-col' : isTablet ? 'grid grid-cols-2 gap-6' : 'flex flex-col lg:flex-row gap-8 lg:gap-12 items-start'}`}>
          
          {/* الخطوات الجانبية - للديسكتوب والتابلت */}
          {(isTablet || !isMobile) && (
            <motion.div 
              className={`${isTablet ? 'col-span-1' : 'lg:w-2/5'} space-y-3 md:space-y-4`}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative cursor-pointer group ${
                    activeStep === index ? 'lg:scale-105' : ''
                  } transition-all duration-300`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-white shadow-lg md:shadow-xl border-2 border-blue-500' 
                      : 'bg-white/80 shadow-md md:shadow-lg border border-gray-100 group-hover:shadow-lg'
                  }`}>
                    {/* رقم الخطوة */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-base md:text-lg transition-all duration-300 ${
                      activeStep === index 
                        ? `bg-gradient-to-r ${step.gradient} shadow-lg scale-110` 
                        : 'bg-gray-400 group-hover:bg-gray-500'
                    }`}>
                      {step.number}
                    </div>

                    {/* محتوى الخطوة */}
                    <div className="flex-1 text-right">
                      <h3 className={`font-bold text-base md:text-lg transition-colors duration-300 ${
                        activeStep === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs md:text-sm transition-colors duration-300 ${
                        activeStep === index ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {step.duration}
                      </p>
                    </div>

                    {/* أيقونة */}
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeStep === index 
                        ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg` 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      {step.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* عرض تفصيلي للخطوة النشطة */}
          <motion.div 
            className={`${isMobile ? 'w-full mt-6' : isTablet ? 'col-span-1' : 'lg:w-3/5'} bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl p-4 md:p-6 lg:p-8 border border-gray-100`}
            key={activeStep}
            initial="hidden"
            animate="visible"
            variants={stepCardVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* أيقونة كبيرة */}
                <motion.div 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-r ${steps[activeStep].gradient} flex items-center justify-center text-white text-2xl md:text-3xl mx-auto mb-4 md:mb-6 shadow-lg`}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {steps[activeStep].icon}
                </motion.div>

                {/* رقم الخطوة */}
                <div className="text-blue-600 text-sm md:text-base font-semibold mb-2">
                  الخطوة {steps[activeStep].number}
                </div>

                {/* العنوان */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                  {steps[activeStep].title}
                </h3>

                {/* الوصف */}
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6 max-w-md mx-auto">
                  {steps[activeStep].description}
                </p>

                {/* الميزات */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8 max-w-md mx-auto">
                  {steps[activeStep].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg py-2 px-3"
                    >
                      <FaCheck className="text-green-500 text-xs" />
                      <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* مؤشر الوقت */}
                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 bg-gray-50 rounded-full text-gray-600 text-xs md:text-sm font-medium mb-4 md:mb-6">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                  الوقت التقريبي: {steps[activeStep].duration}
                </div>

                {/* أزرار التنقل - للجوال والتابلت */}
                {(isMobile || isTablet) && (
                  <div className="flex justify-center gap-3 md:gap-4 mt-6">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                        activeStep === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                      }`}
                    >
                      <FaArrowLeft className="text-xs md:text-sm" />
                      <span className="hidden sm:inline">السابقة</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                      disabled={activeStep === steps.length - 1}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                        activeStep === steps.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : `bg-gradient-to-r ${steps[activeStep].gradient} text-white hover:shadow-lg active:scale-95`
                      }`}
                    >
                      <span className="hidden sm:inline">التالية</span>
                      <FaArrowRight className="text-xs md:text-sm" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* شريط الخطوات للجوال فقط */}
          {isMobile && (
            <motion.div 
              className="mt-6 overflow-x-auto pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-3 min-w-max px-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`flex flex-col items-center p-3 rounded-xl min-w-[80px] transition-all duration-300 ${
                      activeStep === index 
                        ? 'bg-white shadow-lg border-2 border-blue-500' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2 ${
                      activeStep === index 
                        ? `bg-gradient-to-r ${step.gradient}` 
                        : 'bg-gray-400'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      activeStep === index ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {step.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* مؤشر التقدم للنقاط */}
        <motion.div 
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-white rounded-full p-1 md:p-2 shadow-lg inline-flex gap-1 md:gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`الخطوة ${index + 1}`}
              />
            ))}
          </div>
          
          {/* نص توضيحي */}
          <p className="text-gray-500 text-xs md:text-sm mt-4 max-w-md mx-auto px-4">
            انضم إلى <span className="text-blue-600 font-semibold">50+</span> طبيب يستخدمون منصتنا لتحسين رعاية مرضى السرطان
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;