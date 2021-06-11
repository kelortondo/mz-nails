import { withIronSession } from "next-iron-session";

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { userId, password } = req.body;

      if (userId === process.env.ADMIN_ID && password === process.env.ADMIN_PW) {
        req.session.set("user", { userId });
        await req.session.save();
        return res.status(201).send("");
      }

      return res.status(403).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: false
    },
    password: process.env.APPLICATION_SECRET
  }
);