// Dependencies 
const QRCode = require('qrcode')
const express = require('express')
// Node.js 
const path = require('path')
const fs    = require("fs")
// Locales 
const bin = require('./server')
// Ejecutar servidor
const Main = ()=>{
    bin(true)
}

Main()