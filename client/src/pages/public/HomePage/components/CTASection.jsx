import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaCalendarAlt, 
  FaHeadset,  
  FaStar,
  FaArrowLeft
} from 'react-icons/fa';

const CTASection = () => {
  const features = [
    { icon: <FaCalendarAlt className="text-lg" />, text: 'تجربة مجانية 14 يوم' },
    { icon: <FaStar className="text-lg" />, text: 'لا حاجة لبطاقة ائتمان' },
    { icon: <span></span>, text: 'دعم فني متواصل' },
    { icon: <FaStar className="text-lg" />, text: 'شهادة معتمدة' }
  ];

  const stats = [
    { number: '50+', label: 'طبيب مستخدم' },
    { number: '98%', label: 'رضا العملاء' },
    { number: '24/7', label: 'دعم فني' },
    { number: '1200+', label: 'مريض تم خدمتهم' }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-60"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-32 h-32 bg-purple-100 rounded-full opacity-60"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-20 h-20 bg-cyan-100 rounded-full opacity-50"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* المحتوى الرئيسي */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* النص والعنوان */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center lg:text-right"
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-lg text-blue-600 text-sm font-medium border border-blue-100"
              whileHover={{ scale: 1.05 }}
            >
              <FaRocket className="text-orange-500" />
              <span>ابدأ رحلتك الآن</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              مستعد لبدء رحلتك مع{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                الذكاء الاصطناعي
              </span>{' '}
              في الطب؟
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg lg:max-w-none mx-auto lg:mx-0">
              انضم إلى المئات من أطباء الأورام الذين يستخدمون منصتنا لتحسين رعاية مرضى السرطان
              وتطوير مهاراتهم التشخيصية باستخدام أحدث تقنيات الذكاء الاصطناعي.
            </p>

            {/* الإحصائيات */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-8 max-w-md lg:max-w-none mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-right">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* البطاقة التفاعلية */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative overflow-hidden">
              
              {/* زخارف زاوية */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  ابدأ رحلتك اليوم
                </h3>

                {/* أزرار الدعوة للإجراء */}
                <div className="space-y-4 mb-8">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      to="/auth/register" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <FaRocket className="group-hover:animate-bounce" />
                      ابدأ مجاناً الآن
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      to="/contact" 
                      className="w-full border-2 border-blue-500 text-blue-600 py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <FaHeadset className="group-hover:scale-110 transition-transform" />
                      تواصل للاستفسار
                    </Link>
                  </motion.div>
                </div>

                {/* المميزات */}
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg p-3"
                    >
                      <div className="text-blue-500">
                        {feature.icon}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* ضمان إضافي */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div className="text-right flex-1">
                      <p className="text-green-800 text-sm font-medium">
                        ضمان استعادة الأموال خلال 30 يوم
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* عنصر ديكوري عائم */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg"
            >
              <FaStar className="text-sm" />
            </motion.div>
          </motion.div>
        </div>

        {/* شهادات أو شركاء */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-6">موثوق من قبل أفضل المؤسسات الطبية</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['مستشفى الملك فيصل', 'مدينة الملك فهد', 'مستشفى القوات المسلحة', 'المركز السعودي'].map((org, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 font-semibold text-lg"
              >
                {org}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

