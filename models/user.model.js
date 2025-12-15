let model;

if (process.env.VERCEL) {
  model = await import("./user.model.pg.js");
} else {
  model = await import("./user.model.sqlite.js");
}

export const {
  findUserByEmail,
  findUserByRefreshToken,
  createUser,
  saveRefreshToken,
  clearRefreshToken,
  getProfile
} = model;
