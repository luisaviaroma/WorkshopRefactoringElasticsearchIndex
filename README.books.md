# SearchKit-demo-book

#####  (1) Controllo del Mapping creato degli indici

###### Alcuni campi devono essere modificati in modo da utilizzarli in modo opportuno in SearchKit

```yaml
GET luisa1-book

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "luisa1-book",
        "alias": "luisaviaroma-book"
      }
    }
  ]
}

# In SearchKit si deve utilizzare l'alias luisaviaroma-book!!!
```



##### (2) Creazione del nuovo indice ottimizzato

###### Ogni volta che sono necessarie modifiche all'index l'unica opzione che abbiamo è crearne uno nuovo.

In questo caso procediamo per step:

- Vogliamo utilizzare l'autore come filtro
- vogliamo poter filtrare i libri per tipologia

```yaml
# Struttura attuale del field che identifica la tipologia:
"genres":"Young Adult|Fiction|Science Fiction|Dystopia|Fantasy|Science Fiction"
```
```yaml
PUT luisa2-book
{
  "mappings": {
    "_doc": {
      "properties": {
        "book_authors": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            }
          }
        },
        "book_desc": {
          "type": "text"
        },
        "book_edition": {
          "type": "text"
        },
        "book_format": {
          "type": "keyword"
        },
        "book_isbn": {
          "type": "double"
        },
        "book_pages": {
          "type": "keyword"
        },
        "book_rating": {
          "type": "double"
        },
        "book_rating_count": {
          "type": "long"
        },
        "book_review_count": {
          "type": "long"
        },
        "book_title": {
          "type": "text"
        },
        "genres": {
          "type": "keyword"
        },
        "image_url": {
          "type": "keyword"
        }
      }
    }
  }
}

```



##### (3) Prima di re-indicizzare i dati è necessario creare una ingest pipeline per modificare il field _genres_ e poterlo utilizzare come facet

```yaml
PUT _ingest/pipeline/book-pipeline
{
  "processors": [
    {
      "split": {
        "field": "genres",
        "separator": "[|]"
      }
    }
  ]
}
```



##### (4) Prima di effettuare  la reindex assicurarsi che la ingest-pipeline sia corretta

###### ...a volte la re-indicizzazione può richiedere anche ore!

```yaml
GET _ingest/pipeline/book-pipeline/_simulate
{
  "docs": [
    {
      "_source": {
        "genres" : "Young Adult|Fiction|Science Fiction|Dystopia|Fantasy|Science Fiction"
      }
    }]
}
```

##### (5) Copiare il contenuto dell'index _luisa1-book_ nel nuovo indice _luisa2-book_

###### Tutti i dati presenti nell'index di partenza saranno _re-indicizzati_ nell'index di destinazione secondo la nuova configurazione

```yaml
POST _reindex
{
  "source": {
    "index": "luisa1-book"
  },
  "dest": {
    "index": "luisa2-book",
    "pipeline": "book-pipeline"
  }
}
```



##### (5) L'alias utilizzato da SearchKit adesso dovrà utilizzare solo il nuovo indice

###### Grazie all'utilizzo dell'alias non avremo downtime lato applicativo! :smile:

```yaml
POST _aliases
{
  "actions": [
    {
      "remove": {
        "index": "luisa1-book",
        "alias": "luisaviaroma-book"
      }
    },
    {
      "add": {
        "index": "luisa2-book",
        "alias": "luisaviaroma-book"
      }
    }
  ]
}
```



##### (6) Gestione multi-lingua

###### L'indice è formato da titoli e descrizioni in varie lingue (inglese, italiano etc..). In questi casi possiamo affidarci agli analyzer custom buil-in di Elastic!

```yaml
PUT luisa3-book
{
  "mappings": {
    "_doc": {
      "properties": {
        "book_authors": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            }
          }
        },
        "book_desc": {
          "type": "text",
          "fields": {
            "italian": {
              "type": "text",
              "analyzer": "italian"
            },
            "english": {
              "type": "text",
              "analyzer": "english"
            }
          }
        },
        "book_edition": {
          "type": "text"
        },
        "book_format": {
          "type": "keyword"
        },
        "book_isbn": {
          "type": "double"
        },
        "book_pages": {
          "type": "keyword"
        },
        "book_rating": {
          "type": "double"
        },
        "book_rating_count": {
          "type": "long"
        },
        "book_review_count": {
          "type": "long"
        },
        "book_title": {
          "type": "text",
          "fields": {
            "italian": {
              "type": "text",
              "analyzer": "italian"
            },
            "english": {
              "type": "text",
              "analyzer": "english"
            }
          }
        },
        "genres": {
          "type": "keyword"
        },
        "image_url": {
          "type": "keyword"
        }
      }
    }
  }
}
```


- Procediamo con una reindex per sottoporre ad analisi i dati secondo il nuovo mapping

```yaml
POST _reindex
{
  "source": {
    "index": "luisa2-book"
  },
  "dest": {
    "index": "luisa3-book"
  }
}
```


- Quando siamo sicuri che il nuovo indice è pronto per essere utilizzato includiamolo nell'alias, rimuovendo quello precedente.

```yaml
POST _aliases
{
  "actions": [
    {
      "remove": {
        "index": "luisa2-book",
        "alias": "luisaviaroma-book"
      }
    },
    {
      "add": {
        "index": "luisa3-book",
        "alias": "luisaviaroma-book"
      }
    }
  ]
}
```