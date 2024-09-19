export function formatTime(timeString) {
  // divide into parts to time
  let parts = timeString.split(":");

  // combine only hour and minute parts
  return `${parts[0]}:${parts[1]}`;
}

export function timeDifference(scheduleTime, estimatedLandingTime) {
  // scheduleTime'ı "HH:MM:SS" formatından bir Date objesine çeviriyoruz
  let scheduleDate = new Date();
  let [hours, minutes] = scheduleTime.split(":");
  scheduleDate.setHours(hours, minutes, 0, 0); // saniye ve milisaniye 0

  // estimatedLandingTime, ISO formatında bir zaman olduğundan doğrudan bir Date objesine çeviriyoruz
  let landingDate = new Date(estimatedLandingTime);

  // İki tarih arasındaki farkı milisaniye cinsinden hesaplıyoruz
  let differenceInMillis = landingDate - scheduleDate;

  // Bu farkı saat ve dakikaya çeviriyoruz
  let differenceInMinutes = Math.floor(differenceInMillis / 1000 / 60);
  let hoursDiff = Math.floor(differenceInMinutes / 60);
  let minutesDiff = differenceInMinutes % 60;

  return { hours: hoursDiff, minutes: minutesDiff };
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
