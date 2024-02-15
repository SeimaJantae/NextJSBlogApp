"use client";

import { login } from "./action";
import { useFormState } from "react-dom";

export default function Page() {
  const initState = {
    message: "",
  };
  const [state, formAction] = useFormState(login, initState);
  return (
    <>
      <div className="p-10 h-screen flex flex-col items-center">
        <div className="p-4 rounded-sm outline outline-1">
          <form action={formAction}>
            <div className="flex flex-col mb-2">
              <label>Email: </label>
              <input type="text" name="email" className="outline outline-1" />
            </div>
            <div className="flex flex-col mb-2">
              <label>Passworld: </label>
              <input type="password" name="password" className="outline outline-1" />
            </div>
            <div className="mb-2">Message: {state.message}</div>
            <div className="flex justify-center">
              <button className="outline outline-1 px-4 my-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
