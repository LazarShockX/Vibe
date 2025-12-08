import Image from "next/image";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  const queryClient = getQueryClient();

  if (user) {
    await queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());
  }
    
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Vibe" width={50} height={50} className="hidden md:block" />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build something with Vibe
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and websites by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <SignedIn>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ErrorBoundary fallback={<p>Error loading projects</p>}>
            <Suspense fallback={<p>Loading projects...</p>}>
              <ProjectsList userName={user?.firstName ?? ""} />
            </Suspense>
          </ErrorBoundary>
        </HydrationBoundary>
      </SignedIn>
    </div>
  );
}

export default Page;
