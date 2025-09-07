// Wandelt Bild-Datei in loopendes Video-Element um (für Media-Layer)
export async function imageToVideo(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // 0 fps = still image, aber MediaStream → Video-Element
  const stream = canvas.captureStream(0);
  const video = document.createElement('video');
  video.srcObject = stream;
  video.muted = true;
  video.loop = true;
  video.play();
  return video;
}