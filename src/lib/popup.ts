/** Opens a centered popup window. Falls back to new tab on mobile / popup-blocked. */
export function openPopup(url: string, name = "popup", w = 900, h = 600) {
  const left = Math.round((screen.width - w) / 2);
  const top = Math.round((screen.height - h) / 2);
  const features = `width=${w},height=${h},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes`;
  const win = window.open(url, name, features);
  if (!win || win.closed) {
    // Popup blocked – fallback to new tab
    window.open(url, "_blank");
  }
}
