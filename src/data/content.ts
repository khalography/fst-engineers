export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export interface HeroGalleryItem {
  image: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
}

export interface HeroSlide {
  id: number;
  tag: string;
  headline?: string;
  subheadline?: string;
  image?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  isGallery?: boolean;
  galleryButton?: {
    label: string;
  };
  galleryItems?: HeroGalleryItem[];
}

export interface IntroHighlight {
  title: string;
  description: string;
  standards?: { code: string; label: string }[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface PhoneItem {
  display: string;
  href: string;
}

export interface EmailItem {
  display: string;
  href: string;
}

export interface ContactInfo {
  heading: string;
  phone: {
    label: string;
    display: string;
    href: string;
    numbers: PhoneItem[];
    action: string;
  };
  email: {
    label: string;
    display: string;
    href: string;
    emails?: EmailItem[];
    action: string;
  };
  whatsapp: {
    label: string;
    display: string;
    href: string;
    action: string;
    ariaLabel: string;
  };
  address: {
    label: string;
    display: string;
    href: string;
    action: string;
    ariaLabel: string;
  };
}

export const siteContent = {
  brand: {
    name: "FST Engineering",
    logo: "/images/logo.png",
    logoAlt: "FST Engineering",
  },

  nav: [
    {
      label: "About Us",
      href: "#about",
      children: [
        { label: "Our Story", href: "#about-story" },
        { label: "Mission", href: "#about-mission" },
        { label: "Vision", href: "#about-vision" },
      ],
    },
    {
      label: "Products",
      href: "#products",
      children: [
        { label: "GRP/FRP Fibre Tank", href: "#product-grp" },
        { label: "Physical Properties", href: "#product-properties" },
        { label: "Specification", href: "#product-specification" },
        { label: "Advantages", href: "#product-advantages" },
        { label: "Pressed Steel Tank", href: "#product-pressed-steel" },
      ],
    },
    // Note: Gallery link is temporarily removed until gallery images are supplied. It returns when ready:
    // { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact Us", href: "#contact" },
  ] as NavItem[],

  ctaButton: {
    label: "Get a Quote",
    href: "#contact",
  },

  hero: {
    autoplayDelay: 6000,
    slides: [
      {
        id: 1,
        tag: "FST Engineering",
        headline: "Hygienic Water Storage, Built to Last",
        subheadline:
          "Fibre and steel water tanks that keep water fresh and safe for extended periods.",
        image: "/images/hero-1.jpg",
        primaryCta: {
          label: "View Products",
          href: "#products",
        },
        secondaryCta: {
          label: "Contact Us",
          href: "#contact",
        },
      },
      {
        id: 2,
        tag: "FST Engineering",
        headline: "Internationally Certified Tanks",
        subheadline:
          "Compliant with BS EN 13280, MS 1390 and SS 245 standards.",
        image: "/images/hero-slide-2.jpg",
        primaryCta: {
          label: "View Products",
          href: "#products",
        },
        secondaryCta: {
          label: "Contact Us",
          href: "#contact",
        },
      },
      {
        id: 3,
        tag: "FST Engineering",
        headline: "Built With Malaysia's Leading Manufacturer",
        subheadline:
          "A global manufacturing partnership behind every tank.",
        image: "/images/hero-3.jpg",
        primaryCta: {
          label: "View Products",
          href: "#products",
        },
        secondaryCta: {
          label: "Contact Us",
          href: "#contact",
        },
      },
      {
        id: 4,
        tag: "FST Engineering",
        isGallery: true,
        galleryButton: {
          label: "View More",
        },
        galleryItems: [
          {
            image: "/images/hero-tank-red.jpg",
            caption: "Epoxy coated steel pressed tank",
            alt: "Red pressed steel water tank on a concrete base",
            width: 1280,
            height: 960,
          },
          {
            image: "/images/hero-tank-galvanized.jpg",
            caption: "Galvanized pressed steel tank",
            alt: "Silver pressed steel water tank with an access ladder",
            width: 992,
            height: 744,
          },
          {
            image: "/images/hero-tank-ladder.jpg",
            caption: "Epoxy coated steel pressed tank",
            alt: "Caged access ladder on a red pressed steel tank",
            width: 780,
            height: 925,
            objectPosition: "50% 25%",
          },
        ],
      },
    ] as HeroSlide[],
  },

  companyIntro: {
    statement:
      "We specialize in Fibre and Steel Water Tanks, built to solve the hygiene and maintenance problems of conventional tanks. We deliver premium, long-lasting water storage that is safe for human consumption.",
    highlights: [
      {
        title: "100% Hygienic and Low Maintenance",
        description: "Keeps water fresh and safe for extended periods.",
      },
      {
        title: "Global Manufacturing Partnership",
        description: "Built alongside Malaysia's leading tank manufacturer.",
      },
      {
        title: "Internationally Certified",
        description:
          "Compliant with British (BS EN 13280), Malaysian (MS 1390) and Singaporean (SS 245) standards.",
        standards: [
          {
            code: "BS EN 13280",
            label: "British",
          },
          {
            code: "MS 1390",
            label: "Malaysian",
          },
          {
            code: "SS 245",
            label: "Singaporean",
          },
        ],
      },
    ] as IntroHighlight[],
  },

  about: {
    heading: "About Us",
    story: {
      paragraphs: [
        "FST Engineering was founded on the basis of providing innovative water solutions and address the shortcomings inherent to traditional storage system. A vision of low maintenance of clean water storage system and hygiene become highly necessary to solve the problems of traditional conventional water storage system.",
        "We focus our marketing efforts on the advantage of storing water hygienically for extended longer period of time, at same time good for human consumption.",
        "Hence, our motive to ensure quality storage water tank in Nigeria geared us towards partnering with the best and biggest water tank manufacturer in Malaysia with their focus mainly on ensuring premium quality water tanks of highest quality specification and hygiene standards, in line with British standard BS EN 13280-2001, Malaysia standard MS 1390:2010 and Singapore standard SS 245:2014.",
      ],
      pullQuote: "If you're talking about quality then you're definitely talking About us!",
    },
    mission: {
      heading: "Mission",
      text: "Is to make quality and hygienic water accessible to all, thereby ensuring affordability, reliability in conformity to international global standards.",
    },
    vision: {
      heading: "Vision",
      text: "To be a leader in ensuring quality, potable water are made available to all households, Industries and government agencies bearing in mind durability, affordability and good service delivery.",
    },
  },

  products: {
    heading: "Products",
    product1: {
      title: "GRP/FRP Fibre Tank",
      paragraphs: [
        "Our Fibre tank are versatile due to their modularity, low maintenance, excellent thermal and hygienic properties. Our tanks can be utilized as; potable water storage, irrigation water storage, fire-fighting storage tank, food storage processing reservoir and for government water project.",
        "The low maintenance features, zero light penetration, stable thermal transition and hygienic quality makes our fiberglass tank panels superior for potable water storage. Our GRP/FRP fibre tank is from Malaysia and quality is more superior to other brands available in Nigeria Market today.",
      ],
      closingLine: "At FST Engineering, we don't exaggerate, our quality speaks volume!",
      properties: {
        title: "Physical Properties",
        columns: ["Fibre Physical Properties", "GRP/FRP", "Acceptance Criteria Tolerance"],
        rows: [
          { property: "Tensile Strength (MN/M2)", grp: "103", tolerance: "> 70" },
          { property: "Flexural Strength (MN/M2)", grp: "158.8", tolerance: "> 100" },
          { property: "Glass content (% /24hrs)", grp: "39", tolerance: "> 25" },
          { property: "Hardness (Barcol)", grp: "52", tolerance: "> 30" },
          { property: "Water absorption", grp: "0.05", tolerance: "<1.0" },
        ],
      },
      specifications: {
        title: "GRP/FRP Tank Specification",
        items: [
          { label: "Materials", value: "Resin and Fiberglass" },
          { label: "Manufacturing Process", value: "Hot pressed SMC Compression Moulding" },
          {
            label: "Tank Structural Support, Tie-rod system",
            value: "External parts: Hot Dipped Galvanized. Internal parts: 304 Stainless Steel",
          },
          { label: "Roof Support", value: "PVC pipe and FRPQ roof Stiffener" },
          { label: "Sealant", value: "Non-toxic rubber foam, Singapore approved" },
          {
            label: "Bolts, Nuts, Washer",
            value: "External: Hot Dipped Galvanized. Internal: 304 Stainless Steel",
          },
          {
            label: "Ladders",
            value:
              "External: Galvanized/Acrylic PU coated. Internal: FRP Ladder / 304 Stainless steel ladder",
          },
          {
            label: "Water level indicator",
            value:
              "Reversed Reading Pointer Mechanical type (Cat & mouse) Galvanized / Acrylic PU coated",
          },
          {
            label: "Nozzle Panel",
            value: "inclusive for flange inlet, outlet and discharge",
          },
          {
            label: "Base Pipe",
            value:
              "Square Pipe, Hot Dipped Galvanized or Aluminium painted based on availability",
          },
        ],
      },
      advantages: {
        title: "Advantages of GRP Fibre Tank",
        items: [
          "Good Quality",
          "Cheaper cost",
          "Anti-rust and corrosion",
          "Non leakage",
          "Durability (Original Malaysia brand)",
          "Transferability",
          "Low Maintenance",
          "Hygienic",
          "UV Resistance",
        ],
      },
    },
    product2: {
      title: "Pressed Steel Tank",
      description:
        "This is a pre-fabricated tank plate sheet, which was designed to be mechanically connected together with bolts and nuts with a butyl Sealant tape in between so as to avoid leakage. Pressed steel tank can either be hot dipped galvanized or epoxy paint coated, it has been in existence for many years and its popular here in Nigeria due to their durability and wide acceptance.",
      closingLine:
        "Kindly contact FST Engineering should you need pressed steel tank. Be rest assured for quality and good service when it comes to GRP fibre tank and pressed steel tank.",
      ctaButton: "Request a Quote",
    },
  },

  // SAMPLE COPY. Replace with real client testimonials before launch.
  testimonials: {
    heading: "What Our Clients Say",
    items: [
      {
        quote:
          "We needed a tank that would keep the water clean for our residents, and this has done exactly that. There is very little upkeep, and the team was straightforward from the quote to the delivery.",
        name: "Chinedu Okafor",
        role: "Property Developer",
        initials: "CO",
      },
      {
        quote:
          "Maintenance used to take up a lot of our time with the old tanks. Since switching to a fibre tank from FST Engineering, the water stays fresh and the upkeep is minimal. I would recommend them.",
        name: "Aisha Bello",
        role: "Estate Manager",
        initials: "AB",
      },
      {
        quote:
          "What convinced us was the Malaysian build and the standards behind it. The tank has held up well and the service has been reliable.",
        name: "Tunde Adeyemi",
        role: "Facility Manager",
        initials: "TA",
      },
    ] as TestimonialItem[],
  },

  contact: {
    heading: "Contact Us",
    phone: {
      label: "Phone",
      display: "+234 803 916 7367",
      href: "tel:+2348039167367",
      numbers: [
        { display: "+234 803 916 7367", href: "tel:+2348039167367" },
        { display: "+234 902 078 8069", href: "tel:+2349020788069" },
      ],
      action: "Call us",
    },
    email: {
      label: "Email",
      display: "info@fstwatertank.com",
      href: "mailto:info@fstwatertank.com",
      emails: [
        { display: "info@fstwatertank.com", href: "mailto:info@fstwatertank.com" },
        { display: "majarilwan@gmail.com", href: "mailto:majarilwan@gmail.com" },
      ],
      action: "Email us",
    },
    whatsapp: {
      label: "WhatsApp",
      display: "Chat with us",
      href: "https://wa.me/2348039167367?text=Hello%20FST%20Engineering%2C%20I%20would%20like%20to%20enquire%20about%20your%20water%20tanks.",
      action: "Chat now",
      ariaLabel: "Chat with FST Engineering on WhatsApp",
    },
    address: {
      label: "Office Address",
      display: "Mile 12 Ikorodu Road, Owode Onirin, Lagos",
      href: "https://www.google.com/maps/search/?api=1&query=Mile%2012%20Ikorodu%20Road%2C%20Owode%20Onirin%2C%20Lagos",
      action: "Get directions",
      ariaLabel: "Get directions to the FST Engineering office on Google Maps",
    },
  } as ContactInfo,
};
