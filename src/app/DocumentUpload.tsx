import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { eleganceClient } from "@/services/eleganceClient";

// Define the accepted file types
const acceptedFileTypes = { "application/pdf": [".pdf"], "text/csv": [".csv"] };

interface DocumentUploadProps {
  onSetCollection: (collection: string) => void;
}

const DocumentUpload = ({ onSetCollection }: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const [collection, setCollection] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      // Set the first accepted file as the state
      setFile(acceptedFiles[0]);
      // Create embeddings for the file
      createEmbeddings(acceptedFiles[0]);
    },
  });

  const formatFileSize = (size: number) => {
    // Convert the size to KB
    const sizeInKB = size / 1024;
    // Round the size to one decimal place
    const roundedSize = Math.round(sizeInKB * 10) / 10;
    // Return the size with the unit
    return `${roundedSize} KB`;
  };

  const createEmbeddings = async (file: File) => {
    // Create a file reader
    const reader = new FileReader();
    // Set the onload event handler
    reader.onload = async (event) => {
      if (event.target) {
        // Create and insert the file embeddings using the Elegance SDK
        const result = await eleganceClient.requests.createAndInsertFileEmbeddings(
          { file, collection: "documentEmbeddings" }
        );

        setCollection("documentEmbeddings");
        onSetCollection("documentEmbeddings");
        setCount(result.length);
      }
    };
    // Read the file as an array buffer
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className="w-64 h-64 border-4 border-dashed border-gray-400 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the file here ...</p>
        ) : (
          <p className="text-gray-600">Drag and drop a file here, or click to select a file</p>
        )}
      </div>
      {file && (
        <div className="mt-4 flex items-center">
          <p className="ml-2 text-gray-800">
            {file.name} ({formatFileSize(file.size)})
          </p>
        </div>
      )}
      {collection && count && (
        <div className="mt-4 flex items-center">
          <p className="text-gray-800">
            Embeddings created in collection {collection} with {count} records
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;