import prisma from "../../lib/prisma";
import axios from "axios";

// get location of ip address
async function getLocation(ip) {
  const response = await axios({
    method: "get",
    url: `https://ipapi.co/${ip}/json/`,
  });
  return response.data;
}

export default (req, res) => {
  // add a new visit entry to prisma
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const visit = prisma.visit
    .create({
      data: {
        ip: ip,
        userAgent: userAgent,
        createdAt: new Date(),
      },
    })
    .then((visit) => {
      // return the new number of visits
      prisma.visit
        .count()
        .then((count) => res.status(200).json({ visitCount: count }));
    });
};
