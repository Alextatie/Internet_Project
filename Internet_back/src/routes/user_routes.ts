import express from "express";
const router = express.Router();
import user from "../controllers/user";
import authMiddlewear from "../common/auth_middleware";

/**
* @swagger
* /user:
*   get:
*     summary: Get all userss
*     tags: [User]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the students
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/User'
*/
router.get("/", authMiddlewear, user.get.bind(user));

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: 'Get a user by ID'
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '12345'
 *         description: 'Unique ID of the user to retrieve'
 *     responses:
 *       '200':
 *         description: 'Student details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/check", authMiddlewear, user.exists.bind(user));

router.get("/:id", authMiddlewear, user.getbyID.bind(user));

router.put("/:id", authMiddlewear, user.put.bind(user));

router.delete("/:id", authMiddlewear, user.remove.bind(user));



export default router;