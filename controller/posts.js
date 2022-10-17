const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const {
  GridFsStorage
} = require("multer-gridfs-storage");
var crypto = require('crypto');
var path = require('path');

//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
});

const storage = new GridFsStorage({
  url: 'mongodb+srv://admin:admin@cluster0.x6ckbnw.mongodb.net/test',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket"
      };
      resolve(fileInfo);
    });
  }
});

const getFileData = async (req,res)=>{
  const cursor = bucket.find({});
  let arr = []
  await cursor.forEach(doc => {
    console.log(doc)
    arr.push(doc)
  });
  res.send(arr)
  
}


module.exports = {storage,bucket,getFileData};