import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import foodProject1 from "./assets/projects/foodProject1.png"
import foodProject2 from "./assets/projects/foodProject2.png"
import foodProject3 from "./assets/projects/foodProject3.png"
import foodProject4 from "./assets/projects/foodProject4.png"
import watcheEcommerce from "./assets/projects/watcheEcommerce.png";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";




const Projects = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };
    //array images
    const images = [foodProject1 , foodProject2 , foodProject3, foodProject4];
    //use state to track images
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    //handlers fo navigation
    const handleNextImage = ()=>{
        setCurrentImageIndex((prevIndex)=>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );      
    }
    const handlePreviousImage = ()=>{
        setCurrentImageIndex((prevIndex)=>
            prevIndex === 0 ? images.length - 1 : prevIndex -1
        )
    }
    return(
        <div className="p-6 pt-12 bg-black">
            <motion.h1 initial="hidden" whileInView="visible" variants={fadeIn} className="text-4xl font-bold text-white text-center mb-4">PROJECTS</motion.h1>
            <motion.div initial="hidden" whileInView="visible" variants={fadeIn} className="flex flex-wrap justify-center gap-4">
                <div className="max-w-sm bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    <div className="m-3">
                    <div className="flex justify-center items-center">
                        <button onClick={handlePreviousImage} className="absolute text-blue-500 mr-80" aria-label="Previous Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowLeft} />
                        </button>
                        <img
                            className="w-62 h-62 object-cover"
                            src={images[currentImageIndex]}
                            alt={`Project view ${currentImageIndex + 1}`} loading="lazy"
                        />
                        <button onClick={handleNextImage} className="absolute text-blue-500 ml-80" aria-label="Next Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowRight} />
                        </button>
                    </div>

                        
                        <hr />
                        <h1 className="text-blue-500 lg:text-2xl text-4xl font-mono mt-3">Food Delivery</h1>
                        <h2 className="text-blue-700 lg:text-2xl text-3xl mt-3">2024</h2>
                        <p className="text-white lg:text-xl text-2xl mt-3">A food delivery app is web-based platform that allows users to order food from a variety of restaurants or eateries and have it delivered to their desired location. These apps streamline the food ordering and delivery process by connecting customers with local restaurants and delivery personnel.</p>
                        <div className="space-y-2">
                            <div className="flex space-x-3 spac-y-3">
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#HTML</h3>
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#Tailwind</h3>                           
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#JavaScript</h3>                           
                                <h3 className="btn border-solid border-2 w-26 rounded-lg text-center border-blue-500 text-blue-600">#PHP</h3>               
                            </div>
                            <div className="flex space-x-3 spac-y-3">
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#JQuery</h3>              
                            </div>    
                        </div>
                        
                        <a href="https://github.com/Ayoub-El-Bouzidi/Food_Delivery" target="__blank" rel="noopener noreferrer" className="icon-link text-white">
                            <button type="button" className="btn mt-3 w-28 p-1 bg-blue-600 rounded-lg text-2xl hover:bg-gray-500 border-blue-500 border-2">
                                <FontAwesomeIcon icon={faGithub} />
                            </button>
                        </a> 
                    </div>
                </div>


                <div className="max-w-sm bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    <div className="m-3">
                    <div className="flex justify-center items-center">
                        <button onClick={handlePreviousImage} className="absolute text-blue-500 mr-80" aria-label="Previous Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowLeft} />
                        </button>
                        <img
                            className="w- h-92 object-cover"
                            src={watcheEcommerce}
                            alt="" loading="lazy"
                        />
                        <button onClick={handleNextImage} className="absolute text-blue-500 ml-80" aria-label="Next Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowRight} />
                        </button>
                    </div>

                        
                        <hr />
                        <h1 className="text-blue-500 lg:text-2xl text-4xl font-mono mt-3">Watches Ecommerce</h1>
                        <h2 className="text-blue-700 lg:text-2xl text-3xl mt-3">2025</h2>
                        <p className="text-white lg:text-xl text-2xl mt-3">A wache ecommerce app is web-based platform that allows users to search and buy watches.</p><br />
                        <div className="space-y-2">
                            <div className="flex space-x-3 spac-y-3">
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#Laravel</h3>
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#Vue Js</h3>                           
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#Tailwind</h3>                           
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#MySQL</h3>               
                            </div>
                            <div className="flex space-x-3 spac-y-3">
                                <h3 className="btn border-solid border-2 w-24 rounded-lg text-center border-blue-500 text-blue-600">#AdminLet</h3>              
                            </div>    
                        </div>
                        
                        <a href="https://github.com/Ayoub-El-Bouzidi/real-soli-ecommerce" target="__blank" rel="noopener noreferrer" className="icon-link text-white">
                            <button type="button" className="btn mt-3 w-28 p-1 bg-blue-600 rounded-lg text-2xl hover:bg-gray-500 border-blue-500 border-2">
                                <FontAwesomeIcon icon={faGithub} />
                            </button>
                        </a> 
                    </div>
                </div>
                <div className="max-w-sm bg-gray-700 rounded-lg shadow-md overflow-hidden">
                    <div className="m-3">
                    <div className="flex justify-center items-center">
                        <button onClick={handlePreviousImage} className="absolute text-blue-500 mr-80" aria-label="Previous Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowLeft} />
                        </button>
                        <img
                            className="w-62 h-62 object-cover"
                            src={images[currentImageIndex]}
                            alt={`Project view ${currentImageIndex + 1}`} loading="lazy"
                        />
                        <button onClick={handleNextImage} className="absolute text-blue-500 ml-80" aria-label="Next Image">
                            <FontAwesomeIcon className="size-7" icon={faArrowRight} />
                        </button>
                    </div>

                        
                        <hr />
                        <h1 className="text-blue-500 lg:text-2xl text-4xl font-mono mt-3">Food Delivery</h1>
                        <h2 className="text-blue-700 lg:text-2xl text-3xl mt-3">2024</h2>
                        <p className="text-white lg:text-xl text-2xl mt-3">A food delivery app is web-based platform that allows users to order food from a variety of restaurants or eateries and have it delivered to their desired location. These apps streamline the food ordering and delivery process by connecting customers with local restaurants and delivery personnel.</p>
                        
                        <a href="/example" className="icon-link text-white">
                            <button type="button" className="btn mt-3 w-28 p-1 bg-blue-600 rounded-lg text-2xl hover:bg-gray-500 border-blue-500 border-2">
                                <FontAwesomeIcon icon={faGithub} />
                            </button>
                        </a> 
                    </div>
                </div>             
            </motion.div>
        </div>
    )
}
export default Projects