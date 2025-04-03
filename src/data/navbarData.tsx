import { Zap, Sunset, Trees, Book } from "lucide-react";

export const defaultNavbarData = {
  logo: {
    url: "/",
    src: "images/logo.jpeg",
    alt: "logo",
    title: "Noken Vocabulary",
  },
  menu: [
    { title: "Home", url: "/" },
    {
      title: "Nokens",
      url: "/nokens",
    },
    {
      title: "Niveles Noken",
      url: "#",
      items: [
        {
          title: "Noken 5",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/nokens/noken-5",
        },
        {
          title: "Noken 4",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Noken 3",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Noken 2",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Noken 1",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
  ],
  auth: {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
};
