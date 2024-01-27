import prisma from "../utils/db";
import Image from "next/image";
import { MovieCard }from "./MovieCard";
import { authOptions } from "../utils/auth";
import { getServerSession } from "next-auth";

async function getData(userId: string) {
    const data = await prisma.movie.findMany({
        select: {
            id: true,
            overview: true,
            title: true,
            WatchLists: {
              where: {
                userId: userId
              }
            },
            imageString: true,
            youtubeString: true,
            age: true,
            release: true,
            duration: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 4,
        });

    return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
    const data = await getData(session?.user?.email as string);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 ms:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {data.map((movie) => (
                <div key={movie.id} className="relative h-48">
                    <Image src={movie.imageString} width={500} height={400} alt="Movie" className="w-full h-full rounded-sm absolute object-cover" />
                    <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                      <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                        <Image src={movie.imageString} width={800} height={800} alt="Movie" className="w-full h-full rounded-lg absolute object-cover -z-10" />
                        <MovieCard
                          movieId={movie.id}
                          overview={movie.overview}
                          title={movie.title}
                          watchListId={movie.WatchLists[0]?.id}
                          youtubeString={movie.youtubeString}
                          watchList={movie.WatchLists.length > 0 ? true : false}
                          key={movie.id}
                          age={movie.age}
                          time={movie.duration}
                          year={movie.release}
                         />
                      </div>
                    </div>
                </div>
            ))}
        </div>
    )
}