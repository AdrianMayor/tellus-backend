const express = require("express");
import { NextFunction, Request, Response } from "express";
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const typeDefs = require("./typeDefs");

const app = express();

const startServer = async () => {
  //Creamos el servidor de apollo
  const apolloServer = new ApolloServer({
    typeDefs, // Los esquemas se encargan de decidir que campos podemos seleccionar y que devolver.
    resolvers, // Conjunto de funciones que interactuaran con la bbdd (similar a controladores de express)
  });

  await apolloServer.start(); // Es obligatorio esperar a montar primero el servidor de apollo para lanzar despues el de express

  apolloServer.applyMiddleware({
    app, // el servidor de express
    path: "/graphql", // el único endpoint que tendra la app
  });

  // Middleware NotFound
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
      status: "error",
      message: "Not found",
    });
  });

  app.listen(4000, () => {
    console.log("Server listening at port http://localhost:4000");
  });
};

startServer();
