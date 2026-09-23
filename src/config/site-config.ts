export const SITE_CONFIG = {
  name: "Southern Storm Shelters LLC",
  tagline: "Tennessee’s Premier Engineered Underground Storm Shelters & Safe Rooms",
  phone: "(615) 991-2361",
  phoneRaw: "+16159912361",
  email: "info@southernstormshelters.com",
  address: "Nashville, TN",
  addressShort: "Nashville, TN",
  operatingHours: {
    weekdays: "Monday–Friday: 8:00 AM – 5:00 PM",
    saturdays: "Saturday: By Appointment",
    sundays: "Sunday: Closed",
    shortBadge: "Mon–Sat: 8:00 AM – 5:00 PM",
    scheduleText: "Monday–Friday: 8:00 AM – 5:00 PM | Saturday: By Appointment | Sunday: Closed",
  },
  serviceRadius: "Nashville, TN & 100-Mile Radius",
  licenseNotice: "Fully Insured Professional Installation Crews • Engineered Storm Protection",
};

export function applySettingsToSiteConfig(settings: any) {
  if (!settings) return;
  if (settings.companyName) SITE_CONFIG.name = settings.companyName;
  if (settings.tagline) SITE_CONFIG.tagline = settings.tagline;
  if (settings.officePhone) {
    SITE_CONFIG.phone = settings.officePhone;
    if (settings.officePhoneRaw) {
      SITE_CONFIG.phoneRaw = settings.officePhoneRaw;
    } else {
      const digits = settings.officePhone.replace(/[^\d+]/g, "");
      SITE_CONFIG.phoneRaw = digits.startsWith("+") ? digits : `+1${digits.replace(/^1/, "")}`;
    }
  }
  if (settings.alertEmail) SITE_CONFIG.email = settings.alertEmail;
  if (settings.officeAddress) {
    SITE_CONFIG.address = settings.officeAddress;
    SITE_CONFIG.addressShort = settings.officeAddress;
  }
  if (settings.serviceRadius) SITE_CONFIG.serviceRadius = settings.serviceRadius;
  if (settings.licenseNotice) SITE_CONFIG.licenseNotice = settings.licenseNotice;

  if (settings.weekdays) SITE_CONFIG.operatingHours.weekdays = settings.weekdays;
  if (settings.saturdays) SITE_CONFIG.operatingHours.saturdays = settings.saturdays;
  if (settings.sundays) SITE_CONFIG.operatingHours.sundays = settings.sundays;
  if (settings.shortBadge) SITE_CONFIG.operatingHours.shortBadge = settings.shortBadge;

  const parts: string[] = [];
  if (SITE_CONFIG.operatingHours.weekdays) parts.push(SITE_CONFIG.operatingHours.weekdays);
  if (SITE_CONFIG.operatingHours.saturdays) parts.push(SITE_CONFIG.operatingHours.saturdays);
  if (SITE_CONFIG.operatingHours.sundays) parts.push(SITE_CONFIG.operatingHours.sundays);
  if (parts.length > 0) {
    SITE_CONFIG.operatingHours.scheduleText = parts.join(" | ");
  }

  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("site_config_changed", { detail: SITE_CONFIG }));
    } catch { }
  }
}

// Early sync from local cache on browser evaluation
if (typeof window !== "undefined") {
  try {
    const cached = localStorage.getItem("site_settings_cache");
    if (cached) {
      applySettingsToSiteConfig(JSON.parse(cached));
    }
  } catch { }
}
