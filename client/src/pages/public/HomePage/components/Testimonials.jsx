import React from 'react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'د. أحمد محمد',
      role: 'استشاري أورام',
      hospital: 'مستشفى الملك فيصل التخصصي',
      content: 'المنصة غيرت طريقة عملي completamente. التحليل الدقيق للصور واقتراحات العلاج وفرت علي ساعات من العمل وساعدتني في اتخاذ قرارات أكثر دقة.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'د. سارة الخالد',
      role: 'أخصائية أورام نسائية',
      hospital: 'مستشفى جامعة الملك سعود',
      content: 'المساعد الذكي ساعدني في تشخيص حالات معقدة كانت تستغرق أسابيع في الماضي. الآن يمكنني تقديم رعاية أفضل لمرضاي في وقت أقصر.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'د. خالد العتيبي',
      role: 'رئيس قسم الأورام',
      hospital: 'المستشفى العسكري',
      content: 'إدارة المرضى أصبحت أسهل بكثير. النظام المتكامل و التقارير التلقائية وفرت علينا الكثير من الجهد الإداري.',
      avatar: '👨‍⚕️'
    }
  ]

  return (
    <section className="py-20 bg-linear-to-r from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ماذا يقول أطباؤنا؟
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            انضم المئات من أطباء الأورام إلى منصتنا واختبروا ثورة في الرعاية الصحية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-primary-600">{testimonial.hospital}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection