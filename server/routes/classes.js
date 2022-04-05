const express = require('express');

const sequenceGenerator = require('./sequenceGenerator');

const Class = require('../models/class');

const router = express.Router();
module.exports = router;

router.get('/', (req, res, next) => {
  console.log('router.get called');
  
    Class.find(function (err, classes){
        // if an error occurred return response status 500 and a JSON object containing information about the error
        if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
        }
        
        res.status(200).json(classes);
    });
});

router.post('/', (req, res, next) => {
    const maxClassId = sequenceGenerator.nextId("classes");
  
    const newClass = new Class({
      id: maxClassId,
      apsc: req.body.apsc,
      name: req.body.name,
      description: req.body.description
    });
  
    newClass.save()
      .then(createdClass => {
        res.status(201).json({
          message: 'Class added successfully',
          class: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

router.put('/:id', (req, res, next) => {
    Class.findOne({ id: req.params.id })
      .then(updateClass => {
        updateClass.apsc = req.body.apsc;
        updateClass.name = req.body.name;
        updateClass.description = req.body.description;
  
        Class.updateOne({ id: req.params.id }, updateClass)
          .then(result => {
            res.status(204).json({
              message: 'Class updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Class not found.',
          error: { class: 'Class not found'}
        });
      });
  });
  
router.delete("/:id", (req, res, next) => {
    Class.findOne({ id: req.params.id })
      .then(deleteClass => {
        Class.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Class deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Class not found.',
          error: { deleteClass: 'Class not found'}
        });
      });
  });

    
        
