# CDK AWS Serverless
Esempio di utilizzo di cdk con typescript per lo sviluppo
di un progetto aws serverless.
Vengono utilizzati i seguenti servizi aws:
- Aws Api Gateway
- Aws Lambda
- Aws DynamoDB

Sono presenti due rest api /additem e /getitem.
Entrambe GET e entrambe con due query param: key, value
- key è il campo ID che verrà salvato nella tabella DynamoDB
- value è il campo VALUE che verrà salvato nella tabella DynamoDB

La tabella MYTABLETEST DynamoDB è difatto cosi composta:
- ID (Partion Key. String)
- VALUE (String)

<p align="center">
  <img src="https://github.com/AndreaCiacciaCodeploy/cdk-aws-serverless/blob/main/cdkaws.png?raw=true">
</p>

Url api viene salvato nel file cdk-outputs.json generato durante il deploy dello stack.

### What is CDK ?
AWS CDK (Cloud Development Kit) è un framework di sviluppo software open source che permette di definire risorse di applicazioni cloud tramite linguaggi di programmazione (es. TypeScript).
Il codice scritto viene poi convertito in uno stack CloudFormation.

A questo link un utile e veloce tutorial: https://aws.amazon.com/it/getting-started/guides/setup-cdk/

### How use
1. npm install [inizializza progetto node]
2. cd src \ npm install [node lambda project]
2. cdk deploy --outputs-file ./cdk-outputs.json [deploy on aws]
3. cdk destroy [rimuove lo stack]

### Lambda version

Per gestire l'aggiornamento della lambda è presente si utilizza una variabile RELEASE_VERSION.
Questa variabile viene modificata dentro lo script deploy.sh

### Deploy
Lo script deploy.sh effettua un commit & push delle modifiche effettuate. Aggiorna il valore di RELEASE_VERSION ed effettua un cdk deploy.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
