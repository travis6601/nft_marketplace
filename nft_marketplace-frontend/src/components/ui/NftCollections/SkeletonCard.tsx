import { Card, CardContent } from "~/components/ui/shadcn/card";

const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden border rounded-xl relative !pt-0">
      {/* Image skeleton */}
      <div className="relative h-48 w-full">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>

      <CardContent className="p-4">
        {/* Title and verification badge skeleton */}
        <div className="flex items-center mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mr-2" />
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Price skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
