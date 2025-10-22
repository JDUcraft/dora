import { Cluster } from "@/data/clusters";

interface ClusterCardProps {
  cluster: Cluster;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ClusterCard({
  cluster,
  isSelected,
  onClick,
}: ClusterCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      style={isSelected ? { borderColor: cluster.color } : {}}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-4 h-4 rounded-full mt-1"
          style={{ backgroundColor: cluster.color }}
        />
        <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
          {cluster.percentage}%
        </span>
      </div>
      <h3 className="font-bold text-lg mb-2">
        Cluster {cluster.id}: {cluster.name}
      </h3>
      <p className="text-gray-700 text-sm mb-4">{cluster.description}</p>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {Object.entries(cluster.characteristics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-2 rounded">
            <span className="font-semibold text-gray-600">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
            </span>
            <span className="ml-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
