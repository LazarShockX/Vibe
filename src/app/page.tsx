"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onError: (error) => {
      toast.error(`Error creating project: ${error.message}`);
    },
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`);
    },
  }));

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-4">
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
        <Button 
          onClick={() => createProject.mutate({ value: value })} 
          disabled={createProject.isPending}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Page;
