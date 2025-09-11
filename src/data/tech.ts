import { Docker, Express, Figma, Git, Github, Graphql, Javascript, Jest, Linux, Mongodb, Nestjs, Nextjs, Nodejs, Postgresql, Postman, React, Redux, Tailwind, Typescript, Vercel, VsCode } from "@/assets/icons";

export const technologies = [
  {
    category: "Frontend",
    skills: [
      { name: "react", icon: React },
      { name: "next.js", icon: Nextjs },
      { name: "javaScript", icon: Javascript},
      { name: "typescript", icon: Typescript },
      { name: "tailwindcss", icon: Tailwind },
      { name: "redux", icon: Redux },
      { name: "graphql", icon: Graphql },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "node.js", icon: Nodejs },
      { name: "express", icon: Express },
      { name: "nestjs", icon: Nestjs },
      { name: "postgresql", icon: Postgresql },
      { name: "mongodb", icon: Mongodb },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "docker", icon: Docker },
      { name: "ci/cd", icon: Github },
      { name: "git", icon: Git },
      { name: "linux", icon: Linux },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "vs code", icon: VsCode },
      { name: "postman", icon: Postman },
      { name: "figma", icon: Figma },
      { name: "jest", icon: Jest },
      { name: "github", icon: Github },
      { name: "vercel", icon: Vercel },
    ],
  },
];
