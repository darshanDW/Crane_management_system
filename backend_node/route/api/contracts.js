const { createContract, signContract, getAllContracts } = require('../../controllers/contractController');
const express = require('express');
const router = express.Router();

router.post('/', createContract);
router.post('/:id/sign', signContract);
router.get('/', getAllContracts);

module.exports = router;