import { IStatusTag } from "./StatusTagTypes";

function StatusTag({ status, className }: IStatusTag) {
  return (
    <p
      className={`px-3 py-1 rounded-[2rem] text-[0.6rem] w-fit font-bold ${
        status === "finished"
          ? "bg-green-100"
          : status === "ongoing"
          ? "bg-light-blue"
          : "bg-gray-200"
      } ${className}`}
    >
      {status?.toUpperCase()}
    </p>
  );
}

export default StatusTag;
