import React from "react";
import html from './assets/icons/html.png'
import css from './assets/icons/css.png'
import js from './assets/icons/js.png'
import php from './assets/icons/php.png'
import MySQl from './assets/icons/MySQL.png'
import Kotlin from './assets/icons/Kotlin.png'
import git from './assets/icons/git.png'
import github from './assets/icons/github.png'
import jQuery from './assets/icons/jQuery.png'
import react from './assets/icons/react.png'
import laravel from './assets/icons/laravel.png'
import tailwind from './assets/icons/tailwind.png'
import Bootstrap from './assets/icons/Bootstrap.png'
import figma from './assets/icons/figma.png'
import vSC from './assets/icons/vSC.png'
import aSC from './assets/icons/aSC.png'
import java from './assets/icons/java.png'
import nodeJs from './assets/icons/nodeJs.png'
import mongoDb from './assets/icons/mongodb.png'
import vue from './assets/icons/vue.png'
import { motion } from "framer-motion";

const Skills = ()=>{
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };
    
    return(
        <div className="p-4 pt-8 bg-gray-800">
            <motion.h1 initial="hidden" whileInView="visible" variants={fadeIn} className="text-4xl font-bold text-white text-center mb-4">Skills</motion.h1>
            <motion.div initial="hidden" whileInView="visible" variants={fadeIn} className="flex flex-wrap justify-center gap-6">
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500">
                    <img className="w-16 h-16 " src={html} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
                    <img className="w-16 h-16 object-cover" src={css} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-amber-400">
                    <img className="w-16 h-16 object-cover" src={js} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-violet-700">
                    <img className="w-18 h-16 object-cover" src={php} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500">
                    <img className="w-18 h-16 object-cover" src={java} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-lime-700">
                    <img className="w-18 h-16 object-cover" src={nodeJs} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-amber-700">
                    <img className="w-16 h-16 object-cover" src={Kotlin} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-600">
                    <img className="w-16 h-18  object-cover" src={MySQl} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-lime-700">
                    <img className="w-16 h-18  object-cover" src={mongoDb} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-red-500">
                    <img className="w-16 h-18 object-cover" src={git} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-stone-600">
                    <img className="w-16 h-16 object-cover" src={github} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
                    <img className="w-16 h-16 object-cover" src={jQuery} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-400">
                    <img className="w-16 h-16 object-cover" src={react} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-400">
                    <img className="w-18 h-16 object-cover" src={vue} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-red-600">
                    <img className="w-16 h-16 object-cover" src={laravel} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
                    <img className="w-16 h-18 object-cover" src={tailwind} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-violet-500">
                    <img className="w-16 h-16 object-cover" src={Bootstrap} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
                    <img className="w-16 h-16 object-cover" src={vSC} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
                    <img className="w-16 h-16 object-cover" src={aSC} alt="" />
                </div>
                <div className="w-32 h-32 bg-black rounded-md shadow-sm overflow-hidden flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-lime-500">
                    <img className="w-14 h-18 object-cover" src={figma} alt="" />
                </div>
            </motion.div>
        </div>

    
    )
}
export default Skills