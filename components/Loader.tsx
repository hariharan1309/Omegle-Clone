'use client';
import React, { useState, useEffect } from 'react';
export default function Loader() {
    const [activeIndex, setActiveIndex] = useState(0);
    const loaderCount = 3; 
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % loaderCount);
      }, 300); 
  
      return () => clearInterval(interval);
    }, [loaderCount]);
    return (
        <section className="min-h-screen min-w-screen backdrop-blur-sm fixed z-[0] top-0 left-0">
            <div className="flex items-center justify-center w-screen h-screen flex-grow-0 flex-shrink-0">
                    <div className="flex items-center justify-center space-x-2">
                        {Array.from({ length: loaderCount }, (_, index) => (
                            <div
                            key={index}
                            className={`w-4 h-4 mx-1 rounded-full ${
                                index === activeIndex ? 'animate-bounce  ease-in-out bg-blue-700' : 'bg-blue-500'
                            }`}
                            />
                        ))}
                    </div>
            </div>
        </section>
    )
}