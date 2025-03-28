import { toast } from "sonner";
import { EXPLORE_SCAN_TYPE } from "~/constants";
import { generateExplorerUrl } from "~/utils";

export function useTransactionToast(title?: string) {
  return (signature: string) => {
    toast.success(title || "Transaction sent", {
      action: {
        label: "View on explorer",
        onClick: () => {
          window.open(
            generateExplorerUrl(signature, EXPLORE_SCAN_TYPE.TRANSACTION),
            "_blank"
          );
        },
      },
    });
  };
}
