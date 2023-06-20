export const CRON_FIELDS = [
  {
    name: "Minute",
    allowed: [
      { name: "Any", value: "*" },
      { name: "Every", value: "/" },
      { name: "Range", value: "-" },
      { name: "Multiple", value: "," },
      { name: "Specific", value: "0-59" },
    ],
  },
  {
    name: "Hours",
    allowed: [
      { name: "Any", value: "*" },
      { name: "Every", value: "/" },
      { name: "Range", value: "-" },
      { name: "Multiple", value: "," },
      { name: "Specific", value: "0-23" },
    ],
  },
  {
    name: "Day",
    allowed: [
      { name: "Any", value: "*" },
      { name: "Every", value: "/" },
      { name: "Range", value: "-" },
      { name: "Multiple", value: "," },
      { name: "Specific", value: "1-31" },
    ],
  },
  {
    name: "Month",
    allowed: [
      { name: "Any", value: "*" },
      { name: "Every", value: "/" },
      { name: "Range", value: "-" },
      { name: "Multiple", value: "," },
      { name: "Specific", value: "1-12" },
      { name: "Month", value: "JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC" },
    ],
  },
  {
    name: "Weekday",
    allowed: [
      { name: "Any", value: "*" },
      { name: "Every", value: "/" },
      { name: "Range", value: "-" },
      { name: "Multiple", value: "," },
      { name: "Specific", value: "0-6" },
      { name: "Weekday", value: "SUN, MON, TUE, WED, THU, FRI, SAT" },
    ],
  },
];
