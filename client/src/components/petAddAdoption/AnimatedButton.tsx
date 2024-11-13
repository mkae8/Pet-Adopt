import { motion } from "framer-motion";

const AnimatedButton = () => {
  return (
    <motion.button
      initial={{ y: 80, opacity: 0 }} // Эхлэх байдал: button харагдахгүй, доороос
      animate={{ y: 0, opacity: 1 }} // Анимэйшн эхлэх үед: button дээшлээд, харагдах болно
      transition={{
        delay: 1, // 1 секунд хүлээж байгаад эхэлнэ
        duration: 1, // Анимэйшн дуусах хугацаа
      }}
      className="
        relative overflow-hidden bg-gradient-to-r from-black via-yellow-500 to-black text-white font-semibold py-3 px-6 
        transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50  
        group"
    >
      <span className="relative z-10 text-lg">
        Үрчлүүлэх амьтны мэдээлэл оруулах
      </span>
      <span
        className="
          absolute inset-0 bg-black opacity-20 transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 origin-left hover:border-none "
      ></span>
    </motion.button>
  );
};

export default AnimatedButton;
