import { ICommon } from "@appTypes/generalTypes";

export interface IStatusTag {
  status: "finished" | "closed" | "ongoing";
  className?: ICommon["className"];
}
