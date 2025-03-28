import { FC } from "react";
import { Button } from "~/components/ui/shadcn/button";

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="21"
    viewBox="0 0 18 21"
    fill="none"
  >
    <path d="M9 14H11.6667V6H15L9 0M9 14H6.33333V6H3L9 0" fill="#904DF8" />
    <path
      d="M1 19.3334H17"
      stroke="#904DF8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChangeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
  >
    <rect x="0.500122" width="32" height="32" rx="16" fill="black" />
    <path
      d="M16.5001 2.66663C9.14008 2.66663 3.16675 8.63996 3.16675 16C3.16675 23.36 9.14008 29.3333 16.5001 29.3333C23.8601 29.3333 29.8334 23.36 29.8334 16C29.8334 8.63996 23.8601 2.66663 16.5001 2.66663ZM17.7134 24.2C17.6202 24.2913 17.5023 24.3533 17.3742 24.3783C17.2461 24.4032 17.1135 24.3901 16.9928 24.3404C16.8722 24.2907 16.7688 24.2067 16.6954 24.0988C16.622 23.9909 16.5819 23.8638 16.5801 23.7333V22.6666H16.5001C14.7934 22.6666 13.0867 22.0133 11.7801 20.72C10.8741 19.8129 10.2488 18.6639 9.97922 17.4105C9.70963 16.1572 9.80715 14.8526 10.2601 13.6533C10.5134 12.9733 11.4067 12.8 11.9134 13.32C12.2067 13.6133 12.2734 14.04 12.1401 14.4133C11.5267 16.0666 11.8734 17.9866 13.2067 19.32C14.1401 20.2533 15.3667 20.6933 16.5934 20.6666V19.4133C16.5934 18.8133 17.3134 18.52 17.7267 18.9466L19.8867 21.1066C20.1534 21.3733 20.1534 21.7866 19.8867 22.0533L17.7134 24.2ZM21.0867 18.6933C20.9489 18.5515 20.8544 18.3733 20.8142 18.1796C20.7741 17.986 20.79 17.7849 20.8601 17.6C21.4734 15.9466 21.1267 14.0266 19.7934 12.6933C18.8601 11.76 17.6334 11.3066 16.4201 11.3333V12.5866C16.4201 13.1866 15.7001 13.48 15.2867 13.0533L13.1134 10.9066C12.8467 10.64 12.8467 10.2266 13.1134 9.95996L15.2734 7.79996C15.3666 7.7086 15.4845 7.64659 15.6126 7.62163C15.7407 7.59667 15.8733 7.60985 15.994 7.65954C16.1146 7.70923 16.2181 7.79323 16.2915 7.90115C16.3648 8.00907 16.4049 8.13614 16.4067 8.26663V9.34663C18.1401 9.31996 19.8867 9.94663 21.2067 11.28C22.1128 12.187 22.738 13.3361 23.0076 14.5894C23.2772 15.8428 23.1797 17.1473 22.7267 18.3466C22.4734 19.04 21.5934 19.2133 21.0867 18.6933Z"
      fill="#904DF8"
    />
  </svg>
);

const ImageDropzone: FC<{
  getRootProps: (props?: any) => any;
  getInputProps: () => any;
  open: () => void;
  imagePreview: string | null;
  changeImageRef: React.RefObject<HTMLDivElement>;
  isShowToolTipChangeImage: boolean;
}> = ({
  getRootProps,
  getInputProps,
  open,
  imagePreview,
  changeImageRef,
  isShowToolTipChangeImage,
}) => (
  <>
    <div
      {...getRootProps({ className: "dropzone" })}
      className="flex flex-col p-4 gap-3 bg-background rounded-3xl items-center cursor-pointer"
      style={{ display: imagePreview ? "none" : "flex" }}
    >
      <div
        className="flex justify-center items-center"
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(144, 77, 248, 0.20)",
        }}
      >
        <UploadIcon />
      </div>
      <p className="text-color_text2 text-center">
        Drag and drop an image <br />
      </p>
      <input {...getInputProps()} />
      <Button
        variant="outline"
        className="border-line rounded-[20px] w-[144px]"
      >
        Select file
      </Button>
    </div>

    {imagePreview && (
      <ImagePreview
        imagePreview={imagePreview}
        open={open}
        changeImageRef={changeImageRef}
        isShowToolTipChangeImage={isShowToolTipChangeImage}
      />
    )}
  </>
);

const ImagePreview: FC<{
  imagePreview: string;
  open: () => void;
  changeImageRef: React.RefObject<HTMLDivElement>;
  isShowToolTipChangeImage: boolean;
}> = ({ imagePreview, open, changeImageRef, isShowToolTipChangeImage }) => (
  <div className="relative column gap-2 max-w-[512px] mx-auto">
    <img
      src={imagePreview}
      alt="Uploaded Preview"
      className="mt-2 rounded-md"
      style={{
        padding: "10px",
        maxWidth: "100%",
        maxHeight: "100%",
        border: "1px solid var(--colorprimary)",
      }}
    />
    <div
      className="flex-center"
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        cursor: "pointer",
      }}
      onClick={open}
      ref={changeImageRef}
    >
      <ChangeIcon />
      {isShowToolTipChangeImage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "calc(100% + 15px)",
            transform: "translateY(-50%)",
          }}
          className="text-primary w-max"
        >
          Change image
        </div>
      )}
    </div>
  </div>
);
export default ImageDropzone;
