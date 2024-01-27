import { lazy, Suspense } from "react";

import Loader from "@/components/Loader/Loader";

const NewUserForm = lazy(() => import("@/components/NewUserForm/NewUserForm"));

const Register = (): JSX.Element => {
  return (
    <div className="flex max-w-[576px] m-auto">
      <Suspense fallback={<Loader />}>
        <NewUserForm />
      </Suspense>
    </div>
  );
};

export default Register;
