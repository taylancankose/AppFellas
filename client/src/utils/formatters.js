export function formatTime(timeString) {
  // divide into parts to time
  let parts = timeString.split(":");

  // combine only hour and minute parts
  return `${parts[0]}:${parts[1]}`;
}

export function formatISOTime(isoString) {
  // Date objesini oluşturuyoruz
  let date = new Date(isoString);

  // Saat ve dakikayı iki haneli olacak şekilde alıyoruz
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  // Saat ve dakika formatında döndürüyoruz
  return `${hours}:${minutes}`;
}

export function formatDateToISO(inputDate) {
  let date = new Date(inputDate);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function getFormattedDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays); // Tarihe gün ekler
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Aylar 0 bazlıdır
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
