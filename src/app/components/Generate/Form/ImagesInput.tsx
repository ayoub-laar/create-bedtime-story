interface ImagesInputProps {
    images: string[];
    value: string[];
    onChange: (value: string[]) => void;
}

export function ImagesInput({ images, value, onChange }: ImagesInputProps) {
    function handleInputChange(imagePath: string) {
        if (value.includes(imagePath)) {
            onChange(value.filter(itemUrl => itemUrl !== imagePath))
        } else {
            onChange([...value, imagePath])
        }
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`border-4 ${value.includes(image) ? 'border-sky-500' : 'border-white'} cursor-pointer flex justify-center items-end overflow-hidden`}
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center bottom',
                        backgroundRepeat: 'no-repeat',
                        height: '195px',
                        opacity: value.includes(image) ? 1 : 0.3,
                    }}
                    onClick={() => handleInputChange(image)}
                >
                </div>
            ))}
        </div>
    )
}
