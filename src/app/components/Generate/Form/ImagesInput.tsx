import { useState } from 'react'

interface ImagesInputProps {
    images: string[]
    value: string[]
    onChange: (value: string[]) => void // Assurez-vous que le type est correct ici
    errorMessage: string
    hasError: boolean
    clearError: () => void
}

export function ImagesInput({ images, value, onChange, errorMessage, hasError, clearError }: ImagesInputProps) {
    // const [selectedImages, setSelectedImages] = useState<string[]>(value)

    // const toggleSelection = (url: string) => {
    //     let updatedSelection
    //     if (selectedImages.includes(url)) {
    //         updatedSelection = selectedImages.filter((item) => item !== url)
    //     } else {
    //         updatedSelection = [...selectedImages, url]
    //     }
    //     setSelectedImages(updatedSelection)
    //     // onChange(updatedSelection)
    // }

    function handleInputChange(imagePath: string) {
        console.log('value: ', value)
        if (value.includes(imagePath)) {
            // console.log('if: ', value.filter(itemUrl => itemUrl !== imagePath))
            onChange(value.filter(itemUrl => itemUrl !== imagePath))
        } else {
            console.log('else: ', [...value, imagePath])
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
                    {/* Contenu géré par le style de fond */}
                </div>
            ))}
        </div>
    )
}
