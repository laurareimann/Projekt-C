# Projekt-C

Das Projekt “15-Minute-City” wurde im Rahmen des Studiengangs Media Systems als Teil des Projekt-Moduls C durchgeführt, in dem Studierende eine eigenständige Projektidee entwickeln, iterativ umsetzen und durch Präsentation und Dokumentation praxisorientiert verfeinern.

Auf der Website wird das 15-Minuten-Stadt-Konzept umgesetzt, indem für eine eingegebene Adresse ein Erreichbarkeits-Score in Minuten berechnet wird, der auf der durchschnittlichen Reisezeit zu den nächstgelegenen Einrichtungen des täglichen Bedarfs basiert. Ergänzt wird diese Analyse durch eine Kartenansicht, die die Standorte dieser Einrichtungen visuell darstellt und Nutzer:innen eine anschauliche Einschätzung zur Lebensqualität im jeweiligen Umfeld bietet.


**Score Berechnung**

Der Score ist eine durchschnittliche Zeitangabe, die aus der Entfernung aller relevanten Ziele zum Ausgangspunkt ermittelt wird.
Bei den gefilterten Ergebnissen gibt es für die priorisierten Kategorien Gewichtungen, die den individuellen Score bilden.

Die 3 Basiskategorien sind Lebensmittelläden, Gesundheitswesen und Haltestellen von öffentlichen Verkehrsmitteln
Eine vierte Kategorie besteht aus persönlichen Präferenzen, die aus einem Filter-Overlay angewählt werden können

Beispiel:
Basic Score: Supermarkt = 10min, Zahnarzt = 6min, Nächste Bushaltestelle = 20min --> (10 + 6 + 20) / 3 = 32min 
Gewichteter Score für Gesundheitswesen: Supermarkt=10min, Zahnarzt=6min (wird doppelt gewichtet), Nächste Bushaltestelle= 20min-->(10 + 2*6 + 20) / (3+1) = 10,5min

So wird der Zahnarzt im Vergleich zu anderen Zielen wie hier der Bushaltestelle und dem Supermarkt stärker gewichtet.

Zudem können auch persönliche Präferenzen aus dem Filter-Overlay, wie zum Beispiel Büchereien oder Cafés, gewählt werden, wodurch eine viert Kategorie dem Algorithmus hinzugefügt wird.
