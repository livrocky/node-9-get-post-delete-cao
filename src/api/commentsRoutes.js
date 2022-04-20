const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const commentsRoutes = express.Router();

// DELETE /comments/:id ištrins vieną komentarą pagal jo ID.
commentsRoutes.delete('/comments/:delCommentId', async (req, res) => {
  try {
    const { delCommentId } = req.params;
    await dbClient.connect();
    // gauti komentara kurio id yra === CommentId
    const collection = dbClient.db('Media').collection('comments');
    const deleteResult = await collection.deleteOne({ _id: ObjectId(delCommentId) });
    console.log('deleteResult ===', deleteResult);
    res.status(200).json(deleteResult);
  } catch (error) {
    console.error('error in deleting single comment', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = commentsRoutes;
