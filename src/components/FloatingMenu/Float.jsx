import React from "react";
import FlowingMenu from "./FlowingMenu.jsx";

const Float = () => {
  const menuItems = [
    {
      text: "Home",
      link: "#home",
      image: "https://media.licdn.com/dms/image/v2/D5622AQHzkvykjsld4w/feedshare-shrink_800/B56Z1YqxNSIMAc-/0/1775309100150?e=1776902400&v=beta&t=fQhq4VrsB6MoBn_h_HSMPktSgaSnvD5SrT1lgEVUmZs"
    },
    {
      text: "Events",
      link: "#events",
      image: "https://media.licdn.com/dms/image/v2/D5622AQFJd2p_2p-Gcg/feedshare-shrink_800/B56Z1YrFUpH8Ac-/0/1775309182522?e=1776902400&v=beta&t=oNBJ4BCSYKeSe-YRg2p3glxHEL4pkg6yTsXyyq1JI2U"
    },
    {
      text: "Gallery",
      link: "#gallery",
      image: "https://media.licdn.com/dms/image/v2/D5622AQEF6pyZhfEKVg/feedshare-shrink_800/B56Z1YraEIKQAg-/0/1775309267476?e=1776902400&v=beta&t=1-Fze1Qq91IdycBCXPhNGP6yKS5pVWwlnp4M7prTN-k"
    },
    {
      text: "Contact",
      link: "#contact",
      image: "https://media.licdn.com/dms/image/v2/D5622AQGWIcYlZeEOwA/feedshare-shrink_800/B56Z1Yrp3VKYAc-/0/1775309332213?e=1776902400&v=beta&t=amKk4tcDhhY2t_4SNCDceJLFQ-4gVzlSdxpzS_htElw"
    }
  ];

  return <FlowingMenu items={menuItems} />;
};

export default Float;