// Google Apps Script Web App endpoint that receives preorder leads and
// appends them to a Google Sheet. Replace with your deployed script URL.
// Deploy → Web App → "Anyone" access → copy the /exec URL below.
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbylanf_IXcJhQ5O2qEc5b6KO03qiBsTCH-l76sMhjSUcsQiBbJp98gNcc6hgAudqyVi/exec";

/**
 * Formats the current time as "yyyy-MM-dd HH:mm:ss" in the Africa/Cairo
 * timezone, without relying on any server-only APIs.
 */
function formatCairoTimestamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

/**
 * Submits a preorder lead to the Google Apps Script Web App.
 * Uses `text/plain` as the content type to avoid triggering a CORS
 * preflight request against Apps Script, exactly as the original
 * integration did.
 *
 * @param {{ name: string, phone: string }} data
 * @returns {Promise<Response>}
 */
export async function submitLead({ name, phone }) {
  return fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      name,
      phone,
      date: formatCairoTimestamp(),
      source: "Landing Page",
    }),
  });
}
