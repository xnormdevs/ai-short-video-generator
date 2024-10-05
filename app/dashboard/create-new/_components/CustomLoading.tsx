import GrayText from "@/components/common/GrayText";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export interface CustomLoadingProps {
  loading: boolean;
}

const CustomLoading = ({ loading }: CustomLoadingProps) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogTitle>Alomost there!</AlertDialogTitle>
      <AlertDialogContent>
        <div className="flex flex-col items-center py-10 justify-center">
          <Image
            src="/video-channel.gif"
            alt="loading"
            width={100}
            height={100}
          />
          <AlertDialogDescription>
            Your video is being generated. Please do not refresh the page.
          </AlertDialogDescription>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
