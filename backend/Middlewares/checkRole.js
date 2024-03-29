const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role || req.user.role === "admin") {
      // Si l'utilisateur a le rôle spécifié, nous appelons le prochain middleware
      next();
    } else {
      // Sinon, nous renvoyons une réponse d'erreur
      res.status(403).json({ message: "Accès refusé" });
    }
  };
};

module.exports = { checkRole };
