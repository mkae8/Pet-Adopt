import { Loading } from "@/components/Loading";
import Petcard from "@/components/petcardcomp/Petcard";

import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Petcard />
    </Suspense>
  );
};
export default page;
