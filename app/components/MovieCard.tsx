"use client";


import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";

interface iAppProps {
    title: string;
    overview: string;
    movieId: number;
    watchList: boolean;
    watchlistId: string;
    youtubeUrl: string;
    year: number;
    age: number;
    time: number;
}


export function MovieCard({movieId, title, overview, watchList, watchlistId, youtubeUrl, age, time, year}: iAppProps) {

    const [open, setOpen] = useState(false);

    return (
    <>
        <button onClick={() => setOpen(true)} className="-mt-14">
            <PlayCircle className="h-20 w-20" />
        </button>
        <div className="right-5 top-5 absolute z-10">
            {watchList ? (
                <form>
                    <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4 text-red-500"/>
                    </Button>
                </form>
            ) : (
                <form>
                    <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4"/>
                    </Button>
                </form>
            )}
        </div>
        <div className="p-5 absolute bottom -0 left-0">
            <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
            <div className="flex gap-x-2 items-center">
                <p className="font-normal text-sm">{year}</p>
                <p className="font-normal text-sm border py-0.5 px-1 border-gray-200 rounded">{age}+</p>
                <p className="font-normal text-sm">{time}h</p>
            </div>
            <p className="font-light text-sm text-gray-200 line-clamp-1">{overview}</p>
        </div>
        <PlayVideoModal youtubeUrl={youtubeUrl} key={movieId} title={title} overview={overview} state={open} changeState={setOpen} age={age} duration={time} release={year}/>
    </>
    );
};