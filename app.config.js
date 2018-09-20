export const config = {
  nav: [
    { linkTitle: "Home", linkPath: "/" },
    { linkTitle: "People", linkPath: "/person" },
    { linkTitle: "Region", linkPath: "/region" },
    {
      linkTitle: "Links",
      linkPath: "#",
      inlineItems: [
        { linkTitle: "breathtest", linkPath: "#" },
        { linkTitle: "wsp.wa.gov", linkPath: "#" },
        { linkTitle: "Google", linkPath: "#" }
      ]
    },
    { linkTitle: "Contact", linkPath: "#" }
  ],
  dateFormat: "MM-DD-YYYY",
  flatpickrFormat: "m-d-Y"
};
