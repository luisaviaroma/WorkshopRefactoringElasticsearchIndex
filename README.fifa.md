# SearchKit-demo-fifa



#####  (1) Controllo del Mapping creato degli indici

###### Alcuni campi devono essere normalizzati in modo da utilizzarli in modo opportuno in SearchKit

```yaml
GET luisa1-fifa

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "luisa1-fifa",
        "alias": "luisaviaroma-fifa"
      }
    }
  ]
}

# In SearchKit si eve utilizzare l'alias luisaviaroma-fifa!!!
```



##### (2) Creazione del nuovo indice ottimizzato

###### Ogni volta che sono necessarie modifiche all'index l'unica opzione che abbiamo è crearne uno nuovo.

In questo caso dobbiamo modificare:

- Il _datatype_ del field _Name_ in modo da utilizzarlo nella ricerca full-text.

- Creare un field apposito per creare un filtro che ci permetterà di filtrare i giocatori per fascia di prezzo.
- Vogliamo poter cercare i giocatori scrivendo il nome del proprio club _(e non dai filtri)_

```yaml
PUT luisa2-fifa
{
  "mappings": {
    "_doc": {
      "properties": {
        "Acceleration": {
          "type": "long"
        },
        "Age": {
          "type": "long"
        },
        "Aggression": {
          "type": "long"
        },
        "Agility": {
          "type": "long"
        },
        "Balance": {
          "type": "long"
        },
        "BallControl": {
          "type": "long"
        },
        "Body Type": {
          "type": "keyword"
        },
        "CAM": {
          "type": "keyword"
        },
        "CB": {
          "type": "keyword"
        },
        "CDM": {
          "type": "keyword"
        },
        "CF": {
          "type": "keyword"
        },
        "CM": {
          "type": "keyword"
        },
        "Club": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            }
          }
        },
        "Club Logo": {
          "type": "keyword"
        },
        "Composure": {
          "type": "long"
        },
        "Contract Valid Until": {
          "type": "keyword"
        },
        "Crossing": {
          "type": "long"
        },
        "Curve": {
          "type": "long"
        },
        "Dribbling": {
          "type": "long"
        },
        "FKAccuracy": {
          "type": "long"
        },
        "Finishing": {
          "type": "long"
        },
        "Flag": {
          "type": "keyword"
        },
        "GKDiving": {
          "type": "long"
        },
        "GKHandling": {
          "type": "long"
        },
        "GKKicking": {
          "type": "long"
        },
        "GKPositioning": {
          "type": "long"
        },
        "GKReflexes": {
          "type": "long"
        },
        "HeadingAccuracy": {
          "type": "long"
        },
        "Height": {
          "type": "keyword"
        },
        "ID": {
          "type": "long"
        },
        "Interceptions": {
          "type": "long"
        },
        "International Reputation": {
          "type": "long"
        },
        "Jersey Number": {
          "type": "long"
        },
        "Joined": {
          "type": "keyword"
        },
        "Jumping": {
          "type": "long"
        },
        "LAM": {
          "type": "keyword"
        },
        "LB": {
          "type": "keyword"
        },
        "LCB": {
          "type": "keyword"
        },
        "LCM": {
          "type": "keyword"
        },
        "LDM": {
          "type": "keyword"
        },
        "LF": {
          "type": "keyword"
        },
        "LM": {
          "type": "keyword"
        },
        "LS": {
          "type": "keyword"
        },
        "LW": {
          "type": "keyword"
        },
        "LWB": {
          "type": "keyword"
        },
        "Loaned From": {
          "type": "keyword"
        },
        "LongPassing": {
          "type": "long"
        },
        "LongShots": {
          "type": "long"
        },
        "Marking": {
          "type": "long"
        },
        "Name": {
          "type": "text"
        },
        "Nationality": {
          "type": "keyword"
        },
        "Overall": {
          "type": "long"
        },
        "Penalties": {
          "type": "long"
        },
        "Photo": {
          "type": "keyword"
        },
        "Position": {
          "type": "keyword"
        },
        "Positioning": {
          "type": "long"
        },
        "Potential": {
          "type": "long"
        },
        "Preferred Foot": {
          "type": "keyword"
        },
        "RAM": {
          "type": "keyword"
        },
        "RB": {
          "type": "keyword"
        },
        "RCB": {
          "type": "keyword"
        },
        "RCM": {
          "type": "keyword"
        },
        "RDM": {
          "type": "keyword"
        },
        "RF": {
          "type": "keyword"
        },
        "RM": {
          "type": "keyword"
        },
        "RS": {
          "type": "keyword"
        },
        "RW": {
          "type": "keyword"
        },
        "RWB": {
          "type": "keyword"
        },
        "Reactions": {
          "type": "long"
        },
        "Real Face": {
          "type": "keyword"
        },
        "Release Clause": {
          "type": "keyword"
        },
        "ST": {
          "type": "keyword"
        },
        "ShortPassing": {
          "type": "long"
        },
        "ShotPower": {
          "type": "long"
        },
        "Skill Moves": {
          "type": "long"
        },
        "SlidingTackle": {
          "type": "long"
        },
        "Special": {
          "type": "long"
        },
        "SprintSpeed": {
          "type": "long"
        },
        "Stamina": {
          "type": "long"
        },
        "StandingTackle": {
          "type": "long"
        },
        "Strength": {
          "type": "long"
        },
        "Value": {
          "type": "keyword"
        },
        "newValue":{
          "type": "long"
        },
        "Vision": {
          "type": "long"
        },
        "Volleys": {
          "type": "long"
        },
        "Wage": {
          "type": "keyword"
        },
        "Weak Foot": {
          "type": "long"
        },
        "Weight": {
          "type": "keyword"
        },
        "Work Rate": {
          "type": "keyword"
        },
        "column1": {
          "type": "long"
        }
      }
    }
  }
}
```



##### (3) Prima di re-indicizzare i dati è necessario creare una ingest pipeline per normalizzare il field _Value_ e poterlo utilizzare come facet

```yaml
PUT _ingest/pipeline/fifa-pipeline
{
  "processors": [
    {
      "set": {
        "field": "newValue",
        "value": 0
      }
    },
    {
      "gsub": {
        "field": "Value",
        "pattern": """€(\d+.*\d*)""",
        "replacement": "$1",
        "target_field": "newValue"
      }
    },
    {
      "gsub": {
        "field": "newValue",
        "pattern": """(\d+.*\d*)M""",
        "replacement": "$1E06"
      }
    },
    {
      "gsub": {
        "field": "newValue",
        "pattern": """(\d+.*\d*)K""",
        "replacement": "$1E03"
      }
    }
  ]
}
```



##### (4) Copiare il contenuto dell'index _luisa1-fifa_ nel nuovo indice _luisa2-fifa_

###### Tutti i dati presenti nell'index di partenza saranno _re-indicizzati_ nell'index di destinazione secondo la nuova configurazione

```yaml
POST _reindex
{
  "source": {
    "index": "luisa1-fifa"
  },
  "dest": {
    "index": "luisa2-fifa",
    "pipeline": "fifa-pipeline"
  }
}
```



##### (5) L'alias utilizzato da SearchKit adesso dovrà utilizzare solo il nuovo indice

###### Grazie all'utilizzo dell'alias non avremo downtime lato applicativo! :)

```yaml
POST _aliases
{
  "actions": [
    {
      "remove": {
        "index": "luisa1-fifa",
        "alias": "luisaviaroma-fifa"
      }
    },
    {
      "add": {
        "index": "luisa2-fifa",
        "alias": "luisaviaroma-fifa"
      }
    }
  ]
}
```