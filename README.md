

# LVR + Seacom + ALT + Elastic Italy = Elastic Workshop 

##  Prerequisiti

1. Installare Docker (Docker Desktop) per la propria piattaforma (Linux/MacOSX/Windows)  
    https://runnable.com/docker/getting-started/
2. Installare Docker Compose per la propria piattaforma (Linux/MacOSX/Windows)  
    https://docs.docker.com/compose/install/ (già incluso nelle ultime versioni di Docker Desktop per MacOSX e Windows)
3. Fare attenzione ad eventuali prompt di Docker Desktop che possono richiedere l'accesso a risorse locali o il reinserimento delle credenziali
4. Testare l'installazione: per assicurarsi che docker sia stato installato in modo corretto
```
$ docker --version
$ docker run hello-world
```
5. Se anche Docker ti saluta, tutto è funzionante, puoi partecipare al workshop :+1:
```
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

##  Setup Iniziale

1. scaricare il materiale necessario per il workshop (questo reposotory)
```
$ git clone https://github.com/luisaviaroma/WorkshopRefactoringElasticsearchIndex
```
2. cambiare working directory
```
$ cd WorkshopRefactoringElasticsearchIndex
```
3. avviare docker compose
```
$ docker-compose up
```

Il docker-compose installa un'istanza di ElasticSearch, Kibana ed il runt-time per Node.js su cui viene eseguita una WebApp che espone
quattro versioni diverse che usano SearchKit.

*SearchKit* è un framework che espone UI components implementati in React che permette in modo molto semplice e rapido il collegamento ad un indice Elastic
http://docs.searchkit.co/stable/

- Istanza locale di Elastic: http://localhost:9200
- Console Web di Kibana locale: http://localhost:5601
- WebApp standard Searchkit: http://localhost:3000/#demo
- WebApp per l'esecuzione degli UnitTests: http://localhost:3000/#test
- WebApp che punta l'indice Elastic dei Libri: http://localhost:3000/#book

   [Guida per provare l'indice dei Libri con SearchKit](./README.books.md)
- WebApp che punta l'indice Elastic dei Calciatori: http://localhost:3000/#fifa

   [Guida per provare l'indice dei Calciatori con SearchKit](./README.fifa.md)


:bowtie:
