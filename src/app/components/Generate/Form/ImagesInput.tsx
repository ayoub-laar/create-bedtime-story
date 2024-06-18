import React from "react";

interface ImagesInputProps {
  images: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function ImagesInput({ images, value, onChange }: ImagesInputProps) {
  function handleInputChange(imagePath: string) {
    if (value.includes(imagePath)) {
      onChange(value.filter((itemUrl) => itemUrl !== imagePath));
    } else {
      onChange([...value, imagePath]);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative border-4 ${
            value.includes(image) ? "border-sky-500" : "border-white"
          } cursor-pointer flex justify-center items-center overflow-hidden`}
          style={{
            padding: "10px", // Adding padding inside the card
            height: "195px",
          }}
          onClick={() => handleInputChange(image)}
        >
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
            }}
          />
          <div className="absolute top-2 right-2">
            <input
              type="checkbox"
              checked={value.includes(image)}
              onChange={() => handleInputChange(image)}
              className="h-6 w-6"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
