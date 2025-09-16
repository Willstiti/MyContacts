const express = require("express");
const {protect} = require("../middlewares/requireAuth")
const {getUserContact, createContact, editContact, deleteContact} = require("../controllers/ContactController")

const router = express.Router();
/**
 * @swagger
 * /contact/add:
 *   post:
 *     summary: Ajouter un nouveau contact pour l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - phoneNumber
 *             properties:
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *       401:
 *         description: Utilisateur non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error_message:
 *                   type: string
 */
router.post("/contact/add", protect, createContact);

/**
 * @swagger
 * /contact/list:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   _id:
 *                     type: string
 *       400:
 *         description: Aucun contact trouvé pour cet utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 failed:
 *                   type: string
 *       401:
 *         description: Utilisateur non autorisé ou token invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error_message:
 *                   type: string
 */
router.get("/contact/list", protect, getUserContact);

/**
 * @swagger
 * /contact/{id}:
 *   patch:
 *     summary: Modifier un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error_message:
 *                   type: string
 */
router.patch("/contact/:id", protect, editContact);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Supprimer un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       401:
 *         description: Utilisateur non autorisé
 *       404:
 *         description: Contact non trouvé
 */
router.delete("/contact/:id", protect, deleteContact);

module.exports = router;