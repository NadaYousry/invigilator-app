import { IPageHeading } from "./PageHeadingTypes";

function PageHeading({ title }: IPageHeading) {
  return <h1>{title}</h1>;
}

export default PageHeading;
