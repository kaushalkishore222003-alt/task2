/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster position="top-right" expand={false} richColors />
      <RouterProvider router={router} />
    </>
  );
}
