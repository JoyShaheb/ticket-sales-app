import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[95vh] space-y-3">
      <Skeleton className="h-[100px] w-[100px] rounded-full" />
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
