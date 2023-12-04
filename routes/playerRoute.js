const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.route('/')
    .get(playerController.getPlayers)
    .post(playerController.createPlayer)
    .delete(playerController.deletePlayers);

router.route('/:id')
    .get(playerController.getPlayer)
    .patch(playerController.updatePlayer)
    .delete(playerController.deletePlayer);

router.route('/:id/scores')
    .put(playerController.appendScoreToPlayer);

module.exports = router;