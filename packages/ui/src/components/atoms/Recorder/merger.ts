export async function mergeWavBlobs(blobArray: Blob[]): Promise<Blob> {
  const buffers: ArrayBuffer[] = await Promise.all(blobArray.map(blob => blob.arrayBuffer()));
  const headers: DataView[] = buffers.map(buffer => new DataView(buffer.slice(0, 44)));
  const dataBuffers: ArrayBuffer[] = buffers.map(buffer => buffer.slice(44));

  // Check if all headers have the same audio format
  const formatChecker = headers[0]?.getUint16(20, true); // PCM = 1
  for (let i = 1; i < headers.length; i++) {
    if (headers[i].getUint16(20, true) !== formatChecker) {
      throw new Error('Inconsistent audio formats');
    }
  }

  // Calculate total length of data
  const totalDataLength = dataBuffers.reduce((acc, buffer) => acc + buffer.byteLength, 0);

  // Create a new buffer for the merged WAV file
  const mergedBuffer = new ArrayBuffer(44 + totalDataLength);
  const mergedView = new DataView(mergedBuffer);

  // Write the header of the first file to the merged file
  new Uint8Array(mergedBuffer).set(new Uint8Array(buffers[0]?.slice(0, 44)));

  // Update the header with the new total length
  mergedView.setUint32(4, 36 + totalDataLength, true);
  mergedView.setUint32(40, totalDataLength, true);

  // Write the data of all files to the merged file
  dataBuffers.reduce((offset, dataBuffer) => {
    new Uint8Array(mergedBuffer, offset, dataBuffer.byteLength).set(new Uint8Array(dataBuffer));
    return offset + dataBuffer.byteLength;
  }, 44);

  // Return the merged Blob
  return new Blob([mergedBuffer], { type: 'audio/wav' });
}

// Usage example:
const blobs: Blob[] = [
  /* array of WAV Blob files */
];
mergeWavBlobs(blobs).then(mergedBlob => {
  // Do something with the mergedBlob, like downloading or playing it
  const url = URL.createObjectURL(mergedBlob);
  const audio = new Audio(url);
  audio.play();
});
