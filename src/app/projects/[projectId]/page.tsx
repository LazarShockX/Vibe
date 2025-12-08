import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params: Promise<{ projectId: string }>
}

const Page = async ({ params }: Props) => {
    const { projectId } = await params;

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({ id: projectId }));
    await queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({ projectId }));
    await queryClient.prefetchQuery(trpc.usage.status.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<p>Failed loading project</p>}>
                <Suspense fallback={<p>Loading...</p>}>
                    <ProjectView projectId={projectId} />
                </Suspense>
            </ErrorBoundary>
        </HydrationBoundary>
    );
}

export default Page;
