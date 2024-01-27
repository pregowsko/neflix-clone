import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";

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
    return (
    <>
        <button className="-mt-14">
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
            <p>{overview}</p>
        </div>
    </>
    );
};