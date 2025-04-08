function base64ToZipDownload(base64Data, fileName = 'download.zip') {
  // Decode base64 to binary
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Create a Blob from the byte array
  const blob = new Blob(byteArrays, { type: 'application/zip' });

  // Create a download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const base64Zip = 'UEsDBBQAAAAIA...'; // your Base64-encoded zip file
base64ToZipDownload(base64Zip, 'myArchive.zip');
