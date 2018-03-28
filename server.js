(function() {
  'use strict';

  const express = require('express');
  const http = require('http');
  const WebSocketServer = require('websocket').server;
  const app = express();
  const server = http.createServer(app);

  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  function originIsAllowed(origin) {
    // TODO if you need to secure the origin
    return true;
  }

  wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection fron origin ' + request.origin + ' rejected.');
      return;
    }

    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
      connection.sendUTF(message.utf8Data);
    });

    connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnection. Reason: ' + reasonCode);
    });

  });

  server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    // spawn one generator
    observableSineWave(200);
  });

  function deg2rad(val) {
    return val * 0.0174533;
  }

  function observableSineWave(period) {
    let waveVal = 0;
    setInterval(function() {
      waveVal = waveVal == 360 ? 0 : waveVal + 0.1;
      wsServer.broadcast(JSON.stringify({ value: Math.sin(deg2rad(waveVal)) }));
    }, period);
  }

}());
