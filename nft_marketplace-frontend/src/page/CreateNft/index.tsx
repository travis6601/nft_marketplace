"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "~/components/ui/shadcn/button";
import { Input } from "~/components/ui/shadcn/input";
import { Textarea } from "~/components/ui/shadcn/textarea";
import useCreateNft from "~/hooks/useCreateNft";
import useHover from "~/hooks/useHover";
import ImageDropzone from "~/page/CreateNft/InputImage";

const CreateNft = () => {
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [changeImageRef, isShowToolTipChangeImage] = useHover<HTMLDivElement>();
  const [file, setFile] = useState<File | null>(null);

  const resetForm = () => {
    setName("");
    setSymbol("");
    setDescription("");
    setPrice("0");
    setImagePreview(null);
    setFile(null);
  };

  const { handleCreateNewNft, loading } = useCreateNft({
    name,
    symbol,
    description,
    file,
    price,
    resetForm,
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      toast.error("You can only upload one file");
      return;
    }

    const image = acceptedFiles[0];
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    // Check file format
    if (!["image/png", "image/jpeg", "image/jpg"].includes(image.type)) {
      toast.error("Only images are allowed");
      return;
    }

    // Create an image element to check dimensions
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      if (img.width !== 512 || img.height !== 512) {
        toast.error("Image dimensions must be 512x512 pixels");
        return;
      }

      setFile(image);
      // If all checks pass
      setImagePreview(img.src);
    };

    // Handle the case where image loading fails
    img.onerror = () => {
      toast.error("Failed to load image");
    };
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return (
    <div className="flex flex-col max-w-[50%] mx-auto gap-2">
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <Input
          type="text"
          className="border border-gray-200 p-2 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Symbol</label>
        <Input
          type="text"
          className="border border-gray-200 p-2 rounded-lg"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Description</label>
        <Textarea
          className="border border-gray-200 p-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Price</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          className="border border-gray-200 p-2 rounded-lg"
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            // Allow empty string or valid float numbers
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
              setPrice(value);
            }
          }}
          placeholder="Enter price (e.g. 0.01)"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Image</label>

        <ImageDropzone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          open={open}
          imagePreview={imagePreview}
          changeImageRef={changeImageRef}
          isShowToolTipChangeImage={isShowToolTipChangeImage}
        />
      </div>

      <Button
        className="mt-4 w-[300px] mx-auto"
        isLoading={loading}
        onClick={handleCreateNewNft}
      >
        Create now
      </Button>
    </div>
  );
};

export default CreateNft;
