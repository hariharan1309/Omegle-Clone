import React from "react";
import Link from "next/link";

export default function Wrong(){
    return(
        <div className="md:py-20 md:px-24 p-8 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                    <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                        <div className="relative">
                            <div className="absolute">
                                <div className="">
                                    <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                        {`Looks like you've found the
                                        doorway to the great nothing`}
                                    </h1>
                                    <p className="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                                    <Link href="/">
                                        <button className="sm:w-min(80,full) lg:w-auto my-2 rounded md py-4 px-8 text-center font-bold text-white bg-blue-500 hover:scale-110 duration-300">
                                            Take me there!
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/ck1SGFJ/Group.png" className=""/>
                    </div>
        </div>
    )
}