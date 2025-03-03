import React from "react";
import { motion } from "framer-motion";

const Skills = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };
    
    return (
        <div className="p-4 pt-8 bg-gray-800">
            <motion.h1 
                initial="hidden" 
                whileInView="visible" 
                variants={fadeIn} 
                className="text-4xl font-bold text-white text-center mb-4"
            >
                Skills
            </motion.h1>
            
            <motion.div 
                initial="hidden" 
                whileInView="visible" 
                variants={fadeIn} 
                className="flex flex-wrap justify-center gap-6"
            >
                <section id="badges" align="center">  

                    <div align="center">
                        <a href="https://skillicons.dev/icons?i=laravel,bootstrap,html,css,express,mysql,vscode,ubuntu,github,vue,figma,tailwind,git,javascript,angular,linux,md,react,python,bun,npm,php,androidstudio,kotlin,arduino,kali,nodejs">  
                            <img  width="600px"
                                src="https://skillicons.dev/icons?i=laravel,html,css,express,mysql,vscode,ubuntu,github,vue,figma,tailwind" 
                                alt="Skills icons"
                            /><br />
                            <img  width="600px"
                                src="https://skillicons.dev/icons?i=javascript,angular,linux,md,react,python,bun,npm,git" 
                                alt="Skills icons"
                            /><br />
                            <img  width="600px"
                                src="https://skillicons.dev/icons?i=php,bootstrap,androidstudio,kotlin,arduino,kali,nodejs" 
                                alt="Skills icons"
                            /><br />
                        </a>
                    </div>

                    <div align="center"> 
                        <img 
                            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=50&duration=4&pause=20&color=9B31FE&center=true&vCenter=true&width=482&lines=..." 
                            alt="Typing SVG"
                        /> 
                    </div>
                </section>
            </motion.div>
        </div>
    );
}

export default Skills;
