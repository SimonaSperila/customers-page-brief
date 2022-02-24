"use strict";

const clients = [
  {
    name: "Allianz",
    industry: "Banking & Finance",
    country: "Germany",
    relevance: 7,
    logo: "allianz.svg",
  },
  {
    name: "Deloitte",
    industry: "Audit & Advisory",
    country: "United Kingdom",
    relevance: 7,
    logo: "deloitte.svg",
  },
  {
    name: "Cathay United Bank",
    industry: "Banking & Finance",
    country: "China",
    relevance: 1,
    logo: "Cathay_United_Bank_logo.svg",
  },
  {
    name: "Intel",
    industry: "Technology & Telecom",
    country: "United States of America",
    relevance: 10,
    logo: "Intel_logo.svg",
  },
  {
    name: "Yale University",
    industry: "Education",
    country: "United States of America",
    relevance: 10,
    logo: "Yale_University_logo.svg",
  },
  {
    name: "Orange",
    industry: "Technology & Telecom",
    country: "France",
    relevance: 9,
    logo: "orange.svg",
  },
  {
    name: "Johnson & Johnso",
    industry: "Healthcare",
    country: "United Kingdom",
    relevance: 8,
    logo: "Johnson_and_Johnson_Logo.svg",
  },
  {
    name: "Vodafone",
    industry: "Technology & Telecom",
    country: "United Kingdom",
    relevance: 9,
    logo: "Vodafone-Logo.svg",
  },
  {
    name: "Accenture",
    industry: "Audit & Advisory",
    country: "United Kingdom",
    relevance: 7,
    logo: "accenture.svg",
  },
  {
    name: "U.S. Department of Commerce",
    industry: "Gov & Public Sector",
    country: "United States of America",
    relevance: 10,
    logo: "US-Department-of-Commerce.svg",
  },
];

const sortByCountry = document.querySelector(".sort-by-country");
const sortOrderDropdown = document.querySelector(".sort-order");
const sortByIndustry = document.querySelector(".sort-by-industry");
const container = document.querySelector(".clients");
const customer = container.getElementsByTagName("div");

let clientsCopyCountry = {};
let clientsCopyIndustry = {};
let clientsCopyAll = {};

let result, industryEl, countryEl;

let sortByValueIndustry = "All";
let sortByValueCountry = "All";

const displayClients = (a) => {
  result = "";
  a.forEach(({ logo, name }) => {
    result += `
       <div class="customer col-6 col-sm-6 col-lg-3">
        <div class="p-3 border bg-light"><img src="assets/images/${logo}" alt="${name} logo"  width="265px" height="145px" /></div>
       </div>
      `;
  });
  container.innerHTML = result;
};

displayClients(clients);

sortByCountry.addEventListener("change", () => {
  sortByValueCountry = sortByCountry.value;
  countryEl = clients.filter(function (client) {
    return client.country == sortByValueCountry;
  });
  if (sortByValueIndustry == "All") {
    displayClients(countryEl);
    if (sortByValueCountry == "All") {
      displayClients(clients);
    }
  } else if (sortByValueCountry == "All") {
    displayClients(industryEl);
  } else {
    const countryEll = clientsCopyIndustry.filter(function (client) {
      return client.country == sortByValueCountry;
    });
    displayClients(countryEll);
  }
  clientsCopyCountry = Object.assign([], countryEl);
  clientsCopyAll = Object.assign([], clientsCopyCountry, clientsCopyIndustry);
});

sortByIndustry.addEventListener("change", () => {
  sortByValueIndustry = sortByIndustry.value;

  industryEl = clients.filter(function (client) {
    return client.industry == sortByValueIndustry;
  });

  if (sortByValueCountry == "All") {
    displayClients(industryEl);
    if (sortByValueIndustry == "All") {
      displayClients(clients);
    }
  } else if (sortByValueIndustry == "All") {
    displayClients(countryEl);
  } else {
    const industryEll = clientsCopyCountry.filter(function (client) {
      return client.industry == sortByValueIndustry;
    });
    displayClients(industryEll);
  }
  clientsCopyIndustry = Object.assign([], industryEl);
  clientsCopyAll = Object.assign([], clientsCopyCountry, clientsCopyIndustry);
});

const orderAlphabetical = (alph) => {
  alph.sort(function (a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  displayClients(alph);
};

const orderRelevance = (rel) => {
  rel.sort((a, b) => {
    if (a.relevance < b.relevance) return 1;
    if (a.relevance > b.relevance) return -1;
    return 0;
  });
  displayClients(rel);
};

sortOrderDropdown.addEventListener("change", () => {
  const sortByValueOrder = sortOrderDropdown.value;
  if (!customer.length) {
    return null;
  }
  if (sortByValueOrder == "Alphabetical") {
    orderAlphabetical(clients);
    if (sortByValueCountry !== "All" || sortByValueIndustry !== "All") {
      orderAlphabetical(clientsCopyAll);
    }
  }
  if (sortByValueOrder == "Relevance") {
    orderRelevance(clients);
    if (sortByValueCountry !== "All" || sortByValueIndustry !== "All") {
      orderRelevance(clientsCopyAll);
    }
    if (!customer.length) {
      return null;
    }
  }
});
