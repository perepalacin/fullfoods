import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Landing PAGE */}
      <div className="text-center mt-20">
        <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
          Stop wasting <span className="text-primary">time planning</span> your meals!
        </h1>
        <p className='hidden md:block mt-3 text-lg leading-8 text-muted-foreground'>
          Get access to an unlimited amount of healthy, easy and tasty recipes.
          <span className='text-foreground'>
            {" "}Plan your meals within minutes! Share them with your friends or even better, 
          </span>
        </p>
      </div>
    </div>
  );
}
