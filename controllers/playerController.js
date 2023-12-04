const Player = require('../models/playerSchema');

// @desc    Get all players
// @route   GET /players
// @access  Public
const getPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// @desc    Create one player
// @route   POST /players
// @access  Public
const createPlayer = async (req, res) => {
    const player = new Player({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newPlayer = await player.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// @desc    Delete all players
// @route   DELETE /players
// @access  Public
const deletePlayers = async (req, res) => {
    try {
        await Player.deleteMany();
        res.json({message: 'Deleted all players'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// @desc    Get one player
// @route   GET /players/:id
// @access  Public
const getPlayer = async (req, res) => {
    res.json(res.player);
}

// @desc    Update one player
// @route   PATCH /players/:id
// @access  Public
const updatePlayer = async (req, res) => {
    if (req.body.username != null) {
        res.player.username = req.body.username;
    }
    if (req.body.highScore != null) {
        res.player.highScore = req.body.highScore;
    }
    if (req.body.gamesPlayed != null) {
        res.player.gamesPlayed = req.body.gamesPlayed;
    }
    if (req.body.scores != null) {
        res.player.scores = req.body.scores;
    }
    try {
        const updatedPlayer = await res.player.save();
        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// @desc    Delete one player
// @route   DELETE /players/:id
// @access  Public
const deletePlayer = async (req, res) => {
    try {
        await res.player.remove();
        res.json({message: 'Deleted player'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// @desc    Add a score to a player
// @route   PUT /players/:id/scores
// @access  Public
const appendScoreToPlayer = async (req, res) => {
    try {
        const playerId = req.params.id;
        const { score } = req.body;
    
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).send('Player not found');
        }
    
        // Add the new score to the player's scores array and update the high score if necessary
        player.scores.push(score);
        if (score > player.highScore) {
            player.highScore = score;
        }

        // Increment the number of games played
        player.gamesPlayed += 1;

        await player.save();
  
        res.status(200).json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getPlayers,
    deletePlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    appendScoreToPlayer,
    deletePlayer
}