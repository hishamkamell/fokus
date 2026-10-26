/**
 * Validates Egyptian mobile numbers.
 * Accepts numbers starting with 010, 011, 012, or 015 followed by 8 digits.
 */
export function isValidEgyptianPhone(phone) {
  return /^(?:\+201|01)[0125][0-9]{8}$/.test(phone.trim());
}
