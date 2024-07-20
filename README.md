# AthenaUI Front-end
AthenaUI front-end application is the single page web application built via React UI library. 
Application is distributed as a Java Jar archive.

# Build Web Applications

### Get sources

Checkout [AthenaUI repository](https://github.com/MarieMartin33/AthenaUI.git): 
```
git clone https://github.com/MarieMartin33/AthenaUI.git
```

### Install npm packages

After getting the sources please execute following commands: 

in package.json
replace "\^([0-9]+\.[0-9]+\.[0-9]+)" => "*"
del package-lock.json
del node_modules

```
cd AthenaUI
npm update --save --legacy-peer-deps
npm install --legacy-peer-deps
npm install react-bootstrap bootstrap --legacy-peer-deps
```

### Build

In order to assemble AthenaUI web application please run:
```
npm run build
```
In order to assemble AthenaUI.jar please run:
```
mvn clean package
```


# Development guide

### Run in development mode

In order to start web app please start [Athena API](https://github.com/OHDSI/Athena) backend and execute following command:
```
npm run start
```
Webpack dev server should start at [localhost:3000](http://localhost:3000)
