côté back : 

mise en place du backend de l'API

objectifs: 

API qui renvoie au front des endpoints pour :

se connecter / créer un compte 

ajouter des cartes en favoris 

consulter la liste des cartes

effectuer une recheche 

consulter des catégories de cartes 

routes d'api de suppressions / ajout de favoris passant par un middleware jwt

stack technique pour l'instant : 

node, express, sequelize, postgres, axios pour les appels api, jwt pour la sécu, dotenv


axes d'améliration , 

factoriser la fonction de formatage d'un arbre avec le map pour respecter le DRY, pareil pourles vérifs d'utilisateur 

jwt fonctionnel, admin , base de donées de remplacement (un scraping petit à petit a chaque appel de carte)

rajouter certaines vérifs aux contenus utilisateurs, faire ne validation par mail avec nodemail des comptes, 


prise en charge de nouvelles essences d'arbres au cas où paris plante des palmiers


projets similaires réalisés en formation je me suis inspiré d'une partie du code fait à l'époque scaffolding de sequelize le seed etc.

IA utilisée en debug de ma requete (j'avais juste fait des typo), aussi en debug de parties du controller sur des erreurs de params, et mise en forme du texte du readme sans trop en faire