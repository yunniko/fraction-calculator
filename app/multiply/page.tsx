import type { Metadata } from "next";
import { OperationPage } from "@/app/_components/operation-page";
import { OPERATION_COPY } from "@/lib/operation-copy";

const copy = OPERATION_COPY.multiply;

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default function Page() {
  return <OperationPage copy={copy} />;
}
