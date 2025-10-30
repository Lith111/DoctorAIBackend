import { Link } from "react-router-dom";
import heroImage from "../../../../assets/home.jpg";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// تم تعديله يرجى الانتباه
const HeroSection = () => {
  const Counter = ({ end, suffix = "", duration = 1000 }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView) {
        let start = 0;
        const increment = end / (duration / 16); // 60 fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [inView, end, duration]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section className="relative bg-linear-to-r from-primary-600 to-primary-800 text-white py-20 lg:py-32">
      {/* خلفية الصورة مع طبقة تدرج لوني فوقها */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
      </div>

      {/* طبقة التعتيم الخفيفة */}
      <div className="absolute inset-0 bg-black opacity-45"></div>

      {/* المحتوى */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            المساعد الذكي
            <span className="block text-primary-200">لأطباء الأورام</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            منصة متكاملة تعتمد على الذكاء الاصطناعي لمساعدة أطباء الأورام في
            التشخيص الدقيق ووضع الخطط العلاجية المثلى لمكافحة السرطان
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              ابدأ مجاناً
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              تعرف أكثر
            </Link>
          </div>
        </div>

        {/* إحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <Counter end={50} suffix="+" duration={1000} />
            </div>
            <div className="text-primary-200">طبيب مستخدم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <Counter end={1200} suffix="+" duration={1000} />
            </div>
            <div className="text-primary-200">مريض تم خدمتهم</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <span>
                {" "}
                <Counter end={98} suffix="%" duration={1000} />
              </span>
            </div>
            <div className="text-primary-200">دقة في التشخيص</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <span>
                <Counter end={24} duration={1000} />
              </span>
              /
              <span>
                <Counter end={7} duration={1000} />
              </span>
            </div>
            <div className="text-primary-200">دعم متواصل</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
