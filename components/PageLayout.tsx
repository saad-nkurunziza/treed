import { ReactNode } from "react";

const PageLayout = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <section>
      <h1 className={`text-heading2-bold text-light-1 text-left ${className}`}>
        {title}
      </h1>
      {children}
    </section>
  );
};

export default PageLayout;
