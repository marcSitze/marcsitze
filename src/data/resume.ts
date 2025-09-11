import { ICertificate, IPortfolio, IResume, IService, ISkills, ISocialLink, IUser, MAIN_TYPE, PROJECT_TYPE } from "../types";

export const socialLinks: ISocialLink[] = [
  {
    id: 0,
    link: "https://github.com/marcSitze",
    name: "github"
  },
  {
    id: 1,
    link: "https://www.linkedin.com/in/marcsitze/",
    name: "linkedin-in"
  },
  {
    id: 2,
    link: "https://twitter.com/Marcjorel1",
    name: "twitter"
  },
  {
    id: 3,
    link: "https://wa.me/699576276",
    name: "whatsapp"
  },
  {
    id: 4,
    link: "https://facebook.com/marcsitze",
    name: "facebook"
  },
  {
    id: 5,
    link: "https://instagram.com/jorelmarc",
    name: "instagram"
  },
  {
    id: 6,
    link: "https://www.youtube.com/channel/UCvfgOMn6WQOiMfBDHGZT5mA",
    name: "youtube"
  }
]

export const services: IService[] = [
  {
    id: 0,
    title: "Front-end web",
    description: `I create the technical features for a website's look. I develop the site's layout and integrate graphics, applications (such as a retail checkout tool), and other content. I also write webdesign programs in a variety of computer languages, such as HTML or JavaScript.`
  },
  {
    id: 1,
    title: "Web interface wireframing",
    description: `I create the look of a website or interface with regard to
    photos, color, font type and size, graphics, and layout.
    They also are responsible for the functionality, usability,
    and compatibility of the website or interface..`
  },
  {
    id: 2,
    title: "Back-end web",
    description: "I build and maintains the technology needed to power the components which enable the user-facing side of the website to exist. This includes the core application logic, databases, data and application integration, API and other back end processes."
  }
]

export const SKILLS: ISkills =  "html, css, javascript,typescript,bootstrap,jquery,react,react-native,redux,nuxt/vuejs,vuex,nodejs,expressjs,nestjs,mongodb,wordpress,elementor,firebase,json"

export const OTHER_SKILLS = "heroku,strapi,jest,mysql,mvc,cqrs,java,python,c/c++"

export const USER: IUser = {
  name: "Marc Sitze",
  title: "Software Developer",
  description: "I'm develop, deliver and implement data-driven web applications for clients. I write well designed testable code following best practices for software development, creating website layout, integrating data from back-end services",
  cvLink: "https://drive.google.com/file/d/1UfMMUnYlLfeyZ6B9qUhzVLF3SkQrfW2H/view?usp=sharing"
}

export const RESUME: IResume[] = [
  {
    id: 0,
    mainType: MAIN_TYPE.EDUCATION,
    title: "GCE ADVANCED LEVEL",
    place: "LBA Yaounde",
    description: "The A Level (Advanced Level) is a subject-based qualification conferred as part of the General Certificate of Education,  issued by  Cameroon GCE Board",
    yearStart: String(new Date(1504569600000)),
    yearEnd: String(new Date(1528588800000))
  },
  {
    id: 1,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Front-End Developer",
    place: "PNBOOKING",
    description: "Develoement of the marketplace new web interfaces and improving user experience on the website",
    yearStart: String(new Date(1601078400000)),
    yearEnd: String(new Date(1609459200000))
  },
  {
    id: 2,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Front-End Developer",
    place: "PNTEC-LTD",
    description: "Project initialisation and setup, Creation of web interfaces from Adobe XD design and API integration from a headless CMS (Strapi)",
    yearStart: String(new Date(1609718400000)),
    yearEnd: String(new Date(1613088000000))
  },
  {
    id: 3,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Fullstack developer",
    place: "REFRAICHE",
    description: "Creation of new web interfaces for the web app, Implementing new API features and integrating them in the front end, Integration of mobile payment methods and paypal",
    yearStart: String(new Date(1609718400000)),
    yearEnd: String(new Date(1613088000000))
  },
  {
    id: 4,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Software Developer",
    place: "FREELANCE(remote)",
    description: "Working on random freelance projects, and dealing with specific tasks",
    yearStart: String(new Date(1621209600000)),
    yearEnd: String(new Date(1640908800000))
  },
  {
    id: 5,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Software Developer",
    place: "Gateway/Beone",
    description: "Developing Alaxione mobile patients which is \n an application that permits patients to book appointments with doctors through a mobile app",
    yearStart: String(new Date(1641168000000)),
    yearEnd: String(new Date(1648771200000))
  },
  {
    id: 6,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Software Developer",
    place: "Gateway/Beone",
    description: "Developing Alaxione mobile patients which is an application that permits doctors to communicate with other doctors and patients through a mobile app",
    yearStart: String(new Date(1649030400000)),
    yearEnd: String(new Date(1653609600000))
  },
  {
    id: 6,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Software Engineer",
    place: "Maviance",
    description: "I played a key role in developing an innovative customer payment portal and restructuring the existing project. This platform was designed to simplify and secure the payment process, providing a seamless experience for users (merchant, corporate)",
    yearStart: String(new Date("2022/11/01")),
    yearEnd: String(new Date("2024/08/30"))
  },
  {
    id: 6,
    mainType: MAIN_TYPE.EXPERIENCE,
    title: "Frontend Lead",
    place: "bubo",
    description: "a revolutionary document archiving and management solution. With advanced AI-based search and instant chat like GPT, find your information in an instant",
    yearStart: String(new Date("01/02/2024")),
    yearEnd: String(new Date("2025/06/30"))
  },
]

export const CERTIFICATES: ICertificate[] = [
  {
    id: 0,
    title: "Udemy MERN stack developpement",
    abrev: "MERN",
    yearStart: String(new Date(1656526329675)),
    yearEnd: String(new Date(1587254400000)),
    link: "https://drive.google.com/file/d/1okSIAfjpc1PXSH4kzUE3Sjt8dfYW6T9L/view?usp=sharing"
  },
  {
    id: 1,
    title: "JavaScript Algorithms and Data Structures",
    abrev: "JS",
    yearStart: String(new Date(1649808000000)),
    yearEnd: String(new Date(1651017600000)),
    link: "https://www.freecodecamp.org/certification/fcc3b097640-4f8b-45c8-94fa-dcecadecfec3/javascript-algorithms-and-data-structures"
  }
]

export const PORTFOLIO: IPortfolio[] = [
  {
    id: 0,
    title: "Events app",
    description: "Events is a web app where users can create an \nevent, view other users events and participate to others events all that in real time",
    imageLink: ["https://drive.google.com/uc?export=view&id=1N7GkkXKeMZScwosU8rDQHv4EXdcqfvII"],
    link: "http://events-f.herokuapp.com/login",
    mainType: PROJECT_TYPE.WEB,
    technos: "reactjs,nodejs,expressjs,mongodb,sockets"
  },
  {
    id: 1,
    title: "Alaxione Patient",
    mainType: PROJECT_TYPE.MOBILE,
    link: "",
    imageLink: ["https://drive.google.com/uc?export=view&id=1ZTsGnVElyuNqvyVQ1wdk9LS0FhBY1gkd"],
    technos: "reactnative,redux",
    description: "Alaxione patient is a mobile app that recall patients to know went they have an appointment with a Doctor or book an appointment"
  },
  {
    id: 2,
    title: "Afromeme",
    mainType: PROJECT_TYPE.MOBILE,
    link: "https://afromeme.herokuapp.com/",
    imageLink: ["https://drive.google.com/uc?export=view&id=1VngAl124vLqfUUnvNuhFTFJ5jpO6xlQK"],
    technos: "html,css,bootstrap,jquery,nodejs,expressjs,mongodb",
    description: "Afromeme is a social network where all meme lovers can post and share their favorite memes to all the world"
  },
  {
    id: 3,
    title: "Pntec-ltd",
    mainType: PROJECT_TYPE.WEB,
    link: "https://drive.google.com/file/d/1ALn4dn1qEYxYOal0MtD8Re5Lsk0aEcyj/view?usp=sharing",
    imageLink: ["https://drive.google.com/uc?export=view&id=1CcnEzu-RMViOjjWD7yOVleVMwwqUHRBE"],
    technos: "nuxtjs/vuejs,strapi,bootstrap",
    description: "Pntec-ltd is an IT services based company"
  }
]

export const all = [
  { 
    "_id": { "$oid": "62bc95fe4794738e387119f2" },
    "title": "Software Developer",
    "name": "Marc Sitze",
    "description": "I'm develop, deliver and implement data-driven web applications for clients. I write well designed testable code following best practices for software development, creating website layout, integrating data from back-end services",
    "createdAt": { "$date": { "$numberLong": "1656526329675" } },
    "updatedAt": { "$date": { "$numberLong": "1656526329675" } },
    "services": [
      {
        "_id": { "$oid": "62bca1075b6a9b0004c6bd80" },
        "title": " Back-end web",
        "description": "I build and maintains the technology needed to power the components which enable the user-facing side of the website to exist. This includes the core application logic, databases, data and application integration, API and other back end processes."
      },
      {
        "_id": { "$oid": "62bca1975b6a9b0004c6bd82" },
        "title": "Web interface wireframing",
        "description": "I create the look of a website or interface with regard to photos, color, font type and size, graphics, and layout. They also are responsible for the functionality, usability, and compatibility of the website or interface.."
      },
      {
        "_id": { "$oid": "62bca1d05b6a9b0004c6bd85" },
        "title": "Front-end web",
        "description": "I create the technical features for a website's look. I develop the site's layout and integrate graphics, applications (such as a retail checkout tool), and other content. I also write webdesign programs in a variety of computer languages, such as HTML or JavaScript."
      }
    ],
    "resume": [
      {
        "mainType": "EDUCATION",
        "title": "GCE ADVANCED LEVEL",
        "_id": { "$oid": "62bca3cc5b6a9b0004c6bd86" },
        "place": "LBA Yaounde", "yearStart": {
          "$date": { "$numberLong": "1504569600000" }
        },
        "yearEnd": {
          "$date": { "$numberLong": "1528588800000" }
        },
        "description": "The A Level (Advanced Level) is a subject-based qualification conferred as part of the General Certificate of Education,  offered by  Cameroon GCE Board"
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Front-End Developer",
        "_id": { "$oid": "62bca5a45b6a9b0004c6bd88" },
        "place": "PNBOOKING",
        "yearStart": { "$date": { "$numberLong": "1601078400000" } },
        "yearEnd": { "$date": { "$numberLong": "1609459200000" } },
        "description": "Develoement of the marketplace new web interfaces and improving user experience on the website \n"
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Front-End Developer",
        "_id": { "$oid": "62bca6cb5b6a9b0004c6bd8b" },
        "place": "PNTEC-LTD",
        "yearStart": { "$date": { "$numberLong": "1609718400000" } },
        "yearEnd": { "$date": { "$numberLong": "1613088000000" } },
        "description": "Project initialisation and setup, Creation of web interfaces from Adobe XD design and API integration from a headless CMS (Strapi)\n"
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Fullstack developer",
        "_id": { "$oid": "62bca7f65b6a9b0004c6bd8f" },
        "place": "REFRAICHE",
        "yearStart": { "$date": { "$numberLong": "1613347200000" } },
        "yearEnd": { "$date": { "$numberLong": "1620950400000" } },
        "description": "Creation of new web interfaces for the web app, Implementing new API features and integrating them in the front end, Integration of mobile payment methods and paypal\n"
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Software Developer",
        "_id": { "$oid": "62bcad485b6a9b0004c6bd94" },
        "place": "FREELANCE",
        "yearStart": { "$date": { "$numberLong": "1621209600000" } },
        "yearEnd": { "$date": { "$numberLong": "1640908800000" } },
        "description": "Working on random freelance projects, and dealing with specific tasks "
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Software Developer",
        "_id": { "$oid": "62bcaeea5b6a9b0004c6bd9a" },
        "place": "Gateway/Beone",
        "yearStart": { "$date": { "$numberLong": "1641168000000" } },
        "yearEnd": { "$date": { "$numberLong": "1648771200000" } },
        "description": "Developing Alaxione mobile patients which is \n an application that permits patients to book appointments with doctors through a mobile app"
      },
      {
        "mainType": "EXPERIENCE",
        "title": "Software Developer",
        "_id": { "$oid": "62bcb0165b6a9b0004c6bda1"
      },
      "place": "Gateway/Beone",
      "yearStart": { "$date": { "$numberLong": "1649030400000" } },
      "yearEnd": { "$date": { "$numberLong": "1653609600000" } },
      "description": "Developing Alaxione mobile patients which is an application that permits doctors to communicate with other doctors and patients through a mobile app"
    }
  ],
  "certificates": [
    {
      "_id": { "$oid": "62bcb0db5b6a9b0004c6bda2" },
      "title": "Udemy MERN stack developpement",
      "abrev": "MERN",
      "yearStart": { "$date": { "$numberLong": "1583452800000" } },
      "yearEnd": { "$date": { "$numberLong": "1587254400000" } },
      "link": "https://drive.google.com/file/d/1okSIAfjpc1PXSH4kzUE3Sjt8dfYW6T9L/view?usp=sharing"
    },
    {
      "_id": { "$oid": "62bcb17a5b6a9b0004c6bda4" },
      "title": "JavaScript Algorithms and Data Structures",
      "abrev": "JS",
      "yearStart": { "$date": { "$numberLong": "1649808000000" } },
      "yearEnd": { "$date": { "$numberLong": "1651017600000" } },
      "link": "https://www.freecodecamp.org/certification/fcc3b097640-4f8b-45c8-94fa-dcecadecfec3/javascript-algorithms-and-data-structures"
    }
  ],
  "__v": { "$numberInt": "0" },
  "cvlink": "https://drive.google.com/file/d/1UfMMUnYlLfeyZ6B9qUhzVLF3SkQrfW2H/view?usp=sharing",
  "otherSkills": "heroku,strapi,jest,mysql,mvc,cqrs,java,python,c/c++",
  "skills": "html, css, javascript,typescript,bootstrap,jquery,react,react-native,redux,nuxt/vuejs,vuex,nodejs,expressjs,nestjs,mongodb,wordpress,elementor,firebase,json",
  "portfolio": [
    {
      "_id": { "$oid": "62c2ae05f17bca22e131e88d" },
      "title": "Events app",
      "mainType": "web",
      "link": "http://events-f.herokuapp.com/login",
      "imageLink": "https://drive.google.com/uc?export=view&id=1N7GkkXKeMZScwosU8rDQHv4EXdcqfvII",
      "technos": "reactjs,nodejs,expressjs,mongodb,socktes",
      "description": "Events is a web app where users can create an \nevent, view other users events and participate to others events all that in real time"
    },
    {
      "_id": { "$oid": "62c433d8ee106e00045f235f" },
      "title": "Alaxione Patient",
      "mainType": "mobile",
      "link": "",
      "imageLink": "https://drive.google.com/uc?export=view&id=1ZTsGnVElyuNqvyVQ1wdk9LS0FhBY1gkd",
      "technos": "reactnative,redux",
      "description": "Alaxione patient is a mobile app that recall patients to know went they have an appointment with a Doctor or book an appointment"
    },
    {
      "_id": { "$oid": "62c424b4ee106e00045f2355" },
      "title": "Afromeme",
      "mainType": "web",
      "link": "https://afromeme.herokuapp.com/",
      "imageLink": "https://drive.google.com/uc?export=view&id=1VngAl124vLqfUUnvNuhFTFJ5jpO6xlQK",
      "technos": "html,css,bootstrap,jquery,nodejs,expressjs,mongodb",
      "description": "Afromeme is a social network where all meme lovers can post and share their favorite memes to all the world"
    },
    {
      "_id": { "$oid": "62c4266aee106e00045f235d" },
      "title": "Pntec-ltd",
      "mainType": "web",
      "link": "https://drive.google.com/file/d/1ALn4dn1qEYxYOal0MtD8Re5Lsk0aEcyj/view?usp=sharing",
      "imageLink": "https://drive.google.com/uc?export=view&id=1CcnEzu-RMViOjjWD7yOVleVMwwqUHRBE",
      "technos": "nuxtjs/vuejs,strapi,bootstrap",
      "description": "Pntec-ltd is an IT services based company"
    }
  ]
}
]