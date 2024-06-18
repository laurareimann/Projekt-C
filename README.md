# Projekt-C

**SETUP**

Extension für VSCode

ES7 + React/Redux/React-Native snippets
ESLint
vscode-styled-components

Packages aktualisieren/installieren

1) In den jeweiligen Ordner navigieren
2) "npm i" oder "npm install" eingeben

Dies aktualisiert/installiert auch benötigte Module, die von anderen hinzugefügt wurden


**Erklärung zu einigen Modules(hierzu auch gerne die offiziellen Dokumentationen checken)**

Bootstrap ist für besseres UI-Handling in React
Liste an verwendtbaren components für UI: https://react-bootstrap.netlify.app/docs/components/tabs

react-router-dom
Routing zur Führung zwischen pages



**RUN APP**

In beiden Ordnern (frontend & backend):
Kompilieren: npm run build
Während Entwicklung: npm run dev
Bei Modulen mit @ am Anfang: den npm install command nicht in der PowerShell, sondern in einem neuen command prompt eingeben.



**Datenbank** 

In VSCode, die Extension "MongoDB for VS Code" installieren

Credentials
MongoDB access if something breaks 
database-name = Project-C-Cluster

database username: Project-C-User
database passwort: Zz5TsmpdvISkEmxz

Alternativ:
username: Project_C_Dev
password: 4mfR2McEdhwa6Uvb 




**Frequente Bugs und ihre Behebungen**

Bei Modulen mit @ am Anfang: den npm install command nicht in der PowerShell, sondern in einem neuen "normalen" command prompt eingeben. Die Powershell mag das aus irgendwelchen Gründen nicht

Wenn mongoose bzw. mongodb einen error in der Richtung von "SyntaxError: Unexpected token '??=" gibt, muss die mongoose-Version geändert werden. Dazu sollte im backend-Ordner ein "npm install" reichen.
Ansonsten diesen Befehl in die Konsole eingeben: npm install mongoose@7.6.3



**Score Berechnung**

Der Score ist eine durchschnittliche Zeitangabe, die aus der Entfernung aller relevanten Ziele zum Ausgangspunkt ermittelt wird.
Bei den gefilterten Ergebnissen gibt es für die priorisierten Kategorien Gewichtungen, die den individuellen Score bilden.

Beispiel:
Basic Score: Supermarkt = 10min, Haustierbedarf = 6min, Post = 20min --> (10 + 6 + 20) / 3 = 32min 
Gewichteter Score für Haustierbesitzer: Supermarkt = 10min, Haustierbedarf = 6min (wird doppelt gewichtet), Post = 20min  --> (10 + 2*6 + 20) / (3+1) = 10,5min

So wird der Haustierbedarf im Vergleich zu anderen Zielen wie hier der Post und dem Supermarkt stärker gewichtet.
