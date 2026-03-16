L'idée était de sortir des cartes pokémon habituelles et de faire un truc un peu plus fun
j'ai un projet d'application "historique" sur paris et j'aime l'idée de gamifier certains
lieux ça fait un moment que je connais l'existence de l'api des arbres remarquables parce 
que certains m'ont intrigué sur l'open data de paris et la carte en ligne est bien faite, mais je n'avais jamais vu en détail comment elle fonctionnait.


j'ai passé trop de temps à hésiter et réfléchir sur le type d'API,
pas assez de temps surle front j'ai construit et déconstruit des choses pour aller vite

j'aurai du commencer le projet plus tôt mais j'avais des tests techniques chez Eni et le CESI a préparer. 

Je suis motivé à temriner et projet et à le présenter en détail si ça vous intéresse quand meme . 

côté front : 
Visualisation des cartes fonctionnelle

tri et recherche

détails d'une carte (google maps et photo en modale)

infos spécifiques de chaque carte

pas terminé / pas commencé 

gestion du login côté front
gestion de l'ajout en favoris côté front, projet d'ajouter une icone en haut à droite de chaque carte

ajout de sélecteurs comme arbres par taille ou par age ou arrondissements

les endpoints sont en open data soft query language https://help.huwise.com/apis/ods-explore-v2/#section/Opendatasoft-Query-Language-(ODSQL)

très proche du sql il est possible d'amélioer le les requetes avec des group by 

where="espece='Platane' AND arrondissement='75015'"

gestion de l'offset et du chargement de cartes supplémentaires , l'api limite à 100 cartes


rgpd -> mettre un warning sur les cookies de google maps avant d'ouvrir la modale et charger la carte

 commit gits faits sur le backend mais pas le front end


 aide de l'ia sur : réflexion sur une partie de la structure du projet, pour débug les props, 
 certaines classes css tailwind css docu pas toujours claire, suggestions de couleurs qui collaient, 
 correction de bug sur les modales

 il aurait été mieux de séparer plus proprement les appels API du reste du code

 projets similiaires faits en formations je me suis inspiré d'une partie du code que j'avais fait à l'époque