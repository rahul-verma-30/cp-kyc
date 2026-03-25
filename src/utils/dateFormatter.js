export const formatDateToIST = (dateStr) => {
  if (!dateStr || dateStr === "-" || dateStr === "NA" || dateStr === "null") return "-";
  
  // Try to parse the date
  let date = new Date(dateStr);
  
  // If parsing fails directly, try replacing space with T for ISO format if needed
  if (isNaN(date.getTime()) && typeof dateStr === 'string') {
    date = new Date(dateStr.replace(" ", "T"));
  }
  
  if (isNaN(date.getTime())) return dateStr;

  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    }).formatToParts(date);

    const getPart = (type) => parts.find(p => p.type === type)?.value;

    const d = getPart('day');
    const m = getPart('month');
    const y = getPart('year');
    const h = getPart('hour');
    const min = getPart('minute');
    const dayPeriod = getPart('dayPeriod')?.toUpperCase();

    return `${d}-${m}-${y}, ${h}:${min} ${dayPeriod} IST`;
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateStr;
  }
};
