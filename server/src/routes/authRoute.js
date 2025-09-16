const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controllers/UserController");
const { handleLogin } = require("../controllers/AuthController");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur et renvoi un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error_message:
 *                   type: string
 */
router.route('/login').post(handleLogin);
router.route('/register').post(handleNewUser);

module.exports = router;