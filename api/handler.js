const axios = require("axios");
const admin = require("../firebaseadmin");

const loginHandler = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const signInMethod = await admin.auth().fetchSignInMethodsForEmail(decodedToken.email);

    if (!signInMethod.includes("password")) {
      res.status(400).json({ error: "User not registered with email and password." });
      return;
    }

    const firebaseRestUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${admin.apps[0].options.apiKey}`;
    const response = await axios.post(firebaseRestUrl, {
      requestUri: `/io/login`,
      postBody: `id_token=${idToken}&providerId=firebase`,
      returnSecureToken: true,
      returnIdpCredential: true,
    });

    const { idToken: newIdToken, refreshToken, expiresIn } = response.data;

    res.json({
      idToken: newIdToken,
      refreshToken,
      expiresIn,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginHandler };
