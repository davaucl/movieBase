================================================================================
==================================== HTML ======================================
================================================================================

tab : 4 espaces

Si un c'est un tag conteneur hormis exception (a, span, h1, h2, ...) faites le
sur plusieurs lignes

<div>
    <a>what ever</a>
</div>

c'est plus lisible que ça :

<div><a>what ever</a></div>

================================================================================
===================================== JS =======================================
================================================================================

COMMENTEZ TOUS ! Si vous faites une fonction n'hésitez pas à écrire une ligne
ou deux pour décrire ce que la fonction fait, les paramêtres quelles prend,
la valeur qu'elle retourne, tout ce que vous jugerez utile pour la personne
qui passera derrière vous !

    > e.g :

    /*
    ** swap to value in an array
    ** @par1 : array
    ** @par2 : first value to swap
    ** @par3 : second value
    ** @return : swapped array
    */
    function swapValueInArray(ary, fst, snd) {
    	 var tmp = 0;

	 tmp = ary[fst];
	 ary[fst] = ary[snd];
	 ary[snd] = tmp;
	 return ary;
    }

functionName
variable_name;

tab : 4 espaces

paramêtres des fonctions séparés par une virgule et un espace après celle-ci
    > e.g : function functionName(par1, par2, par3)

pour les strings ecritent en dure "" ou '', c'est pas important
pareillement pour les commentaires // ou /* */
pas de ligne de plus de 80c

condition multilignes
if () {
} else if () {
} else {
}

condition monoligne
if ()
else if ()
else

for (var x = 0;x < y;x++) {
}

pas d'espace inutile apres ( et avant )
    > e.g : var x = x * (8 - 3);
pas d'espace autour des operateurs unaires
    > e.g : x++ ou x--
espace autour des operateurs binaires et ternaires
    > e.g : var x = y + 1;
    > e.g : ( x < y ) ? add(x, y) : sub(x, y);
pas de parenthese sur valeur de retour
    > e.g : return x + y;

sauté une ligne après la déclaration des variables et plus aggréable, mais rien
d'obligatoire juste conseillé.

e.g :
function functionName(par1, par2) {
    vat tmp1 = par1,
    	tmp2 = par2,
	str = "hello world";

    for (var idx = 0;idx <= str.length;idx++) {
    	if (idx > 100)
	   return true;
	eles if (idx > 90 && idx <=100) {
	     /*
	     ** do something ...
	     */
	}
    }
    (par1 < par2) ? add(par1, par2) : sub(par1, par2);
    return false;
}

on evite tant que faire ce peu les forêts de if et le duplicata de code

================================================================================
===================================== CSS ======================================
================================================================================


pas de maj au nom de class/id , espacez par des tirer les noms
    > e.g : content-btn-class-validate

pour les abrevations du genre btn pour boutton du moment que c'est clair ça
me va, à voir avec les autres
