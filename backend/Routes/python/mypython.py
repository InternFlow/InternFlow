import sys
from sklearn.ensemble import RandomForestClassifier

# Données d'entraînement
percentages_train = [[10], [30], [50], [80], [95]]  # Exemples de pourcentage
levels_train = ['debutant', 'intermediaire', 'intermediaire', 'excellent', 'excellent']  # Niveaux correspondants

# Création et entraînement du modèle de forêt aléatoire
model = RandomForestClassifier()
model.fit(percentages_train, levels_train)

# Récupération du pourcentage de test à partir des arguments de la ligne de commande
pourcentage_test = float(sys.argv[1])

# Prédiction du niveau pour le pourcentage de test
prediction = model.predict([[pourcentage_test]])[0]

# Retour de la prédiction
print(prediction)
