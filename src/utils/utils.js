export const generateDriveImageUrl = (imageUrl, apiKey) => {
    const imageId = imageUrl.match(/id=([\w-]{25,})/)?.[1] || null;
    return imageId
      ? `https://www.googleapis.com/drive/v3/files/${imageId}?alt=media&key=${apiKey}`
      : "/images/default.svg"; // Fallback image
  };