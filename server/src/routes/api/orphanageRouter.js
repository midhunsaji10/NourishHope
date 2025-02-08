const express = require('express');
const orphanageData = require('../../models/orphanageModel');
const loginData = require('../../models/loginModel');
const requestData = require('../../models/requestModel');
const { default: mongoose } = require('mongoose');
const orphanageRouter = express.Router();


orphanageRouter.get('/profile/:loginId', async (req, res) => {
  try {
    const id = req.params.loginId;
    const orphanage = await orphanageData.findOne({ login_id: id }).populate('login_id');
    if (orphanage) {
      return res.status(200).json({
        Success: true,
        Error: false,
        data: orphanage,
        Message: 'Data Found',
      })
    } else {
      return res.status(404).json({
        Success: false,
        Error: true,
        data: null,
        Message: 'Data Not Found',
      })
    }

  } catch (error) {
    return res.status(500).json({
      Success: false,
      Error: true,
      data: null,
      Message: 'Internal Server Error',
    })
  }
})

orphanageRouter.get('/all_orphanages', async (req, res) => {
  try {
    const orphanage = await orphanageData.find();
    if (orphanage) {
      return res.status(200).json({
        Success: true,
        Error: false,
        data: orphanage,
        Message: 'Data Found',
      })
    } else {
      return res.status(404).json({
        Success: false,
        Error: true,
        data: null,
        Message: 'Data Not Found',
      })
    }

  } catch (error) {
    return res.status(500).json({
      Success: false,
      Error: true,
      data: null,
      Message: 'Internal Server Error',
    })
  }
})

orphanageRouter.get('/update_profile/:id', async (req, res) => {
  try {
    const objectId = req.params.id;
    const previousData = await orphanageData.findOne({
      _id: objectId,
    });
    var updateData = {
      login_id: previousData.login_id,
      orphanage_name: req.body.orphanage_name ? req.body.orphanage_name : previousData.orphanage_name,
      mobile: req.body.mobile ? req.body.mobile : previousData.mobile,
      address: req.body.address ? req.body.address : previousData.address,
      // image: req.files && req.files.length > 0
      //   ? req.files.map((file) => file.path)
      //   : previousData.image,
    };
    const Data = await orphanageData.updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (Data.modifiedCount == 1) {
      return res.status(200).json({
        Success: true,
        Error: false,
        data: Data,
        Message: 'Profile updated successfully',
      });
    } else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed while updating profile',
      });
    }
  } catch (error) {
    return res.json({
      Success: false,
      Error: true,
      Message: 'Something went wrong',
    });
  }
})

orphanageRouter.get('/delete_profile/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const orphanageDatas = await orphanageData.deleteOne({ _id: id });
    if (orphanageDatas.deletedCount == 1) {
      const loginDatas = await loginData.deleteOne({ _id: orphanageDatas.login_id });
      return res.status(200).json({
        Success: true,
        Error: false,
        data: orphanageDatas,
        Message: 'Profile deleted successfully',
      });
    }
    else {
      return res.status(400).json({
        Success: false,
        Error: true,
        Message: 'Failed while deleting profile',
      })
    }
  } catch (error) {
    return res.status(500).json({
      Success: false,
      Error: true,
      Message: 'Something went wrong',
    });
  }
})

orphanageRouter.post('/add-request', async (req, res) => {
  try {
    const { login_id, quantity, food_type, description } = req.body;
    if (!login_id || !quantity || !food_type || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const orpId = await orphanageData.findOne({ login_id: login_id })
    const newRequest = new requestData({ orphanage_id: orpId._id, description,donations:'0', requested_quantity:quantity, food_type, status: 'active' });
    const savedRequest = await newRequest.save();
    if (savedRequest) {
      return res.status(200).json({ message: 'Request added successfully', request: savedRequest });
    } else {
      return res.status(400).json({ message: 'Failed to add request' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

orphanageRouter.put('/requests/:id/decrement', async (req, res) => {
  try {
    const { id } = req.params;
    const { decrementBy } = req.body;

    if (!decrementBy || decrementBy <= 0) {
      return res.status(400).json({ error: 'Invalid decrement value' });
    }

    const request = await requestData.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const newQuantity = parseInt(request.quantity) - parseInt(decrementBy);
    if (newQuantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }

    request.quantity = newQuantity;
    const updatedRequest = await request.save();
    if (updatedRequest) {
      return res.status(200).json({ message: 'Quantity decremented successfully', request: updatedRequest });
    } else {
      return res.status(400).json({ message: 'Failed to decrement quantity' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

orphanageRouter.delete('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await requestData.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ message: 'Request deleted successfully', request: deletedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

orphanageRouter.get('/requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await requestData.findById(id).populate('orphanage_id');

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    return res.status(200).json({ request });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

orphanageRouter.get('/all-requests/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const orp_id = await orphanageData.findOne({ login_id: id })
    console.log(orp_id);
    
    const request = await requestData.find({ orphanage_id: new mongoose.Types.ObjectId(orp_id._id) })
    console.log(request);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    return res.status(200).json({ data: request });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

orphanageRouter.get('/all-requests', async (req, res) => {
  try {    
    const request = await requestData.find({ status: 'active' }).populate('orphanage_id')
    console.log(request);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    return res.status(200).json({ data: request });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});






module.exports = orphanageRouter;