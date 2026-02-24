const Client = require('../models/Client');

/**
 * @desc    Get all clients
 * @route   GET /api/clients
 * @access  Public
 */
const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ created_date: -1 });
    res.json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single client by ID
 * @route   GET /api/clients/:id
 * @access  Public
 */
const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new client
 * @route   POST /api/clients
 * @access  Public
 */
const createClient = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update client
 * @route   PUT /api/clients/:id
 * @access  Public
 */
const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete client
 * @route   DELETE /api/clients/:id
 * @access  Public
 */
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

