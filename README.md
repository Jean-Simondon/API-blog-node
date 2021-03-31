INSTALLATION :

le code a été exécuté avec node 14.15.0

L'url github de l'api est : https://github.com/Jean-Simondon/API-blog-node
l'url github du front est : https://github.com/Jean-Simondon/front-blog-vue

l'api est à lancer avec les commandes "npm run start" ou "npm run watch" après avoir lancé "npm install" sur la racine bien sûr. 
la partie front est à lancer avec la commande "npm run serve" après avoir lancé "npm install"

l'url de l'api se trouve à : https://api-blog-node.herokuapp.com/api/v1/
l'url du front se trouve à : https://wonderful-turing-d512ba.netlify.app/


ROUTE :
	un fichier API blog node.postman_collection.json se trouve à la racine du projet est permet de disposer de toutes les routes une fois importer dans Postman



TODO restant :
	cors (pour des requêtes d’api à api) <--- OK
	Crypter le mot de passe (bcrypt, ou md5) <--- OK
	Gérer l’unicité de l’adresse email <--- OK

TP NOTE :
Créez une API de gestion d'article pour un blog. Cette API doit contenir:

ARTICLE :
une route pour récupérer un article <--- OK
une route pour récupérer la liste des articles <--- OK
une route pour ajouter un article <--- OK
une route pour supprimer un article <--- OK
une route pour modifier un article <--- OK

PROTECTION DES ROUTES :
Les routes liées à la creation/suppression/modification d'articles doivent être uniquement accessibles aux personnes connectés. <--- OK
La seule personne pouvant modifier ou supprimer un article doit être la personne qui l'a créé. <--- OK

USER :
une route pour récupérer un utilisateur <--- OK
une route pour récupérer la liste des utilisateurs <--- OK
une route pour créer un compte utilisateur <--- OK
une route pour supprimer un compte utilisateur <--- OK
une route pour modifier un compte utilisateur <--- OK

AUTHENTIFICATION :
Le système d'authentification doit être fait avec les librairies utilisées en TP (passport et passport-jwt). <--- OK
une route pour se connecter (récupérer un JWT) <--- OK

DATABASE :
Les utilisateurs ainsi que les articles seront stockés dans restdb comme vu en TP. <--- OK

HEBERGEMENT :
Le projet doit être déployé sur Heroku. <--- OK

AUTRE SPECIFICATION :
ATTENTION 2: pour communiquer avec votre serveur express depuis une page web, vous aurez besoin de gérer les CORS. voir le middleware express cors  <--- OK
Utiliser le middleware CORS pour permettre l'usage d'API d'un autre domaine  <--- OK
l'api doit communiquer uniquement en JSON (res.json avec express).  <--- OK

FORMAT DU RENDU :
l'URL d'un github contenant les sources de votre projet ainsi qu'un readme qui explique comment lancer/installer le projet.  <--- OK
l'URL de votre API + l'url de l'application finale (avec la partie Vue.js) <--- OK

