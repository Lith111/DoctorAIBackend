import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  FaXRay, 
  FaPills, 
  FaUserMd, 
  FaRobot, 
  FaFileMedical, 
  FaShieldAlt,
  FaMobileAlt,
  FaTabletAlt,
  FaDesktop
} from 'react-icons/fa';
// تم تعديل يرجى الانتباه
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const features = [
    {
      icon: <FaXRay className="text-2xl" />,
      title: 'تحليل الصور الشعاعية',
      description: 'تحليل دقيق للصور الشعاعية باستخدام الذكاء الاصطناعي المتقدم لتحديد الأورام وقياسها بدقة تصل إلى 98%',
      gradient: 'from-blue-500 to-cyan-500',
      stats: 'دقة 98%'
    },
    {
      icon: <FaPills className="text-2xl" />,
      title: 'خطط علاجية ذكية',
      description: 'وضع خطط علاجية مخصصة بناءً على أحدث البروتوكولات العالمية ونوع الورم ومرحلته',
      gradient: 'from-green-500 to-emerald-500',
      stats: '50+ بروتوكول'
    },
    {
      icon: <FaUserMd className="text-2xl" />,
      title: 'إدارة المرضى',
      description: 'نظام متكامل لإدارة بيانات المرضى ومتابعة تطور حالتهم وتاريخهم المرضي بشكل آمن',
      gradient: 'from-purple-500 to-violet-500',
      stats: '1200+ مريض'
    },
    {
      icon: <FaRobot className="text-2xl" />,
      title: 'مساعد ذكي',
      description: 'مساعد طبي ذكي يجيب على استفساراتك ويقدم اقتراحات علاجية مبنية على الأدلة العلمية',
      gradient: 'from-orange-500 to-amber-500',
      stats: '24/7 متاح'
    },
    {
      icon: <FaFileMedical className="text-2xl" />,
      title: 'تقارير فورية',
      description: 'إنشاء تقارير طبية شاملة وقابلة للطباعة مع تحليلات مفصلة ورسوم بيانية تفاعلية',
      gradient: 'from-red-500 to-pink-500',
      stats: 'ثوانٍ معدودة'
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'أمن وحماية',
      description: 'نظام أمني متكامل يحافظ على سرية البيانات الطبية ويتوافق مع معايير الخصوصية العالمية',
      gradient: 'from-indigo-500 to-blue-500',
      stats: 'تشفير متقدم'
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const mainControls = useAnimation();

  // كشف نوع الجهاز
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

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
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const floatAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* خلفية ديكورية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-32 -right-20 w-72 h-72 bg-blue-100 rounded-full"
          variants={pulseAnimation}
          animate="animate"
        ></motion.div>
        <motion.div 
          className="absolute -bottom-32 -left-32 w-72 h-72 bg-purple-100 rounded-full"
          variants={pulseAnimation}
          animate="animate"
          transition={{ delay: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/3 left-1/4 w-24 h-24 bg-green-100 rounded-full opacity-40"
          variants={floatAnimation}
          animate="animate"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* العنوان الرئيسي */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            منصة متكاملة للرعاية الصحية
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent min-h-14">
            ميزات <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">متطورة</span>
          </h2>
          <br />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            مجموعة شاملة من الأدوات الذكية المصممة خصيصاً لتلبية احتياجات أطباء الأورام
          </p>
        </motion.div>

        {/* عرض الميزات الرئيسية (للكمبيوتر) */}
        <div className="hidden lg:block">
          <motion.div 
            className="grid grid-cols-12 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={mainControls}
          >
            {features.slice(0, 3).map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="col-span-4"
              >
                <div 
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                    activeFeature === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-12 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={mainControls}
          >
            {features.slice(3, 6).map((feature, index) => (
              <motion.div 
                key={index + 3}
                variants={itemVariants}
                className="col-span-4"
              >
                <div 
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                    activeFeature === index + 3 ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index + 3)}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* عرض الميزات للجوال والتابلت */}
        <div className="lg:hidden">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={mainControls}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 transform transition-all duration-300 active:scale-95"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    <div className="mt-3 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block">
                      {feature.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* مؤشر الأجهزة */}
        <motion.div 
          className="flex justify-center items-center gap-6 mt-12 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <FaMobileAlt className="text-lg" />
            <span className="text-sm">جوال</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <FaTabletAlt className="text-lg" />
            <span className="text-sm">تابلت</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <FaDesktop className="text-lg" />
            <span className="text-sm">كمبيوتر</span>
          </div>
        </motion.div>

        {/* زر الدعوة للإجراء */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/features" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>اكتشف جميع الميزات</span>
            <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          
          {/* نص إضافي */}
          <p className="text-gray-500 text-sm mt-6 max-w-md mx-auto px-4">
            انضم إلى <span className="text-blue-600 font-semibold">50+</span> طبيب يستخدمون منصتنا لتحسين رعاية مرضى السرطان
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;