import React, { useState, useRef , useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaUser,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaHeadset
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال النموذج
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // إعادة تعيين النموذج بعد 3 ثواني
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'البريد الإلكتروني',
      content: 'info@doctorai.com',
      subContent: 'support@doctorai.com',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'الهاتف',
      content: '+966 12 345 6789',
      subContent: '+966 50 123 4567',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.2
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'العنوان',
      content: 'الرياض، المملكة العربية السعودية',
      subContent: 'الحي الدبلوماسي - شارع الملك فهد',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: 'ساعات العمل',
      content: 'الأحد - الخميس: 8 صباحاً - 5 مساءً',
      subContent: 'الجمعة - السبت: مغلق',
      gradient: 'from-orange-500 to-amber-500',
      delay: 0.4
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: '#', color: 'hover:bg-blue-500 hover:text-white' },
    { icon: <FaTwitter />, href: '#', color: 'hover:bg-sky-500 hover:text-white' },
    { icon: <FaWhatsapp />, href: '#', color: 'hover:bg-green-500 hover:text-white' },
    { icon: <FaHeadset />, href: '#', color: 'hover:bg-purple-500 hover:text-white' }
  ];

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
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden" ref={ref}>
      
      {/* خلفية ديكورية */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-60"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* العنوان الرئيسي */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white rounded-full shadow-lg text-blue-600 text-lg font-medium border border-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            <FaPaperPlane className="text-green-500" />
            <span>نحن هنا لمساعدتك</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            تواصل <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">معنا</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك في أي استفسار. فريق الدعم لدينا جاهز للإجابة على جميع أسئلتك 
            وتقديم <span className="text-blue-600 font-semibold">أفضل الحلول</span> لاحتياجاتك.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* معلومات الاتصال */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-blue-300 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <div className="flex-1 text-right">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 text-lg font-semibold mb-1">
                        {item.content}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.subContent}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* وسائل التواصل الاجتماعي */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                تابعنا على
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 border border-gray-300 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* نموذج الاتصال */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-2xl relative overflow-hidden">
              
              {/* زخارف زاوية */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-3xl"></div>
              
              <div className="relative z-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6"
                    >
                      ✓
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-gray-600">
                      سنقوم بالرد عليك في أقرب وقت ممكن.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <FaUser className="text-blue-500" />
                      أرسل رسالتك
                    </h3>
                    <p className="text-gray-500 mb-8">
                      املأ النموذج أدناه وسنعاود الاتصال بك في غضون 24 ساعة.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            الاسم الكامل
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="أدخل اسمك الكامل"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            البريد الإلكتروني
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="example@domain.com"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          الموضوع
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="موضوع رسالتك"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          الرسالة
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="اكتب رسالتك هنا..."
                            required
                          ></textarea>
                        </div>
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl hover:shadow-blue-500/25'
                        } text-white relative overflow-hidden`}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                          />
                        ) : (
                          <>
                            <span>إرسال الرسالة</span>
                            <FaPaperPlane className="absolute left-6 top-1/2 transform -translate-y-1/2" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* معلومات إضافية */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              زيارتك تهمنا
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نحن نرحب بزيارتك في أي وقت خلال ساعات العمل. يمكنك أيضاً جدولة موعد مسبق 
              لضمان توفير أفضل خدمة ممكنة لك.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;