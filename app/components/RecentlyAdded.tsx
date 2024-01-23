import prisma from "../utils/db";
import Image from "next/image";

async function getData() {
    const data = await prisma.movie.findMany({
        select: {
            id: true,
            overview: true,
            title: true,
            WatchLists: {
              where: {
                userId: userId,
              },
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
    const data = await getData();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 ms:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {data.map((movie) => (
                <div key={movie.id} className="relative h-48">
                    <Image src={movie.imageString} width={500} height={400} alt="Movie" className="w-full h-full rounded-sm absolute" />
                </div>
            ))}
        </div>
    )
}