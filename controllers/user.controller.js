import { getProfile } from "../models/user.model.js";

export const profile = async (req, res) => {
  const user = await getProfile(req.user.id);

  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json({ user });
};
