import React from "react";
import { motion } from "framer-motion";

const Educations = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="p-6 pt-12 bg-black">
      <motion.h1
        className="text-4xl font-bold text-white text-center mb-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
      >
        Educations
      </motion.h1>
      <br /> <br />
      <div className="relative flex justify-center">
        {/* Vertical dotted line */}
        <motion.div
          className="h-96 border-2 border-blue-600"
          initial={{ height: 0 }}
          animate={{ height: "24rem" }}
          transition={{ duration: 1.5 }}
        ></motion.div>

        {/* Dots with paragraphs */}
        <div className="absolute space-y-12">
          {/* Entry 1 - Left Side */}
          <motion.div
            className="relative flex items-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute left-[-270px] w-64 p-4 border-2 border-solid border-blue-500 rounded-full bg-gray-800">
              <h2 className="text-white text-lg text-center"> School</h2>
              <p className="text-white text-lg">
                 (2021 - 2022)
              </p>
            </div>
          </motion.div>

          {/* Entry 2 - Right Side */}
          <motion.div
            className="relative flex items-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute left-[50px] w-64 p-4 border-2 border-solid border-blue-500 rounded-full bg-gray-800">
              <h2 className="text-white text-lg text-center">school</h2>
              <p className="text-white text-lg">(2022 - 2023)</p>
            </div>
          </motion.div>

          {/* Entry 3 - Left Side */}
          <motion.div
            className="relative flex items-center pt-24"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute left-[-270px] w-64 p-4 border-2 border-solid border-blue-500 rounded-full bg-gray-800">
              <h2 className="text-white text-lg text-center">Solicode</h2>
              <p className="text-white text-lg">Web Development (2023 - 2024)</p>
            </div>
          </motion.div>

          {/* Entry 4 - Right Side */}
          <motion.div
            className="relative flex items-center pt-14"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute left-[50px] w-64 p-4 border-2 border-solid border-blue-500 rounded-full bg-gray-800">
              <h2 className="text-white text-lg text-center">Solicode</h2>
              <p className="text-white text-lg">Mobile Development (2024 - 2025)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Educations;
