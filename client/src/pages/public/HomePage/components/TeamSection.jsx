import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  FaUserMd, 
  FaFlask, 
  FaCode, 
  FaGraduationCap,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaStar,
  FaAward,
  FaRocket,
  FaHeart,
  FaStethoscope
} from 'react-icons/fa';

const TeamSection = () => {
  const [activeMember, setActiveMember] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  const teamMembers = [
    {
      name: 'د. محمد العلي',
      role: 'استشاري الذكاء الاصطناعي في الطب',
      description: 'خبرة 15 عاماً في تطبيق الذكاء الاصطناعي في التشخيص الطبي. قاد أكثر من 20 مشروعاً بحثياً في مجال الذكاء الاصطناعي الطبي.',
      avatar: <FaUserMd className="text-2xl" />,
      gradient: 'from-blue-500 to-cyan-500',
      specialties: ['الذكاء الاصطناعي', 'التشخيص الطبي', 'البحث العلمي'],
      achievements: ['20+ مشروع بحثي', '15+ سنة خبرة', '5 براءات اختراع'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'د. فاطمة القحطاني',
      role: 'أخصائية أورام وبيانات طبية',
      description: 'متخصصة في تحليل البيانات الطبية وتطوير نماذج التنبؤ. نشرت أكثر من 30 بحثاً في مجلات طبية محكمة.',
      avatar: <FaFlask className="text-2xl" />,
      gradient: 'from-purple-500 to-pink-500',
      specialties: ['تحليل البيانات', 'نماذج التنبؤ', 'الأورام'],
      achievements: ['30+ بحث علمي', '10 سنوات خبرة', '3 جوائز علمية'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'م. عبدالله الحربي',
      role: 'مهندس برمجيات طبية',
      description: 'مطور أنظمة طبية معتمد مع خبرة في الأمن السيبراني. قاد تطوير 5 أنظمة طبية معتمدة عالمياً.',
      avatar: <FaCode className="text-2xl" />,
      gradient: 'from-green-500 to-emerald-500',
      specialties: ['تطوير الأنظمة', 'الأمن السيبراني', 'البرمجيات الطبية'],
      achievements: ['5 أنظمة طبية', 'شهادات معتمدة', '10+ مشروع'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'د. لينا السديس',
      role: 'باحثة في التعلم الآلي',
      description: 'متخصصة في تطوير خوارزميات تحليل الصور الطبية. حاصلة على جائزة أفضل باحثة شابة في مجال الذكاء الاصطناعي.',
      avatar: <FaGraduationCap className="text-2xl" />,
      gradient: 'from-orange-500 to-amber-500',
      specialties: ['تحليل الصور', 'التعلم الآلي', 'الخوارزميات'],
      achievements: ['جائزة بحثية', '8 سنوات خبرة', '15+ نموذج'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    }
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

  const cardVariants = {
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
      
      {/* عناصر ديكورية */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60"
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
          className="absolute bottom-20 left-20 w-24 h-24 bg-purple-100 rounded-full opacity-60"
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
            <FaStar className="text-yellow-500" />
            <span>فريق الخبراء المتخصص</span>
            <FaHeart className="text-red-500" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            فريقنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">المتميز</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نخبة من <span className="text-blue-600 font-semibold">الخبراء</span> في الطب والتقنية يجتمعون تحت مظلة واحدة 
            لتطوير <span className="text-green-600 font-semibold">حلول ذكية</span> تساهم في رعاية مرضى الأورام
          </p>
        </motion.div>

        {/* شبكة أعضاء الفريق */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group cursor-pointer rounded-3xl overflow-hidden border-2 ${
                activeMember === index 
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                  : 'border-white hover:border-blue-300'
              } transition-all duration-500 bg-white shadow-xl`}
              onClick={() => setActiveMember(index)}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  
                  {/* الصورة */}
                  <motion.div 
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${member.gradient} flex items-center justify-center text-white shadow-2xl relative overflow-hidden`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                  >
                    {/* تأثير لامع */}
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {member.avatar}
                  </motion.div>

                  {/* المعلومات */}
                  <div className="flex-1 text-center md:text-right">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      activeMember === index ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {member.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{member.role}</p>
                    
                    {/* التخصصات */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                      {member.specialties.slice(0, 2).map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* الإنجازات */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {member.achievements.map((achievement, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-blue-600 text-sm font-bold">{achievement}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* التفاصيل التفاعلية */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 relative overflow-hidden"
          key={activeMember}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          
          {/* نمط زخرفي */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* الجانب الأيسر - المعلومات الشخصية */}
              <div className="lg:w-2/5 text-center lg:text-right">
                <motion.div 
                  className="inline-flex flex-col items-center lg:items-end mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className={`w-32 h-32 rounded-2xl bg-gradient-to-r ${teamMembers[activeMember].gradient} flex items-center justify-center text-white text-4xl mb-4 shadow-2xl`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.8 }
                    }}
                  >
                    {teamMembers[activeMember].avatar}
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {teamMembers[activeMember].name}
                  </h3>
                  <p className="text-blue-600 text-lg font-semibold mb-4">
                    {teamMembers[activeMember].role}
                  </p>

                  {/* وسائل التواصل */}
                  <div className="flex gap-3 justify-center lg:justify-start">
                    {Object.entries(teamMembers[activeMember].social).map(([platform, url], idx) => (
                      <motion.a
                        key={platform}
                        href={url}
                        whileHover={{ scale: 1.2, y: -2 }}
                        className="w-12 h-12 bg-gray-100 hover:bg-blue-500 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-colors duration-300 border border-gray-200"
                      >
                        {platform === 'linkedin' && <FaLinkedin />}
                        {platform === 'twitter' && <FaTwitter />}
                        {platform === 'email' && <FaEnvelope />}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* الجانب الأيمن - التفاصيل */}
              <div className="lg:w-3/5">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 text-justify">
                    {teamMembers[activeMember].description}
                  </p>

                  {/* التخصصات */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <FaStethoscope className="text-blue-500" />
                      مجالات التخصص
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {teamMembers[activeMember].specialties.map((specialty, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-300"
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* إحصائيات الفريق */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { number: '50+', text: 'سنة خبرة مجتمعة', color: 'text-blue-600' },
            { number: '80+', text: 'بحث علمي منشور', color: 'text-green-600' },
            { number: '15+', text: 'جائزة وتكريم', color: 'text-purple-600' },
            { number: '10+', text: 'براءة اختراع', color: 'text-orange-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
              <div className="text-gray-600">{stat.text}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* نص ختامي */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            <span className="text-blue-600 font-semibold">رسالتنا:</span> نعمل بكل شغف لتطوير حلول ذكية تساهم في تحسين حياة المرضى 
            وتطوير <span className="text-green-600 font-semibold">مستقبل الرعاية الصحية</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;