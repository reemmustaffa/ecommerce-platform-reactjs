import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <Skeleton height={220} />

        {/* Top Left Icon */}
        <div className="absolute top-3 left-3">
          <Skeleton circle height={36} width={36} />
        </div>

        {/* Top Right Icon */}
        <div className="absolute top-3 right-3">
          <Skeleton circle height={36} width={36} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <Skeleton height={14} width={100} className="mb-2" />

        {/* Title */}
        <Skeleton height={20} width="85%" className="mb-3" />

        {/* Stars + Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton height={16} width={90} />
          <Skeleton height={16} width={30} />
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <Skeleton height={24} width={80} />
          <Skeleton height={36} width={110} borderRadius={12} />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
