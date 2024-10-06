import GrayText from "@/components/common/GrayText";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export interface CustomLoadingProps {
  loading: boolean;
}

const CustomLoading = ({ loading }: CustomLoadingProps) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <AlertDialogTitle>You're just moments away!</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/video-channel.gif"
            alt="loading"
            width={100}
            height={100}
          />
          <AlertDialogDescription className="mt-4">
            Your video is being generated. Please do not refresh the page.
          </AlertDialogDescription>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
