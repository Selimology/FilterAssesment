import { PropsWithChildren } from 'react';

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" h-screen flex flex-col gap-1 container mx-auto">
      {children}
    </div>
  );
};

export default PageLayout;
